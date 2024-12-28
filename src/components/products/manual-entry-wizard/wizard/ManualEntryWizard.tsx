'use client'

import { useState } from 'react'
import { CatalogueFormData } from '@/lib/products/types/catalogue'
import {
  BasicInfoStep,
  CategoriesStep,
  ImagesStep,
  VisibilityStep,
  ReviewStep
} from './steps'

interface ManualEntryWizardProps {
  onComplete: (data: CatalogueFormData) => void
  onCancel: () => void
  initialData?: Partial<CatalogueFormData>
}

export function ManualEntryWizard({
  onComplete,
  onCancel,
  initialData
}: ManualEntryWizardProps): JSX.Element {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CatalogueFormData>(() => ({
    name: initialData?.name || '',
    description: {
      supplier: '',
      marketing: '',
      internal: ''
    },
    brand: initialData?.brand || '',
    categorization: {
      style: [],
      type: []
    },
    images: [],
    visibility: {
      showToCustomer: true,
      showToSalesRep: true
    },
    specifications: [],
    supplierData: []
  }))

  const steps = [
    { title: 'Basic Information', component: <BasicInfoStep data={formData} onChange={(data) => setFormData(data)} /> },
    { title: 'Categories', component: <CategoriesStep data={formData} onChange={(data) => setFormData(data)} /> },
    { title: 'Images', component: <ImagesStep data={formData} onChange={(data) => setFormData(data)} /> },
    { title: 'Visibility', component: <VisibilityStep data={formData} onChange={(data) => setFormData(data)} /> },
    { title: 'Review', component: <ReviewStep data={formData} /> }
  ]

  const canProceed = () => {
    switch (step) {
      case 1: // Basic Info
        return formData.name && formData.brand
      case 2: // Categories
        return formData.categorization.type.length > 0
      default:
        return true
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="relative mb-8">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${(step / steps.length) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`flex flex-col items-center ${
                  i + 1 <= step ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${
                    i + 1 <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </div>
                <div className="text-sm">{s.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        {steps[step - 1].component}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          
          {step < steps.length ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => onComplete(formData)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Product
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

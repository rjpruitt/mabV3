'use client'

import { useState } from 'react'
import { ProductImage } from '@/types/products'
import { ImportFormData } from './types'
import {
  BasicInfoStep,
  CategoriesStep,
  ImagesStep,
  VisibilityStep,
  ReviewStep
} from './steps'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ImportWizardProps {
  productData: any  // We'll type this properly later
  onClose: () => void
  onImport: (data: ImportFormData) => Promise<void>
  importing?: boolean
}

export function ImportWizard({ productData, onClose, onImport, importing }: ImportWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ImportFormData>(() => ({
    name: productData.name,
    description: {
      supplier: productData.description || '',
      internal: ''
    },
    brand: productData.brand,
    categories: {
      style: [],
      type: []
    },
    images: productData.images?.map((url: string) => ({
      url,
      source: 'supplier' as const,
      primary: false
    })) || [],
    visibility: {
      showToCustomer: true,
      showToSalesRep: true
    },
    specifications: productData.specifications || [],
    variants: [],
    metadata: {
      supplier: 'homedepot',
      externalId: productData.id,
      importedAt: new Date()
    }
  }))

  const steps = [
    { title: 'Basic Information', component: <BasicInfoStep data={formData} onChange={setFormData} /> },
    { title: 'Categories', component: <CategoriesStep data={formData} onChange={setFormData} /> },
    { title: 'Images', component: <ImagesStep data={formData} onChange={setFormData} /> },
    { title: 'Visibility', component: <VisibilityStep data={formData} onChange={setFormData} /> },
    { title: 'Review', component: <ReviewStep data={formData} /> }
  ]

  const canProceed = () => {
    switch (step) {
      case 1: // Basic Info
        return formData.name && formData.brand
      case 2: // Categories
        return formData.categories.type.length > 0
      default:
        return true
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Import Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <div 
                key={s.title}
                className={`flex items-center ${i < step ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <span className="font-medium">{s.title}</span>
                {i < steps.length - 1 && (
                  <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
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
              onClick={() => onImport(formData)}
              disabled={importing}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 flex items-center"
            >
              {importing ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Importing...
                </>
              ) : (
                'Import Product'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { CatalogueFormData } from '@/lib/products/types/catalogue'
import {
  BasicInfoStep,
  DynamicCategoryStep,
  ImagesStep,
  VisibilityStep,
  ReviewStep
} from './steps'
import { CATEGORY_STEPS } from '../config/category-steps'
import { toast } from 'sonner'

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
    classification: {
      style: [],
      productType: []
    },
    designTool: {
      classification: {
        format: 'INDIVIDUAL_COMPONENT',
        topCategory: 'SHOWERS',
        componentType: undefined,
        includedComponents: []
      }
    },
    priceLevel: 'SMART_SOLUTIONS',
    images: [],
    visibility: {
      showToCustomer: true,
      showToSalesRep: true
    },
    specifications: [],
    supplierData: []
  }))

  const handleCategoryChange = (selections: Record<string, string | string[]>) => {
    console.log('Category selections:', selections)
    
    // Map the selections to our categorization format
    const type: string[] = []
    if (selections.topCategory) {
      type.push(typeof selections.topCategory === 'string' ? selections.topCategory : selections.topCategory[0])
    }
    if (selections.showerType) {
      type.push(typeof selections.showerType === 'string' ? selections.showerType : selections.showerType[0])
    }
    if (selections.componentType) {
      type.push(typeof selections.componentType === 'string' ? selections.componentType : selections.componentType[0])
    }
    if (selections.showerLocation) {
      type.push(typeof selections.showerLocation === 'string' ? selections.showerLocation : selections.showerLocation[0])
    }
    
    console.log('Setting categorization:', {
      style: Array.isArray(selections.style) ? selections.style : [],
      type
    })

    setFormData(prev => ({
      ...prev,
      categorization: {
        style: Array.isArray(selections.style) ? selections.style : [],
        type
      }
    }))
  }

  type WizardStep = 'basic' | 'category' | 'images' | 'visibility'

  const handleSave = async (data: CatalogueFormData) => {
    if (!data || !data.name || !data.brand) {
      toast.error('Name and brand are required')
      return
    }

    try {
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Product added successfully', {
          position: 'top-center',
          duration: 3000,
          dismissible: true
        })
        onComplete?.(data)
      } else {
        toast.error(result.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error in handleSave:', error)
      toast.error('Failed to create product')
    }
  }

  const steps = [
    { title: 'Basic Information', component: <BasicInfoStep data={formData} onChange={(data) => setFormData(data)} initialData={initialData} /> },
    { title: 'Categories', component: <DynamicCategoryStep
      steps={CATEGORY_STEPS}
      onChange={handleCategoryChange}
      initialSelections={formData.categorization}
    /> },
    { title: 'Images', component: <ImagesStep data={formData} onChange={(data) => setFormData(data)} /> },
    { title: 'Visibility', component: <VisibilityStep data={formData} onChange={(data) => setFormData(data)} /> },
    { title: 'Review', component: <ReviewStep 
      data={formData} 
      onEdit={(step: WizardStep) => {
        const stepMap: Record<WizardStep, number> = {
          'basic': 1,
          'category': 2,
          'images': 3,
          'visibility': 4
        }
        setStep(stepMap[step])
      }}
      onComplete={handleSave}
    /> }
  ]

  const canProceed = () => {
    console.log('Checking canProceed for step', step)
    console.log('Current categorization:', formData.categorization)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative mt-16">
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
          
          {step < steps.length && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { CatalogueFormData, ProductImage } from '@/lib/products/types/catalogue'
import {
  BasicInfoStep,
  DynamicCategoryStep,
  ImagesStep,
  VisibilityStep,
  ReviewStep,
  SpecificationsStep
} from './steps'
import { categorySteps } from '../config/category-steps'
import { toast } from 'sonner'
import type { ProductImageWithFile, WizardStep } from './types'
import type { Supplier } from '@prisma/client'

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
      categories: [],
      type: '',
      style: []
    },
    classification: {
      categories: [],
      type: ''
    },
    designTool: {
      enabled: false,
      classification: {
        format: 'INDIVIDUAL_COMPONENT',
        topCategory: 'SHOWERS',
        componentType: undefined,
        includedComponents: []
      }
    },
    priceLevel: 'Smart Solutions',
    images: [],
    visibility: {
      showToCustomer: true,
      showToSalesRep: true
    },
    specifications: [],
    supplierData: [],
    patterns: [],
    choices: []
  }))

  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers')
        const data = await response.json()
        setSuppliers(data)
      } catch (error) {
        console.error('Failed to fetch suppliers:', error)
        toast.error('Failed to load suppliers')
      }
    }
    fetchSuppliers()
  }, [])

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

    // Build choices array
    const choices: Array<{ category: string, productId: string }> = []

    // Add product type - use productFormat if it exists, otherwise use topCategory
    if (selections.productFormat) {
      choices.push({
        category: 'product_type',
        productId: typeof selections.productFormat === 'string' ? selections.productFormat : selections.productFormat[0]
      })
    } else if (selections.topCategory) {
      choices.push({
        category: 'product_type',
        productId: typeof selections.topCategory === 'string' ? selections.topCategory : selections.topCategory[0]
      })
    }

    // Add component type if it exists
    if (selections.componentType) {
      choices.push({
        category: 'componentType',
        productId: typeof selections.componentType === 'string' ? selections.componentType : selections.componentType[0]
      })
    }

    // Add kit includes
    if (selections.kit_includes) {
      const kitIncludes = Array.isArray(selections.kit_includes) 
        ? selections.kit_includes 
        : [selections.kit_includes]
      
      kitIncludes.forEach(item => {
        choices.push({
          category: 'kit_includes',
          productId: item
        })
      })
    }

    console.log('Setting choices:', choices)

    setFormData(prev => ({
      ...prev,
      categorization: {
        categories: type,
        type: type[0] || '',
        style: Array.isArray(selections.style) ? selections.style : []
      },
      choices
    }))
  }

  const handleSave = async (data: CatalogueFormData) => {
    if (!data || !data.name || !data.brand) {
      toast.error('Name and brand are required')
      return
    }

    try {
      // Upload any new images first
      const uploadPromises = data.images
        .filter((img): img is ProductImageWithFile => 'file' in img && img.file instanceof File)
        .map(async (img) => {
          const formData = new FormData()
          formData.append('file', img.file!)
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })
          
          if (!response.ok) throw new Error('Failed to upload image')
          
          const result = await response.json()
          return {
            originalId: img.id,
            url: result.url
          }
        })

      const uploadedImages = await Promise.all(uploadPromises)

      // Replace temporary URLs with permanent ones
      const finalImages = data.images.map(img => {
        const uploaded = uploadedImages.find(u => u.originalId === img.id)
        return {
          url: uploaded?.url || img.url,
          alt: img.alt,
          source: img.source,
          isPrimary: img.isPrimary,
          visibility: img.visibility
        }
      })

      // Create the product with permanent image URLs
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          images: finalImages
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('Product added successfully')
        onComplete?.(data)
      } else {
        toast.error(result.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error in handleSave:', error)
      toast.error('Failed to create product')
    }
  }

  const handleDataChange = (partialData: Partial<CatalogueFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...partialData
    }))
  }

  const handleStepComplete = (category: string, productId: string) => {
    console.log('Setting step choices:', {
      category,
      productId,
      allChoices: formData.choices
    })

    // Update choices
    setFormData(prev => ({
      ...prev,
      choices: prev.choices ? 
        prev.choices.map(c => c.category === category ? { ...c, productId } : c)
        : [{ category, productId }]
    }))
  }

  const steps = [
    { 
      title: 'Basic Information', 
      component: <BasicInfoStep 
        data={formData} 
        onChange={handleDataChange} 
        initialData={initialData}
        supplierList={suppliers}
      /> 
    },
    { 
      title: 'Categories', 
      component: <DynamicCategoryStep
        steps={categorySteps}
        onChange={handleCategoryChange}
        initialSelections={formData.categorization}
      /> 
    },
    { 
      title: 'Specifications', 
      component: <SpecificationsStep 
        data={formData} 
        onChange={handleDataChange} 
      /> 
    },
    { 
      title: 'Images', 
      component: <ImagesStep 
        data={formData} 
        onChange={(data) => {
          const validatedImages = data.images.map(img => ({
            ...img,
            isPrimary: img.isPrimary || false,
            visibility: {
              ...img.visibility,
              showToCustomer: true,
              showToSalesRep: true
            }
          }))
          handleDataChange({ images: validatedImages })
        }} 
      /> 
    },
    { 
      title: 'Visibility', 
      component: <VisibilityStep 
        data={formData} 
        onChange={handleDataChange} 
      /> 
    },
    { 
      title: 'Review', 
      component: <ReviewStep 
        data={formData} 
        onChange={handleDataChange}
        onStepChange={(step: WizardStep) => {
          const stepMap: Record<WizardStep, number> = {
            'basic': 1,
            'category': 2,
            'specifications': 3,
            'images': 4,
            'visibility': 5
          }
          setStep(stepMap[step])
        }}
      /> 
    }
  ]

  const canProceed = () => {
    console.log('Checking canProceed for step', step)
    console.log('Current categorization:', formData.categorization)
    switch (step) {
      case 1: // Basic Info
        return formData.name && formData.brand
      case 2: // Categories
        return formData.categorization.type !== ''
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

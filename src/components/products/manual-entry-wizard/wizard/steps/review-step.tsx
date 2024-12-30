'use client'

import { CatalogueFormData } from '@/lib/products/types/catalogue'
import Image from 'next/image'
import { useState } from 'react'

type WizardStep = 'basic' | 'category' | 'images' | 'visibility'

interface ReviewStepProps {
  data: CatalogueFormData
  onEdit?: (step: WizardStep) => void
  onComplete?: (data: CatalogueFormData) => void
}

interface ValidationError {
  field: string
  message: string
  step: WizardStep
}

export function ReviewStep({ data, onEdit, onComplete }: ReviewStepProps) {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [isSaving, setIsSaving] = useState(false)
  
  const handleSave = async () => {
    if (!validateData()) {
      return
    }

    setIsSaving(true)
    try {
      await onComplete?.(data)
    } finally {
      setIsSaving(false)
    }
  }

  const validateData = () => {
    const errors: ValidationError[] = []
    
    if (!data?.name) {
      errors.push({
        field: 'name',
        message: 'Product name is required',
        step: 'basic'
      })
    }
    if (!data?.brand) {
      errors.push({
        field: 'brand',
        message: 'Brand is required',
        step: 'basic'
      })
    }
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  // Render sections from the import review step...
  const renderBasicInfo = () => (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Basic Information</h4>
        <button
          onClick={() => onEdit?.('basic')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-500">Name</label>
          <div className="mt-1 text-gray-900">{data.name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Brand</label>
          <div className="mt-1 text-gray-900">{data.brand}</div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-500">Marketing Description</label>
          <div className="mt-1 whitespace-pre-wrap text-gray-900">{data.description.marketing}</div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-500">Internal Notes</label>
          <div className="mt-1 whitespace-pre-wrap text-gray-900">{data.description.internal}</div>
        </div>
      </div>
    </section>
  )

  const renderCategories = () => (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Product Categories</h4>
        <button
          onClick={() => onEdit?.('category')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        {Object.entries(data.categorization).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <div className="mt-1 text-gray-900">
              {Array.isArray(value) 
                ? value.join(', ') || 'None selected'
                : value || 'None selected'}
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const renderImages = () => (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Images</h4>
        <button
          onClick={() => onEdit?.('images')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.images?.map((image) => (
          <div key={image.id} className="relative">
            <div className="aspect-square relative border rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
              {image.isPrimary && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
            <div className="mt-1 text-sm">
              <div className="flex space-x-2">
                <span className={`${image.visibility?.customer ? 'text-green-600' : 'text-gray-400'}`}>
                  Customer
                </span>
                <span className={`${image.visibility?.team ? 'text-green-600' : 'text-gray-400'}`}>
                  Team
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const renderVisibility = () => (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Visibility Settings</h4>
        <button
          onClick={() => onEdit?.('visibility')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Show to Customers</label>
            <div className="mt-1 text-gray-900">
              {data.visibility.showToCustomer ? 'Yes' : 'No'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Show to Sales Team</label>
            <div className="mt-1 text-gray-900">
              {data.visibility.showToSalesRep ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderValidationErrors = () => (
    validationErrors.length > 0 && (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following issues:</h4>
        <ul className="list-disc list-inside text-sm text-red-700">
          {validationErrors.map((error, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{error.message}</span>
              <button
                onClick={() => onEdit?.(error.step)}
                className="text-blue-600 hover:text-blue-800"
              >
                Fix
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  )

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-gray-900">Review Product Details</h3>
      
      {renderBasicInfo()}
      {renderCategories()}
      {renderImages()}
      {renderVisibility()}
      {renderValidationErrors()}
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Create Product'}
        </button>
      </div>
    </div>
  )
} 
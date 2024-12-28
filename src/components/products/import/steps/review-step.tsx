'use client'

import { prisma } from '@/lib/server/prisma'
import { ImportFormData } from '../types'
import Image from 'next/image'
import { useState } from 'react'

interface ReviewStepProps {
  data: ImportFormData
  onSubmit: (data: ImportFormData) => Promise<void>
  importing?: boolean
  onEdit?: (step: string) => void
  productData: any
}

interface Image {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
  source: 'supplier' | 'custom'
  visibility?: {
    customer: boolean
    team: boolean
  }
}

interface Specification {
  name: string
  value: string
  source: 'supplier' | 'custom'
  visibility?: {
    customer?: boolean
    team?: boolean
  }
}

interface ValidationError {
  field: string
  message: string
  step: string
}

export function ReviewStep({ data, onSubmit, importing, onEdit, productData }: ReviewStepProps) {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  
  const validateBeforeSubmit = () => {
    const errors: ValidationError[] = []
    
    // Basic Information Validation
    if (!data.internalName) {
      errors.push({
        field: 'internalName',
        message: 'Internal name is required',
        step: 'basic'
      })
    }
    if (!data.description.marketing) {
      errors.push({
        field: 'description.marketing',
        message: 'Marketing description is required',
        step: 'basic'
      })
    }
    if (!data.description.internal) {
      errors.push({
        field: 'description.internal',
        message: 'Internal notes are required',
        step: 'basic'
      })
    }
    
    // Category Validation
    if (Object.keys(data.categorization).length === 0) {
      errors.push({
        field: 'categorization',
        message: 'Product must be categorized',
        step: 'category'
      })
    }
    
    // Image Validation
    if (!data.images?.length) {
      errors.push({
        field: 'images',
        message: 'At least one image is required',
        step: 'images'
      })
    } else if (!data.images?.some(img => img.isPrimary)) {
      errors.push({
        field: 'images',
        message: 'A primary image must be selected',
        step: 'images'
      })
    }
    
    setValidationErrors(errors)
    return errors.length === 0
  }
  
  const handleSubmit = async () => {
    if (validateBeforeSubmit()) {
      await onSubmit(data)
    }
  }

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
          <div className="mt-1">{data.name}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Internal Name</label>
          <div className="mt-1">{data.internalName}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Brand</label>
          <div className="mt-1">{data.brand}</div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-500">Marketing Description</label>
          <div className="mt-1 whitespace-pre-wrap">{data.description.marketing}</div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-500">Internal Notes</label>
          <div className="mt-1 whitespace-pre-wrap">{data.description.internal}</div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-500">Supplier Description</label>
          <div className="mt-1 whitespace-pre-wrap text-gray-600">{data.description.supplier}</div>
        </div>
      </div>
    </section>
  )

  const renderCategories = () => (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Product Catalog Classification</h4>
        <button
          onClick={() => onEdit?.('category')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-4">
          How this product is classified in our catalog system
        </p>
        {Object.entries(data.categorization).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="block text-sm font-medium text-gray-500">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="mt-1">
              {Array.isArray(value) 
                ? value.join(', ')
                : value}
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
        {data.images?.map((imageData) => {
          const image: Image = {
            ...imageData,
            source: imageData.source || 'supplier',
            alt: imageData.alt || '',
            visibility: {
              customer: imageData.visibility?.customer ?? true,
              team: imageData.visibility?.team ?? true
            }
          }
          
          return (
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
                <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {image.source}
                </div>
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
          )
        })}
      </div>
    </section>
  )

  const renderSpecifications = () => (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">Product Specifications</h4>
        <button
          onClick={() => onEdit?.('specifications')}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Supplier Specifications */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-sm font-medium text-gray-700">Supplier Specifications</h5>
            <button
              onClick={() => onEdit?.('supplier-specifications')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Edit Visibility
            </button>
          </div>
          {data.specifications
            .filter((spec: Specification) => spec.source === 'supplier')
            .map((spec: Specification, index: number) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  {spec.name}
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <span>{spec.value}</span>
                  <span className={`text-xs ${
                    spec.visibility?.customer ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {spec.visibility?.customer ? '(Visible to Customer)' : '(Internal Only)'}
                  </span>
                </div>
              </div>
            ))}
          {!data.specifications.some(spec => spec.source === 'supplier') && (
            <p className="text-sm text-gray-500">No supplier specifications available</p>
          )}
        </div>

        {/* Custom Specifications */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-sm font-medium text-gray-700">Custom Specifications</h5>
            <button
              onClick={() => onEdit?.('custom-specifications')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
          </div>
          {data.specifications
            .filter(spec => spec.source === 'custom')
            .map((spec, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  {spec.name}
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <span>{spec.value}</span>
                  <span className={`text-xs ${
                    spec.visibility?.customer ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {spec.visibility?.customer ? '(Visible to Customer)' : '(Internal Only)'}
                  </span>
                </div>
              </div>
            ))}
          {!data.specifications.some(spec => spec.source === 'custom') && (
            <p className="text-sm text-gray-500">
              No custom specifications added. Click Edit to add specifications.
            </p>
          )}
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
      <h3 className="text-lg font-medium text-gray-900">Review Import Details</h3>
      
      {renderBasicInfo()}
      {renderCategories()}
      {renderImages()}
      {renderSpecifications()}
      {renderValidationErrors()}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={importing}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {importing ? 'Importing...' : 'Import Product'}
        </button>
      </div>
    </div>
  )
}

// @ts-nocheck
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DynamicImportFormData } from '../types'

interface ImageStepProps {
  data: DynamicImportFormData
  onChange: (data: Partial<DynamicImportFormData>) => void
  supplierImages: DynamicImportFormData['images']
}

export function ImageStep({ data, onChange, supplierImages }: ImageStepProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>(
    data.images?.map(img => img.id) || []
  )
  const [primaryImage, setPrimaryImage] = useState<string | null>(
    data.images?.find(img => img.isPrimary)?.id || null
  )
  const [uploadedImages, setUploadedImages] = useState<DynamicImportFormData['images']>([])

  const handleImageToggle = (imageId: string) => {
    const newSelected = selectedImages.includes(imageId)
      ? selectedImages.filter(id => id !== imageId)
      : [...selectedImages, imageId]
    
    setSelectedImages(newSelected)
    
    const newImages = (data.images || []).map(img => ({
      ...img,
      selected: newSelected.includes(img.id)
    }))
    
    onChange({ images: newImages })
  }

  const handlePrimarySelect = (imageId: string) => {
    setPrimaryImage(imageId)
    
    const newImages = [...(data.images || [])].map(img => ({
      ...img,
      isPrimary: img.id === imageId
    }))
    
    onChange({ images: newImages })
  }

  const handleVisibilityChange = (imageId: string, type: 'customer' | 'team', value: boolean) => {
    const newImages = (data.images || []).map(img => {
      if (img.id === imageId) {
        return {
          ...img,
          visibility: {
            ...(img.visibility || { customer: true, team: true }),
            [type]: value
          }
        }
      }
      return img
    })
    
    onChange({ images: newImages })
  }

  const handleImageUpload = async (file: File) => {
    console.log('handleImageUpload called with file:', file)
    const newImage = {
      id: `new-${Date.now()}`,
      url: URL.createObjectURL(file),
      alt: file.name,
      source: 'custom' as const,
      visibility: { customer: true, team: true }
    }
    
    const newImages = [...(data.images || []), newImage]
    onChange({ images: newImages })
    setSelectedImages(prev => [...prev, newImage.id])
  }

  const handleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
        <p className="mt-1 text-sm text-gray-500">
          Select images to include and designate a primary image for the product.
        </p>
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          <p>• Click the large checkmark to select/deselect an image</p>
          <p>• Click the star icon to set as primary image</p>
          <p>• Use checkboxes to control visibility for customers and team</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="mt-2 text-sm text-gray-600">Add New Image</span>
        </label>
      </div>

      {/* Debug logging */}
      {/* {console.log('Rendering images:', data.images)} */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(data.images || []).map((image) => (
          <div key={image.id} className="relative group">
            <div className={`
              aspect-square relative border-2 rounded-lg overflow-hidden
              ${selectedImages.includes(image.id) ? 'border-blue-500' : 'border-gray-200'}
              ${primaryImage === image.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
            `}>
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </div>

            <div className="absolute top-2 right-2 flex space-x-2 bg-white rounded-md shadow-sm p-1">
              <button
                type="button"
                onClick={() => handleImageToggle(image.id)}
                className={`p-1 rounded-md ${
                  selectedImages.includes(image.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
                title="Select/deselect image"
              >
                <span className="sr-only">
                  {selectedImages.includes(image.id) ? 'Deselect' : 'Select'} image
                </span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={selectedImages.includes(image.id) ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}
                  />
                </svg>
              </button>

              {selectedImages.includes(image.id) && (
                <>
                <button
                  type="button"
                  onClick={() => handlePrimarySelect(image.id)}
                  className={`p-1 rounded-md ${
                    primaryImage === image.id
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-100'
                  }`}
                  title="Set as primary image"
                >
                  <span className="sr-only">Set as primary image</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
                <div className="flex flex-col space-y-1 ml-2">
                  <label className="flex items-center" title="Toggle customer visibility">
                    <input
                      type="checkbox"
                      checked={image.visibility?.customer}
                      onChange={(e) => handleVisibilityChange(image.id, 'customer', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-xs text-gray-600">Customer</span>
                  </label>
                  <label className="flex items-center" title="Toggle team visibility">
                    <input
                      type="checkbox"
                      checked={image.visibility?.team}
                      onChange={(e) => handleVisibilityChange(image.id, 'team', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-xs text-gray-600">Team</span>
                  </label>
                </div>
                </>
              )}
            </div>
            {image.source === 'supplier' && (
              <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Supplier Image
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 
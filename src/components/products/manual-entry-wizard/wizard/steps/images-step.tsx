'use client'

import { ImportFormData } from '../types'

interface ImagesStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

export function ImagesStep({ data, onChange }: ImagesStepProps) {
  const handleImagesChange = (images: ImportFormData['images']) => {
    onChange({
      ...data,
      images
    })
  }

  const handlePrimaryChange = (index: number) => {
    const newImages = data.images.map((img, i) => ({
      ...img,
      primary: i === index
    }))
    onChange({
      ...data,
      images: newImages
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Images</h3>
        <p className="text-sm text-gray-500 mb-4">
          Select and arrange product images. The first image will be used as the primary image.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Supplier Images</h4>
          <div className="space-y-4">
            {data.images
              .filter(img => img.source === 'supplier')
              .map((image, index) => (
                <div key={image.url} className="flex items-center gap-4">
                  <img
                    src={image.url}
                    alt=""
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="primary"
                        checked={image.primary}
                        onChange={() => handlePrimaryChange(index)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Primary Image</span>
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      const newImages = data.images.filter(img => img !== image)
                      handleImagesChange(newImages)
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Custom Images</h4>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                // TODO: Implement image upload
                console.log('Upload images:', e.target.files)
              }}
              className="hidden"
              id="custom-images"
            />
            <label
              htmlFor="custom-images"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="mt-2 text-sm text-gray-600">
                Add custom images
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
} 
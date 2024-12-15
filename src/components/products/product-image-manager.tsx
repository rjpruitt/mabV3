'use client'

import React, { useState } from 'react'
import { ProductImage } from '@/types/products'
import { ProductImageErrorBoundary } from '@/components/ui/product-image-error-boundary'
import { ImportProductImage } from '@/components/ui/import-product-image'
import { EditIcon, TrashIcon } from 'lucide-react'

interface ProductImageManagerProps {
  images: ProductImage[]
  onImagesChange: (images: ProductImage[]) => void
}

export function ProductImageManager({ images, onImagesChange }: ProductImageManagerProps) {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null)

  const handleImageUpload = async (files: FileList) => {
    // TODO: Implement image upload to your storage
  }

  const handleReorder = (dragIndex: number, dropIndex: number) => {
    const newImages = [...images]
    const [draggedImage] = newImages.splice(dragIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)
    onImagesChange(newImages.map((img, i) => ({ ...img, order: i })))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Product Images</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        <label 
          htmlFor="image-upload"
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Add Images
        </label>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={image.url} 
            className="relative group"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('index', index.toString())}
            onDrop={(e) => handleReorder(parseInt(e.dataTransfer.getData('index')), index)}
          >
            <ProductImageErrorBoundary>
              <ImportProductImage
                thumbnails={[image.url]}
                alt={`Product Image ${index + 1}`}
                className="w-full aspect-square object-cover rounded"
              />
            </ProductImageErrorBoundary>
            
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button 
                onClick={() => setSelectedImage(image)}
                className="p-2 bg-white rounded-full"
              >
                <EditIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onImagesChange(images.filter(img => img !== image))}
                className="p-2 bg-white rounded-full"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
import { useState } from 'react'
import Image from 'next/image'
import { PLACEHOLDER_IMAGE } from '@/app/test/products/import/constants'

interface ProductImageProps {
  thumbnails?: string[]
  alt: string
  className?: string
}

export function ProductImage({ thumbnails, alt, className }: ProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState(false)

  const handleImageError = () => {
    // Try next thumbnail if available
    if (thumbnails && currentImageIndex < thumbnails.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setError(true)
    }
  }

  const imageUrl = error ? PLACEHOLDER_IMAGE : thumbnails?.[currentImageIndex]

  return (
    <div className={`relative aspect-square bg-gray-50 ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        className="object-contain w-full h-full rounded"
        onError={handleImageError}
      />
    </div>
  )
} 
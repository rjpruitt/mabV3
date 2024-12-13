import { useState } from 'react'
import { CachedImage } from './cached-image'
import { PLACEHOLDER_IMAGE } from '@/app/test/products/import/constants'

interface ImportProductImageProps {
  thumbnails?: string[]
  alt: string
  className?: string
}

export function ImportProductImage({ thumbnails, alt, className }: ImportProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState(false)

  const handleImageError = () => {
    if (thumbnails && currentImageIndex < thumbnails.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setError(true)
    }
  }

  const imageUrl = error ? PLACEHOLDER_IMAGE : thumbnails?.[currentImageIndex]

  return (
    <div className={`relative aspect-square bg-gray-50 ${className}`}>
      <CachedImage
        src={imageUrl}
        alt={alt}
        className="object-contain rounded"
        onError={handleImageError}
      />
    </div>
  )
} 
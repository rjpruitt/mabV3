'use client'

import { useState, useEffect } from 'react'
import { imageCache } from '@/lib/services/cache-service'

interface Props {
  src: string | undefined
  alt: string
  className?: string
  onError?: () => void
}

export function CachedImage({ src, alt, className, onError }: Props): JSX.Element {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      return
    }

    const cachedSrc = imageCache.get(src)
    if (cachedSrc) {
      setImageSrc(cachedSrc)
      setIsLoading(false)
    } else {
      // Preload image
      const img = new Image()
      img.src = src || ''
      img.onload = () => {
        imageCache.set(src, src)
        setImageSrc(src)
        setIsLoading(false)
      }
      img.onerror = () => {
        setIsLoading(false)
        onError?.()
      }
    }
  }, [src, onError])

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        src={imageSrc || ''}
        alt={alt}
        className={`w-full h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={onError}
      />
    </div>
  )
} 
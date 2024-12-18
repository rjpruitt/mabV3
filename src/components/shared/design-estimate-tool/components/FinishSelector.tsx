'use client'

import React from 'react'
import { ProductVariant } from '../types'

interface FinishSelectorProps {
  variants: ProductVariant[]
  currentVariantId: string
  onVariantSelect: (variant: ProductVariant) => void
  size?: 'sm' | 'lg'
}

export function FinishSelector({ 
  variants, 
  currentVariantId, 
  onVariantSelect,
  size = 'sm'
}: FinishSelectorProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div>
      <label className="text-sm text-gray-600 block mb-2">Select Finish</label>
      <div className="flex gap-2">
        {variants.map(variant => (
          <button
            key={variant.id}
            onClick={() => onVariantSelect(variant)}
            className={`${sizeClasses[size]} rounded-full border-2 relative ${
              currentVariantId === variant.id 
                ? 'border-teal-500' 
                : 'border-gray-200 hover:border-teal-300'
            }`}
            title={variant.finish}
          >
            <img
              src={variant.finishImage}
              alt={variant.finish}
              className="w-full h-full rounded-full object-cover"
            />
            <span className="sr-only">{variant.finish}</span>
            {currentVariantId === variant.id && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 
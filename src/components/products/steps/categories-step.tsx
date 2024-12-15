'use client'

import { ImportFormData } from '../types'
import { useState, useEffect } from 'react'

const STYLE_OPTIONS = [
  'modern',
  'traditional',
  'transitional',
  'contemporary',
  'industrial',
  'farmhouse'
] as const

const TYPE_OPTIONS = [
  'faucets',
  'showers',
  'bathtubs',
  'toilets',
  'vanities',
  'lighting',
  'accessories',
  'hardware'
] as const

interface CategoriesStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

export function CategoriesStep({ data, onChange }: CategoriesStepProps) {
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (data.categories.type.length === 0) {
      setError('At least one product type is required')
    } else {
      setError(undefined)
    }
  }, [data.categories.type])

  const handleStyleChange = (style: string) => {
    const newStyles = data.categories.style.includes(style)
      ? data.categories.style.filter((s: string) => s !== style)
      : [...data.categories.style, style]

    onChange({
      ...data,
      categories: {
        ...data.categories,
        style: newStyles
      }
    })
  }

  const handleTypeChange = (type: string) => {
    const newTypes = data.categories.type.includes(type)
      ? data.categories.type.filter((t: string) => t !== type)
      : [...data.categories.type, type]

    onChange({
      ...data,
      categories: {
        ...data.categories,
        type: newTypes
      }
    })
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Style Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          {STYLE_OPTIONS.map(style => (
            <label key={style} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={data.categories.style.includes(style)}
                onChange={() => handleStyleChange(style)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-gray-700 capitalize">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Type</h3>
        <div className="grid grid-cols-2 gap-4">
          {TYPE_OPTIONS.map(type => (
            <label key={type} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={data.categories.type.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
} 
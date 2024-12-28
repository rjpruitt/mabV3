'use client'

import { useState } from 'react'
import { ImportFormData } from '../types'
import { ComponentType, ProductFormat } from '@/lib/types/product-types'

interface CategoriesStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

const TOP_LEVEL_CATEGORIES = [
  'BATHTUBS',
  'SHOWERS',
  'ACCESSIBILITY_SAFETY',
  'WALLS_WAINSCOTTING',
  'ACCESSORIES'
] as const

const PRICE_LEVELS = [
  { id: 'SMART_SOLUTIONS', label: 'Smart Solutions ($)', description: 'Value-focused options' },
  { id: 'PREMIUM_UPGRADES', label: 'Premium Upgrades ($$)', description: 'Enhanced features and quality' },
  { id: 'LUXURY', label: 'Luxury ($$$)', description: 'High-end premium products' }
] as const

const COMPONENT_TYPES: ComponentType[] = [
  'BASE',
  'WALL_PANEL',
  'WALL_SET',
  'WALL_ACCENTS',
  'DOOR',
  'CURTAIN_ROD',
  'FIXTURES',
  'ACCESSORIES'
]

export function CategoriesStep({ data, onChange }: CategoriesStepProps) {
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat>(
    data.designTool?.classification?.format || 'INDIVIDUAL_COMPONENT'
  )

  const handleFormatChange = (format: ProductFormat) => {
    setSelectedFormat(format)
    // Clear component-related fields when switching formats
    const updatedDesignTool = {
      ...data.designTool,
      classification: {
        ...data.designTool.classification,
        format,
        componentType: format === 'INDIVIDUAL_COMPONENT' ? data.designTool.classification.componentType : undefined,
        includedComponents: format === 'KIT' ? data.designTool.classification.includedComponents || [] : undefined
      }
    }
    onChange({ ...data, designTool: updatedDesignTool })
  }

  const handleComponentTypeChange = (type: ComponentType) => {
    const updatedDesignTool = {
      ...data.designTool,
      classification: {
        ...data.designTool.classification,
        componentType: type
      }
    }
    onChange({
      ...data,
      designTool: updatedDesignTool,
      categories: {
        ...data.categories,
        type: [type]
      }
    })
  }

  const handleIncludedComponentToggle = (type: ComponentType) => {
    const currentComponents = data.designTool.classification.includedComponents || []
    const updatedComponents = currentComponents.includes(type)
      ? currentComponents.filter(t => t !== type)
      : [...currentComponents, type]

    const updatedDesignTool = {
      ...data.designTool,
      classification: {
        ...data.designTool.classification,
        includedComponents: updatedComponents
      }
    }
    onChange({ ...data, designTool: updatedDesignTool })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Categories</h3>
        
        {/* Top Level Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={data.designTool.classification.topCategory}
            onChange={(e) => {
              const updatedDesignTool = {
                ...data.designTool,
                classification: {
                  ...data.designTool.classification,
                  topCategory: e.target.value as 'SHOWERS'
                }
              }
              onChange({ ...data, designTool: updatedDesignTool })
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {TOP_LEVEL_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Price Level */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Level
          </label>
          <div className="space-y-2">
            {PRICE_LEVELS.map(level => (
              <label key={level.id} className="flex items-center">
                <input
                  type="radio"
                  name="priceLevel"
                  value={level.id}
                  checked={data.priceLevel === level.id}
                  onChange={(e) => onChange({ ...data, priceLevel: e.target.value as 'SMART_SOLUTIONS' | 'PREMIUM_UPGRADES' | 'LUXURY' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">
                  <span className="text-sm font-medium text-gray-900">{level.label}</span>
                  <span className="text-sm text-gray-500 ml-2">- {level.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Format */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Format
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => handleFormatChange(e.target.value as ProductFormat)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="INDIVIDUAL_COMPONENT">Individual Component</option>
            <option value="KIT">Kit/Package</option>
          </select>
        </div>

        {/* Component Type or Kit Components */}
        {selectedFormat === 'INDIVIDUAL_COMPONENT' ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Component Type
            </label>
            <select
              value={data.designTool.classification.componentType || ''}
              onChange={(e) => handleComponentTypeChange(e.target.value as ComponentType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a component type</option>
              {COMPONENT_TYPES.map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Included Components
            </label>
            <div className="space-y-2">
              {COMPONENT_TYPES.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.designTool.classification.includedComponents?.includes(type) || false}
                    onChange={() => handleIncludedComponentToggle(type)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {type.replace('_', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
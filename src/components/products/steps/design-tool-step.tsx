'use client'

import { DESIGN_TOOL_CATEGORIES } from '@/lib/types/product-categories'
import { ImportFormData } from '../types'
import { DesignToolProductData } from '@/lib/types/product-types'

interface DesignToolStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

export function DesignToolStep({ data, onChange }: DesignToolStepProps) {
  const updateDesignTool = (updates: Partial<DesignToolProductData>) => {
    const currentDesignTool = data.designTool || {
      category: undefined,
      subcategory: undefined,
      dimensions: {
        width: 0,
        height: 0
      },
      installation: {
        type: '',
        requirements: [],
        difficulty: 'moderate' as const
      },
      compatibility: {
        requiredProducts: [],
        incompatibleWith: []
      }
    }

    const dimensions = updates.dimensions 
      ? {
          width: updates.dimensions.width ?? currentDesignTool.dimensions.width,
          height: updates.dimensions.height ?? currentDesignTool.dimensions.height,
          depth: updates.dimensions.depth,
          squareFeet: updates.dimensions.squareFeet
        }
      : currentDesignTool.dimensions

    const installation = updates.installation
      ? {
          type: updates.installation.type ?? currentDesignTool.installation.type,
          requirements: updates.installation.requirements ?? currentDesignTool.installation.requirements,
          difficulty: updates.installation.difficulty ?? currentDesignTool.installation.difficulty
        }
      : currentDesignTool.installation

    onChange({
      ...data,
      designTool: {
        ...currentDesignTool,
        ...updates,
        dimensions,
        installation
      }
    })
  }

  const selectedCategory = data.designTool?.category

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Design Tool Settings</h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure how this product appears in the shower design tool
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => updateDesignTool({ 
            category: e.target.value as keyof typeof DESIGN_TOOL_CATEGORIES,
            subcategory: undefined // Reset subcategory when category changes
          })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select a category</option>
          {Object.entries(DESIGN_TOOL_CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>{value.id}</option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory
          </label>
          <select
            value={data.designTool?.subcategory || ''}
            onChange={(e) => updateDesignTool({ subcategory: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a subcategory</option>
            {Object.entries(DESIGN_TOOL_CATEGORIES[selectedCategory].subcategories).map(([key, value]) => (
              <option key={key} value={value}>{key.toLowerCase().replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-700 mb-2">Dimensions</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Width (inches)</label>
            <input
              type="number"
              value={data.designTool?.dimensions?.width || ''}
              onChange={(e) => updateDesignTool({
                dimensions: {
                  ...data.designTool?.dimensions,
                  width: parseFloat(e.target.value) || 0,
                  height: data.designTool?.dimensions?.height ?? 0
                }
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Height (inches)</label>
            <input
              type="number"
              value={data.designTool?.dimensions?.height || ''}
              onChange={(e) => updateDesignTool({
                dimensions: {
                  ...data.designTool?.dimensions,
                  width: data.designTool?.dimensions?.width ?? 0,
                  height: parseFloat(e.target.value) || 0
                }
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Depth (inches)</label>
            <input
              type="number"
              value={data.designTool?.dimensions?.depth || ''}
              onChange={(e) => updateDesignTool({
                dimensions: {
                  ...data.designTool?.dimensions,
                  width: data.designTool?.dimensions?.width ?? 0,
                  height: data.designTool?.dimensions?.height ?? 0,
                  depth: parseFloat(e.target.value) || undefined
                }
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-700 mb-2">Installation</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Type</label>
            <input
              type="text"
              value={data.designTool?.installation?.type || ''}
              onChange={(e) => updateDesignTool({
                installation: {
                  ...data.designTool?.installation,
                  type: e.target.value,
                  requirements: data.designTool?.installation?.requirements ?? [],
                  difficulty: data.designTool?.installation?.difficulty ?? 'moderate'
                }
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Requirements</label>
            <textarea
              value={data.designTool?.installation?.requirements?.join('\n') || ''}
              onChange={(e) => updateDesignTool({
                installation: {
                  ...data.designTool?.installation,
                  type: data.designTool?.installation?.type ?? '',
                  requirements: e.target.value.split('\n').filter(Boolean),
                  difficulty: data.designTool?.installation?.difficulty ?? 'moderate'
                }
              })}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter each requirement on a new line"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 
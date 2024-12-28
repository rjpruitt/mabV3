'use client'

import { useState } from 'react'
import { ImportFormData } from '../types'
import { ComponentType, ShowerShape, ShowerType, SubType, WallPanelType } from '@/lib/types/product-types'

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

interface DesignToolStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

export function DesignToolStep({ data, onChange }: DesignToolStepProps) {
  const [selectedComponentType, setSelectedComponentType] = useState<ComponentType>(
    data.designTool?.classification?.componentType || 'BASE'
  )

  const handleComponentTypeChange = (type: ComponentType) => {
    setSelectedComponentType(type)
    updateDesignToolData({
      classification: {
        ...data.designTool?.classification,
        componentType: type,
        // Reset subType when component type changes
        subType: undefined
      }
    })
  }

  const updateDesignToolData = (updates: Partial<typeof data.designTool>) => {
    onChange({
      ...data,
      designTool: {
        ...data.designTool,
        ...updates
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Design Tool Configuration</h3>
        
        {/* Component Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Component Type
          </label>
          <select
            value={selectedComponentType}
            onChange={(e) => handleComponentTypeChange(e.target.value as ComponentType)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select a component type</option>
            {COMPONENT_TYPES.map((type: ComponentType) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Wall Configuration */}
        {(selectedComponentType === 'WALL_PANEL' || selectedComponentType === 'WALL_SET') && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Configuration
            </label>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.designTool?.classification?.wallConfig?.isCompleteSet || false}
                    onChange={(e) => {
                      const isCompleteSet = e.target.checked
                      updateDesignToolData({
                        classification: {
                          ...data.designTool?.classification,
                          wallConfig: {
                            isCompleteSet,
                            includedPanels: isCompleteSet ? ['BACK', 'LEFT', 'RIGHT'] : undefined,
                            panelType: isCompleteSet ? undefined : data.designTool?.classification?.wallConfig?.panelType
                          }
                        }
                      })
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Complete Set</span>
                </label>
              </div>
              
              {!data.designTool?.classification?.wallConfig?.isCompleteSet && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Panel Type</label>
                  <select
                    value={data.designTool?.classification?.wallConfig?.panelType || ''}
                    onChange={(e) => {
                      updateDesignToolData({
                        classification: {
                          ...data.designTool?.classification,
                          wallConfig: {
                            isCompleteSet: false,
                            panelType: e.target.value as 'BACK' | 'LEFT' | 'RIGHT'
                          }
                        }
                      })
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select panel type</option>
                    <option value="BACK">Back Panel</option>
                    <option value="LEFT">Left Panel</option>
                    <option value="RIGHT">Right Panel</option>
                  </select>
                </div>
              )}
              
              {data.designTool?.classification?.wallConfig?.isCompleteSet && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Included Panels</label>
                  <div className="text-sm text-gray-600">
                    {data.designTool.classification.wallConfig.includedPanels?.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shower Types Compatibility */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compatible Shower Types
          </label>
          <div className="space-y-2">
            {(['WALK_IN', 'TUB_SHOWER_COMBO'] as ShowerType[]).map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.designTool?.compatibility?.showerTypes?.includes(type)}
                  onChange={(e) => {
                    const currentTypes = data.designTool?.compatibility?.showerTypes || []
                    const newTypes = e.target.checked
                      ? [...currentTypes, type]
                      : currentTypes.filter((t: ShowerType) => t !== type)
                    updateDesignToolData({
                      compatibility: {
                        ...data.designTool?.compatibility,
                        showerTypes: newTypes
                      }
                    })
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {type === 'WALK_IN' ? 'Walk-In Shower' : 'Tub/Shower Combo'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditional Fields Based on Component Type */}
        {selectedComponentType === 'BASE' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compatible Shower Shapes
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Alcove Shapes */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Alcove</h5>
                {['SQUARE', 'RECTANGULAR'].map((style) => (
                  <label key={`ALCOVE-${style}`} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.designTool?.compatibility?.showerShapes?.some(
                        shape => shape.type === 'ALCOVE' && shape.style === style
                      )}
                      onChange={(e) => {
                        const currentShapes = data.designTool?.compatibility?.showerShapes || []
                        const newShapes = e.target.checked
                          ? [...currentShapes, { type: 'ALCOVE', style } as ShowerShape]
                          : currentShapes.filter(s => !(s.type === 'ALCOVE' && s.style === style))
                        updateDesignToolData({
                          compatibility: {
                            ...data.designTool?.compatibility,
                            showerShapes: newShapes
                          }
                        })
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {style.charAt(0) + style.slice(1).toLowerCase()}
                    </span>
                  </label>
                ))}
              </div>

              {/* Corner Shapes */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Corner</h5>
                {['SQUARE', 'RECTANGULAR', 'NEO_ANGLE', 'ROUND'].map((style) => (
                  <label key={`CORNER-${style}`} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.designTool?.compatibility?.showerShapes?.some(
                        shape => shape.type === 'CORNER' && shape.style === style
                      )}
                      onChange={(e) => {
                        const currentShapes = data.designTool?.compatibility?.showerShapes || []
                        const newShapes = e.target.checked
                          ? [...currentShapes, { type: 'CORNER', style } as ShowerShape]
                          : currentShapes.filter(s => !(s.type === 'CORNER' && s.style === style))
                        updateDesignToolData({
                          compatibility: {
                            ...data.designTool?.compatibility,
                            showerShapes: newShapes
                          }
                        })
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {style.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Complete Dimensions Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min Width (inches)</label>
              <input
                type="number"
                value={data.designTool?.compatibility?.dimensions?.minWidth || ''}
                onChange={(e) => updateDesignToolData({
                  compatibility: {
                    ...data.designTool?.compatibility,
                    dimensions: {
                      ...data.designTool?.compatibility?.dimensions,
                      minWidth: Number(e.target.value)
                    }
                  }
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Max Width (inches)</label>
              <input
                type="number"
                value={data.designTool?.compatibility?.dimensions?.maxWidth || ''}
                onChange={(e) => updateDesignToolData({
                  compatibility: {
                    ...data.designTool?.compatibility,
                    dimensions: {
                      ...data.designTool?.compatibility?.dimensions,
                      maxWidth: Number(e.target.value)
                    }
                  }
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min Depth (inches)</label>
              <input
                type="number"
                value={data.designTool?.compatibility?.dimensions?.minDepth || ''}
                onChange={(e) => updateDesignToolData({
                  compatibility: {
                    ...data.designTool?.compatibility,
                    dimensions: {
                      ...data.designTool?.compatibility?.dimensions,
                      minDepth: Number(e.target.value)
                    }
                  }
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Max Depth (inches)</label>
              <input
                type="number"
                value={data.designTool?.compatibility?.dimensions?.maxDepth || ''}
                onChange={(e) => updateDesignToolData({
                  compatibility: {
                    ...data.designTool?.compatibility,
                    dimensions: {
                      ...data.designTool?.compatibility?.dimensions,
                      maxDepth: Number(e.target.value)
                    }
                  }
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Height (inches)</label>
              <input
                type="number"
                value={data.designTool?.compatibility?.dimensions?.height || ''}
                onChange={(e) => updateDesignToolData({
                  compatibility: {
                    ...data.designTool?.compatibility,
                    dimensions: {
                      ...data.designTool?.compatibility?.dimensions,
                      height: Number(e.target.value)
                    }
                  }
                })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Installation Requirements */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Installation Difficulty
          </label>
          <select
            value={data.designTool?.installation?.difficulty}
            onChange={(e) => updateDesignToolData({
              installation: {
                ...data.designTool?.installation,
                difficulty: e.target.value as 'easy' | 'moderate' | 'complex'
              }
            })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="complex">Complex</option>
          </select>
        </div>
      </div>
    </div>
  )
} 
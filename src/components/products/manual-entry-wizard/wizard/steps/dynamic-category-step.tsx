'use client'

import { useState } from 'react'
import { CategoryStep, CategoryOption } from '../../types'

interface DynamicCategoryStepProps {
  steps: CategoryStep[]
  onChange: (selections: Record<string, string | string[]>) => void
  initialSelections?: Record<string, string | string[]>
}

export function DynamicCategoryStep({ steps, onChange, initialSelections = {} }: DynamicCategoryStepProps) {
  const [selections, setSelections] = useState<Record<string, string | string[]>>({})
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  // Get available steps based on dependencies
  const getAvailableSteps = () => {
    return steps.filter(step => {
      if (!step.dependsOn) return true

      const dependentStep = step.dependsOn.step
      const stepKey = dependentStep
      const dependentValue = selections[stepKey]
      const allowedValues = step.dependsOn.values

      if (!dependentValue) return false
      if (allowedValues[0] === '*') return true
      
      const meetsConditions = !step.dependsOn.conditions || step.dependsOn.conditions(selections)
      return allowedValues.includes(Array.isArray(dependentValue) ? dependentValue[0] : dependentValue) && meetsConditions
    })
  }

  const handleOptionHover = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: CategoryOption,
    description?: string
  ) => {
    if (description) {
      const rect = event.currentTarget.getBoundingClientRect()
      const containerRect = event.currentTarget.closest('.relative')?.getBoundingClientRect() || rect
      
      setTooltipPosition({
        x: rect.left - containerRect.left + (rect.width / 2),
        y: rect.top - containerRect.top + rect.height + 8
      })
      setHoveredOption(typeof option === 'string' ? option : option.id)
    }
  }

  const handleOptionLeave = () => {
    setHoveredOption(null)
  }

  const handleOptionClick = (step: CategoryStep, option: CategoryOption) => {
    const newSelections = { ...selections }
    const optionValue = typeof option === 'string' ? option : option.id

    // Clear child selections when parent changes
    const clearChildSelections = (parentStep: string, parentValue: string) => {
      steps.forEach(step => {
        if (step.dependsOn) {
          const dependentStep = step.dependsOn.step
          
          if (dependentStep === parentStep && !step.dependsOn.values.includes(parentValue)) {
            delete newSelections[step.id]
          }
        }
      })
    }

    if (step.multiSelect || step.type === 'multiple') {
      const currentValues = (newSelections[step.id] as string[]) || []
      if (currentValues.includes(optionValue)) {
        newSelections[step.id] = currentValues.filter(v => v !== optionValue)
      } else {
        newSelections[step.id] = [...currentValues, optionValue]
      }
    } else {
      newSelections[step.id] = optionValue
      clearChildSelections(step.id, optionValue)
    }

    setSelections(newSelections)
    onChange(newSelections)
  }

  const handleSelect = (stepId: string, value: string | string[]) => {
    console.log('Step selection:', { stepId, value })
    
    const newSelections = {
      ...selections,
      [stepId]: value
    }
    
    // Special handling for kit includes
    if (stepId === 'kit_includes') {
      console.log('Kit includes selected:', value)
    }
    
    setSelections(newSelections)
    onChange(newSelections)
  }

  const renderOption = (step: CategoryStep, option: CategoryOption) => {
    const optionId = typeof option === 'string' ? option : option.id
    const optionLabel = typeof option === 'string' ? option : option.label
    const isSelected = step.multiSelect || step.type === 'multiple'
      ? (selections[step.id] as string[] || []).includes(optionId)
      : selections[step.id] === optionId

    return (
      <button
        key={optionId}
        type="button"
        className={`px-4 py-2 rounded-md ${
          isSelected 
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-900 hover:bg-gray-50'
        }`}
        onClick={() => handleOptionClick(step, option)}
        onMouseEnter={(e) => handleOptionHover(e, option, step.description)}
        onMouseLeave={handleOptionLeave}
      >
        {optionLabel.replace(/_/g, ' ')}
      </button>
    )
  }

  return (
    <div className="space-y-8 relative">
      {getAvailableSteps().map(step => (
        <div key={step.id} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {step.title || step.label}
            </h3>
            {step.description && (
              <p className="text-sm text-gray-500">{step.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {(typeof step.options === 'function' 
              ? step.options(selections) 
              : step.options
            ).map(option => renderOption(step, option))}
          </div>
        </div>
      ))}

      {hoveredOption && (
        <div
          className="absolute z-10 bg-white p-2 rounded shadow-lg text-sm"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {hoveredOption}
        </div>
      )}
    </div>
  )
} 
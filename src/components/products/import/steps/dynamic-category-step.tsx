'use client'

import { useState } from 'react'
import { CategoryStep } from '../types'

interface DynamicCategoryStepProps {
  steps: CategoryStep[]
  onChange: (selections: Record<string, string | string[]>) => void
  initialSelections?: Record<string, string | string[]>
}

export function DynamicCategoryStep({ steps, onChange, initialSelections = {} }: DynamicCategoryStepProps) {
  const [selections, setSelections] = useState<Record<string, string | string[]>>(initialSelections)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  // Get available steps based on dependencies
  const getAvailableSteps = () => {
    return steps.filter(step => {
      if (!step.dependsOn) return true

      const dependentStep = step.dependsOn.step
      const dependentValue = selections[typeof dependentStep === 'function' ? dependentStep(selections) : dependentStep]
      const allowedValues = step.dependsOn.values

      if (!dependentValue) return false
      if (allowedValues[0] === '*') return true
      
      const meetsConditions = !step.dependsOn.conditions || step.dependsOn.conditions(selections)
      return allowedValues.includes(Array.isArray(dependentValue) ? dependentValue[0] : dependentValue) && meetsConditions
    })
  }

  const handleOptionHover = (
    event: React.MouseEvent<HTMLButtonElement>,
    option: string,
    description?: string
  ) => {
    if (description) {
      const rect = event.currentTarget.getBoundingClientRect()
      const containerRect = event.currentTarget.closest('.relative')?.getBoundingClientRect() || rect
      
      // Calculate if tooltip would go below viewport
      const tooltipHeight = 80 // Approximate height of tooltip
      const relativeTop = rect.top - containerRect.top
      const relativeLeft = rect.left - containerRect.left
      
      setTooltipPosition({
        x: relativeLeft + (rect.width / 2),
        y: relativeTop + rect.height + 8
      })
      setHoveredOption(option)
    }
  }

  const handleOptionLeave = () => {
    setHoveredOption(null)
  }

  const handleOptionClick = (step: CategoryStep, option: string) => {
    const newSelections = { ...selections }

    // Clear child selections when parent changes
    const clearChildSelections = (parentStep: string, parentValue: string) => {
      steps.forEach(step => {
        if (step.dependsOn) {
          const dependentStep = typeof step.dependsOn.step === 'function' 
            ? step.dependsOn.step(newSelections)
            : step.dependsOn.step
          
          if (dependentStep === parentStep && !step.dependsOn.values.includes(parentValue)) {
            delete newSelections[step.id]
          }
        }
      })
    }

    if (step.multiSelect) {
      const currentValues = (newSelections[step.id] as string[]) || []
      if (currentValues.includes(option)) {
        newSelections[step.id] = currentValues.filter(v => v !== option)
      } else {
        newSelections[step.id] = [...currentValues, option]
      }
    } else {
      newSelections[step.id] = option
      clearChildSelections(step.id, option)
    }

    setSelections(newSelections)
    onChange(newSelections)
  }

  return (
    <div className="space-y-8 relative">
      {getAvailableSteps().map((step) => (
        <div key={step.id} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {step.label}
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {(typeof step.options === 'function' ? step.options(selections) : step.options).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOptionClick(step, option)}
                onMouseEnter={(e) => handleOptionHover(e, option, step.descriptions?.[option])}
                onMouseLeave={handleOptionLeave}
                className={`px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  step.multiSelect
                    ? (selections[step.id] as string[])?.includes(option)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                    : selections[step.id] === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Tooltip */}
      {hoveredOption && (
        <div
          className="absolute z-10 px-4 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(-50%)',
            maxWidth: '300px',
            wordWrap: 'break-word',
            pointerEvents: 'none'
          }}
        >
          {steps.find(step => step.descriptions?.[hoveredOption])?.descriptions?.[hoveredOption]}
        </div>
      )}
    </div>
  )
} 
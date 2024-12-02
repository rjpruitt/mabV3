'use client'

import React, { useState, useEffect } from 'react'
import { AccessibilityStep } from '../types'
import { CheckCircle } from 'lucide-react'

interface MultiSelectValue {
  selections: string[]
  otherText?: string
  isValid: boolean
}

interface MultiSelectProps {
  value?: MultiSelectValue
  onChange: (value: MultiSelectValue) => void
  step: AccessibilityStep
}

export function MultiSelect({ value = { selections: [], isValid: false }, onChange, step }: MultiSelectProps) {
  const [selections, setSelections] = useState<string[]>(value?.selections || [])
  const [otherText, setOtherText] = useState(value?.otherText || '')

  const isValid = selections.length > 0 || (selections.includes('other') && otherText.trim().length > 0)

  useEffect(() => {
    if (step.required) {
      onChange({ 
        selections, 
        otherText,
        isValid: false
      })
    }
  }, [])

  const toggleSelection = (optionId: string) => {
    let newSelections: string[]
    if (selections.includes(optionId)) {
      newSelections = selections.filter(id => id !== optionId)
    } else {
      newSelections = [...selections, optionId]
    }
    setSelections(newSelections)
    onChange({ 
      selections: newSelections, 
      otherText,
      isValid: newSelections.length > 0 || (newSelections.includes('other') && otherText.trim().length > 0)
    })
  }

  const handleOtherText = (text: string) => {
    setOtherText(text)
    onChange({ 
      selections, 
      otherText: text,
      isValid: selections.length > 0 || (selections.includes('other') && text.trim().length > 0)
    })
  }

  return (
    <div className="space-y-4">
      {step.required && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {step.options?.length === 1 
              ? "Please make a selection to continue"
              : "Please select at least one option to continue"
            }
          </span>
          <span className="text-red-500">*</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {step.options?.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleSelection(option.id)}
            className={`
              p-4 border rounded-sm text-left flex items-start gap-3 transition-all
              ${selections.includes(option.id)
                ? 'border-accent bg-accent/5'
                : 'border-gray-200 hover:border-accent/50'
              }
            `}
          >
            <div className={`
              w-5 h-5 rounded-sm border-2 flex items-center justify-center mt-0.5 shrink-0
              ${selections.includes(option.id)
                ? 'border-accent bg-accent'
                : 'border-gray-300'
              }
            `}>
              {selections.includes(option.id) && (
                <CheckCircle className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="flex-grow">
              <span className="text-[#2F2F2F] font-medium block">
                {option.text}
              </span>
              {option.description && (
                <span className="text-gray-600 text-sm block mt-1">
                  {option.description}
                </span>
              )}
              {option.id === 'other' && selections.includes('other') && (
                <textarea
                  value={otherText}
                  onChange={(e) => handleOtherText(e.target.value)}
                  placeholder="Please tell us more..."
                  className="mt-3 w-full h-24 p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 
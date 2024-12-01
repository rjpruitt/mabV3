'use client'

import React, { useState, useEffect } from 'react'
import { BaseQuestionProps, SelectionValue, ConversationStep, Option } from '../types'
import { CheckCircle } from 'lucide-react'

interface SingleSelectProps extends Omit<BaseQuestionProps, 'value' | 'onChange'> {
  value?: SelectionValue
  onChange: (value: SelectionValue) => void
  step: ConversationStep & { options: Option[] }
}

export function SingleSelect({ value = { selection: '', isValid: false }, onChange, step }: SingleSelectProps) {
  const [selection, setSelection] = useState<string>(value?.selection || '')

  const isValid = selection !== ''

  // Initialize with invalid state if required
  useEffect(() => {
    if (step.required) {
      onChange({ 
        selection,
        isValid: false
      })
    }
  }, [])

  const handleSelection = (optionId: string) => {
    setSelection(optionId)
    onChange({ 
      selection: optionId,
      isValid: true
    })
  }

  return (
    <div className="space-y-4">
      {step.required && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Please make a selection to continue
          </span>
          <span className="text-red-500">*</span>
        </div>
      )}
      <div className="grid grid-cols-1 gap-3">
        {step.options?.map((option) => (
          <button
            data-testid={`option-${option.id}`}
            key={option.id}
            onClick={() => handleSelection(option.id)}
            className={`
              p-4 border rounded-sm text-left flex items-start gap-3 transition-all
              ${selection === option.id
                ? 'border-accent bg-accent/5'
                : 'border-gray-200 hover:border-accent/50'
              }
            `}
          >
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0
              ${selection === option.id
                ? 'border-accent'
                : 'border-gray-300'
              }
            `}>
              {selection === option.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              )}
            </div>
            <div>
              <span className="text-[#2F2F2F] font-medium block">
                {option.text}
              </span>
              {option.description && (
                <span className="text-gray-600 text-sm block mt-1">
                  {option.description}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 
'use client'

import React, { useState } from 'react'
import { BaseQuestionProps } from './types'
import { CheckCircle } from 'lucide-react'

export function MultiSelect({ value = [], onChange, step }: BaseQuestionProps) {
  const [selections, setSelections] = useState<string[]>(value?.selections || [])
  const [otherText, setOtherText] = useState(value?.otherText || '')

  const toggleSelection = (optionId: string) => {
    let newSelections: string[]
    if (selections.includes(optionId)) {
      newSelections = selections.filter(id => id !== optionId)
    } else {
      newSelections = [...selections, optionId]
    }
    setSelections(newSelections)
    onChange({ selections: newSelections, otherText })
  }

  const handleOtherText = (text: string) => {
    setOtherText(text)
    onChange({ selections, otherText: text })
  }

  return (
    <div className="space-y-4">
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
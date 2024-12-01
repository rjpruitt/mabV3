'use client'

import React, { useState } from 'react'
import { BaseQuestionProps, MultiSelectValue, Option, ConversationStep } from '../types'
import { CheckCircle, Sparkles } from 'lucide-react'

interface StyleSelectProps extends Omit<BaseQuestionProps, 'value' | 'onChange'> {
  value?: MultiSelectValue
  onChange: (value: MultiSelectValue) => void
  step: ConversationStep & { options: Option[] }
}

export function StyleSelect({ value = { selections: [], isValid: false }, onChange, step }: StyleSelectProps) {
  const [selections, setSelections] = useState<string[]>(value?.selections || [])

  const toggleSelection = (styleId: string) => {
    let newSelections: string[]
    if (selections.includes(styleId)) {
      newSelections = selections.filter(id => id !== styleId)
    } else {
      newSelections = [...selections, styleId]
    }
    setSelections(newSelections)
    onChange({ 
      selections: newSelections,
      isValid: newSelections.length > 0
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {step.options?.map((style: Option) => (
          <button
            key={style.id}
            onClick={() => toggleSelection(style.id)}
            className={`
              p-4 border rounded-sm text-left flex flex-col gap-3 transition-all
              ${selections.includes(style.id)
                ? 'border-accent bg-accent/5'
                : 'border-gray-200 hover:border-accent/50'
              }
            `}
          >
            <div>
              <span className="text-[#2F2F2F] font-medium block">
                {style.text}
              </span>
              {style.description && (
                <span className="text-gray-600 text-sm block mt-1">
                  {style.description}
                </span>
              )}
            </div>
            {style.features && (
              <ul className="mt-3 space-y-1">
                {style.features.map((feature: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1.h-1 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>
    </div>
  )
} 
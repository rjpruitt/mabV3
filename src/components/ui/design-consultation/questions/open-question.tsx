'use client'

import React, { useState } from 'react'
import { BaseQuestionProps } from './types'
import { CheckCircle } from 'lucide-react'

const promptQuestions = [
  {
    id: 'age',
    text: "How old is your current bathroom?",
    options: [
      "Less than 5 years",
      "5-10 years",
      "10-20 years",
      "More than 20 years",
      "Not sure"
    ]
  },
  {
    id: 'type',
    text: "What type of shower/tub do you currently have?",
    options: [
      "Tub with shower",
      "Tub only",
      "Stand-up shower",
      "Walk-in shower"
    ]
  },
  {
    id: 'size',
    text: "How would you describe the space?",
    options: [
      "Very small",
      "Average size",
      "Spacious",
      "Not sure of dimensions"
    ]
  }
]

export function OpenQuestion({ value = {}, onChange, step }: BaseQuestionProps) {
  const [selections, setSelections] = useState<Record<string, string>>(value.selections || {})
  const [notes, setNotes] = useState(value.notes || '')

  const handleSelection = (questionId: string, option: string) => {
    const newSelections = {
      ...selections,
      [questionId]: option
    }
    setSelections(newSelections)
    onChange({ selections: newSelections, notes })
  }

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes)
    onChange({ selections, notes: newNotes })
  }

  return (
    <div className="space-y-8">
      {/* Quick Answer Sections */}
      {promptQuestions.map((question) => (
        <div key={question.id} className="space-y-3">
          <h4 className="font-medium text-[#2F2F2F]">{question.text}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelection(question.id, option)}
                className={`
                  p-3 border rounded-sm text-left flex items-center gap-3 transition-all
                  ${selections[question.id] === option 
                    ? 'border-accent bg-accent/5' 
                    : 'border-gray-200 hover:border-accent/50'
                  }
                `}
              >
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${selections[question.id] === option 
                    ? 'border-accent' 
                    : 'border-gray-300'
                  }
                `}>
                  {selections[question.id] === option && (
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
                <span className="text-[#2F2F2F]">{option}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Notes */}
      <div className="space-y-3">
        <h4 className="font-medium text-[#2F2F2F]">
          Anything else you'd like to tell us about your bathroom?
        </h4>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Share any other details that would help us understand your space better..."
          className="w-full h-32 p-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none text-[#2F2F2F]"
        />
      </div>
    </div>
  )
} 
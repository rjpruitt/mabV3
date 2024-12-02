'use client'

import React, { useState, useEffect } from 'react'
import { BaseQuestionProps } from './types'
import { SingleSelect } from './single-select'

interface BathroomQuestions {
  age?: string
  type?: string
  size?: string
  notes?: string
  isValid: boolean
}

export function BathroomQuestions({ value = {}, onChange, step }: BaseQuestionProps) {
  const [answers, setAnswers] = useState<BathroomQuestions>({ 
    ...value,
    isValid: false 
  })

  // Check if all required fields are filled
  const isValid = Boolean(answers.age && answers.type && answers.size)

  useEffect(() => {
    onChange({
      ...answers,
      isValid
    })
  }, [answers])

  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600">
        Please answer all questions to continue
      </p>

      {/* Age Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          How old is your current bathroom?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.age || '', isValid: Boolean(answers.age) }}
          onChange={(val) => setAnswers(prev => ({ ...prev, age: val.selection }))}
          step={{
            ...step,
            options: [
              { id: 'less-5', text: "Less than 5 years" },
              { id: '5-10', text: "5-10 years" },
              { id: '10-20', text: "10-20 years" },
              { id: 'more-20', text: "More than 20 years" },
              { id: 'not-sure', text: "Not sure" }
            ],
            required: true
          }}
        />
      </div>

      {/* Type Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          What type of shower/tub do you currently have?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.type || '', isValid: Boolean(answers.type) }}
          onChange={(val) => setAnswers(prev => ({ ...prev, type: val.selection }))}
          step={{
            ...step,
            options: [
              { id: 'tub-shower', text: "Tub with shower" },
              { id: 'tub-only', text: "Tub only" },
              { id: 'stand-up', text: "Stand-up shower" },
              { id: 'walk-in', text: "Walk-in shower" },
              { id: 'multiple', text: "Multiple bathrooms", description: "We'll discuss details during your consultation" }
            ],
            required: true
          }}
        />
      </div>

      {/* Size Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          How would you describe the space?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.size || '', isValid: Boolean(answers.size) }}
          onChange={(val) => setAnswers(prev => ({ ...prev, size: val.selection }))}
          step={{
            ...step,
            options: [
              { id: 'very-small', text: "Very small" },
              { id: 'average', text: "Average size" },
              { id: 'spacious', text: "Spacious" },
              { id: 'not-sure-size', text: "Not sure of dimensions" }
            ],
            required: true
          }}
        />
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F]">
          Anything else you'd like to tell us about your bathroom?
        </h4>
        <textarea
          value={answers.notes || ''}
          onChange={(e) => setAnswers(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Share any other details that would help us understand your space better..."
          className="w-full h-24 p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
        />
      </div>
    </div>
  )
} 
'use client'

import React, { useState, useEffect } from 'react'
import { BaseQuestionProps } from './types'
import { SingleSelect } from './single-select'

interface BathroomQuestions {
  age?: string
  type?: string
  size?: string
}

export function BathroomQuestions({ value = {}, onChange, step }: BaseQuestionProps) {
  const [answers, setAnswers] = useState<BathroomQuestions>(value)

  const isValid = answers.age && answers.type && answers.size

  useEffect(() => {
    onChange({
      ...answers,
      isValid
    })
  }, [answers])

  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600 flex items-center gap-2">
        Please answer all questions to continue
        <span className="text-red-500">*</span>
      </p>

      {/* Age Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          How old is your current bathroom?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.age }}
          onChange={(val) => setAnswers(prev => ({ ...prev, age: val.selection }))}
          options={[
            { id: 'less-5', text: "Less than 5 years" },
            { id: '5-10', text: "5-10 years" },
            { id: '10-20', text: "10-20 years" },
            { id: 'more-20', text: "More than 20 years" },
            { id: 'not-sure', text: "Not sure" }
          ]}
        />
      </div>

      {/* Type Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          What type of shower/tub do you currently have?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.type }}
          onChange={(val) => setAnswers(prev => ({ ...prev, type: val.selection }))}
          options={[
            { id: 'tub-shower', text: "Tub with shower" },
            { id: 'tub-only', text: "Tub only" },
            { id: 'stand-up', text: "Stand-up shower" },
            { id: 'walk-in', text: "Walk-in shower" },
            { id: 'multiple', text: "Multiple bathrooms", description: "We'll discuss details during your consultation" }
          ]}
        />
      </div>

      {/* Size Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          How would you describe the space?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.size }}
          onChange={(val) => setAnswers(prev => ({ ...prev, size: val.selection }))}
          options={[
            { id: 'very-small', text: "Very small" },
            { id: 'average', text: "Average size" },
            { id: 'spacious', text: "Spacious" },
            { id: 'not-sure-size', text: "Not sure of dimensions" }
          ]}
        />
      </div>
    </div>
  )
} 
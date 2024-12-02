'use client'

import React, { useState, useEffect } from 'react'
import { BaseQuestionProps, AccessibilityStep } from '../types'
import { SingleSelect } from './single-select'

interface MedicareStatus {
  status: string
  isValid: boolean
}

export function MedicareStatus({ value = { status: '', isValid: false }, onChange, step }: BaseQuestionProps) {
  const [answers, setAnswers] = useState<MedicareStatus>(value)

  const isValid = Boolean(answers.status)

  useEffect(() => {
    onChange({
      ...answers,
      isValid
    })
  }, [answers])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          What is your Medicare status?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.status || '', isValid: false }}
          onChange={(val) => setAnswers(prev => ({ ...prev, status: val.selection }))}
          step={{
            ...step,
            options: [
              { id: 'current', text: "Currently on Medicare" },
              { id: 'soon', text: "Will be eligible within 6 months" },
              { id: 'future', text: "Will be eligible in more than 6 months" },
              { id: 'not-eligible', text: "Not eligible for Medicare" },
              { id: 'not-sure', text: "Not sure about Medicare status" }
            ]
          }}
        />
      </div>
    </div>
  )
} 
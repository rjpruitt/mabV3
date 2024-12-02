'use client'

import React, { useState, useEffect } from 'react'
import { SingleSelect } from './single-select'
import { AccessibilityStep, BaseQuestionProps } from '../types'

interface OwnershipValue {
  relationship: string
  ownership?: string
  isValid: boolean
}

export function OwnershipQuestions({ value = { relationship: '', isValid: false }, onChange, step }: BaseQuestionProps) {
  const [answers, setAnswers] = useState<OwnershipValue>(value)

  const isValid = Boolean(answers.relationship && 
    (answers.relationship === 'self' ? answers.ownership : true))

  useEffect(() => {
    onChange({
      ...answers,
      isValid
    })
  }, [answers])

  const relationshipStep: AccessibilityStep = {
    id: 'relationship-ownership',
    type: 'single-select',
    question: '',
    required: true,
    options: [
      { id: 'self', text: "I need modifications for myself" },
      { id: 'family', text: "Family member", description: "Child, spouse, or other relative" },
      { id: 'caregiver', text: "Professional caregiver" },
      { id: 'friend', text: "Friend or neighbor" },
      { id: 'other', text: "Other relationship" }
    ]
  }

  const ownershipStep: AccessibilityStep = {
    id: 'relationship-ownership',
    type: 'single-select',
    question: '',
    required: true,
    options: [
      { id: 'own', text: "Yes, I own my home" },
      { id: 'rent', text: "No, I rent" }
    ]
  }

  return (
    <div className="space-y-8">
      {/* Relationship Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          What is your relationship to the person needing bathroom modifications?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: answers.relationship || '', isValid: false }}
          onChange={(val) => setAnswers(prev => ({ ...prev, relationship: val.selection }))}
          step={relationshipStep}
        />
      </div>

      {/* Ownership Question - Only show if relationship is 'self' */}
      {answers.relationship === 'self' && (
        <div className="space-y-4">
          <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
            Do you own your home?
            <span className="text-red-500">*</span>
          </h4>
          <SingleSelect
            value={{ selection: answers.ownership || '', isValid: false }}
            onChange={(val) => setAnswers(prev => ({ ...prev, ownership: val.selection }))}
            step={ownershipStep}
          />
        </div>
      )}
    </div>
  )
} 
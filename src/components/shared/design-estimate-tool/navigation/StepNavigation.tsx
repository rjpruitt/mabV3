'use client'

import React from 'react'

export interface Step {
  id: string
  title: string
  isComplete: boolean
}

interface StepNavigationProps {
  steps: Step[]
  currentStepId: string
  onStepChange: (stepId: string) => void
}

export function StepNavigation({ steps, currentStepId, onStepChange }: StepNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-teal-600 transition-all"
          style={{
            width: `${(steps.findIndex(s => s.id === currentStepId) + 1) * (100 / steps.length)}%`
          }}
        />
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Step {steps.findIndex(s => s.id === currentStepId) + 1} of {steps.length}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              const currentIndex = steps.findIndex(s => s.id === currentStepId)
              if (currentIndex > 0) {
                onStepChange(steps[currentIndex - 1].id)
              }
            }}
            className="px-4 py-2 text-gray-600 disabled:opacity-50"
            disabled={currentStepId === steps[0].id}
          >
            Back
          </button>
          <button 
            onClick={() => {
              const currentIndex = steps.findIndex(s => s.id === currentStepId)
              if (currentIndex < steps.length - 1) {
                onStepChange(steps[currentIndex + 1].id)
              }
            }}
            className="px-8 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
            disabled={currentStepId === steps[steps.length - 1].id}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
} 
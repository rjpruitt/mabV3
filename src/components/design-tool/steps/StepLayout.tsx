'use client'

import { Step } from './types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SelectionSummary } from '../summary/SelectionSummary'

type StepLayoutProps = {
  steps: Step[]
  currentStep: Step
  children: React.ReactNode
  onNext: () => void
  onBack: () => void
  onSave?: () => void
}

export function StepLayout({ 
  steps, 
  currentStep, 
  children, 
  onNext, 
  onBack,
  onSave 
}: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step.isComplete ? 'bg-primary text-white' : 'bg-gray-200'}
                  ${currentStep.id === step.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                `}>
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step.title}</span>
                {index < steps.length - 1 && (
                  <ChevronRight className="ml-4 w-5 h-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area with Summary */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold mb-2">{currentStep.title}</h1>
              <p className="text-gray-600">{currentStep.description}</p>
            </div>

            {children}

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={onBack}
                className="flex items-center px-4 py-2 border rounded hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div className="flex space-x-4">
                {onSave && (
                  <button
                    onClick={onSave}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Save Progress
                  </button>
                )}
                <button
                  onClick={onNext}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="md:col-span-1">
            <SelectionSummary />
          </div>
        </div>
      </div>
    </div>
  )
} 
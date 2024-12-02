'use client'

import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'
import { AccessibilityStep, AccessibilityResponse } from './types'
import { accessibilityFlow } from './conversation-flow'
import { SuccessMessage } from './success-message'
import { OwnershipQuestions } from './questions/ownership-questions'
import { MedicareStatus } from './questions/medicare-status'
import { MultiSelect } from './questions/multi-select'
import { SingleSelect } from './questions/single-select'
import { ContactForm } from './questions/contact-form'

interface AccessibilityConsultationProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (responses: AccessibilityResponse) => void
}

// Change from export function to export const
export const AccessibilityConsultation = ({ isOpen, onClose, onComplete }: AccessibilityConsultationProps) => {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<AccessibilityResponse>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  React.useEffect(() => {
    if (modalRef.current) {
      const content = modalRef.current.querySelector('.modal-content')
      if (content) {
        content.scrollTo(0, 0)
      }
    }
  }, [step])

  if (!isOpen) return null

  const currentStep = accessibilityFlow[step]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formData = {
        relationship: responses['relationship-ownership'],
        medicare: responses['medicare-status'],
        mobility: responses['mobility-needs'],
        safety: responses['safety-concerns'],
        timeline: responses['timeline'],
        contact: responses['contact-info']
      }

      // First show success message
      setShowSuccess(true)

    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    // First complete the submission
    onComplete(responses)
    // Then close everything
    setShowSuccess(false)
    onClose()
  }

  const getStepResponse = (stepId: AccessibilityStep['id']) => responses[stepId]

  const canProceed = () => {
    const currentResponse = getStepResponse(currentStep.id)
    
    if (!currentStep.required) return true
    
    return currentResponse?.isValid
  }

  const handleNext = () => {
    if (!canProceed()) {
      setResponses(prev => ({
        ...prev,
        [currentStep.id]: {
          ...prev[currentStep.id],
          showError: true
        }
      }))
      return
    }

    if (step < accessibilityFlow.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const updateResponse = (stepId: AccessibilityStep['id'], value: any) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: value
    }))
  }

  const renderQuestion = () => {
    const value = getStepResponse(currentStep.id)
    
    switch (currentStep.type) {
      case 'ownership':
        return (
          <OwnershipQuestions
            value={value as any}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'medicare':
        return (
          <MedicareStatus
            value={value as any}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'multiselect':
        return (
          <MultiSelect
            value={value as any}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'single-select':
        return (
          <SingleSelect
            value={value as any}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'contact':
        return (
          <ContactForm
            value={value as any}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" ref={modalRef}>
      <div className="bg-white rounded-sm max-w-2xl w-full flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b shrink-0">
          <h2 className="text-2xl font-semibold text-[#2F2F2F]">Free Safety Assessment</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-[#2F2F2F] transition-colors" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 pt-4 shrink-0">
          <div className="h-1 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / accessibilityFlow.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow modal-content">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                {currentStep.question}
              </h3>
              {currentStep.subtext && (
                <p className="text-gray-600">{currentStep.subtext}</p>
              )}
            </div>

            {renderQuestion()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between p-6 border-t shrink-0">
          <button
            onClick={handleBack}
            className={`text-gray-600 hover:text-[#2F2F2F] transition-colors ${
              step === 0 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          <div className="flex flex-col items-end">
            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className={`
                bg-accent text-white px-6 py-3 rounded-sm transition-all relative
                ${(!canProceed() || isSubmitting) 
                  ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                  : 'hover:bg-accent/90'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <span className="opacity-0">Complete</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                </>
              ) : (
                step === accessibilityFlow.length - 1 ? 'Complete' : 'Continue'
              )}
            </button>
            {(currentStep.type === 'multiselect' || currentStep.type === 'single-select') && 
              responses[currentStep.id]?.showError && (
              <p className="text-sm text-red-500 mt-2">
                Please select at least one option to continue
              </p>
            )}
          </div>
        </div>
      </div>
      {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
    </div>
  )
} 
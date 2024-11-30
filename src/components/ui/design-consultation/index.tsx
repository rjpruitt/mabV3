'use client'

import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'
import { ConversationStep, ConsultationResponse } from './types'
import { conversationFlow } from './conversation-flow'
import { OpenQuestion } from './questions/open-question'
import { MultiSelect } from './questions/multi-select'
import { SingleSelect } from './questions/single-select'
import { PhotoUpload } from './questions/photo-upload'
import { StyleSelect } from './questions/style-select'
import { ContactForm } from './questions/contact-form'
import { SuccessMessage } from '@/components/ui/success-message'

interface DesignConsultationProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (responses: ConsultationResponse) => void
}

export function DesignConsultation({ isOpen, onClose, onComplete }: DesignConsultationProps) {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<ConsultationResponse>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  React.useEffect(() => {
    if (modalRef.current) {
      window.scrollTo(0, 0)
      modalRef.current.scrollTo(0, 0)
    }
  }, [step])

  if (!isOpen) return null

  const currentStep = conversationFlow[step]

  const handleSubmit = async () => {
    const contactData = responses['contact-info']
    if (!contactData?.isValid) {
      return
    }

    setIsSubmitting(true)
    try {
      // Similar to main app:
      // 1. Send to Google Sheets
      // 2. Send confirmation email via SendGrid
      // 3. Show success message
      setShowSuccess(true)
    } catch (error) {
      console.error('Submission error:', error)
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
  }

  const handleNext = () => {
    if ((currentStep.type === 'multiselect' || currentStep.type === 'single-select') && currentStep.required) {
      const stepResponse = responses[currentStep.id]
      if (!stepResponse || !stepResponse.isValid) {
        setResponses(prev => ({
          ...prev,
          [currentStep.id]: {
            ...prev[currentStep.id],
            showError: true
          }
        }))
        return
      }
    }

    if (step < conversationFlow.length - 1) {
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

  const updateResponse = (stepId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: value
    }))
  }

  const renderQuestion = () => {
    switch (currentStep.type) {
      case 'open':
        return (
          <OpenQuestion
            value={responses[currentStep.id]}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'multiselect':
        return (
          <MultiSelect
            value={responses[currentStep.id]}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'photo':
        return (
          <PhotoUpload
            value={responses[currentStep.id]}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'style':
        return (
          <StyleSelect
            value={responses[currentStep.id]}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'contact':
        return (
          <ContactForm
            value={responses[currentStep.id]}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'single-select':
        return (
          <SingleSelect
            value={responses[currentStep.id]}
            onChange={(value) => updateResponse(currentStep.id, value)}
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
          <h2 className="text-2xl font-semibold text-[#2F2F2F]">Design Your Perfect Shower</h2>
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
              style={{ width: `${((step + 1) / conversationFlow.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
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
              disabled={
                (currentStep.type === 'contact' && !responses['contact-info']?.isValid) ||
                ((currentStep.type === 'multiselect' || currentStep.type === 'single-select') && 
                  currentStep.required && !responses[currentStep.id]?.isValid)
              }
              className={`
                bg-accent text-white px-6 py-3 rounded-sm transition-colors
                ${(currentStep.type === 'contact' && !responses['contact-info']?.isValid) ||
                  ((currentStep.type === 'multiselect' || currentStep.type === 'single-select') && 
                    currentStep.required && !responses[currentStep.id]?.isValid)
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-accent/90'
                }
              `}
            >
              {step === conversationFlow.length - 1 ? 'Complete' : 'Continue'}
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
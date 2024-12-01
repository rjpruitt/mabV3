'use client'

import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'
import { 
  ConversationStep, 
  ConsultationResponse, 
  StepId,
  MultiSelectValue,
  PhotoUploadValue,
  ContactFormValue,
  SelectionValue,
  BathroomInfoValue,
  StepWithOptions
} from './types'
import { conversationFlow } from './conversation-flow'
import { OpenQuestion } from './questions/open-question'
import { MultiSelect } from './questions/multi-select'
import { SingleSelect } from './questions/single-select'
import { PhotoUpload } from './questions/photo-upload'
import { StyleSelect } from './questions/style-select'
import { ContactForm } from './questions/contact-form'
import { SuccessMessage } from './success-message'
import { BathroomInfo } from './questions/bathroom-info'

interface DesignConsultationProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (responses: ConsultationResponse) => void
}

// Add type guard functions
const isMultiSelect = (value: any): value is MultiSelectValue => {
  return value && 'selections' in value
}

const isPhotoUpload = (value: any): value is PhotoUploadValue => {
  return value && 'files' in value
}

const isStepWithOptions = (step: ConversationStep): step is StepWithOptions => {
  return step.type === 'single-select' || step.type === 'multiselect'
}

export function DesignConsultation({ isOpen, onClose, onComplete }: DesignConsultationProps) {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState<ConsultationResponse>({})
  const modalRef = useRef<HTMLDivElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRentalMessage, setShowRentalMessage] = useState(false)

  React.useEffect(() => {
    if (modalRef.current) {
      const content = modalRef.current.querySelector('.modal-content')
      if (content) {
        content.scrollTo(0, 0)
      }
    }
  }, [step])

  if (!isOpen) return null

  const currentStep = conversationFlow[step]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formData = {
        ownership: responses['ownership-screening']?.selection,
        bathroom: {
          age: responses['bathroom-info']?.age?.selection,
          type: responses['bathroom-info']?.type?.selection,
          size: responses['bathroom-info']?.size?.selection,
          notes: responses['bathroom-info']?.notes
        },
        painPoints: responses['pain-points']?.selections,
        photos: responses['photos']?.files,
        styles: responses['style-preferences']?.selections,
        timeline: responses['timeline']?.selection,
        preferredContact: responses['contact-preferences']?.selection,
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

  const getStepResponse = (stepId: StepId) => responses[stepId]

  const canProceed = () => {
    const currentResponse = getStepResponse(currentStep.id)
    
    if (!currentStep.required) return true
    
    switch (currentStep.type) {
      case 'single-select':
      case 'multiselect':
      case 'contact':
      case 'bathroom-info':
        return currentResponse?.isValid
      case 'photo':
        return true // Photos are optional
      case 'style':
        return isMultiSelect(currentResponse) && currentResponse.selections.length > 0
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep.id === 'ownership-screening') {
      if (responses[currentStep.id]?.selection === 'rent') {
        setShowRentalMessage(true)
        return
      }
    }

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

  const updateResponse = (stepId: StepId, value: any) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: value
    }))
  }

  const renderQuestion = () => {
    const value = getStepResponse(currentStep.id)
    
    switch (currentStep.type) {
      case 'bathroom-info':
        return (
          <BathroomInfo
            value={value as BathroomInfoValue}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'multiselect':
      case 'style':
        if (!isStepWithOptions(currentStep)) return null
        return (
          <MultiSelect
            value={value as MultiSelectValue}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'photo':
        return (
          <PhotoUpload
            value={value as PhotoUploadValue}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      case 'open':
        return (
          <OpenQuestion
            value={value}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'contact':
        return (
          <ContactForm
            value={value as ContactFormValue}
            onChange={(value) => updateResponse(currentStep.id, value)}
            step={currentStep}
          />
        )
      case 'single-select':
        if (!isStepWithOptions(currentStep)) return null
        return (
          <SingleSelect
            value={value as SelectionValue}
            onChange={(val) => updateResponse(currentStep.id, val)}
            step={currentStep}
          />
        )
      default:
        return null
    }
  }

  const RentalMessage = () => (
    <div className="text-center p-6">
      <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
        Thank you for your interest
      </h3>
      <p className="text-gray-600 mb-6">
        We appreciate your interest in improving your bathroom. However, 
        any modifications to the property need to be requested by the 
        property owner. Please have the property owner contact us directly 
        to discuss renovation options.
      </p>
      <button
        onClick={onClose}
        className="bg-accent text-white px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors"
      >
        Close
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" ref={modalRef}>
      <div className="bg-white rounded-sm max-w-2xl w-full flex flex-col max-h-[90vh]">
        {showRentalMessage ? (
          <RentalMessage />
        ) : (
          <>
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
                data-testid="consultation-back"
                onClick={handleBack}
                className={`text-gray-600 hover:text-[#2F2F2F] transition-colors ${
                  step === 0 ? 'invisible' : ''
                }`}
              >
                Back
              </button>
              <div className="flex flex-col items-end">
                <button
                  data-testid="consultation-next"
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
                    step === conversationFlow.length - 1 ? 'Complete' : 'Continue'
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
          </>
        )}
      </div>
      {showSuccess && <SuccessMessage onClose={handleSuccessClose} />}
    </div>
  )
} 
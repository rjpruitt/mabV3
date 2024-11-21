'use client'

import React, { useState } from 'react'
import { useAccessibility } from '@/providers/accessibility-provider'
import { errorReporting } from '@/lib/error-reporting'

interface ErrorFeedbackProps {
  error: Error
  onClose?: () => void
}

export function ErrorFeedback({ error, onClose }: ErrorFeedbackProps) {
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { announce } = useAccessibility()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await errorReporting.logError(error, {
        userFeedback: feedback,
        timestamp: Date.now()
      })
      
      setIsSubmitted(true)
      announce('Thank you for your feedback!', 'polite')
      
      if (onClose) {
        setTimeout(onClose, 2000)
      }
    } catch (e) {
      announce('Failed to submit feedback. Please try again.', 'assertive')
    }
  }

  if (isSubmitted) {
    return (
      <div 
        role="alert"
        className="text-center p-4 bg-green-50 rounded-sm"
      >
        <p className="text-green-700 font-semibold">
          Thank you for your feedback!
        </p>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="mt-6 space-y-4"
      aria-label="Error feedback form"
    >
      <div>
        <label 
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          What were you trying to do when this error occurred?
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={3}
          aria-label="Error feedback"
        />
      </div>
      
      <div className="flex justify-end gap-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip
          </button>
        )}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-sm
            hover:bg-primary-light transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  )
} 
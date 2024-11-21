'use client'

import React, { useState } from 'react'
import { useAccessibility } from '@/providers/accessibility-provider'
import { errorReporting } from '@/lib/error-reporting'
import { ErrorFeedback } from './error-feedback'
import { ErrorRecovery } from './error-recovery'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorInfo {
  componentStack: string | null
  [key: string]: unknown
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const info: ErrorInfo = {
      componentStack: errorInfo.componentStack || null,
      digest: errorInfo.digest
    }
    
    errorReporting.logError(error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error }: { error?: Error }) {
  const { announce } = useAccessibility()
  const [showFeedback, setShowFeedback] = useState(false)

  React.useEffect(() => {
    announce('An error occurred. Recovery options are available.', 'assertive')
  }, [announce])

  return (
    <div 
      role="alert"
      className="p-6 bg-red-50 rounded-sm"
    >
      <h2 className="text-xl font-semibold text-red-700 mb-2">
        Something went wrong
      </h2>
      <p className="text-red-600 mb-4">
        {error?.message || 'An unexpected error occurred. Please try one of the following options:'}
      </p>
      
      <ErrorRecovery 
        error={error || new Error('Unknown error')} 
      />
      
      {!showFeedback && (
        <button
          onClick={() => setShowFeedback(true)}
          className="mt-6 text-red-600 hover:text-red-700 transition-colors underline"
        >
          Help us fix this issue
        </button>
      )}

      {showFeedback && (
        <ErrorFeedback 
          error={error || new Error('Unknown error')}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  )
} 
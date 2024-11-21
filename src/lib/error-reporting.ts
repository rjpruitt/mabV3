'use client'

interface ErrorDetails {
  message: string
  stack?: string
  componentStack?: string
  url?: string
  timestamp: number
  userFeedback?: string
  additionalInfo?: Record<string, unknown>
}

class ErrorReporting {
  private static instance: ErrorReporting
  private endpoint: string = '/api/error-logging'

  private constructor() {
    // Initialize any error reporting service connections here
  }

  public static getInstance(): ErrorReporting {
    if (!ErrorReporting.instance) {
      ErrorReporting.instance = new ErrorReporting()
    }
    return ErrorReporting.instance
  }

  async logError(error: Error, additionalInfo?: Record<string, unknown>) {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: additionalInfo?.componentStack as string | undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      timestamp: Date.now(),
      additionalInfo
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught:', errorDetails)
      return
    }

    // Send to backend in production
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorDetails),
      })
    } catch (e) {
      // Fallback to console if reporting fails
      console.error('Failed to report error:', e)
    }
  }

  async logWarning(message: string, details?: Record<string, unknown>) {
    const warning = {
      level: 'warning',
      message,
      details,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn('Warning:', warning)
      return
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(warning),
      })
    } catch (e) {
      console.warn('Failed to report warning:', e)
    }
  }
}

export const errorReporting = ErrorReporting.getInstance() 
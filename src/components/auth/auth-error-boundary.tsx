'use client'

import { Component, ReactNode } from 'react'
import { AuthError } from '@/lib/auth/errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class AuthErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  public render() {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (hasError) {
      if (error instanceof AuthError) {
        return fallback || (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <h3 className="font-semibold">Authentication Error</h3>
            <p>{error.message}</p>
          </div>
        )
      }

      // Re-throw non-auth errors
      throw error
    }

    return children
  }
} 
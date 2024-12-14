'use client'

import { useState, useCallback } from 'react'
import { handleAuthError, AuthError } from '@/lib/auth/errors'

export function useAuthError() {
  const [error, setError] = useState<AuthError | null>(null)

  const handleError = useCallback((error: unknown) => {
    const authError = handleAuthError(error)
    setError(authError)
    return authError
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    handleError,
    clearError
  }
} 
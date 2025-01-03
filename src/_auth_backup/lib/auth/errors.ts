export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export const AUTH_ERRORS = {
  UNAUTHORIZED: new AuthError('Unauthorized access', 'AUTH_UNAUTHORIZED', 401),
  INVALID_ROLE: new AuthError('Invalid user role', 'AUTH_INVALID_ROLE', 403),
  SESSION_EXPIRED: new AuthError('Session has expired', 'AUTH_SESSION_EXPIRED', 401),
  INVALID_CREDENTIALS: new AuthError('Invalid credentials', 'AUTH_INVALID_CREDENTIALS', 401)
} as const

export function handleAuthError(error: unknown) {
  console.error('Auth error:', error)
  
  if (error instanceof AuthError) {
    return error
  }

  // Handle Supabase auth errors
  if (error instanceof Error) {
    switch (error.message) {
      case 'Invalid login credentials':
        return AUTH_ERRORS.INVALID_CREDENTIALS
      case 'JWT expired':
        return AUTH_ERRORS.SESSION_EXPIRED
      default:
        return new AuthError(
          'Authentication failed',
          'AUTH_UNKNOWN_ERROR',
          500
        )
    }
  }

  return new AuthError(
    'Unknown error occurred',
    'AUTH_UNKNOWN_ERROR',
    500
  )
} 
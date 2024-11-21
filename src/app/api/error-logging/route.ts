import { NextRequest, NextResponse } from 'next/server'

interface ErrorPayload {
  message: string
  stack?: string
  componentStack?: string
  url?: string
  timestamp: number
  level?: 'error' | 'warning'
  details?: object
}

export async function POST(request: NextRequest) {
  try {
    const payload: ErrorPayload = await request.json()

    // In production, you would send this to your error tracking service
    // For example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // Example logging to server logs
      console.error('Error logged:', {
        ...payload,
        environment: process.env.NODE_ENV,
        timestamp: new Date(payload.timestamp).toISOString(),
      })

      // Here you would typically:
      // 1. Send to error tracking service
      // 2. Log to database
      // 3. Send alerts if needed
      // 4. etc.
    }

    return NextResponse.json({ 
      success: true,
      message: 'Error logged successfully'
    })
  } catch (error) {
    // If logging fails, we still want the app to continue working
    console.error('Failed to log error:', error)
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to log error'
      },
      { status: 500 }
    )
  }
} 
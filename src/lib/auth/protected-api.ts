import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AUTH_ERRORS } from './errors'

type Handler = (req: Request, context: any) => Promise<Response>

interface ProtectedApiOptions {
  requiredRoles?: string[]
}

export function protectedApi(handler: Handler, options: ProtectedApiOptions = {}) {
  return async (req: Request, context: any) => {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return NextResponse.json(
          { error: AUTH_ERRORS.UNAUTHORIZED.message },
          { status: AUTH_ERRORS.UNAUTHORIZED.status }
        )
      }

      if (options.requiredRoles?.length) {
        const { data: user } = await supabase
          .from('auth.users')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (!user?.role || !options.requiredRoles.includes(user.role)) {
          return NextResponse.json(
            { error: AUTH_ERRORS.INVALID_ROLE.message },
            { status: AUTH_ERRORS.INVALID_ROLE.status }
          )
        }
      }

      return handler(req, context)
    } catch (error) {
      console.error('Protected API error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
} 
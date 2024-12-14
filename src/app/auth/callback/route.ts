import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const cookieStore = await cookies()

  // If we have a code, exchange it for a session
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        })
        return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin))
      }

      // Successful auth - redirect to home
      return NextResponse.redirect(new URL('/', requestUrl.origin))

    } catch (error) {
      console.error('Callback error details:', error)
      return NextResponse.redirect(new URL('/login?error=unknown', requestUrl.origin))
    }
  }

  // If we have a hash with access_token, we're in implicit flow
  if (requestUrl.hash && requestUrl.hash.includes('access_token')) {
    // Redirect to home - the client will handle the token
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  }

  // No code or token - redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
} 
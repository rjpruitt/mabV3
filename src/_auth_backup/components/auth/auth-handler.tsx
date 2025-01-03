'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export function AuthHandler() {
  const router = useRouter()
  const supabase = createPagesBrowserClient()

  useEffect(() => {
    // Handle auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (window.location.hash) {
          // Remove hash but keep pathname
          const cleanUrl = window.location.pathname
          window.history.replaceState({}, document.title, cleanUrl)
        }
        
        if (session) {
          router.push('/')
          router.refresh()
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return null
} 
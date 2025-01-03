'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useAuth() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const signIn = async () => {
    // ... sign in logic ...

    // After successful sign in, check for redirect
    const redirectTo = localStorage.getItem('redirectAfterLogin')
    if (redirectTo) {
      localStorage.removeItem('redirectAfterLogin')
      router.push(redirectTo)
    }
  }

  // ... other auth methods ...

  return { signIn /* ... other methods ... */ }
} 
'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Clean URL if it has a hash
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  if (!isMounted) {
    return <div className="max-w-sm mx-auto p-8 pt-[300px]" />
  }

  return (
    <div className="max-w-sm mx-auto p-8 pt-[300px]">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        view="sign_in"
        showLinks={false}
        redirectTo={`${window.location.origin}/auth/callback`}
        onlyThirdPartyProviders={true}
        queryParams={{
          prompt: 'select_account'
        }}
      />
    </div>
  )
} 
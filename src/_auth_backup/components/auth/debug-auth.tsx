'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function DebugAuth() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg opacity-75">
      <p>Auth Status: {session ? 'Logged In' : 'Not Logged In'}</p>
      {session && (
        <>
          <p>User: {session.user.email}</p>
          <button 
            onClick={handleSignOut}
            className="mt-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  )
} 
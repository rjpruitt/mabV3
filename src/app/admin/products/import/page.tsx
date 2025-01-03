'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/components/providers/supabase-provider'

export default function ImportPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { supabase } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [supabase, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Import Products</h1>
      {/* Import form goes here */}
    </div>
  )
} 
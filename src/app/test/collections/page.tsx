'use client'

import { useState, useEffect } from 'react'
import { Collection } from '@/types/products'
import { collectionService } from '@/lib/services/service-provider'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function TestCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session?.user) {
      loadCollections()
    }
  }, [session])

  async function loadCollections() {
    try {
      const data = await collectionService.listCollections(
        session?.user?.id || 'test-user',
        'customer'
      )
      setCollections(data)
    } catch (err) {
      console.error('Error loading collections:', err)
      setError(err instanceof Error ? err.message : 'Failed to load collections')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut()
      setCollections([])
    } catch (err) {
      console.error('Error signing out:', err)
      setError(err instanceof Error ? err.message : 'Failed to sign out')
    }
  }

  if (authLoading) {
    return (
      <div className="p-8">
        <div>Checking authentication...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Test Collections</h1>
        <p className="mb-4">Please sign in to continue</p>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test Collections</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Signed in as {session.user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      <button
        onClick={() => loadCollections()}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Refresh Collections
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {collections.map(collection => (
            <div key={collection.id} className="p-4 border rounded">
              <h3 className="font-medium">{collection.name}</h3>
              <p className="text-gray-600">{collection.description}</p>
              <p className="text-sm text-gray-500">Status: {collection.status}</p>
            </div>
          ))}
          {collections.length === 0 && (
            <p className="text-gray-500">No collections found</p>
          )}
        </div>
      )}
    </div>
  )
} 
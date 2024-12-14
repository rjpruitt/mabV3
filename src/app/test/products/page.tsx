'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Product, ProductSource, ProductStatus } from '@/types/products'
import { productService } from '@/lib/services/service-provider'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function TestProductsPage() {
  const productServiceRef = useRef(productService)
  const supabaseRef = useRef(supabase)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Filter states
  const [sourceFilter, setSourceFilter] = useState<ProductSource>()
  const [statusFilter, setStatusFilter] = useState<ProductStatus>()

  const filters = useMemo(() => ({
    ...(sourceFilter && { source: sourceFilter }),
    ...(statusFilter && { status: statusFilter })
  }), [sourceFilter, statusFilter])

  const loadProducts = useCallback(async () => {
    try {
      const data = await productServiceRef.current.listProducts(filters)
      setProducts(data)
    } catch (err) {
      console.error('Error loading products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [filters, productServiceRef])

  useEffect(() => {
    // Check active session
    supabaseRef.current.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabaseRef.current.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabaseRef])

  useEffect(() => {
    if (session?.user) {
      loadProducts()
    }
  }, [session, loadProducts, filters])

  async function handleSignOut() {
    try {
      await supabaseRef.current.auth.signOut()
      setProducts([])
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
        <h1 className="text-2xl font-bold mb-6">Test Products</h1>
        <p className="mb-4">Please sign in to continue</p>
        <button
          onClick={() => supabaseRef.current.auth.signInWithOAuth({ provider: 'google' })}
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
        <h1 className="text-2xl font-bold">Test Products</h1>
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

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          value={sourceFilter || ''}
          onChange={(e) => {
            const value = e.target.value
            setSourceFilter(value ? (value as ProductSource) : undefined)
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">All Sources</option>
          <option value="homedepot">Home Depot</option>
          <option value="lowes">Lowes</option>
        </select>

        <select
          value={statusFilter || ''}
          onChange={(e) => {
            const value = e.target.value
            setStatusFilter(value ? (value as ProductStatus) : undefined)
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      <button
        onClick={() => loadProducts()}
        disabled={loading}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Refresh Products
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="p-4 border rounded">
              <div className="flex justify-between">
                <h3 className="font-medium">{product.name}</h3>
                <span className="text-sm text-gray-500">{product.source}</span>
              </div>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Status: {product.status}</p>
                <p>Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</p>
                <p>Stock: {product.inventory?.status ?? 'N/A'}</p>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      )}
    </div>
  )
} 
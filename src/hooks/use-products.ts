'use client'

import { useState, useEffect } from 'react'
import { CatalogueProduct } from '@/lib/products/types/catalogue'

export function useProducts<T = CatalogueProduct>() {
  const [products, setProducts] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        console.log('Fetched products:', data)
        setProducts(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
} 
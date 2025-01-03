'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'

export interface ProductFilters {
  search?: string
  category?: string[]
  supplier?: string[]
  page?: number
  limit?: number
}

interface ProductsResponse {
  data: Product[]
  metadata: {
    total: number
    page: number
    totalPages: number
    hasMore: boolean
  }
}

export function useProducts(initialFilters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [metadata, setMetadata] = useState<ProductsResponse['metadata']>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        
        // Build query string from filters
        const params = new URLSearchParams()
        if (filters.search) params.set('search', filters.search)
        if (filters.category?.length) params.set('category', filters.category.join(','))
        if (filters.page) params.set('page', String(filters.page))
        if (filters.limit) params.set('limit', String(filters.limit))
        
        const response = await fetch(`/api/products?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data: ProductsResponse = await response.json()
        setProducts(data.data)
        setMetadata(data.metadata)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  return {
    products,
    metadata,
    isLoading,
    error,
    filters,
    setFilters
  }
} 
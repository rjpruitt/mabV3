'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useProducts, ProductFilters } from '@/hooks/use-products'
import { Product } from '@/types/product'

interface ProductContextType {
  products: Product[]
  isLoading: boolean
  error: string | null
  filters: ProductFilters
  setFilters: (filters: ProductFilters) => void
  metadata?: {
    total: number
    page: number
    totalPages: number
    hasMore: boolean
  }
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const productData = useProducts()

  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
} 
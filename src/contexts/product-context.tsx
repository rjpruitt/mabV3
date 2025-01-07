'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

interface FilterState {
  category?: string[]
  supplier?: string[]
  search?: string
}

interface ProductContextType {
  filters: FilterState
  setFilters: (filters: FilterState) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function useProductContext() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

interface ProductProviderProps {
  children: ReactNode
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    supplier: [],
    search: ''
  })

  return (
    <ProductContext.Provider value={{ filters, setFilters }}>
      {children}
    </ProductContext.Provider>
  )
} 
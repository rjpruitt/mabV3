'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type FilterCategory = 'all' | 'smart' | 'premium' | 'luxury'
type ProjectType = 'all' | 'bath' | 'shower' | 'accessibility' | 'walls'

interface GalleryContextType {
  budgetFilter: FilterCategory
  setBudgetFilter: (filter: FilterCategory) => void
  typeFilter: ProjectType
  setTypeFilter: (filter: ProjectType) => void
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [budgetFilter, setBudgetFilter] = useState<FilterCategory>('all')
  const [typeFilter, setTypeFilter] = useState<ProjectType>('all')

  return (
    <GalleryContext.Provider value={{
      budgetFilter,
      setBudgetFilter,
      typeFilter,
      setTypeFilter
    }}>
      {children}
    </GalleryContext.Provider>
  )
}

export function useGallery() {
  const context = useContext(GalleryContext)
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
} 
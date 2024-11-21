'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface GalleryItem {
  id: number
  title: string
  description: string
  before: string
  after: string
  type: 'bath' | 'shower' | 'accessibility' | 'walls'
  budgetTier: 'smart' | 'premium' | 'luxury'
  timeframe: string
  location: string
}

type FilterCategory = 'all' | 'smart' | 'premium' | 'luxury'
type ProjectType = 'all' | 'bath' | 'shower' | 'accessibility' | 'walls'

interface GalleryContextType {
  filteredItems: GalleryItem[]
  budgetFilter: FilterCategory
  setBudgetFilter: (filter: FilterCategory) => void
  typeFilter: ProjectType
  setTypeFilter: (filter: ProjectType) => void
}

// Move gallery items to context so it's available everywhere
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Modern Bath Transformation',
    description: 'Complete bath update with premium fixtures',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After',
    type: 'bath',
    budgetTier: 'premium',
    timeframe: '3 Days',
    location: 'Tulsa, OK'
  },
  {
    id: 2,
    title: 'Walk-In Shower Conversion',
    description: 'Tub-to-shower conversion with safety features',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before+2',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After+2',
    type: 'shower',
    budgetTier: 'smart',
    timeframe: '1 Day',
    location: 'Oklahoma City, OK'
  },
  {
    id: 3,
    title: 'Luxury Master Bath',
    description: 'High-end renovation with premium materials',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before+3',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After+3',
    type: 'bath',
    budgetTier: 'luxury',
    timeframe: '7 Days',
    location: 'Broken Arrow, OK'
  },
  {
    id: 4,
    title: 'Accessible Bathroom Update',
    description: 'Safety-focused renovation with modern style',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before+4',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After+4',
    type: 'accessibility',
    budgetTier: 'smart',
    timeframe: '2 Days',
    location: 'Norman, OK'
  },
  {
    id: 5,
    title: 'Contemporary Shower Design',
    description: 'Sleek shower transformation with custom glass',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before+5',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After+5',
    type: 'shower',
    budgetTier: 'premium',
    timeframe: '2 Days',
    location: 'Edmond, OK'
  },
  {
    id: 6,
    title: 'Traditional Bath Remodel',
    description: 'Classic style with modern functionality',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before+6',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After+6',
    type: 'bath',
    budgetTier: 'premium',
    timeframe: '4 Days',
    location: 'Tulsa, OK'
  }
]

const GalleryContext = createContext<GalleryContextType | undefined>(undefined)

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [budgetFilter, setBudgetFilter] = useState<FilterCategory>('all')
  const [typeFilter, setTypeFilter] = useState<ProjectType>('all')

  // Memoize filtered items to prevent unnecessary recalculations
  const filteredItems = React.useMemo(() => {
    return galleryItems.filter(item => {
      const matchesBudget = budgetFilter === 'all' || item.budgetTier === budgetFilter
      const matchesType = typeFilter === 'all' || item.type === typeFilter
      return matchesBudget && matchesType
    })
  }, [budgetFilter, typeFilter])

  const handleBudgetFilter = (filter: FilterCategory) => {
    setBudgetFilter(filter)
  }

  const handleTypeFilter = (filter: ProjectType) => {
    setTypeFilter(filter)
  }

  return (
    <GalleryContext.Provider value={{
      filteredItems,
      budgetFilter,
      setBudgetFilter: handleBudgetFilter,
      typeFilter,
      setTypeFilter: handleTypeFilter
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
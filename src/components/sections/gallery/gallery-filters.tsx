'use client'

import React from 'react'
import { useGallery } from './gallery-context'
import { motion } from 'framer-motion'
import { useAccessibility } from '@/providers/accessibility-provider'

const budgetCategories = [
  { id: 'all', label: 'All' },
  { id: 'smart', label: 'Smart' },
  { id: 'premium', label: 'Premium' },
  { id: 'luxury', label: 'Luxury' }
]

const typeCategories = [
  { id: 'all', label: 'All' },
  { id: 'bath', label: 'Bathtubs' },
  { id: 'shower', label: 'Showers' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'walls', label: 'Walls' }
]

export function GalleryFilters(): React.JSX.Element {
  const { budgetFilter, setBudgetFilter, typeFilter, setTypeFilter, filteredItems } = useGallery()
  const { announce } = useAccessibility()

  const handleBudgetChange = (categoryId: string) => {
    setBudgetFilter(categoryId as any)
    announce(
      `Budget filter changed to ${categoryId}. ${filteredItems.length} projects shown.`,
      'polite'
    )
  }

  const handleTypeChange = (typeId: string) => {
    setTypeFilter(typeId as any)
    announce(
      `Project type filter changed to ${typeId}. ${filteredItems.length} projects shown.`,
      'polite'
    )
  }

  return (
    <section 
      className="w-full py-12 bg-[#F8F6F3] border-y border-gray-200"
      aria-label="Gallery filters"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Budget Filters */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span 
              id="budget-filter-label" 
              className="text-[#2F2F2F] font-medium whitespace-nowrap"
            >
              Budget:
            </span>
            <div 
              role="radiogroup" 
              aria-labelledby="budget-filter-label"
              className="flex flex-wrap md:flex-nowrap gap-2"
            >
              {budgetCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleBudgetChange(category.id)}
                  role="radio"
                  aria-checked={budgetFilter === category.id}
                  tabIndex={budgetFilter === category.id ? 0 : -1}
                  className={`px-4 py-2 rounded-sm text-sm transition-all whitespace-nowrap min-w-[80px] ${
                    budgetFilter === category.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-[#2F2F2F] hover:bg-primary/5 hover:text-primary border border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  whileTap={{ scale: 0.97 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Project Type Filters */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span 
              id="type-filter-label"
              className="text-[#2F2F2F] font-medium whitespace-nowrap"
            >
              Type:
            </span>
            <div 
              role="radiogroup"
              aria-labelledby="type-filter-label"
              className="flex flex-wrap md:flex-nowrap gap-2"
            >
              {typeCategories.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => handleTypeChange(type.id)}
                  role="radio"
                  aria-checked={typeFilter === type.id}
                  tabIndex={typeFilter === type.id ? 0 : -1}
                  className={`px-4 py-2 rounded-sm text-sm transition-all whitespace-nowrap min-w-[80px] ${
                    typeFilter === type.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-[#2F2F2F] hover:bg-primary/5 hover:text-primary border border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  whileTap={{ scale: 0.97 }}
                >
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
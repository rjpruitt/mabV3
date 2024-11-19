'use client'

import React from 'react'
import { useGallery } from './gallery-context'

export function GalleryFilters(): React.JSX.Element {
  const { budgetFilter, setBudgetFilter, typeFilter, setTypeFilter } = useGallery()

  return (
    <section className="w-full py-12 bg-[#F8F6F3] border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Budget Filters */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium min-w-[80px]">Budget:</span>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'smart', label: 'Smart Solutions' },
                { id: 'premium', label: 'Premium' },
                { id: 'luxury', label: 'Luxury' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setBudgetFilter(category.id as any)}
                  className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                    budgetFilter === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-primary/5'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Type Filters */}
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium min-w-[80px]">Type:</span>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'bath', label: 'Bathtubs' },
                { id: 'shower', label: 'Showers' },
                { id: 'accessibility', label: 'Accessibility' },
                { id: 'walls', label: 'Walls' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTypeFilter(type.id as any)}
                  className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                    typeFilter === type.id
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-primary/5'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
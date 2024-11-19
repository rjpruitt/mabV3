'use client'

import React from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { useGallery } from './gallery-context'

type GalleryItem = {
  id: number
  title: string
  type: 'bath' | 'shower' | 'accessibility' | 'walls'
  budgetTier: 'smart' | 'premium' | 'luxury'
  before: string
  after: string
  description: string
  timeframe: string
  location: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Modern Bath Transformation',
    type: 'bath',
    budgetTier: 'premium',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After',
    description: 'Complete bath update with premium fixtures and custom tile work',
    timeframe: '3 Days',
    location: 'Tulsa, OK'
  },
  {
    id: 2,
    title: 'Walk-In Shower Conversion',
    type: 'shower',
    budgetTier: 'smart',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After',
    description: 'Tub-to-shower conversion with safety features',
    timeframe: '1 Day',
    location: 'Oklahoma City, OK'
  },
  {
    id: 3,
    title: 'Luxury Master Bath',
    type: 'bath',
    budgetTier: 'luxury',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After',
    description: 'Complete luxury renovation with high-end finishes',
    timeframe: '7 Days',
    location: 'Broken Arrow, OK'
  }
]

export function GalleryGrid(): React.JSX.Element {
  const { budgetFilter, typeFilter } = useGallery()

  const filteredItems = galleryItems.filter(item => {
    const matchesBudget = budgetFilter === 'all' || item.budgetTier === budgetFilter
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    return matchesBudget && matchesType
  })

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-[#F8F6F3] rounded-sm overflow-hidden group"
            >
              {/* Project Image/Slider */}
              <div className="relative aspect-[4/3]">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={item.before}
                      alt={`${item.title} before`}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={item.after}
                      alt={`${item.title} after`}
                    />
                  }
                  position={50}
                  className="h-full"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-[#2F2F2F]">
                    {item.title}
                  </h3>
                  <span className={`text-sm px-2 py-1 rounded-sm ${
                    item.budgetTier === 'smart' ? 'bg-primary/10 text-primary' :
                    item.budgetTier === 'premium' ? 'bg-accent/10 text-accent' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.budgetTier.charAt(0).toUpperCase() + item.budgetTier.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-primary">{item.timeframe}</span>
                  <span className="text-gray-500">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'

type AccessoryCategory = 'storage' | 'safety' | 'seating'

type AccessoryOption = {
  id: string
  category: AccessoryCategory
  title: string
  description: string
  image: string
  features: string[]
  priceRange: 'Smart Solutions' | 'Premium' | 'Luxury'
  finish?: string
  shapeIds?: string[] // Only show for compatible shapes
}

const ACCESSORY_OPTIONS: Record<AccessoryCategory, AccessoryOption[]> = {
  'storage': [
    {
      id: 'corner-shelf',
      category: 'storage',
      title: 'Corner Shelf',
      description: 'Built-in corner shelf for shower essentials',
      image: '/images/design-tool/steps/accessories/corner-shelf.jpg',
      features: [
        'Seamless integration',
        'Easy to clean',
        'Matches wall material'
      ],
      priceRange: 'Smart Solutions'
    },
    {
      id: 'recessed-niche',
      category: 'storage',
      title: 'Recessed Storage Niche',
      description: 'Large recessed storage area for all your shower items',
      image: '/images/design-tool/steps/accessories/recessed-niche.jpg',
      features: [
        'Multiple size options',
        'Built into wall',
        'Custom placement'
      ],
      priceRange: 'Premium'
    }
  ],
  'safety': [
    {
      id: 'grab-bar-24',
      category: 'safety',
      title: '24" Grab Bar',
      description: 'ADA-compliant safety grab bar',
      image: '/images/design-tool/steps/accessories/grab-bar.jpg',
      features: [
        'ADA compliant',
        'Supports up to 500 lbs',
        'Multiple finish options'
      ],
      priceRange: 'Smart Solutions',
      finish: 'Chrome'
    },
    {
      id: 'corner-grab-bar',
      category: 'safety',
      title: 'L-Shaped Corner Bar',
      description: 'Corner-mounted safety bar for added stability',
      image: '/images/design-tool/steps/accessories/corner-grab-bar.jpg',
      features: [
        'L-shaped design',
        'Multiple mounting options',
        'Slip-resistant grip'
      ],
      priceRange: 'Premium',
      finish: 'Chrome'
    }
  ],
  'seating': [
    {
      id: 'fold-down-seat',
      category: 'seating',
      title: 'Fold-Down Shower Seat',
      description: 'Space-saving fold-down seat for comfort and safety',
      image: '/images/design-tool/steps/accessories/fold-down-seat.jpg',
      features: [
        'Folds up when not in use',
        'Supports up to 400 lbs',
        'Easy to clean'
      ],
      priceRange: 'Premium',
      shapeIds: ['rectangle-standard', 'rectangle-large']
    }
  ]
}

type AccessoriesStepProps = StepProps & {
  onSelect: (selections: Record<string, boolean>) => void
  selectedAccessories?: Record<string, boolean>
}

export function AccessoriesStep({
  onNext,
  onBack,
  onSelect,
  selectedAccessories = {}
}: AccessoriesStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()
  const [currentCategory, setCurrentCategory] = useState<AccessoryCategory>('storage')
  const [selections, setSelections] = useState<Record<string, boolean>>(selectedAccessories)

  const shapeId = currentDesign?.choices.find(c => c.category === 'shape')?.productId

  const handleToggle = (accessory: AccessoryOption) => {
    const newSelections = {
      ...selections,
      [accessory.id]: !selections[accessory.id]
    }
    setSelections(newSelections)
    onSelect(newSelections)
    
    // Update design storage
    updateDesign({
      choices: [
        ...(currentDesign?.choices || []).filter(c => c.category !== 'accessories'),
        {
          category: 'accessories',
          productId: 'accessory-set',
          selectedOptions: newSelections as Record<string, string | boolean>
        }
      ]
    })
  }

  const handleContinue = () => {
    onNext()
  }

  return (
    <div>
      {/* Category Navigation */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
          {(Object.keys(ACCESSORY_OPTIONS) as AccessoryCategory[]).map(category => (
            <button
              key={category}
              className={`
                px-4 py-2 -mb-px text-sm font-medium
                ${currentCategory === category 
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
              onClick={() => setCurrentCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {Object.entries(selections).some(([id, selected]) => 
                selected && ACCESSORY_OPTIONS[category].some(a => a.id === id)
              ) && ' ✓'}
            </button>
          ))}
        </div>
      </div>

      {/* Accessory Options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ACCESSORY_OPTIONS[currentCategory]
          .filter(accessory => !accessory.shapeIds || accessory.shapeIds.includes(shapeId || ''))
          .map(accessory => (
            <div
              key={accessory.id}
              className={`
                relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
                transition-transform hover:scale-[1.02]
                ${selections[accessory.id] ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => handleToggle(accessory)}
            >
              <div className="relative h-48">
                <Image
                  src={accessory.image}
                  alt={accessory.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {accessory.priceRange}
                  </span>
                </div>
                {selections[accessory.id] && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Selected
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{accessory.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{accessory.description}</p>
                <div className="space-y-1">
                  {accessory.features.map(feature => (
                    <div key={feature} className="flex items-center text-sm">
                      <span className="mr-2">•</span>
                      {feature}
                    </div>
                  ))}
                </div>
                {accessory.finish && (
                  <div className="mt-3 text-sm text-gray-500">
                    Finish: {accessory.finish}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleContinue}
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90"
        >
          Continue to Review
        </button>
      </div>
    </div>
  )
} 
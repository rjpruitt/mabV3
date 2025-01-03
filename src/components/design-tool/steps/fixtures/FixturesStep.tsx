'use client'

import Image from 'next/image'
import { useState } from 'react'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'

export type FixtureCategory = 'shower-head' | 'hand-shower' | 'control' | 'valve'

type FixtureOption = {
  id: string
  category: FixtureCategory
  title: string
  description: string
  image: string
  features: string[]
  priceRange: 'Smart Solutions' | 'Premium' | 'Luxury'
  finish?: string
}

const FIXTURE_OPTIONS: Record<FixtureCategory, FixtureOption[]> = {
  'shower-head': [
    {
      id: 'rain-shower-head',
      category: 'shower-head',
      title: 'Rain Shower Head',
      description: 'Overhead rainfall experience with wide coverage',
      image: '/images/design-tool/steps/fixtures/rain-shower-head.jpg',
      features: [
        'Large 8" diameter',
        'Multiple spray patterns',
        'Easy-clean nozzles'
      ],
      priceRange: 'Premium',
      finish: 'Chrome'
    },
    {
      id: 'standard-shower-head',
      category: 'shower-head',
      title: 'Standard Shower Head',
      description: 'Adjustable spray patterns for customized comfort',
      image: '/images/design-tool/steps/fixtures/standard-shower-head.jpg',
      features: [
        'Multiple spray settings',
        'Water-saving design',
        'Durable construction'
      ],
      priceRange: 'Smart Solutions',
      finish: 'Chrome'
    }
  ],
  'hand-shower': [
    {
      id: 'premium-hand-shower',
      category: 'hand-shower',
      title: 'Premium Hand Shower',
      description: 'Versatile hand shower with multiple functions',
      image: '/images/design-tool/steps/fixtures/premium-hand-shower.jpg',
      features: [
        'Magnetic docking',
        '5 spray patterns',
        'Extra-long hose'
      ],
      priceRange: 'Premium',
      finish: 'Chrome'
    }
  ],
  'control': [
    {
      id: 'digital-control',
      category: 'control',
      title: 'Digital Control Panel',
      description: 'Precise temperature and flow control with digital display',
      image: '/images/design-tool/steps/fixtures/digital-control.jpg',
      features: [
        'Digital temperature display',
        'Programmable settings',
        'Touch controls'
      ],
      priceRange: 'Luxury',
      finish: 'Chrome'
    },
    {
      id: 'standard-control',
      category: 'control',
      title: 'Standard Control',
      description: 'Traditional lever control for temperature and flow',
      image: '/images/design-tool/steps/fixtures/standard-control.jpg',
      features: [
        'Simple operation',
        'Reliable performance',
        'Temperature memory'
      ],
      priceRange: 'Smart Solutions',
      finish: 'Chrome'
    }
  ],
  'valve': [
    {
      id: 'thermostatic-valve',
      category: 'valve',
      title: 'Thermostatic Valve',
      description: 'Maintains consistent water temperature',
      image: '/images/design-tool/steps/fixtures/thermostatic-valve.jpg',
      features: [
        'Temperature stability',
        'Safety stop',
        'Quick response'
      ],
      priceRange: 'Premium',
      finish: 'Chrome'
    }
  ]
}

type FixturesStepProps = StepProps & {
  onSelect: (selections: Partial<Record<FixtureCategory, string>>) => void
  selectedFixtures?: Partial<Record<FixtureCategory, string>>
}

export function FixturesStep({
  onNext,
  onBack,
  onSelect,
  selectedFixtures = {}
}: FixturesStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()
  const [currentCategory, setCurrentCategory] = useState<FixtureCategory>('shower-head')
  const [selections, setSelections] = useState<Partial<Record<FixtureCategory, string>>>(selectedFixtures)

  const handleSelect = (fixture: FixtureOption) => {
    const newSelections = {
      ...selections,
      [fixture.category]: fixture.id
    }
    setSelections(newSelections)

    // If all required fixtures are selected, proceed
    if (Object.keys(newSelections).length >= 3) { // Minimum: shower-head, control, valve
      onSelect(newSelections)
      updateDesign({
        choices: [
          ...(currentDesign?.choices || []).filter(c => c.category !== 'fixtures'),
          {
            category: 'fixtures',
            productId: 'fixture-set',
            selectedOptions: newSelections
          }
        ]
      })
      onNext()
    }
  }

  return (
    <div>
      {/* Category Navigation */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
          {(Object.keys(FIXTURE_OPTIONS) as FixtureCategory[]).map(category => (
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
              {category.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
              {selections[category] && ' ✓'}
            </button>
          ))}
        </div>
      </div>

      {/* Fixture Options */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FIXTURE_OPTIONS[currentCategory].map(fixture => (
          <div
            key={fixture.id}
            className={`
              relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
              transition-transform hover:scale-[1.02]
              ${selections[fixture.category] === fixture.id ? 'ring-2 ring-primary' : ''}
            `}
            onClick={() => handleSelect(fixture)}
          >
            <div className="relative h-48">
              <Image
                src={fixture.image}
                alt={fixture.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {fixture.priceRange}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{fixture.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{fixture.description}</p>
              <div className="space-y-1">
                {fixture.features.map(feature => (
                  <div key={feature} className="flex items-center text-sm">
                    <span className="mr-2">•</span>
                    {feature}
                  </div>
                ))}
              </div>
              {fixture.finish && (
                <div className="mt-3 text-sm text-gray-500">
                  Finish: {fixture.finish}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Your Selections</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {(Object.keys(FIXTURE_OPTIONS) as FixtureCategory[]).map(category => (
            <div key={category} className="text-sm">
              <div className="font-medium">
                {category.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}:
              </div>
              <div className="text-gray-600">
                {selections[category] 
                  ? FIXTURE_OPTIONS[category].find(f => f.id === selections[category])?.title
                  : 'Not selected'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
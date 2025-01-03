'use client'

import Image from 'next/image'
import { useState } from 'react'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'

type WallOption = {
  id: string
  title: string
  description: string
  image: string
  projectTypes: ('tub-to-shower' | 'shower-replacement')[]
  shapeIds: string[]
  material: 'acrylic' | 'solid-surface' | 'tile'
  patterns: {
    id: string
    name: string
    image: string
    priceRange: 'Smart Solutions' | 'Premium' | 'Luxury'
  }[]
  features: string[]
}

const WALL_OPTIONS: WallOption[] = [
  {
    id: 'acrylic-wall',
    title: 'Acrylic Wall System',
    description: 'Easy to maintain with a variety of patterns and colors',
    image: '/images/design-tool/steps/walls/acrylic-wall.jpg',
    projectTypes: ['tub-to-shower', 'shower-replacement'],
    shapeIds: ['rectangle-standard', 'rectangle-large', 'neo-angle'],
    material: 'acrylic',
    patterns: [
      {
        id: 'classic-white',
        name: 'Classic White',
        image: '/images/design-tool/steps/walls/patterns/classic-white.jpg',
        priceRange: 'Smart Solutions'
      },
      {
        id: 'marble-carrara',
        name: 'Carrara Marble',
        image: '/images/design-tool/steps/walls/patterns/marble-carrara.jpg',
        priceRange: 'Premium'
      }
    ],
    features: [
      'Grout-free surface',
      'Easy to clean',
      'Mold and mildew resistant',
      'Lifetime warranty'
    ]
  },
  {
    id: 'solid-surface-wall',
    title: 'Solid Surface Walls',
    description: 'Premium material with seamless appearance',
    image: '/images/design-tool/steps/walls/solid-surface-wall.jpg',
    projectTypes: ['tub-to-shower', 'shower-replacement'],
    shapeIds: ['rectangle-standard', 'rectangle-large', 'neo-angle'],
    material: 'solid-surface',
    patterns: [
      {
        id: 'arctic-white',
        name: 'Arctic White',
        image: '/images/design-tool/steps/walls/patterns/arctic-white.jpg',
        priceRange: 'Premium'
      }
    ],
    features: [
      'Seamless appearance',
      'Superior durability',
      'Custom fabrication',
      'Lifetime warranty'
    ]
  }
]

type WallStepProps = StepProps & {
  onSelect: (wallId: string, patternId: string) => void
  selectedWallId?: string
  selectedPatternId?: string
}

export function WallStep({
  onNext,
  onBack,
  onSelect,
  selectedWallId,
  selectedPatternId
}: WallStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()
  const [selectedWall, setSelectedWall] = useState<WallOption | null>(
    selectedWallId ? WALL_OPTIONS.find(w => w.id === selectedWallId) || null : null
  )

  const projectType = currentDesign?.projectType
  const shapeId = currentDesign?.choices.find(c => c.category === 'shape')?.productId

  const filteredWalls = WALL_OPTIONS.filter(wall => 
    projectType && 
    shapeId && 
    wall.projectTypes.includes(projectType) &&
    wall.shapeIds.includes(shapeId)
  )

  const handleWallSelect = (wall: WallOption) => {
    setSelectedWall(wall)
  }

  const handlePatternSelect = (patternId: string) => {
    if (!selectedWall) return
    onSelect(selectedWall.id, patternId)
    updateDesign({
      choices: [
        ...(currentDesign?.choices || []).filter(c => c.category !== 'walls'),
        { 
          category: 'walls', 
          productId: selectedWall.id,
          selectedOptions: { pattern: patternId }
        }
      ]
    })
    onNext()
  }

  return (
    <div>
      {/* Material Selection */}
      {!selectedWall && (
        <div className="space-y-8">
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Wall System Materials</h3>
            <p className="text-gray-600">
              Choose your preferred wall material. Each option offers different benefits in terms of
              maintenance, appearance, and cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredWalls.map(wall => (
              <div
                key={wall.id}
                className={`
                  relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
                  transition-transform hover:scale-[1.02]
                  ${selectedWallId === wall.id ? 'ring-2 ring-primary' : ''}
                `}
                onClick={() => handleWallSelect(wall)}
              >
                <div className="relative h-48">
                  <Image
                    src={wall.image}
                    alt={wall.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{wall.title}</h3>
                  <p className="text-gray-600 mb-4">{wall.description}</p>
                  <div className="space-y-2">
                    {wall.features.map(feature => (
                      <div key={feature} className="flex items-center text-sm">
                        <span className="mr-2">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pattern Selection */}
      {selectedWall && (
        <div className="space-y-8">
          <button
            onClick={() => setSelectedWall(null)}
            className="text-primary hover:underline mb-4"
          >
            ← Back to Materials
          </button>

          <div className="grid md:grid-cols-3 gap-8">
            {selectedWall.patterns.map(pattern => (
              <div
                key={pattern.id}
                className={`
                  relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
                  transition-transform hover:scale-[1.02]
                  ${selectedPatternId === pattern.id ? 'ring-2 ring-primary' : ''}
                `}
                onClick={() => handlePatternSelect(pattern.id)}
              >
                <div className="relative h-48">
                  <Image
                    src={pattern.image}
                    alt={pattern.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {pattern.priceRange}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{pattern.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
'use client'

import Image from 'next/image'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'

type BaseOption = {
  id: string
  title: string
  description: string
  image: string
  projectTypes: ('tub-to-shower' | 'shower-replacement')[]
  shapeIds: string[]
  plumbingIds: string[]
  features: string[]
  material: 'acrylic' | 'solid-surface' | 'tile-ready'
  priceRange: 'Smart Solutions' | 'Premium' | 'Luxury'
}

const BASE_OPTIONS: BaseOption[] = [
  {
    id: 'standard-acrylic-60x32',
    title: 'Standard Acrylic Base',
    description: 'Durable, low-maintenance acrylic base with slip-resistant texture',
    image: '/images/design-tool/steps/base/standard-acrylic-60x32.jpg',
    projectTypes: ['tub-to-shower', 'shower-replacement'],
    shapeIds: ['rectangle-standard'],
    plumbingIds: ['left-drain', 'right-drain'],
    features: [
      'Slip-resistant texture',
      'Easy to clean',
      'Lifetime warranty'
    ],
    material: 'acrylic',
    priceRange: 'Smart Solutions'
  },
  {
    id: 'premium-solid-60x32',
    title: 'Premium Solid Surface Base',
    description: 'Luxurious solid surface material with integrated drain cover',
    image: '/images/design-tool/steps/base/premium-solid-60x32.jpg',
    projectTypes: ['tub-to-shower', 'shower-replacement'],
    shapeIds: ['rectangle-standard'],
    plumbingIds: ['left-drain', 'right-drain'],
    features: [
      'Integrated drain cover',
      'Ultra-low threshold',
      'Premium finish',
      'Lifetime warranty'
    ],
    material: 'solid-surface',
    priceRange: 'Premium'
  },
  // Add more base options...
]

type BaseStepProps = StepProps & {
  onSelect: (baseId: string) => void
  selectedBaseId?: string
}

export function BaseStep({
  onNext,
  onBack,
  onSelect,
  selectedBaseId
}: BaseStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()
  const projectType = currentDesign?.projectType
  const shapeId = currentDesign?.choices.find(c => c.category === 'shape')?.productId
  const plumbingId = currentDesign?.choices.find(c => c.category === 'plumbing')?.productId

  const filteredBases = BASE_OPTIONS.filter(base => 
    projectType && 
    shapeId && 
    plumbingId &&
    base.projectTypes.includes(projectType) &&
    base.shapeIds.includes(shapeId) &&
    base.plumbingIds.includes(plumbingId)
  )

  const handleSelect = (baseId: string) => {
    onSelect(baseId)
    updateDesign({
      choices: [
        ...(currentDesign?.choices || []).filter(c => c.category !== 'base'),
        { category: 'base', productId: baseId }
      ]
    })
    onNext()
  }

  return (
    <div>
      {/* Material Guide */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Shower Base Materials</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium">Smart Solutions (Acrylic)</h4>
            <p className="text-gray-600">Durable, easy to clean, great value</p>
          </div>
          <div>
            <h4 className="font-medium">Premium (Solid Surface)</h4>
            <p className="text-gray-600">Luxurious feel, superior durability</p>
          </div>
          <div>
            <h4 className="font-medium">Luxury (Tile-Ready)</h4>
            <p className="text-gray-600">Custom look, premium materials</p>
          </div>
        </div>
      </div>

      {/* Base Options */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredBases.map(base => (
          <div
            key={base.id}
            className={`
              relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
              transition-transform hover:scale-[1.02]
              ${selectedBaseId === base.id ? 'ring-2 ring-primary' : ''}
            `}
            onClick={() => handleSelect(base.id)}
          >
            <div className="relative h-64">
              <Image
                src={base.image}
                alt={base.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {base.priceRange}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{base.title}</h3>
              <p className="text-gray-600 mb-4">{base.description}</p>
              <div className="space-y-2">
                {base.features.map(feature => (
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
  )
} 
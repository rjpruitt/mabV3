'use client'

import Image from 'next/image'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'

type PlumbingOption = {
  id: string
  title: string
  description: string
  image: string
  projectTypes: ('tub-to-shower' | 'shower-replacement' | 'tub-shower-combo')[]
  shapeIds: string[]
}

const PLUMBING_OPTIONS: PlumbingOption[] = [
  {
    id: 'left-drain',
    title: 'Left Drain',
    description: 'Drain and plumbing connections on the left side',
    image: '/images/design-tool/steps/plumbing/left-drain.svg',
    projectTypes: ['tub-to-shower', 'shower-replacement', 'tub-shower-combo'],
    shapeIds: [
      'rectangle-standard-60',
      'rectangle-oversized-72',
      'alcove-rectangular',
      'corner-rectangular'
    ]
  },
  {
    id: 'right-drain',
    title: 'Right Drain',
    description: 'Drain and plumbing connections on the right side',
    image: '/images/design-tool/steps/plumbing/right-drain.svg',
    projectTypes: ['tub-to-shower', 'shower-replacement', 'tub-shower-combo'],
    shapeIds: [
      'rectangle-standard-60',
      'rectangle-oversized-72',
      'alcove-rectangular',
      'corner-rectangular'
    ]
  },
  {
    id: 'center-drain',
    title: 'Center Drain',
    description: 'Centrally located drain with flexible plumbing options',
    image: '/images/design-tool/steps/plumbing/center-drain.svg',
    projectTypes: ['shower-replacement'],
    shapeIds: [
      'alcove-square',
      'corner-square',
      'corner-curved',
      'corner-neo-angle'
    ]
  }
]

type PlumbingStepProps = StepProps & {
  onSelect: (plumbingId: string) => void
  selectedPlumbingId?: string
}

export function PlumbingStep({
  onNext,
  onBack,
  onSelect,
  selectedPlumbingId
}: PlumbingStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()
  const projectType = currentDesign?.projectType
  const shapeId = currentDesign?.choices?.find(c => c.category === 'shape')?.productId

  console.log('Plumbing Step - Current Design:', currentDesign)
  console.log('Plumbing Step - Project Type:', projectType)
  console.log('Plumbing Step - Shape ID:', shapeId)

  const filteredOptions = PLUMBING_OPTIONS.filter(option => 
    projectType && 
    shapeId && 
    option.projectTypes.includes(projectType) &&
    option.shapeIds.includes(shapeId)
  )

  console.log('Plumbing Step - Filtered Options:', filteredOptions)

  const handleSelect = (plumbingId: string) => {
    onSelect(plumbingId)
    updateDesign({
      choices: [
        ...(currentDesign?.choices || []).filter(c => c.category !== 'plumbing'),
        { category: 'plumbing', productId: plumbingId }
      ]
    })
    onNext()
  }

  return (
    <div>
      {/* Plumbing Location Guide */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Plumbing Location Guide</h3>
        <p className="text-gray-600">
          Select the option that best matches your current plumbing setup. 
          This helps ensure a proper fit and minimizes installation complexity.
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOptions.map(option => (
          <div
            key={option.id}
            className={`
              relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
              transition-transform hover:scale-[1.02]
              ${selectedPlumbingId === option.id ? 'ring-2 ring-primary' : ''}
            `}
            onClick={() => handleSelect(option.id)}
          >
            <div className="relative h-48">
              <Image
                src={option.image}
                alt={option.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Not sure about your plumbing configuration?
          <button className="text-primary ml-2 hover:underline">
            Get Help
          </button>
        </p>
      </div>
    </div>
  )
} 
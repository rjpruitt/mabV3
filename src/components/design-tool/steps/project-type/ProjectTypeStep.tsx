'use client'

import { StepProps, ProjectType } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'

type ProjectOption = {
  type: ProjectType
  title: string
  description: string
}

const PROJECT_OPTIONS: ProjectOption[] = [
  {
    type: 'tub-to-shower',
    title: 'Tub to Shower Conversion',
    description: 'Convert your existing bathtub into a modern walk-in shower'
  },
  {
    type: 'shower-replacement',
    title: 'Shower Replacement',
    description: 'Replace your existing shower with a brand new custom shower'
  },
  {
    type: 'tub-shower-combo',
    title: 'Tub and Shower Combo',
    description: 'Replace your existing tub and shower with a new combination unit'
  }
]

type ProjectTypeStepProps = StepProps & {
  onSelect: (type: ProjectType) => void
  selectedType?: ProjectType
}

export function ProjectTypeStep({ 
  onNext,
  onBack,
  onSelect,
  selectedType 
}: ProjectTypeStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()

  const handleSelect = async (type: ProjectType) => {
    console.log('Selected project type:', type)
    onSelect(type)
    
    // Update design and wait for state to be set
    await new Promise<void>(resolve => {
      updateDesign({ projectType: type })
      setTimeout(resolve, 0)
    })
    
    console.log('Updated design after setting:', currentDesign)
    onNext()
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {PROJECT_OPTIONS.map(option => (
        <div
          key={option.type}
          className={`
            bg-white rounded-lg shadow-lg p-6 cursor-pointer
            transition-transform hover:scale-[1.02]
            ${selectedType === option.type ? 'ring-2 ring-primary' : ''}
          `}
          onClick={() => handleSelect(option.type)}
        >
          <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
          <p className="text-gray-600">{option.description}</p>
        </div>
      ))}
    </div>
  )
} 
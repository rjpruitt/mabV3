'use client'

import Image from 'next/image'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'
import { DESIGN_TOOL_IMAGES } from '../../constants/images'
import { useEffect } from 'react'

type ShapeOption = {
  id: string
  title: string
  description: string
  image: string
  projectTypes: ('tub-to-shower' | 'shower-replacement' | 'tub-shower-combo')[]
  location?: 'alcove' | 'corner'
  dimensions: {
    length: string
    width: string
  }
}

const SHAPE_OPTIONS: ShapeOption[] = [
  {
    id: 'rectangle-standard-60',
    title: '60" Standard Rectangular Bathtub',
    description: 'Standard bathtub conversion for most bathrooms',
    image: DESIGN_TOOL_IMAGES.steps.shapes['rectangle-standard'],
    projectTypes: ['tub-to-shower', 'tub-shower-combo'],
    dimensions: {
      length: '60"',
      width: '32"'
    }
  },
  {
    id: 'rectangle-oversized-72',
    title: '72" Oversized Rectangular Bathtub',
    description: 'Larger bathtub conversion for spacious bathrooms',
    image: DESIGN_TOOL_IMAGES.steps.shapes['rectangle-large'],
    projectTypes: ['tub-to-shower', 'tub-shower-combo'],
    dimensions: {
      length: '72"',
      width: '36"'
    }
  },
  {
    id: 'alcove-rectangular',
    title: 'Alcove Rectangular Shower',
    description: 'Standard rectangular shower for alcove installation',
    image: DESIGN_TOOL_IMAGES.steps.shapes['rectangle-standard'],
    projectTypes: ['shower-replacement'],
    location: 'alcove',
    dimensions: {
      length: '60"',
      width: '32"'
    }
  },
  {
    id: 'alcove-square',
    title: 'Alcove Square Shower',
    description: 'Square shower design for alcove installation',
    image: DESIGN_TOOL_IMAGES.steps.shapes['square'],
    projectTypes: ['shower-replacement'],
    location: 'alcove',
    dimensions: {
      length: '48"',
      width: '48"'
    }
  },
  {
    id: 'corner-square',
    title: 'Corner Square Shower',
    description: 'Square shower design for corner installation',
    image: DESIGN_TOOL_IMAGES.steps.shapes['square'],
    projectTypes: ['shower-replacement'],
    location: 'corner',
    dimensions: {
      length: '48"',
      width: '48"'
    }
  },
  {
    id: 'corner-rectangular',
    title: 'Corner Rectangular Shower',
    description: 'Rectangular shower for corner installation',
    image: DESIGN_TOOL_IMAGES.steps.shapes['rectangle-large'],
    projectTypes: ['shower-replacement'],
    location: 'corner',
    dimensions: {
      length: '60"',
      width: '36"'
    }
  },
  {
    id: 'corner-curved',
    title: 'Corner Curved Shower',
    description: 'Elegant curved design for corner installation',
    image: DESIGN_TOOL_IMAGES.steps.shapes['curved'],
    projectTypes: ['shower-replacement'],
    location: 'corner',
    dimensions: {
      length: '38"',
      width: '38"'
    }
  },
  {
    id: 'corner-neo-angle',
    title: 'Neo-Angle Corner Shower',
    description: 'Space-saving neo-angle design for corner installation',
    image: DESIGN_TOOL_IMAGES.steps.shapes['neo-angle'],
    projectTypes: ['shower-replacement'],
    location: 'corner',
    dimensions: {
      length: '42"',
      width: '42"'
    }
  }
]

type ShapeStepProps = StepProps & {
  onSelect: (shapeId: string) => void
  selectedShapeId?: string
}

export function ShapeStep({
  onNext,
  onBack,
  onSelect,
  selectedShapeId
}: ShapeStepProps) {
  const { currentDesign, updateDesign } = useDesignStorage()
  const projectType = currentDesign?.projectType

  console.log('Shape Step - Current Design:', currentDesign)
  console.log('Shape Step - Project Type:', projectType)

  const filteredShapes = SHAPE_OPTIONS.filter(
    shape => projectType && shape.projectTypes.includes(projectType)
  )

  console.log('Shape Step - Filtered Shapes:', filteredShapes)
  console.log('Shape Step - All Shapes:', SHAPE_OPTIONS)

  const handleSelect = async (shapeId: string) => {
    onSelect(shapeId)
    
    await new Promise<void>(resolve => {
      updateDesign({
        choices: [
          ...(currentDesign?.choices || []).filter(c => c.category !== 'shape'),
          { category: 'shape', productId: shapeId }
        ]
      })
      setTimeout(resolve, 0)
    })

    console.log('Shape selected:', shapeId)
    console.log('Updated design:', currentDesign)
    
    onNext()
  }

  useEffect(() => {
    console.log('ShapeStep mounted/updated')
    console.log('Current Design:', currentDesign)
    console.log('Project Type:', projectType)
    console.log('Filtered Shapes:', filteredShapes)
  }, [currentDesign, projectType, filteredShapes])

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredShapes.map(shape => (
        <div
          key={shape.id}
          className={`
            relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer
            transition-transform hover:scale-[1.02]
            ${selectedShapeId === shape.id ? 'ring-2 ring-primary' : ''}
          `}
          onClick={() => handleSelect(shape.id)}
        >
          <div className="relative h-48">
            <Image
              src={shape.image}
              alt={shape.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{shape.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{shape.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span>Length: {shape.dimensions.length}</span>
              <span>Width: {shape.dimensions.width}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 
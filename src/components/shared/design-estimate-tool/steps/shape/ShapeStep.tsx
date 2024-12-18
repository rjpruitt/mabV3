'use client'

import React from 'react'

interface ShapeOption {
  id: string
  title: string
  description: string
  icon: string // SVG path
}

interface ShapeStepProps {
  onSelect: (shapeId: string) => void
  selectedShapeId?: string
  projectType: 'tub-to-shower' | 'shower-replacement'
}

const shapes: Record<'tub-to-shower' | 'shower-replacement', ShapeOption[]> = {
  'tub-to-shower': [
    {
      id: 'standard',
      title: 'Standard',
      description: 'Traditional rectangular layout',
      icon: 'M4 4h16v16H4z' // Simple rectangle
    }
  ],
  'shower-replacement': [
    {
      id: 'rectangular',
      title: 'Rectangular',
      description: 'Classic rectangular design',
      icon: 'M4 4h16v16H4z'
    },
    {
      id: 'neo-angle',
      title: 'Neo-Angle',
      description: 'Space-saving corner design',
      icon: 'M4 20h16L20 4H4z' // Simplified neo-angle
    },
    {
      id: 'curved',
      title: 'Curved',
      description: 'Elegant curved entrance',
      icon: 'M4 20h16c0-8-8-16-16-16z' // Simplified curve
    },
    {
      id: 'alcove',
      title: 'Alcove',
      description: 'Three-wall enclosure',
      icon: 'M6 4v16h12V4z' // Simplified alcove
    }
  ]
}

export function ShapeStep({ onSelect, selectedShapeId, projectType }: ShapeStepProps) {
  const availableShapes = shapes[projectType]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableShapes.map(shape => (
          <button
            key={shape.id}
            onClick={() => onSelect(shape.id)}
            className={`p-6 border rounded-lg hover:border-teal-500 transition-colors ${
              selectedShapeId === shape.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24">
                  <path fill="currentColor" d={shape.icon}/>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{shape.title}</h3>
                <p className="text-sm text-gray-600">{shape.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 
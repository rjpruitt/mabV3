'use client'

import React from 'react'

interface PlumbingOption {
  id: string
  title: string
  description: string
  icon: string
}

interface PlumbingStepProps {
  onSelect: (plumbingId: string) => void
  selectedPlumbingId?: string
  projectType: 'tub-to-shower' | 'shower-replacement'
}

const plumbingOptions: Record<'tub-to-shower' | 'shower-replacement', PlumbingOption[]> = {
  'tub-to-shower': [
    {
      id: 'tub-with-shower',
      title: 'Tub with Shower Head',
      description: 'I currently have a shower head installed above my tub',
      icon: 'M7 8v3h10V8a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3zm13 3H4v10h16V11z M12 2v4 M12 3c2 0 4 2 4 2'
    },
    {
      id: 'tub-only',
      title: 'Tub Only',
      description: 'I only have a bathtub, no shower head installed',
      icon: 'M7 8v3h10V8a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3zm13 3H4v10h16V11z'
    }
  ],
  'shower-replacement': [
    {
      id: 'standard-plumbing',
      title: 'Standard Shower Plumbing',
      description: 'Existing shower with standard plumbing configuration',
      icon: 'M4 4h16v16H4z M12 2v4 M12 3c2 0 4 2 4 2'
    }
  ]
}

export function PlumbingStep({ onSelect, selectedPlumbingId, projectType }: PlumbingStepProps) {
  const options = plumbingOptions[projectType]

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        This helps us determine the plumbing work needed for your project.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`p-6 border rounded-lg hover:border-teal-500 transition-colors ${
              selectedPlumbingId === option.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24">
                  <path fill="currentColor" d={option.icon}/>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 
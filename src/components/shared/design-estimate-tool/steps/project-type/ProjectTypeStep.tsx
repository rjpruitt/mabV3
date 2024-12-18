'use client'

import React from 'react'

interface ProjectTypeStepProps {
  onSelect: (type: 'tub-to-shower' | 'shower-replacement') => void
  selectedType?: 'tub-to-shower' | 'shower-replacement'
}

export function ProjectTypeStep({ onSelect, selectedType }: ProjectTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tub to Shower Option */}
        <button
          onClick={() => onSelect('tub-to-shower')}
          className={`p-6 border rounded-lg hover:border-teal-500 transition-colors ${
            selectedType === 'tub-to-shower' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              {/* Tub icon */}
              <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 8v3h10V8a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3zm13 3H4v10h16V11z"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Tub-to-Shower Conversion</h3>
              <p className="text-sm text-gray-600">Convert your existing bathtub into a modern shower</p>
            </div>
          </div>
        </button>

        {/* Shower Replacement Option */}
        <button
          onClick={() => onSelect('shower-replacement')}
          className={`p-6 border rounded-lg hover:border-teal-500 transition-colors ${
            selectedType === 'shower-replacement' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0">
              {/* Shower icon */}
              <svg className="w-full h-full text-gray-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 20h16V4H4v16zm2-2V6h12v12H6z"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Shower Replacement</h3>
              <p className="text-sm text-gray-600">Replace your existing shower with a new one</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
} 
'use client'

import React from 'react'
import { Step, StepNavigation } from '../navigation/StepNavigation'

export interface ProductSelection {
  category: 'base' | 'walls' | 'fixtures' | 'doors' | 'accessories'
  product: {
    id: string
    name: string
    image: string
    price: number
  }
}

interface DesignToolLayoutProps {
  children: React.ReactNode
  visualizerContent?: React.ReactNode
  selections?: ProductSelection[]
  steps: Step[]
  currentStepId: string
  onStepChange: (stepId: string) => void
}

export function DesignToolLayout({ children, visualizerContent, selections, steps, currentStepId, onStepChange }: DesignToolLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-teal-800 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button className="text-white" onClick={() => window.history.back()}>
            ← Back
          </button>
          <button className="px-4 py-2 bg-coral-500 rounded-full">
            Book Consultation
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row pb-24">
        {/* Visualizer/Accumulator Area - Larger on desktop */}
        <div className="w-full md:w-2/3 bg-gray-100 min-h-[300px] md:min-h-screen">
          {visualizerContent || (
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Your Selections</h3>
              <div className="flex flex-wrap gap-4">
                {selections?.map(selection => (
                  <div key={selection.product.id} className="bg-white p-2 rounded shadow">
                    <img 
                      src={selection.product.image} 
                      alt={selection.product.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="text-sm mt-2">{selection.product.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selection Interface - Smaller on desktop */}
        <div className="w-full md:w-1/3 bg-white">
          {children}
        </div>
      </div>

      {/* Add Step Navigation */}
      <StepNavigation 
        steps={steps}
        currentStepId={currentStepId}
        onStepChange={onStepChange}
      />
    </div>
  )
} 
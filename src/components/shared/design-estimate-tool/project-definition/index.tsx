'use client'

import { useState } from 'react'

export default function ProjectDefinition() {
  const [step, setStep] = useState(1)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-teal-800 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="text-white hover:text-gray-200"
            >
              ← Back
            </button>
            <h1 className="text-xl font-semibold">Design Your Perfect Shower</h1>
          </div>
          <button className="px-4 py-2 bg-coral-500 text-white rounded-full hover:bg-coral-600">
            Book Consultation
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Step 1: Project Definition */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Tell us about your current bathroom</h2>
          
          <div className="space-y-8">
            {/* Project Type */}
            <div>
              <h3 className="text-lg font-semibold mb-4">What type of shower project is this?</h3>
              <div className="space-y-4">
                <label className="block p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
                  <input 
                    type="radio" 
                    name="projectType" 
                    value="tub-shower"
                    className="mr-3"
                  />
                  <span>I have a tub/shower combination</span>
                </label>
                <label className="block p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
                  <input 
                    type="radio" 
                    name="projectType" 
                    value="tub-only"
                    className="mr-3"
                  />
                  <span>I have a bathtub only (no shower)</span>
                </label>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">What are the dimensions?</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Length</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Inches"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Width</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Inches"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Inches"
                  />
                </div>
              </div>
            </div>

            {/* Photos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Upload photos (optional)</h3>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <button className="text-blue-600 hover:text-blue-700">
                  Click to upload photos
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  This helps us understand your space better
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Step {step} of 7
          </div>
          <button 
            onClick={() => setStep(step + 1)}
            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </footer>
    </div>
  )
} 
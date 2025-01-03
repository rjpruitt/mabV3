'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLeadCapture } from '../lead-capture/useLeadCapture'
import { LeadCaptureModal } from '../lead-capture/LeadCaptureModal'
import { useDesignStorage } from '../storage/useDesignStorage'
import { DESIGN_TOOL_IMAGES } from '../constants/images'

type DesignerPackage = {
  id: string
  name: string
  description: string
  image: string
  style: string
  priceRange: 'Smart Solutions' | 'Premium' | 'Luxury'
  features: string[]
}

// Temporary mock data - will come from database later
const MOCK_PACKAGES: DesignerPackage[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean lines and contemporary styling for a sleek, modern look',
    image: DESIGN_TOOL_IMAGES.entry['designer-packages'],
    style: 'Modern',
    priceRange: 'Premium',
    features: ['Frameless glass', 'Rain shower head', 'Linear drain', 'Built-in storage']
  },
  // Add more mock packages...
]

export function DesignPackages() {
  const [selectedPackage, setSelectedPackage] = useState<DesignerPackage | null>(null)
  const { startNewDesign } = useDesignStorage()
  const {
    isLeadCaptureOpen,
    leadCaptureTrigger,
    openLeadCapture,
    closeLeadCapture,
    handleLeadCapture
  } = useLeadCapture()

  const handlePackageSelect = (pkg: DesignerPackage) => {
    setSelectedPackage(pkg)
    startNewDesign('designer-package')
    openLeadCapture('get-price')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-2">Designer Collections</h1>
          <p className="text-gray-600">
            Browse our curated shower designs created by expert designers
          </p>
        </div>
      </div>

      {/* Filters - To be implemented */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Style, Price Range, Features filters will go here */}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PACKAGES.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{pkg.name}</h2>
                  <span className="text-sm text-primary font-medium">
                    {pkg.priceRange}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="space-y-2 mb-6">
                  {pkg.features.map(feature => (
                    <div key={feature} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">•</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
                >
                  Get Price
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isLeadCaptureOpen}
        onClose={closeLeadCapture}
        onSubmit={handleLeadCapture}
        trigger={leadCaptureTrigger}
      />
    </div>
  )
} 
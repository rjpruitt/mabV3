'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLeadCapture } from '../lead-capture/useLeadCapture'
import { LeadCaptureModal } from '../lead-capture/LeadCaptureModal'
import { useDesignStorage } from '../storage/useDesignStorage'
import { DESIGN_TOOL_IMAGES } from '../constants/images'

export function DesignToolEntry() {
  const router = useRouter()
  const { startNewDesign } = useDesignStorage()
  const {
    isLeadCaptureOpen,
    leadCaptureTrigger,
    openLeadCapture,
    closeLeadCapture,
    handleLeadCapture
  } = useLeadCapture()

  const handleDesignerPath = () => {
    startNewDesign('designer-package')
    router.push('/design-your-shower/packages')
  }

  const handleCustomPath = () => {
    startNewDesign('custom')
    router.push('/design-your-shower/custom')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900">
        <Image
          src={DESIGN_TOOL_IMAGES.entry['hero-bg']}
          alt="Design Your Dream Shower"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Design Your Dream Shower
            </h1>
            <p className="text-xl text-white">
              Choose from our designer collections or create your own custom design
            </p>
          </div>
        </div>
      </div>

      {/* Path Selection */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Designer Packages */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={DESIGN_TOOL_IMAGES.entry['designer-packages']}
                alt="Designer Packages"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Designer Packages</h2>
              <p className="text-gray-600 mb-4">
                Browse our curated collections of complete shower designs created by our expert designers
              </p>
              <button
                onClick={handleDesignerPath}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
              >
                View Designer Collections
              </button>
            </div>
          </div>

          {/* Create Your Own */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={DESIGN_TOOL_IMAGES.entry['custom-design']}
                alt="Create Your Own Design"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Create Your Own</h2>
              <p className="text-gray-600 mb-4">
                Design your perfect shower step by step with our interactive design tool
              </p>
              <button
                onClick={handleCustomPath}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Start Designing
              </button>
            </div>
          </div>
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
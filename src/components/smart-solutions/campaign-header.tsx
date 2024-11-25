'use client'

import React from 'react'
import { Phone } from 'lucide-react'

export function CampaignHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner with Logo and Phone */}
      <div className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center gap-4">
            <span className="text-lg" style={{ fontFamily: 'var(--font-playfair-display-sc)' }}>
              Mid America Bathworks
            </span>
            <a href="tel:1-555-555-5555" className="flex items-center gap-2 whitespace-nowrap">
              <Phone className="w-4 h-4" />
              <span className="text-lg">1-555-555-5555</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
} 
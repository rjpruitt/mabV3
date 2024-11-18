'use client'

import React from 'react'
import { Phone } from 'lucide-react'

export function TopBanner() {
  return (
    <div 
      className="bg-primary-light text-white h-[50px] flex items-center font-montserrat"
      role="banner"
    >
      <div className="container mx-auto flex justify-between items-center gap-2 text-[17px] font-semibold px-4">
        <div>
          Fast-track service for accessibility & safety needs
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="shrink-0" />
          <span itemProp="telephone">Call us today 1 (555) 555-5555</span>
        </div>
      </div>
    </div>
  )
} 
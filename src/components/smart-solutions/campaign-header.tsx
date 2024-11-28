'use client'

import React from 'react'

export function CampaignHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[48px]">
      <div className="bg-primary text-white h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <span className="font-logo text-2xl tracking-wide">
              Mid America Bathworks
            </span>
          </div>
        </div>
      </div>
    </header>
  )
} 
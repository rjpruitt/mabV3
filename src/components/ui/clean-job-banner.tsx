'use client'

import React from 'react'
import { Shield } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

interface CleanJobBannerProps {
  className?: string
}

export function CleanJobBanner({ className = '' }: CleanJobBannerProps) {
  return (
    <ScrollReveal>
      <div className={`bg-[#F8F6F3] p-8 rounded-sm ${className}`}>
        <div className="flex items-start gap-6">
          <Shield className="w-12 h-12 text-primary shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-2">
              Our Clean Job Site Promise
            </h3>
            <p className="text-gray-600">
              We protect your home during installation and leave your space spotless. 
              Daily cleanup, dust barriers, and thorough final cleaning included.
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
} 
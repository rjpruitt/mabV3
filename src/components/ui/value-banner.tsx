'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { TrendingUp } from 'lucide-react'

export function ValueBanner() {
  return (
    <div className="bg-primary text-white py-3">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <TrendingUp className="w-5 h-5 text-accent shrink-0" />
            <p className="text-sm md:text-base font-medium">
              Zillow data shows that bathroom remodels yield the biggest returns in boosting home value.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
} 
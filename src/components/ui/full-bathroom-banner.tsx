'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Sparkles } from 'lucide-react'
import { DesignConsultation } from '@/components/ui/design-consultation'
import type { ConsultationResponse } from '@/components/ui/design-consultation'

export function FullBathroomBanner() {
  const [showConsultation, setShowConsultation] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollReveal>
        <div className="bg-[#334B6E] text-white py-3 rounded-sm shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-white/10 p-3 rounded-sm">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-pt-serif text-white mb-2">
                  Need a Complete Bathroom Transformation?
                </h3>
                <p className="text-white/80">
                  We do that too. Our experts can help you explore all your options.
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowConsultation(true)}
              className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-sm text-lg font-semibold transition-colors"
            >
              Discover Your Options
            </button>
          </div>
        </div>
      </ScrollReveal>

      <DesignConsultation
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
        onComplete={(responses: ConsultationResponse) => {
          console.log('Consultation responses:', responses)
          setShowConsultation(false)
        }}
      />
    </div>
  )
} 
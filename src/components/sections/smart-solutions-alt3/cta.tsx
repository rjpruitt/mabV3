'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { DesignConsultation } from '@/components/ui/design-consultation'
import type { ConsultationResponse } from '@/components/ui/design-consultation'

const benefits = [
  'Free consultation with your installation team',
  'Premium materials and expert installation',
  'Most projects completed in 1-3 days',
  'Comprehensive warranties for peace of mind'
]

export function TransformationCTA(): React.JSX.Element {
  const [showConsultation, setShowConsultation] = useState(false)

  return (
    <>
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="font-pt-serif text-4xl mb-4">
                  Ready to Transform Your Bathroom?
                </h2>
                <p className="text-xl text-white/90">
                  Start with a free consultation. No pressure, just expert advice from 
                  the team that will handle your installation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center md:text-left">
                  <button 
                    onClick={() => setShowConsultation(true)}
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-sm text-lg font-semibold mb-4 w-full md:w-auto"
                  >
                    Book Your Free Consultation
                  </button>
                  <p className="text-white/80 flex items-center justify-center md:justify-start gap-2">
                    Or call us at{' '}
                    <span className="text-accent font-semibold">
                      1 (555) 555-5555
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <DesignConsultation
        isOpen={showConsultation}
        onClose={() => setShowConsultation(false)}
        onComplete={(responses: ConsultationResponse) => {
          console.log('Consultation responses:', responses)
          setShowConsultation(false)
        }}
      />
    </>
  )
}

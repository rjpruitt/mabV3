'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function AccessibilityHero() {
  return (
    <Section className="w-full py-32 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-pt-serif text-5xl text-[#2F2F2F] mb-6">
              Accessibility & Safety Solutions
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Transform your bathroom into a safe, accessible space without compromising on style. 
              Our solutions combine innovative safety features with elegant design to enhance both 
              comfort and independence.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
} 
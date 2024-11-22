'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Image from 'next/image'

export function SafetyAssessmentCTA() {
  return (
    <Section className="w-full py-32 bg-[#F8F6F3] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="https://placehold.co/1200x800/016369/FFFFFF/png?text=Safety+Assessment"
                alt="Safety Assessment Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Content Section */}
          <ScrollReveal>
            <div className="text-left max-w-xl">
              <h2 className="font-pt-serif text-4xl mb-6 text-[#2F2F2F]">
                Get Your Free Safety Assessment
              </h2>
              <p className="text-lg mb-8 text-gray-600">
                Our accessibility experts will evaluate your bathroom and recommend personalized safety solutions. 
                Schedule your no-obligation assessment today and take the first step toward a safer, more comfortable home.
              </p>
              <button className="bg-accent text-white hover:bg-accent/90 px-8 py-3 rounded-sm transition-colors">
                SCHEDULE FREE ASSESSMENT
              </button>
              <p className="mt-4 text-2xl text-accent font-dancing">
                Professional evaluation at no cost!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
} 
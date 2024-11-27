'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Users, Sparkles, Palette } from 'lucide-react'

interface ExpertGuidance {
  title: string
  consultantInfo: string
  sampleInfo: string
}

interface DecisionSupport {
  preDesigned: string
  custom: string
}

interface StyleExplorerWithSupportProps {
  expertGuidance: ExpertGuidance
  decisionSupport: DecisionSupport
}

const styles = [
  {
    name: 'Modern Minimalist',
    description: 'Clean lines and contemporary elegance',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Modern',
    features: ['Frameless glass', 'Large format tiles', 'Hidden storage']
  },
  {
    name: 'Timeless Traditional',
    description: 'Classic beauty with modern convenience',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Traditional',
    features: ['Marble patterns', 'Decorative hardware', 'Built-in shelving']
  },
  {
    name: 'Spa Retreat',
    description: 'Your daily sanctuary of relaxation',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Spa',
    features: ['Rain showerhead', 'Natural textures', 'Bench seating']
  }
]

export function StyleExplorerWithSupport({ 
  expertGuidance,
  decisionSupport 
}: StyleExplorerWithSupportProps) {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Your Style, Your Choice
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {decisionSupport.preDesigned}
              <br />
              {decisionSupport.custom}
            </p>
          </div>
        </ScrollReveal>

        {/* Style Collections */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {styles.map((style) => (
            <ScrollReveal key={style.name}>
              <div className="bg-[#F8F6F3] rounded-sm overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                    {style.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {style.description}
                  </p>
                  <ul className="space-y-2">
                    {style.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Expert Support */}
        <ScrollReveal>
          <div className="bg-[#F8F6F3] p-8 rounded-sm">
            <h3 className="text-2xl font-semibold text-[#2F2F2F] text-center mb-8">
              {expertGuidance.title}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-gray-600">
                  {expertGuidance.consultantInfo}
                </p>
              </div>
              <div className="text-center">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-gray-600">
                  {expertGuidance.sampleInfo}
                </p>
              </div>
              <div className="text-center">
                <Palette className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-gray-600">
                  See all options in your home
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 
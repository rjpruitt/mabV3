'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HardHat, ShieldCheck, UserCheck } from 'lucide-react'

const teamFeatures = [
  {
    icon: HardHat,
    title: 'Expert Installers',
    description: 'Factory-certified professionals with years of experience'
  },
  {
    icon: ShieldCheck,
    title: 'Background Checked',
    description: 'Every team member is thoroughly vetted and trustworthy'
  },
  {
    icon: UserCheck,
    title: 'Your Dedicated Team',
    description: 'Work with the same team from consultation to completion'
  }
]

export function TeamAtWork() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Meet Your Installation Team
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Professional, Courteous, Expert Installation
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our installation teams take pride in their craftsmanship and attention to detail. 
              See how we transform bathrooms with care and expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Team Photos Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* For now using placeholders - we'll need actual team photos */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="https://placehold.co/1200x900/016369/FFFFFF/png?text=Team+Installing+Shower"
                alt="Installation team at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="https://placehold.co/1200x900/016369/FFFFFF/png?text=Detail+Work"
                alt="Detailed installation work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Team Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-sm">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#2F2F2F] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 
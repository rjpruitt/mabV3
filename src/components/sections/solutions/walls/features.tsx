'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Check } from 'lucide-react'

const features = [
  {
    title: 'Moisture Protection',
    description: 'Our wall solutions provide superior moisture resistance, protecting your walls from water damage.',
    benefits: [
      'Water-resistant materials',
      'Mold and mildew resistant',
      'Easy to clean surfaces',
      'Long-lasting protection'
    ]
  },
  {
    title: 'Easy Maintenance',
    description: 'Keep your bathroom walls looking beautiful with minimal effort.',
    benefits: [
      'Wipe-clean surfaces',
      'No grout to maintain',
      'Stain-resistant materials',
      'Durable finishes'
    ]
  },
  {
    title: 'Professional Installation',
    description: 'Expert installation ensures perfect results and long-lasting performance.',
    benefits: [
      'Factory-trained installers',
      'Precise measurements',
      'Clean installation process',
      'Quality guarantee'
    ]
  }
]

export function WallFeatures() {
  return (
    <section className="w-full py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              The Benefits of Our Wall Solutions
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover why our wall treatments are the perfect choice for your bathroom renovation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <ScrollReveal key={feature.title}>
              <div className="bg-white p-8 rounded-sm">
                <h3 className="font-semibold text-xl text-[#2F2F2F] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 
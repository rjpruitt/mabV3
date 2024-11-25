'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const hardwareOptions = [
  {
    title: 'Premium Fixtures',
    description: 'High-quality faucets, showerheads, and controls',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Premium+Fixtures',
    features: [
      'Multiple finish options',
      'Coordinated collections',
      'Water-efficient designs',
      'Easy-grip handles'
    ]
  },
  {
    title: 'Bathroom Hardware',
    description: 'Essential accessories for daily convenience',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Bath+Hardware',
    features: [
      'Towel bars & rings',
      'Robe hooks',
      'Paper holders',
      'Matching finishes'
    ]
  },
  {
    title: 'Mirrors & Lighting',
    description: 'Functional and decorative lighting solutions',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Mirrors+Lighting',
    features: [
      'LED lighting options',
      'Custom mirror sizes',
      'Anti-fog features',
      'Modern designs'
    ]
  }
]

export function DecorativeHardware() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Decorative Hardware & Fixtures
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Complete your bathroom with our selection of premium hardware and fixtures, 
              designed to add both style and functionality to your space.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-16">
          {hardwareOptions.map((option, index) => (
            <ScrollReveal key={option.title}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="font-semibold text-2xl text-[#2F2F2F] mb-4">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {option.description}
                  </p>
                  <ul className="space-y-3">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`relative aspect-[4/3] ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover rounded-sm"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 
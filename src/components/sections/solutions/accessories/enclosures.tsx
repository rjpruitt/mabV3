'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const enclosureTypes = [
  {
    title: 'Frameless Glass Doors',
    description: 'Elegant, modern doors that create an open, spacious feel',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Frameless+Glass',
    features: [
      'Sleek, minimal design',
      'Easy to clean',
      'Premium hardware',
      'Custom sizing available'
    ]
  },
  {
    title: 'Semi-Frameless Enclosures',
    description: 'Perfect balance of style and value',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Semi+Frameless',
    features: [
      'Durable construction',
      'Multiple finish options',
      'Cost-effective',
      'Modern appearance'
    ]
  },
  {
    title: 'Sliding Door Systems',
    description: 'Space-saving solutions with smooth operation',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Sliding+Doors',
    features: [
      'Space efficient',
      'Smooth gliding mechanism',
      'Easy maintenance',
      'Various styles available'
    ]
  }
]

export function ShowerEnclosures() {
  return (
    <section className="w-full py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Shower Enclosures & Doors
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Transform your shower space with our selection of premium enclosures and doors, 
              combining style with functionality.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-16">
          {enclosureTypes.map((type, index) => (
            <ScrollReveal key={type.title}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="font-semibold text-2xl text-[#2F2F2F] mb-4">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-3">
                    {type.features.map((feature) => (
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
                    src={type.image}
                    alt={type.title}
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
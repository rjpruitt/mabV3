'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const wallColors = [
  {
    name: 'Amalfi Marble™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Amalfi+Marble'
  },
  {
    name: 'Amber Mist™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Amber+Mist'
  },
  {
    name: 'Beige',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Beige'
  },
  {
    name: 'Cathedral Marble™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Cathedral+Marble'
  },
  {
    name: 'Desert Stone™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Desert+Stone'
  },
  {
    name: 'Forged Slate™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Forged+Slate'
  },
  {
    name: 'Gold Rush™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Gold+Rush'
  },
  {
    name: 'Grey',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Grey'
  },
  {
    name: 'Harbor Rain™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Harbor+Rain'
  },
  {
    name: 'Ivory',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Ivory'
  },
  {
    name: 'Lunar Rock™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Lunar+Rock'
  },
  {
    name: 'Mojave Sands™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Mojave+Sands'
  },
  {
    name: 'Onyx Mist™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Onyx+Mist'
  },
  {
    name: 'Sierra Clay™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Sierra+Clay'
  },
  {
    name: 'Thelan Ivory™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Thelan+Ivory'
  },
  {
    name: 'Titanium Rain™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Titanium+Rain'
  },
  {
    name: 'White',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=White'
  },
  {
    name: 'Yellowstone Slate™',
    image: 'https://placehold.co/400x400/016369/FFFFFF/png?text=Yellowstone+Slate'
  }
]

export function DesignOptions() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Designer Wall Collection
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choose from our carefully selected collection of colors and patterns to create your perfect bathroom.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {wallColors.map((color) => (
            <ScrollReveal key={color.name}>
              <div className="space-y-2">
                <div className="relative aspect-square">
                  <Image
                    src={color.image}
                    alt={color.name}
                    fill
                    className="object-cover rounded-sm"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
                <p className="text-center text-sm text-gray-600">
                  {color.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 
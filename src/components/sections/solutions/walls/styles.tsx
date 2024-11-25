'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const wallStyles = [
  {
    name: "Classic Raised Panel",
    description: "Timeless elegance with traditional raised panels",
    image: "https://placehold.co/800x600/016369/FFFFFF/png?text=Classic+Panels",
    features: ["Moisture-resistant", "Easy to clean", "Classic look"]
  },
  {
    name: "Modern Beadboard",
    description: "Contemporary take on a traditional style",
    image: "https://placehold.co/800x600/016369/FFFFFF/png?text=Modern+Beadboard",
    features: ["Vertical lines", "Subtle texture", "Contemporary feel"]
  },
  {
    name: "Geometric Panels",
    description: "Bold patterns for modern spaces",
    image: "https://placehold.co/800x600/016369/FFFFFF/png?text=Geometric+Panels",
    features: ["Unique patterns", "Visual interest", "Modern aesthetic"]
  }
]

export function WallStyles() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Wall Style Options
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              From classic wainscoting to modern wall panels, discover the perfect style for your bathroom.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wallStyles.map((style) => (
            <ScrollReveal key={style.name}>
              <div className="bg-[#F8F6F3] rounded-sm overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                    {style.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {style.description}
                  </p>
                  <ul className="space-y-2">
                    {style.features.map((feature) => (
                      <li 
                        key={feature} 
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 
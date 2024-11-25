'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Image from 'next/image'

const materials = [
  {
    name: 'Engineered Stone Panels',
    description: 'Premium crushed stone material offering superior durability and elegance',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Engineered+Stone',
    benefits: [
      'Natural stone appearance',
      'Superior durability',
      'Impact resistant',
      'Grout-free installation',
      'Seamless look'
    ]
  },
  {
    name: 'Natural Stone',
    description: 'Timeless elegance with unique patterns in every piece',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Natural+Stone',
    benefits: [
      'Unique natural patterns',
      'Premium appearance',
      'Long-lasting beauty',
      'Increases home value',
      'Heat resistant'
    ]
  },
  {
    name: 'Ceramic & Porcelain Tile',
    description: 'Classic choice offering endless design possibilities',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Tile',
    benefits: [
      'Vast style options',
      'Durable surface',
      'Water resistant',
      'Design flexibility',
      'Cost-effective'
    ]
  },
  {
    name: 'Wood & Wood-Look',
    description: 'Warm, natural aesthetics with modern protection',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Wood',
    benefits: [
      'Natural warmth',
      'Moisture-sealed',
      'Traditional look',
      'Various finishes',
      'Renewable material'
    ]
  },
  {
    name: 'Composite Wall Panels',
    description: 'Advanced polymer-mineral blend combining durability with style',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Composite',
    benefits: [
      'Moisture resistant',
      'Dent and scratch resistant',
      'Wide range of finishes',
      'Temperature stable',
      'Cost-effective'
    ]
  },
  {
    name: 'PVC Wall Panels',
    description: 'Lightweight, waterproof panels ideal for wet areas',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=PVC+Panels',
    benefits: [
      'Completely waterproof',
      'Easy to clean',
      'Quick installation',
      'Budget-friendly',
      'Low maintenance'
    ]
  }
]

export function MaterialGuide() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Material Options
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choose from our selection of high-quality materials, each designed to provide 
              lasting beauty and protection for your bathroom walls.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material) => (
            <ScrollReveal key={material.name}>
              <div className="bg-[#F8F6F3] rounded-sm overflow-hidden">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                    {material.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {material.description}
                  </p>
                  <ul className="space-y-2">
                    {material.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {benefit}
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
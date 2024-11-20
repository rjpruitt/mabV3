'use client'

import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

const features = [
  {
    id: 'safety',
    title: 'Safety & Accessibility',
    description: 'Features that make your bathroom safer and more accessible',
    items: [
      'Walk-in showers',
      'Safety grab bars',
      'Non-slip surfaces',
      'Comfort-height fixtures'
    ],
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Safety'
  },
  {
    id: 'storage',
    title: 'Smart Storage',
    description: 'Innovative storage solutions for any space',
    items: [
      'Built-in shelving',
      'Custom cabinets',
      'Recessed storage',
      'Organization systems'
    ],
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Storage'
  },
  {
    id: 'luxury',
    title: 'Luxury Features',
    description: 'Premium additions for the ultimate bathroom experience',
    items: [
      'Rain showerheads',
      'Custom lighting',
      'Heated floors',
      'Premium fixtures'
    ],
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Luxury'
  }
]

export function FeatureShowcase(): React.JSX.Element {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
            Features You'll Love
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the features that will make your bathroom both beautiful and functional. 
            From safety features to luxury additions, find the perfect combination for your needs.
          </p>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h3 className="font-semibold text-2xl text-[#2F2F2F] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`relative aspect-[4/3] ${
                index % 2 === 1 ? 'lg:col-start-1' : ''
              }`}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover rounded-sm"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
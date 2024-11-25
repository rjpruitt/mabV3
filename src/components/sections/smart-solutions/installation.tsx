'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const options = [
  {
    title: 'Tub-To-Shower Conversion',
    description: 'Transform your outdated tub into a modern, accessible shower in just one day. Mid America Bathworks specializes in quick, efficient conversions that maximize your bathroom space.',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Tub+To+Shower',
    benefits: [
      'One-day installation',
      'Expanded space',
      'Enhanced safety',
      'Custom design'
    ]
  },
  {
    title: 'Shower Replacement',
    description: 'Upgrade your existing shower with our premium low-threshold design, featuring easy-maintenance walls and modern fixtures. Choose from our selection of accessories to create your perfect shower.',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Shower+Replacement',
    benefits: [
      'Quick installation',
      'Premium materials',
      'Zero maintenance',
      'Lifetime warranty'
    ]
  }
]

export function InstallationOptions() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Your Perfect Shower Solution
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Whether you're replacing an old bathtub or updating your existing shower, we'll transform your 
              space in as little as one day. Choose the solution that's right for you.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-16">
          {options.map((option, index) => (
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
                  <div className="grid grid-cols-2 gap-4">
                    {option.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
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
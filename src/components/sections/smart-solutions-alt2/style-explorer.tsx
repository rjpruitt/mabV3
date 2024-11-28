'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { CheckCircle, ArrowRight } from 'lucide-react'

const styles = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    image: 'https://placehold.co/1200x900/2F4F4F/FFFFFF/png?text=Modern+Minimalist',
    features: [
      'Frameless glass design',
      'Clean lines and minimal hardware',
      'Contemporary fixtures',
      'Sleek wall panels'
    ]
  },
  {
    id: 'spa',
    name: 'Spa Retreat',
    image: 'https://placehold.co/1200x900/016369/FFFFFF/png?text=Spa+Retreat',
    features: [
      'Rain shower head',
      'Built-in seating',
      'Multiple shower heads',
      'Natural stone look'
    ]
  },
  {
    id: 'accessible',
    name: 'Accessible Luxury',
    image: 'https://placehold.co/1200x900/4A5D5C/FFFFFF/png?text=Accessible+Luxury',
    features: [
      'Zero-threshold entry',
      'Built-in grab bars',
      'Anti-slip flooring',
      'Easy-reach controls'
    ]
  }
]

export function StyleExplorer(): React.JSX.Element {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Design Your Perfect Space
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Explore Our Most Popular Styles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From modern minimalist to spa-inspired luxury, find the perfect style for your home. 
              Each design can be customized to your preferences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style, index) => (
            <ScrollReveal key={style.id} delay={index * 0.2}>
              <div className="group bg-white rounded-sm shadow-sm hover:shadow-md transition-all">
                {/* Style Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Style Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
                    {style.name}
                  </h3>
                  
                  <ul className="space-y-3 mb-6">
                    {style.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="flex items-center gap-2 text-primary font-semibold group-hover:text-primary-dark transition-colors">
                    Explore This Style
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Design Support */}
        <ScrollReveal>
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg">
              Not sure which style is right for you? Our design experts will help you choose 
              the perfect combination of features and finishes.
            </p>
            <button className="mt-6 bg-accent text-white px-8 py-4 rounded-sm text-lg font-semibold hover:bg-accent/90 transition-colors">
              Get Expert Design Help
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

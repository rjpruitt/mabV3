'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Shield, Star, Clock, Wrench } from 'lucide-react'

const warranties = [
  {
    type: 'Product',
    duration: 'Lifetime',
    description: 'Our premium materials and fixtures are guaranteed to last'
  },
  {
    type: 'Installation',
    duration: '5 Years',
    description: 'Expert installation backed by our comprehensive warranty'
  },
  {
    type: 'Workmanship',
    duration: '2 Years',
    description: 'Every detail of our work is guaranteed'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Premium Materials',
    description: 'High-quality, durable materials that stand the test of time'
  },
  {
    icon: Star,
    title: 'Expert Installation',
    description: 'Factory-certified installers with years of experience'
  },
  {
    icon: Clock,
    title: 'Efficient Process',
    description: 'Most projects completed in 1-3 days with minimal disruption'
  },
  {
    icon: Wrench,
    title: 'Built to Last',
    description: 'Quality craftsmanship backed by comprehensive warranties'
  }
]

export function QualityValue(): React.JSX.Element {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Quality You Can Trust
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Premium Quality, Guaranteed
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We stand behind our work with industry-leading warranties and 
              a commitment to excellence in every installation.
            </p>
          </div>
        </ScrollReveal>

        {/* Warranties */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {warranties.map((warranty, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-sm p-6 shadow-sm">
                <div className="text-primary font-bold text-3xl mb-2">
                  {warranty.duration}
                </div>
                <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                  {warranty.type} Warranty
                </h3>
                <p className="text-gray-600">
                  {warranty.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

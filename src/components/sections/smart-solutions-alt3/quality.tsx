'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Shield, Star, Clock, Wrench } from 'lucide-react'

const warranties = [
  {
    type: 'Product',
    duration: 'Industry Leading',
    description: 'Premium products backed by top manufacturer warranties.'
  },
  {
    type: 'Installation',
    duration: '5 Years',
    description: 'Expert craftsmanship and installation quality guaranteed.'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Premium Materials',
    description: 'High-quality, durable materials that stand the test of time.'
  },
  {
    icon: Star,
    title: 'Expert Installation',
    description: 'Factory-certified installers with years of experience.'
  },
  {
    icon: Clock,
    title: 'Efficient Process',
    description: 'Most projects completed in 1-3 days with minimal disruption.'
  },
  {
    icon: Wrench,
    title: 'Built to Last',
    description: 'Quality craftsmanship backed by comprehensive warranties.'
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
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto">
          {warranties.map((warranty, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-sm p-6 shadow-sm h-full md:min-h-[200px] flex flex-col">
                <div className="text-primary font-bold text-3xl mb-2">
                  {warranty.duration}
                </div>
                <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                  {warranty.type} Warranty
                </h3>
                <p className="text-gray-600 flex-grow">
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
              <div className="text-center h-full md:min-h-[250px] flex flex-col">
                <div className="bg-primary/10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 flex-grow">
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

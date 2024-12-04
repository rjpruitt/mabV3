'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Users, ShieldCheck, Clock, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Users,
    title: 'Your Dedicated Team',
    description: 'Work directly with expert installers from consultation to completion - no salespeople.'
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Process',
    description: 'Clear pricing, honest timelines, and straightforward communication.'
  },
  {
    icon: Clock,
    title: 'Efficient Timeline',
    description: 'Most projects completed in 1-3 days with minimal disruption.'
  },
  {
    icon: Sparkles,
    title: 'Quality Guaranteed',
    description: 'Premium materials and expert installation, backed by our warranties.'
  }
]

export function NoPressurePromise(): React.JSX.Element {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-12">
            <span className="text-accent font-medium mb-2 md:mb-4 block">
              Our Promise To You
            </span>
            <h2 className="font-pt-serif text-3xl md:text-4xl text-[#2F2F2F] mb-2 md:mb-4">
              No Salespeople, No Pressure
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Unlike other companies, you'll work directly with your installation team from day one. 
              Get expert advice without the sales pressure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600 flex-grow">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Customer Quote */}
        <ScrollReveal>
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <blockquote className="text-xl text-gray-600 italic">
              "It was refreshing to work directly with the installation team from the start. 
              No pushy sales tactics, just honest advice from experts who truly care about the result."
            </blockquote>
            <cite className="text-[#2F2F2F] font-semibold mt-4 block">
              - Sarah M., Kansas City
            </cite>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

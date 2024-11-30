'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Shield, Sparkles, Brush, HardHat } from 'lucide-react'
import { PromisePoint } from '@/components/ui/promise-point'
import { GuaranteeBadge } from '@/components/ui/guarantee-badge'

const promisePoints = [
  {
    icon: Shield,
    title: 'Protected Spaces',
    description: 'We use protective barriers and coverings to keep your home clean and safe'
  },
  {
    icon: Brush,
    title: 'Daily Cleanup',
    description: 'Our team thoroughly cleans the work area at the end of each day'
  },
  {
    icon: HardHat,
    title: 'Professional Team',
    description: 'Uniformed, background-checked installers who respect your home'
  },
  {
    icon: Sparkles,
    title: 'Final Detailing',
    description: 'Deep cleaning and inspection before we consider the job complete'
  }
]

export function CleanJobPromise() {
  return (
    <section className="py-16 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Our Clean Job Site Promise
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              We Treat Your Home Like Our Own
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your home deserves the utmost care during renovation. Our Clean Job Site Promise 
              ensures a tidy, safe, and respectful installation process.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promisePoints.map((point, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <PromisePoint {...point} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 max-w-xl mx-auto">
            <GuaranteeBadge text="100% Satisfaction Guarantee on Cleanliness" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 
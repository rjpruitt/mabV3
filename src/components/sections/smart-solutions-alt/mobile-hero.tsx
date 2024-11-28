'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Clock, ShieldCheck, Star } from 'lucide-react'

const trustPoints = [
  {
    icon: Clock,
    text: 'Ready in as little as one day'
  },
  {
    icon: ShieldCheck,
    text: 'Expert installation team'
  },
  {
    icon: Star,
    text: 'Premium quality materials'
  }
]

export function MobileHero(): React.JSX.Element {
  return (
    <section className="relative">
      {/* Hero Image Container */}
      <div className="relative h-screen">
        <Image
          // We need to update this to your walk-in shower campaign image
          src="/images/solutions/smart-solutions/showers/hero/lowesmaxxutil.jpeg"
          alt="Modern walk-in shower transformation"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Stronger gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4">
          <div className="container mx-auto">
            <ScrollReveal>
              <div>
                <h1 className="text-3xl font-pt-serif mb-3 text-white">
                  Transform Your Daily Routine Into a Luxury Experience
                </h1>
                
                <p className="text-base mb-6 text-white/90">
                  Start each day in your dream walk-in shower
                </p>
                
                {/* Trust Points */}
                <div className="flex flex-col gap-3 mb-8">
                  {trustPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <point.icon className="w-5 h-5 text-accent" />
                      <span className="text-white/90">{point.text}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <button className="w-full bg-accent text-white px-6 py-4 text-base font-semibold">
                  Start Your Transformation
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
} 
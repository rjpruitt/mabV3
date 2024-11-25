'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function SmartHero(): React.JSX.Element {
  return (
    <section className="relative w-full pt-1 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] space-y-6">
                <div>Beautiful walk-in showers.</div>
                <div>
                  Installed in{' '}
                  <span className="bg-[#00A3FF] text-white px-2">as little as 1 day</span>.
                </div>
              </h1>
              <p className="text-gray-600 text-lg mt-8">
                Premium shower systems trusted by <span className="font-semibold">over 100,000 homeowners</span> nationwide
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://placehold.co/1200x800/016369/FFFFFF/png?text=Modern+Shower"
                alt="Modern walk-in shower transformation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-sm"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
} 
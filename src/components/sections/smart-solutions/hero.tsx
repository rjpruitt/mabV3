'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function SmartHero(): React.JSX.Element {
  return (
    <section className="relative w-full pb-6 bg-white mt-[var(--campaign-header-height)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal>
            <div>
              <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F]">
                Beautiful walk-in showers that elevate your daily life
              </h1>
              <p className="text-gray-600 text-lg mt-6">
                Premium shower systems trusted by <span className="font-semibold">over 100,000 homeowners</span> nationwide. 
                Professional installation with minimal disruption to your home.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/solutions/smart-solutions/showers/hero/lowesmaxxutil.jpeg"
                alt="Modern walk-in shower transformation featuring a frameless sliding glass door system"
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
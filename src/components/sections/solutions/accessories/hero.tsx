'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function AccessoriesHero(): React.JSX.Element {
  return (
    <section className="relative w-full mt-[var(--header-height-normal)] pt-32 pb-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] mb-6">
                Complete Your Bathroom with Perfect Accessories
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                From storage solutions to decorative hardware, discover the finishing touches 
                that make your bathroom both beautiful and functional.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://placehold.co/1200x800/016369/FFFFFF/png?text=Bathroom+Accessories"
                alt="Modern bathroom accessories showcase"
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
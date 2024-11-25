'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export function WallsHero(): React.JSX.Element {
  return (
    <section className="relative w-full mt-[var(--header-height-normal)] pt-32 pb-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] mb-6">
                Elegant Wall Solutions for Your Perfect Bathroom
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                From classic wainscoting to modern wall panels, discover beautiful and durable solutions 
                that protect your walls while elevating your bathroom's style.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://placehold.co/1200x800/016369/FFFFFF/png?text=Elegant+Wainscoting"
                alt="Elegant bathroom with wainscoting"
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
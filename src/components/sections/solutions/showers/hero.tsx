'use client'

import Image from 'next/image'
import { Section } from '@/components/ui/section'

export function ShowersHero() {
  return (
    <Section className="w-full py-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] mb-6">
              Transform Your Bathroom with a Custom Shower Solution
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              From tub-to-shower conversions to barrier-free designs, we offer solutions for every need and budget.
            </p>
          </div>

          {/* Image Side */}
          <div className="relative aspect-[4/3]">
            <Image
              src="https://placehold.co/1200x800/016369/FFFFFF/png?text=Modern+Shower"
              alt="Modern walk-in shower installation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </Section>
  )
} 
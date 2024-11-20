'use client'

import React from 'react'
import Image from 'next/image'

export function InspirationHero(): React.JSX.Element {
  return (
    <section className="relative mt-[var(--header-height-normal)] w-full bg-[#F8F6F3] overflow-hidden">
      <div className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] mb-6">
              Design Your Perfect Bathroom
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed mb-8">
              Explore styles, save ideas, and create your personal inspiration board. 
              Our interactive tools help you visualize and plan your perfect bathroom transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary px-6 py-3 text-white font-medium rounded-sm hover:bg-primary/90 transition-colors">
                Start Your Design Board
              </button>
              <button className="bg-white px-6 py-3 text-primary font-medium rounded-sm hover:bg-primary/5 transition-colors">
                Browse Style Collections
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="relative aspect-square">
              <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 transform rotate-6">
                {/* Inspiration Tiles */}
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="relative aspect-square bg-white rounded-sm shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform"
                  >
                    <Image
                      src={`https://placehold.co/600x600/016369/FFFFFF/png?text=Style+${i}`}
                      alt={`Bathroom style ${i}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent/5 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
} 
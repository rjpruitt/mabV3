'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function HomeHero(): React.JSX.Element {
  return (
    <section className="
      relative w-full overflow-hidden
      h-[500px]                    
      sm:h-[600px]                 
      md:h-[700px]                 
      lg:h-[800px]
    ">
      {/* Background Image with Responsive Gradient Overlay */}
      <div className="absolute inset-0 max-w-[1920px] mx-auto left-0 right-0">
        <Image
          src="/images/home/hero/homehero.jpeg"
          alt="Woman and child enjoying their new bathtub"
          fill
          priority
          className="object-cover object-bottom"
          sizes="(min-width: 1920px) 1920px, 100vw"
        />
        {/* Desktop gradient - combining black and primary color */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-primary/50 to-transparent" />
        </div>
        
        {/* Mobile gradient - stronger black base with primary accent */}
        <div className="absolute inset-0 md:hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative h-full mx-auto px-4 mt-[var(--nav-height)]">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="font-pt-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-md">
            Transform Your Bathroom In As Little As One Day
          </h1>
          <p className="text-white/90 text-xl mb-8 drop-shadow">
            From simple updates to complete transformations, we have solutions for every budget.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/consultation"
              className="bg-accent px-8 py-3 rounded-sm inline-flex items-center justify-center font-montserrat font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              BOOK A FREE CONSULTATION
            </Link>
            <Link
              href="/gallery"
              className="bg-transparent whitespace-nowrap border-2 border-white text-white px-8 py-3 rounded-sm inline-flex items-center justify-center font-montserrat font-semibold hover:bg-white/10 transition-all"
            >
              SEE THE BEFORE AND AFTER GALLERY
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 
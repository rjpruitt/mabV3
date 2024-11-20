'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function HomeHero(): React.JSX.Element {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero/tubwomanchildcrop.jpeg"
          alt="Woman and child enjoying their new bathtub"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
      </div>

      {/* Content */}
      <div className="container relative h-full mx-auto px-4">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="font-pt-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Transform Your Bathroom In As Little As One Day
          </h1>
          <p className="text-white/90 text-xl mb-8">
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
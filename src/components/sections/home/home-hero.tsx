'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function HomeHero() {
  return (
    <section className="relative h-[calc(100vh-var(--header-height-normal))] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero/tubwomanchildcrop.jpeg"
          alt="Grandmother and child enjoying a playful moment in a bright, modern bathroom"
          fill
          className="object-cover"
          priority={true}
          sizes="100vw"
          loading="eager"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-[600px] text-white pt-20">
          <h1 className="font-montserrat text-5xl md:text-6xl mb-4 font-bold">
            Safe & Beautiful Bathrooms for Every Generation
          </h1>
          <h2 className="font-montserrat text-xl md:text-2xl mb-6">
            Oklahoma's experts in bathroom transformations - from modern luxury updates to accessible solutions
          </h2>
          <p className="font-montserrat text-lg mb-8 max-w-[500px]">
            Create the bathroom you've always wanted. Serving Tulsa, Oklahoma City, and Central Oklahoma 
            with expert installations in as little as one day. Every transformation is backed by our lifetime warranty.
          </p>
          <div className="flex gap-4">
            <Link
              href="/consultation"
              className="bg-accent whitespace-nowrap px-8 py-3 rounded-sm font-montserrat font-semibold hover:opacity-90 transition-opacity"
            >
              BOOK A FREE CONSULTATION
            </Link>
            <Link
              href="/gallery"
              className="bg-transparent whitespace-nowrap border-2 border-white text-white px-8 py-3 rounded-sm font-montserrat font-semibold hover:bg-white/10 transition-all"
            >
              SEE THE BEFORE AND AFTER GALLERY
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 
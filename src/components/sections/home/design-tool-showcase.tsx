'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function DesignToolShowcase() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/design-tool/couplesofaipad.jpeg"
          alt="Couple exploring bathroom inspiration ideas together"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content Side */}
          <div className="flex-1">
            <p className="font-dancing text-3xl text-white mb-4">
              Explore & Save Ideas
            </p>
            
            <h2 className="font-pt-serif text-5xl md:text-6xl text-white mb-8">
              Collect Inspiration For Your Perfect Bathroom
            </h2>
            
            <p className="text-white/90 text-lg mb-8 max-w-[500px]">
              Browse our curated collection of bathroom styles and save your favorites. 
              Share your inspiration board with our design experts during your consultation 
              to help bring your vision to life.
            </p>

            <Link
              href="/inspiration-tool"
              className="group inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-sm font-montserrat font-semibold hover:opacity-90 transition-all"
            >
              EXPLORE BATHROOM IDEAS
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* iPad Mockup */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-[600px] mx-auto">
              {/* iPad Frame */}
              <div className="relative aspect-[3/4] bg-[#1A1A1A] rounded-[40px] p-4 shadow-2xl transform rotate-[-5deg]">
                {/* Screen Bezel */}
                <div className="absolute inset-2 rounded-[32px] bg-black overflow-hidden">
                  {/* Screen Content */}
                  <Image
                    src="https://placehold.co/1200x1600/016369/FFFFFF/png?text=Design+Tool+Interface"
                    alt="Design tool interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Home Button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-gray-700" />
                {/* Camera */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent/10 rounded-full blur-xl" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
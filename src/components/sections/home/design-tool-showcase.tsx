'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function DesignToolShowcase(): React.JSX.Element {
  return (
    <section className="relative w-full py-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Content Side */}
          <div>
            <p className="font-dancing text-2xl text-primary mb-4">
              Explore & Save Ideas
            </p>
            
            <h2 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] mb-8">
              Collect Inspiration For Your Perfect Bathroom
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 max-w-[500px]">
              Browse our curated collection of bathroom styles and save your favorites. 
              Share your inspiration board with our design experts during your consultation 
              to help bring your vision to life.
            </p>

            <Link
              href="/inspiration"
              className="group inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-sm font-montserrat font-semibold hover:opacity-90 transition-all"
            >
              EXPLORE BATHROOM IDEAS
              <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Image Side */}
          <div className="relative">
            <Image
              src="/images/home/design-tool/couplesofaipad.jpeg"
              alt="Couple exploring bathroom design ideas"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 
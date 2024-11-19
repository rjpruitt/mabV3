'use client'

import React from 'react'
import Image from 'next/image'

const brands = [
  {
    name: 'Kohler',
    logo: '/images/home/brands/Kohler_Logo_CORP_2012-11-21_BLK.png'
  },
  {
    name: 'Moen',
    logo: '/images/home/brands/Moen_logo.svg'
  },
  {
    name: 'Delta',
    logo: '/images/home/brands/delta-faucets-logo-png-transparent.png'
  },
  {
    name: 'American Standard',
    logo: '/images/home/brands/American_standard_logo_detail.png'
  },
  {
    name: 'GROHE',
    logo: '/images/home/brands/Grohe-logo.png'
  },
  {
    name: 'Jacuzzi',
    logo: '/images/home/brands/Jacuzzi_logo.svg'
  }
]

export function BrandShowcase() {
  return (
    <section className="w-full py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-pt-serif text-3xl md:text-4xl text-[#2F2F2F] mb-12">
          Quality Companies. Quality Products. Quality Results.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 items-center max-w-5xl mx-auto">
          {brands.map((brand) => (
            <div 
              key={brand.name}
              className="flex items-center justify-center p-6"
            >
              <div className="relative w-64 h-32">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain filter grayscale"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
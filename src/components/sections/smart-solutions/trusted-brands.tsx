'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const brands = [
  {
    name: 'Kohler',
    logo: '/images/home/brands/Kohler_Logo_CORP_2012-11-21_BLK.png'
  },
  {
    name: 'Moen',
    logo: '/images/home/brands/Moen_logo.svg',
    className: '[filter:brightness(0)]'
  },
  {
    name: 'Delta',
    logo: '/images/home/brands/delta-faucet-seeklogo.svg'
  },
  {
    name: 'American Standard',
    logo: '/images/home/brands/american-standard-seeklogo.svg'
  }
]

export function TrustedBrands() {
  return (
    <section className="w-full py-12 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-pt-serif text-3xl md:text-4xl text-[#2F2F2F] mb-4">
              Premium Brands You Know and Trust
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We partner with the most respected names in bathroom fixtures to ensure 
              your new shower is built with quality that lasts a lifetime.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center max-w-4xl mx-auto">
          {brands.map((brand) => (
            <ScrollReveal key={brand.name}>
              <div className="flex items-center justify-center p-6">
                <div className="relative w-48 h-24">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className={`object-contain ${brand.className || ''}`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-lg">
              Every component of your Smart Solutions shower is backed by industry-leading warranties 
              and our satisfaction guarantee.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 
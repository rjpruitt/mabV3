'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { brands } from '@/components/sections/home/brand-showcase'

const mobileBrands = brands.slice(0, 4) // First 4 brands for mobile
const desktopBrands = brands // All brands for desktop

export function BrandTrust() {
  return (
    <section className="py-12 md:py-16 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Quality Brands You Trust*
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Premium Products from Leading Manufacturers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We exclusively use products from industry-leading manufacturers, backed 
              by comprehensive warranties and decades of reliability.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile Brand Grid */}
        <div className="md:hidden grid grid-cols-2 gap-8 items-center max-w-xl mx-auto px-4">
          {mobileBrands.map((brand) => (
            <ScrollReveal key={brand.name}>
              <div className="flex items-center justify-center p-4">
                <div className="relative w-32 h-16">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className={`object-contain ${brand.className || ''}`}
                    sizes="(max-width: 768px) 50vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop Brand Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-16 items-center max-w-5xl mx-auto px-4">
          {desktopBrands.map((brand) => (
            <ScrollReveal key={brand.name} delay={0.1}>
              <div className="flex items-center justify-center p-6">
                <div className="relative w-64 h-32">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className={`object-contain ${brand.className || ''}`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
} 
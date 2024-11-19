'use client'

import React from 'react'

export function ProcessHero(): React.JSX.Element {
  return (
    <section className="relative w-full mt-[var(--header-height-normal)] pt-32 pb-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] mb-6">
            Our Simple Three-Step Process
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            From consultation to completion, we make bathroom transformations easy. 
            Our proven process ensures a smooth experience and beautiful results, 
            typically completed in just a few days.
          </p>
        </div>
      </div>
    </section>
  )
} 
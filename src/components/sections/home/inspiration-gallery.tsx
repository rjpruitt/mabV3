'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const galleryItems = [
  {
    id: 1,
    src: 'https://placehold.co/600x800/016369/FFFFFF/png?text=Walk+In+Shower',
    alt: 'Modern walk-in shower design',
    width: 600,
    height: 800,
    span: 'row-span-2',
  },
  {
    id: 2,
    src: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Luxury+Bath',
    alt: 'Luxury bathtub installation',
    width: 600,
    height: 400,
    span: '',
  },
  {
    id: 3,
    src: 'https://placehold.co/600x600/016369/FFFFFF/png?text=Safety+Features',
    alt: 'Accessible bathroom features',
    width: 600,
    height: 600,
    span: 'row-span-2',
  },
  {
    id: 4,
    src: 'https://placehold.co/600x900/016369/FFFFFF/png?text=Family+Bathroom',
    alt: 'Family-friendly bathroom design',
    width: 600,
    height: 900,
    span: '',
  },
  {
    id: 5,
    src: 'https://placehold.co/600x500/016369/FFFFFF/png?text=Modern+Fixtures',
    alt: 'Modern bathroom fixtures',
    width: 600,
    height: 500,
    span: '',
  },
  {
    id: 6,
    src: 'https://placehold.co/600x700/016369/FFFFFF/png?text=Spa+Style',
    alt: 'Spa-inspired bathroom',
    width: 600,
    height: 700,
    span: '',
  },
  {
    id: 7,
    src: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Storage+Solutions',
    alt: 'Smart bathroom storage solutions',
    width: 600,
    height: 400,
    span: '',
  },
  {
    id: 8,
    src: 'https://placehold.co/600x800/016369/FFFFFF/png?text=Accessibility',
    alt: 'Accessible bathroom design',
    width: 600,
    height: 800,
    span: '',
  },
  {
    id: 9,
    src: 'https://placehold.co/600x600/016369/FFFFFF/png?text=Lighting+Design',
    alt: 'Bathroom lighting design',
    width: 600,
    height: 600,
    span: '',
  },
  {
    id: 10,
    src: 'https://placehold.co/600x500/016369/FFFFFF/png?text=Vanity+Styles',
    alt: 'Modern vanity designs',
    width: 600,
    height: 500,
    span: '',
  },
  {
    id: 11,
    src: 'https://placehold.co/600x900/016369/FFFFFF/png?text=Shower+Systems',
    alt: 'Advanced shower systems',
    width: 600,
    height: 900,
    span: '',
  },
  {
    id: 12,
    src: 'https://placehold.co/600x700/016369/FFFFFF/png?text=Tile+Patterns',
    alt: 'Creative tile patterns',
    width: 600,
    height: 700,
    span: '',
  }
]

export function InspirationGallery() {
  return (
    <section className="w-full py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-lg mb-2">Get inspired</p>
          <h2 className="font-pt-serif text-4xl md:text-5xl text-[#2F2F2F] mb-6">
            Your perfect bath is out there
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our design gallery for remodel inspiration
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[200px] gap-4">
            {galleryItems.map((item) => (
              <div 
                key={item.id}
                className={`relative group overflow-hidden ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="bg-accent text-white px-8 py-3 rounded-sm inline-block font-montserrat font-semibold hover:opacity-90 transition-opacity"
          >
            SEE THE FULL GALLERY OF INSPIRATIONS
          </Link>
        </div>
      </div>
    </section>
  )
} 
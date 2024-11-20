'use client'

import React from 'react'
import Image from 'next/image'

const styles = [
  {
    id: 'modern',
    title: 'Modern',
    description: 'Clean lines and minimalist design',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Modern'
  },
  {
    id: 'traditional',
    title: 'Traditional',
    description: 'Timeless elegance and classic details',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Traditional'
  },
  {
    id: 'transitional',
    title: 'Transitional',
    description: 'The perfect blend of classic and contemporary',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Transitional'
  }
]

export function StyleCollections(): React.JSX.Element {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
            Find Your Style
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collections to discover the perfect style for your bathroom. 
            Each collection features carefully selected designs, materials, and fixtures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style) => (
            <div 
              key={style.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm">
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                {style.title}
              </h3>
              <p className="text-gray-600">
                {style.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
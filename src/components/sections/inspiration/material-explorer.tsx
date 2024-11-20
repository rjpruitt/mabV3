'use client'

import React from 'react'
import Image from 'next/image'

const materials = [
  {
    id: 'acrylic',
    title: 'Acrylic',
    description: 'Durable, easy to clean, and available in many styles',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Acrylic'
  },
  {
    id: 'tile',
    title: 'Tile & Stone',
    description: 'Classic beauty with endless design possibilities',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Tile'
  },
  {
    id: 'composite',
    title: 'Composite Materials',
    description: 'Modern materials that combine beauty and function',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Composite'
  },
  {
    id: 'fixtures',
    title: 'Fixtures & Hardware',
    description: 'The finishing touches that make all the difference',
    image: 'https://placehold.co/600x400/016369/FFFFFF/png?text=Fixtures'
  }
]

export function MaterialExplorer(): React.JSX.Element {
  return (
    <section className="w-full py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
            Explore Materials & Finishes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our range of high-quality materials and finishes. 
            Each option is selected for its beauty, durability, and ease of maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {materials.map((material) => (
            <div 
              key={material.id}
              className="group bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex">
                <div className="relative w-1/2 aspect-[4/3]">
                  <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {material.description}
                  </p>
                  <button className="mt-4 text-primary font-medium text-sm hover:text-primary/80 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
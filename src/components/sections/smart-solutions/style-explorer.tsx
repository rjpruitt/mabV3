'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const designerCollections = [
  {
    name: "Modern Minimalist",
    description: "Clean lines and contemporary elegance",
    image: "https://placehold.co/800x600/016369/FFFFFF/png?text=Modern",
    features: ["Frameless glass", "Large format tiles", "Hidden storage"]
  },
  {
    name: "Timeless Traditional",
    description: "Classic beauty with modern convenience",
    image: "https://placehold.co/800x600/016369/FFFFFF/png?text=Traditional",
    features: ["Marble patterns", "Decorative hardware", "Built-in shelving"]
  },
  {
    name: "Spa Retreat",
    description: "Your daily sanctuary of relaxation",
    image: "https://placehold.co/800x600/016369/FFFFFF/png?text=Spa",
    features: ["Rain showerhead", "Natural textures", "Bench seating"]
  }
]

export function StyleExplorer() {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Your Style, Your Choice
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choose from our designer-curated collections or create your own perfect combination. 
              Our experts will guide you through all the options.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {designerCollections.map((collection) => (
            <ScrollReveal key={collection.name}>
              <div className="bg-[#F8F6F3] rounded-sm overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {collection.description}
                  </p>
                  <ul className="space-y-2">
                    {collection.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 bg-[#F8F6F3] p-8 rounded-sm text-center">
            <h3 className="font-semibold text-xl text-[#2F2F2F] mb-4">
              Want to Explore All Options?
            </h3>
            <p className="text-gray-600 mb-6">
              Our design consultants will bring samples to your home and help you create your perfect combination 
              from our complete collection of styles, colors, and features.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-sm hover:bg-primary/90 transition-colors">
              Schedule Your Free Design Consultation
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 
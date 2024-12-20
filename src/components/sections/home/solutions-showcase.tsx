'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Bath, ShowerHead, Heart, Grid, Package } from 'lucide-react'

const solutions = [
  {
    id: 'bathtubs',
    title: 'Bathtubs',
    icon: Bath,
    image: '/images/home/solutions/womanwalkintub.jpeg',
    href: '/solutions/bathtubs'
  },
  {
    id: 'showers',
    title: 'Showers',
    icon: ShowerHead,
    image: '/images/home/solutions/walkinshower.jpeg',
    href: '/solutions/showers'
  },
  {
    id: 'accessibility',
    title: 'Accessibility & Safety',
    icon: Heart,
    image: '/images/home/solutions/showersafety.jpeg',
    href: '/solutions/accessibility'
  },
  {
    id: 'walls',
    title: 'Walls & Wainscoting',
    icon: Grid,
    image: '/images/home/solutions/wainscoting.jpeg',
    href: '/solutions/walls'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    icon: Package,
    image: '/images/home/solutions/niche.jpeg',
    href: '/solutions/accessories'
  },
]

export function SolutionsShowcase() {
  const [activeId, setActiveId] = useState<string>('bathtubs')
  const router = useRouter()

  return (
    <section className="w-full py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Text and Buttons */}
          <div className="flex flex-col">
            <div className="mb-12">
              <h2 className="text-primary text-2xl mb-4 italic">How can we help?</h2>
              <h3 className="font-pt-serif text-4xl md:text-5xl text-[#2F2F2F]">
                Discover The Ways We Bring Your Dream To Life.
              </h3>
            </div>

            <div className="space-y-4">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  className={`w-full text-left p-6 rounded-sm transition-colors flex items-center justify-between bg-white hover:bg-[#F3F2F0] border border-gray-200`}
                  onMouseEnter={() => setActiveId(solution.id)}
                  onClick={() => router.push(solution.href)}
                >
                  <div className="flex items-center gap-4">
                    <solution.icon 
                      className={`w-6 h-6 ${activeId === solution.id ? 'text-primary' : 'text-[#2F2F2F]'}`}
                    />
                    <span className="text-xl font-semibold text-[#2F2F2F]">{solution.title}</span>
                  </div>
                  <span className="text-accent">Learn more</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeId === solution.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
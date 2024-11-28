'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Clock, ShieldCheck, Star } from 'lucide-react'

const trustPoints = [
  {
    icon: Clock,
    text: 'Transform your space in days, not weeks'
  },
  {
    icon: ShieldCheck,
    text: 'Work directly with expert installers'
  },
  {
    icon: Star,
    text: 'Premium materials, guaranteed quality'
  }
]

export function TransformationHero(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="
      relative w-full overflow-hidden
      h-[500px]                    
      sm:h-[600px]                 
      md:h-[700px]                 
      lg:h-[800px]
      pt-[var(--campaign-header-height)]
    ">
      <div className="container mx-auto px-4">
        {/* Hero Image */}
        <div className="relative h-full w-full">
          <Image
            src="/images/solutions/smart-solutions/showers/alt2/hero/lowesmaxxutil.jpeg"
            alt="Luxurious walk-in shower transformation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          
          {/* Content Layout */}
          <div className="absolute inset-0 flex items-center">
            {/* Left Content Panel */}
            <div className="relative max-w-xl">
              <div 
                className={`
                  bg-white/80 backdrop-blur-sm p-8 rounded-sm shadow-lg
                  transform transition-all duration-1000
                  ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                `}
              >
                <span className="text-accent font-medium mb-4 block">
                  Walk-In Shower Transformation
                </span>
                
                <h1 className="font-pt-serif text-4xl md:text-5xl lg:text-6xl text-[#2F2F2F] mb-6">
                  Start Every Day in Your Dream Shower
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Transform your bathroom into a modern sanctuary with a luxurious walk-in shower. 
                  Expert installation with no high-pressure sales.
                </p>
              </div>

              {/* Trust Points - Floating Cards */}
              <div className="mt-6 grid gap-4">
                {trustPoints.map((point, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-sm shadow-md
                      transform transition-all duration-700
                      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-200px] opacity-0'}
                    `}
                    style={{ transitionDelay: `${800 + index * 200}ms` }}
                  >
                    <div className="bg-accent/10 p-2 rounded-sm">
                      <point.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-gray-800 font-medium">{point.text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div 
                className={`
                  flex flex-col sm:flex-row gap-4 mt-8
                  transform transition-all duration-700
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                `}
                style={{ transitionDelay: '1400ms' }}
              >
                <button className="bg-accent text-white px-8 py-4 rounded-sm text-lg font-semibold hover:bg-accent/90 transition-colors">
                  Start Your Transformation
                </button>
                <button className="bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-sm text-lg font-semibold hover:bg-white/90 transition-colors">
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

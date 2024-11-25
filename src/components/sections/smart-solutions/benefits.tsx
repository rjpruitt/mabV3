'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { useTouchSwipe } from '@/hooks/use-touch-swipe'

const benefits = [
  {
    id: 1,
    title: 'Transform An Old Bathroom',
    description: 'Older, dated showers and tubs need constant cleaning, grouting, and repair. We offer a range of contemporary, low-maintenance designs that are mold and crack-resistant and built to last.',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before',
    testimonial: {
      quote: 'I have been in my home for 23 years and my shower and tub were new when I brought my home and now the tub has that vinyl type bottom that has become dirty looking and the grout on the walls of my shower is hard to clean.',
      author: 'Emma H., Kansas City, MO'
    }
  },
  {
    id: 2,
    title: 'End Constant Maintenance',
    description: 'Say goodbye to scrubbing grout lines and fighting mold. Our seamless walls and premium materials are designed for easy cleaning and long-lasting beauty.',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Maintenance',
    testimonial: {
      quote: 'No more weekends spent scrubbing grout lines. A quick wipe down is all it takes to keep my new shower looking perfect.',
      author: 'Robert S., St. Louis, MO'
    }
  },
  {
    id: 3,
    title: 'Enhance Safety & Comfort',
    description: 'From slip-resistant surfaces to built-in seating, we make your bathroom safer and more comfortable for everyone in your home.',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Safety',
    testimonial: {
      quote: 'The built-in seat and grab bars give me peace of mind, and they look great too - not institutional at all.',
      author: 'Patricia M., Springfield, MO'
    }
  },
  {
    id: 4,
    title: 'Increase Home Value',
    description: 'A modern, updated bathroom is a valuable selling point. Our solutions provide an excellent return on investment while you enjoy the benefits.',
    image: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Value',
    testimonial: {
      quote: 'The bathroom update completely transformed the space. It feels like a luxury hotel bathroom now.',
      author: 'Michael T., Columbia, MO'
    }
  }
]

export function SolutionBenefits() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide
  })

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] text-center mb-16">
            Kiss All Your Bathroom Problems Goodbye
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Carousel Content */}
          <div 
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image Side */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={benefits[currentSlide].image}
                    alt={benefits[currentSlide].title}
                    fill
                    className="object-cover rounded-sm"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content Side */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-[#2F2F2F]">
                    {benefits[currentSlide].title}
                  </h3>
                  <p className="text-gray-600">
                    {benefits[currentSlide].description}
                  </p>
                  <blockquote className="bg-[#F8F6F3] p-6 rounded-sm">
                    <p className="text-gray-600 italic mb-4">
                      "{benefits[currentSlide].testimonial.quote}"
                    </p>
                    <footer className="text-sm text-gray-500">
                      — {benefits[currentSlide].testimonial.author}
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-8 h-8 rounded-full border-2 ${
                  currentSlide === index
                    ? 'bg-accent border-accent'
                    : 'border-gray-300 hover:border-accent'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
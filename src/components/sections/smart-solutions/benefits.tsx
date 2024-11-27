'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const benefits = [
  {
    id: 1,
    title: 'Transform An Old Bathroom',
    description: 'Older, dated showers and tubs need constant cleaning, grouting, and repair. We offer a range of contemporary, low-maintenance designs that are mold and crack-resistant and built to last.',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After',
    testimonial: {
      quote: 'I have been in my home for 23 years and my shower and tub were new when I brought my home and now the tub has that vinyl type bottom that has become dirty looking and the grout on the walls of my shower is hard to clean.',
      author: 'Emma H., Kansas City, MO'
    }
  },
  {
    id: 2,
    title: 'End Constant Maintenance',
    description: 'Say goodbye to scrubbing grout lines and fighting mold. Our seamless walls and premium materials are designed for easy cleaning and long-lasting beauty.',
    before: '/images/solutions/smart-solutions/showers/benefits/maintenance-before.jpeg',
    after: '/images/solutions/smart-solutions/showers/benefits/maintenance-after.jpeg',
    testimonial: {
      quote: 'No more weekends spent scrubbing grout lines. A quick wipe down is all it takes to keep my new shower looking perfect.',
      author: 'Robert S., St. Louis, MO'
    }
  },
  {
    id: 3,
    title: 'Enhance Safety & Comfort',
    description: 'From slip-resistant surfaces to built-in seating, we make your bathroom safer and more comfortable for everyone in your home.',
    before: '/images/solutions/smart-solutions/showers/benefits/safety-before.jpeg',
    after: '/images/solutions/smart-solutions/showers/benefits/safety-after.jpeg',
    testimonial: {
      quote: 'The built-in seat and grab bars give me peace of mind, and they look great too - not institutional at all.',
      author: 'Patricia M., Springfield, MO'
    }
  },
  {
    id: 4,
    title: 'Increase Home Value',
    description: 'A modern, updated bathroom is a valuable selling point. Our solutions provide an excellent return on investment while you enjoy the benefits.',
    before: 'https://placehold.co/800x600/016369/FFFFFF/png?text=Before+Value',
    after: 'https://placehold.co/800x600/016369/FFFFFF/png?text=After+Value',
    testimonial: {
      quote: 'The bathroom update completely transformed the space. It feels like a luxury hotel bathroom now.',
      author: 'Michael T., Columbia, MO'
    }
  }
]

export function SolutionBenefits() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Don't render compare slider until client-side
  if (!isClient) {
    return null
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] text-center mb-8">
            Love Your Bathroom Again
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Before/After Slider Side */}
              <div className="relative">
                <p className="font-dancing text-2xl text-primary text-center mb-4">
                  Slide to compare!
                </p>
                <div className="bg-[#EDEBE8] p-4 rounded-sm">
                  <div className="relative aspect-[3/4]">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src={benefits[currentSlide].before}
                          alt={`Before ${benefits[currentSlide].title}`}
                          style={{ 
                            objectFit: 'cover', 
                            width: '100%',
                            height: '100%',
                            objectPosition: 'center'
                          }}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={benefits[currentSlide].after}
                          alt={`After ${benefits[currentSlide].title}`}
                          style={{ 
                            objectFit: 'cover', 
                            width: '100%',
                            height: '100%',
                            objectPosition: 'center'
                          }}
                        />
                      }
                      position={50}
                      className="h-full"
                      style={{ height: '100%' }}
                    />
                  </div>
                </div>
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

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full hover:bg-[#F8F6F3] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${
                    currentSlide === index
                      ? 'bg-accent border-accent'
                      : 'border-gray-300 hover:border-accent'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full hover:bg-[#F8F6F3] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 
'use client'

import React, { useState, useEffect } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { ChevronLeft, ChevronRight, Shield, Clock, Star } from 'lucide-react'

interface Warranty {
  type: string
  years: string
}

interface QualityPromise {
  title: string
  details: string
}

interface BenefitsWithGuaranteesProps {
  warranties: Warranty[]
  qualityPromise: QualityPromise
}

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
      quote: "It's been six months and it still looks brand new. Just a quick wipe down is all it needs.",
      author: 'Robert S., St. Louis, MO'
    }
  }
]

export function BenefitsWithGuarantees({ warranties, qualityPromise }: BenefitsWithGuaranteesProps) {
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

  if (!isClient) return null

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Quality Promise Banner */}
        <ScrollReveal>
          <div className="bg-[#F8F6F3] p-6 rounded-sm mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl text-[#2F2F2F]">
                    {qualityPromise.title}
                  </h3>
                  <p className="text-gray-600">
                    {qualityPromise.details}
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                {warranties.map((warranty) => (
                  <div key={warranty.type} className="text-center">
                    <div className="text-2xl font-semibold text-primary">
                      {warranty.years}
                    </div>
                    <div className="text-sm text-gray-600">
                      {warranty.type} Warranty
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Benefits Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
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
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={benefits[currentSlide].after}
                        alt={`After ${benefits[currentSlide].title}`}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    }
                    position={50}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#2F2F2F]">
                {benefits[currentSlide].title}
              </h3>
              <p className="text-gray-600">
                {benefits[currentSlide].description}
              </p>
              <blockquote className="bg-[#F8F6F3] p-6 rounded-sm">
                <Star className="w-6 h-6 text-primary mb-4" />
                <p className="text-gray-600 italic mb-4">
                  "{benefits[currentSlide].testimonial.quote}"
                </p>
                <footer className="text-sm text-gray-500">
                  — {benefits[currentSlide].testimonial.author}
                </footer>
              </blockquote>

              {/* Quality Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-sm shadow-sm">
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-gray-600">
                    Long-lasting durability
                  </p>
                </div>
                <div className="bg-white p-4 rounded-sm shadow-sm">
                  <Shield className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-gray-600">
                    Warranty protected
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full hover:bg-[#F8F6F3]"
            aria-label="Previous benefit"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full hover:bg-[#F8F6F3]"
            aria-label="Next benefit"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
} 
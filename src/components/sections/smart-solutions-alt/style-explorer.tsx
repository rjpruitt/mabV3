'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Users, Sparkles, Palette, ChevronLeft, ChevronRight } from 'lucide-react'

interface ExpertGuidance {
  title: string
  consultantInfo: string
  sampleInfo: string
}

interface DecisionSupport {
  preDesigned: string
  custom: string
}

interface StyleExplorerWithSupportProps {
  expertGuidance: ExpertGuidance
  decisionSupport: DecisionSupport
}

const styles = [
  {
    name: 'French Country',
    description: 'Rustic elegance with modern convenience',
    image: 'https://placehold.co/1200x900/8B7355/FFFFFF/png?text=French+Country+Style',
    features: ['Weathered wood vanity', 'Subway tile accents', 'Vintage-inspired fixtures']
  },
  {
    name: 'Modern Minimalist',
    description: 'Clean lines and contemporary elegance',
    image: 'https://placehold.co/1200x900/2F4F4F/FFFFFF/png?text=Modern+Minimalist',
    features: ['Frameless glass', 'Large format tiles', 'Hidden storage']
  },
  {
    name: 'Timeless Traditional',
    description: 'Classic beauty with modern convenience',
    image: 'https://placehold.co/1200x900/4A5D5C/FFFFFF/png?text=Timeless+Traditional',
    features: ['Marble patterns', 'Decorative hardware', 'Built-in shelving']
  },
  {
    name: 'Spa Retreat',
    description: 'Your daily sanctuary of relaxation',
    image: 'https://placehold.co/1200x900/016369/FFFFFF/png?text=Spa+Retreat',
    features: ['Rain showerhead', 'Natural textures', 'Bench seating']
  }
]

export function StyleExplorerWithSupport({ expertGuidance, decisionSupport }: StyleExplorerWithSupportProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    
    onSelect()
    emblaApi.on('select', onSelect)
    
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              BRING YOUR VISION TO LIFE
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover your ultimate shower design aesthetic or create your own with our experts
            </p>
          </div>
        </ScrollReveal>

        {/* Style Carousel */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {styles.map((style, index) => (
                <div key={style.name} className="flex-[0_0_100%] min-w-0">
                  <div className="relative aspect-[4/3] mx-4">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className="object-cover rounded-sm"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-[#2F2F2F]">
                      {style.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Previous style"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Next style"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {styles.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-primary w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Expert Support */}
        <ScrollReveal>
          <div className="bg-[#F8F6F3] p-8 rounded-sm">
            <h3 className="text-2xl font-semibold text-[#2F2F2F] text-center mb-8">
              {expertGuidance.title}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-gray-600">
                  {expertGuidance.consultantInfo}
                </p>
              </div>
              <div className="text-center">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-gray-600">
                  {expertGuidance.sampleInfo}
                </p>
              </div>
              <div className="text-center">
                <Palette className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-gray-600">
                  See all options in your home
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
} 
'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { DesignConsultation } from '@/components/ui/design-consultation'
import type { ConsultationResponse } from '@/components/ui/design-consultation'

const styles = [
  {
    id: 'modern-glass',
    name: 'Modern Glass Walk-In',
    tag: 'Most Popular',
    roi: 'Premium Features',
    valuePoints: [
      'Premium glass doors add value.',
      'Modern fixtures buyers want.',
      'Built-in storage features.',
      'Contemporary design appeal.'
    ],
    image: '/images/solutions/smart-solutions/showers/alt2/styles/modernblackrainfall.jpeg',
    features: [
      'Frameless glass design.',
      'Rainfall shower head.',
      'Zero-threshold entry.',
      'Built-in storage.'
    ]
  },
  {
    id: 'geometric',
    name: 'Contemporary Geometric',
    tag: 'Designer Choice',
    roi: 'High-Value Design',
    valuePoints: [
      'Built-in storage niche.',
      'Premium modern fixtures.',
      'Clean geometric patterns.',
      'Quality material finishes.'
    ],
    image: '/images/solutions/smart-solutions/showers/alt2/styles/geometricwhite.jpeg',
    features: [
      'Frameless glass design.',
      'Rainfall shower head.',
      'Zero-threshold entry.',
      'Built-in storage.'
    ]
  },
  {
    id: 'transitional',
    name: 'Transitional Elegance',
    tag: 'Universal Appeal',
    roi: 'Broad Market Value',
    valuePoints: [
      'Premium shower system.',
      'Built-in storage space.',
      'Quality fixtures included.',
      'Durable material choices.'
    ],
    image: '/images/solutions/smart-solutions/showers/alt2/styles/transitionalrainfall.jpeg',
    features: [
      'Frameless glass design.',
      'Rainfall shower head.',
      'Zero-threshold entry.',
      'Built-in storage.'
    ]
  },
  {
    id: 'accessible',
    name: 'Safety & Comfort',
    tag: 'Smart Investment',
    roi: 'Long-Term Value',
    valuePoints: [
      'ADA compliant features.',
      'Zero-threshold entry.',
      'Built-in safety features.',
      'Easy maintenance design.'
    ],
    image: '/images/solutions/smart-solutions/showers/alt2/styles/seatgrabrainfall.jpeg',
    features: [
      'Frameless glass design.',
      'Rainfall shower head.',
      'Zero-threshold entry.',
      'Built-in storage.'
    ]
  },
  {
    id: 'classic',
    name: 'Classic White',
    tag: 'Always in Style',
    roi: 'Timeless Value',
    valuePoints: [
      'Easy-clean surfaces.',
      'Built-in storage space.',
      'Quality white finish.',
      'Durable materials.'
    ],
    image: '/images/solutions/smart-solutions/showers/alt2/styles/subway.jpeg',
    features: [
      'Frameless glass design.',
      'Rainfall shower head.',
      'Zero-threshold entry.',
      'Built-in storage.'
    ]
  },
  {
    id: 'marble',
    name: 'Luxury Marble',
    tag: 'Premium Choice',
    roi: 'Luxury Market Value',
    valuePoints: [
      'Premium material finish.',
      'Built-in storage design.',
      'Quality fixtures included.',
      'Easy-care surfaces.'
    ],
    image: '/images/solutions/smart-solutions/showers/alt2/styles/carrarrasmall.jpeg',
    features: [
      'Frameless glass design.',
      'Rainfall shower head.',
      'Zero-threshold entry.',
      'Built-in storage.'
    ]
  }
]

export function StyleExplorer(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false,
    axis: 'x'
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showConsultation, setShowConsultation] = useState(false)

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
      if (emblaApi) emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Your Perfect Shower, Your Way
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Professional Design Made Simple
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse our professionally designed shower systems for inspiration, or work with your 
              design consultant to create your own perfect combination. Either way, you'll have 
              expert guidance every step of the way.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {styles.map((style, index) => (
                <div key={style.id} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="group bg-white rounded-sm shadow-sm hover:shadow-md transition-all relative">
                    {/* Style Tag & ROI Badge */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                      {style.tag && (
                        <div className="bg-accent text-white px-3 py-1 rounded-sm text-sm font-medium">
                          {style.tag}
                        </div>
                      )}
                      {style.roi && (
                        <div className="bg-primary/90 text-white px-3 py-1 rounded-sm text-sm font-medium">
                          {style.roi}
                        </div>
                      )}
                    </div>

                    {/* Style Image */}
                    <div className="
                      relative h-[400px] 
                      md:h-0 md:pb-[75%] 
                      overflow-hidden rounded-sm
                    ">
                      <div className="absolute inset-[5%]">
                        <Image
                          src={style.image}
                          alt={style.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 80vw"
                        />
                      </div>
                    </div>

                    {/* Style Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
                        {style.name}
                      </h3>
                      
                      <ul className="space-y-3 mb-6">
                        {style.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Add Value Points section */}
                      <div className="border-t border-gray-100 mt-4 pt-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Value Features:</h4>
                        <ul className="space-y-2">
                          {style.valuePoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <span className="text-gray-600">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

        {/* Design Support */}
        <ScrollReveal>
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-lg">
              Not sure which style is right for you? Our design experts will help you choose 
              the perfect combination of features and finishes.
            </p>
            <button 
              onClick={() => setShowConsultation(true)}
              className="mt-6 bg-accent text-white px-8 py-4 rounded-sm text-lg font-semibold hover:bg-accent/90 transition-colors group inline-flex items-center gap-2"
            >
              Get Expert Design Help
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        <DesignConsultation
          isOpen={showConsultation}
          onClose={() => setShowConsultation(false)}
          onComplete={(responses: ConsultationResponse) => {
            console.log('Consultation responses:', responses)
            // Handle consultation completion
          }}
        />
      </div>
    </section>
  )
}

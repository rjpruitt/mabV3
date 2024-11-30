'use client'

import React, { useState, useCallback } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const transformations = [
  {
    title: 'Modern Elegance',
    before: '/images/solutions/smart-solutions/showers/alt2/before/before1.jpeg',
    after: '/images/solutions/smart-solutions/showers/alt2/after/after1.jpeg',
    description: 'From dated tub to spa-like shower'
  },
  {
    title: 'Accessible Comfort',
    before: 'https://placehold.co/1200x900/8B7355/FFFFFF/png?text=Old+Shower+Before',
    after: 'https://placehold.co/1200x900/016369/FFFFFF/png?text=Accessible+Shower+After',
    description: 'Safe, stylish, and easily accessible'
  },
  {
    title: 'Spa-Inspired Luxury',
    before: 'https://placehold.co/1200x900/8B7355/FFFFFF/png?text=Basic+Shower+Before',
    after: 'https://placehold.co/1200x900/016369/FFFFFF/png?text=Luxury+Shower+After',
    description: 'Transform your daily routine into a spa experience'
  }
]

export function BeforeAfterGallery(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false,
    watchDrag: false
  })
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
      if (emblaApi) emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              See the Transformation
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover how we transform ordinary bathrooms into extraordinary spaces. 
              Slide to compare the before and after.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          <div 
            className="overflow-hidden touch-none"
            ref={emblaRef}
          >
            <div className="flex">
              {transformations.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="bg-white rounded-sm shadow-sm p-6">
                    <div className="aspect-[4/3] relative mb-4">
                      <ReactCompareSlider
                        itemOne={
                          <ReactCompareSliderImage
                            src={item.before}
                            alt="Before transformation"
                            sizes="(max-width: 768px) 100vw, 80vw"
                          />
                        }
                        itemTwo={
                          <ReactCompareSliderImage
                            src={item.after}
                            alt="After transformation"
                            sizes="(max-width: 768px) 100vw, 80vw"
                          />
                        }
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Previous transformation"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Next transformation"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {transformations.map((_, index) => (
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
      </div>
    </section>
  )
}

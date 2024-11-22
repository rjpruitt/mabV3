'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'
import { useTouchSlider } from '@/hooks/use-touch-slider'
import { useRef } from 'react'

const galleryItems = [
  {
    id: 1,
    title: 'Modern Walk-In Shower',
    description: 'Complete transformation with frameless glass and custom tile',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Modern+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Modern+After',
    type: 'walk-in',
    budget: 'premium'
  },
  {
    id: 2,
    title: 'Tub-to-Shower Conversion',
    description: 'Unused tub converted to an accessible walk-in shower',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Conversion+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Conversion+After',
    type: 'conversion',
    budget: 'smart'
  },
  {
    id: 3,
    title: 'Zero-Threshold Shower',
    description: 'Barrier-free design with built-in seating',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Barrier+Free+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Barrier+Free+After',
    type: 'barrier-free',
    budget: 'premium'
  }
]

export function ShowersGallery() {
  return (
    <Section 
      className="w-full py-20 bg-[#F8F6F3]"
      title="See The Transformation"
      titleClassName="font-pt-serif text-4xl text-center mb-4"
      description="Browse our gallery of shower transformations and find inspiration for your project."
      descriptionClassName="text-gray-600 text-center max-w-3xl mx-auto mb-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => {
            const sliderRef = useRef<HTMLDivElement>(null)
            const { position, setPosition, handleKeyDown } = useComparisonSlider({
              initialPosition: 50
            })

            const { 
              handleTouchStart,
              handleTouchMove,
              handleTouchEnd,
              isDragging
            } = useTouchSlider({
              onPositionChange: setPosition,
              containerRef: sliderRef
            })

            return (
              <ScrollReveal key={item.id}>
                <div className="bg-white rounded-sm overflow-hidden">
                  <div 
                    ref={sliderRef}
                    className="relative aspect-[4/3]"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src={item.before}
                          alt={`${item.title} before transformation`}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={item.after}
                          alt={`${item.title} after transformation`}
                        />
                      }
                      position={position}
                      onPositionChange={setPosition}
                      onKeyDown={handleKeyDown}
                      className={`h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#2F2F2F] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
} 
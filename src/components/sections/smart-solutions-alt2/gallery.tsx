'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const transformations = [
  {
    title: 'Modern Elegance',
    before: 'https://placehold.co/1200x900/8B7355/FFFFFF/png?text=Traditional+Tub+Before',
    after: 'https://placehold.co/1200x900/016369/FFFFFF/png?text=Modern+Shower+After',
    description: 'From dated tub to spa-like shower'
  }
]

export function BeforeAfterGallery(): React.JSX.Element {
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

        <div className="grid md:grid-cols-2 gap-8">
          {transformations.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <div className="bg-white rounded-sm shadow-sm p-6">
                <div className="aspect-[4/3] relative mb-4">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.before}
                        alt="Before transformation"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={item.after}
                        alt="After transformation"
                      />
                    }
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

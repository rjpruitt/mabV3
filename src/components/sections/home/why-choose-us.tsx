'use client'

import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

const benefits = [
  {
    title: 'One Day Installation',
    description: 'End the day with a better bathroom than the one you woke up with. In as little as 24 hours, we will install a new tub or shower liner for a look you will love. Your dream bathroom is closer than you think.'
  },
  {
    title: 'No Demolition, No Mess',
    description: 'We believe in building up, not tearing down. Our sleek acrylic baths are custom made to fit right over your existing tub, so there is no demolition and no mess. It is a bathroom refresh, without the renovation headaches.'
  },
  {
    title: 'Lifetime Guarantee',
    description: 'Your new bathroom will stand the test of time. That is why all Bath Fitter products come with a lifetime warranty.'
  }
]

export function WhyChooseUs() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Side */}
          <div className="relative aspect-[4/3] lg:aspect-auto min-h-[400px]">
            <Image
              src="https://placehold.co/800x600/016369/FFFFFF/png?text=Senior+Couple"
              alt="Happy senior couple in their newly renovated bathroom"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col">
            <h2 className="text-primary text-2xl mb-4 italic">Why choose us?</h2>
            <h3 className="font-pt-serif text-4xl md:text-5xl mb-8 text-[#2F2F2F]">Better results. Better experience.</h3>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <Check className="shrink-0 w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="text-[#2F2F2F] font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a 
                href="#" 
                className="text-accent hover:text-accent/90 font-semibold inline-block"
              >
                Learn more about our process
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
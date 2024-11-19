'use client'

import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    title: 'Quick, Efficient Installation',
    description: 'Many of our bathroom transformations can be completed in just 1-3 days. From simple updates to complete conversions, we work efficiently to minimize disruption to your daily life.'
  },
  {
    title: 'Thoughtful, Clean Process',
    description: 'We carefully plan each project to minimize demolition and mess. Our experienced teams use proven processes and protective measures to keep your home clean and respect your space throughout the renovation.'
  },
  {
    title: 'Quality Workmanship Guaranteed',
    description: 'We stand behind our installation work with a comprehensive workmanship guarantee. Plus, all products come with their respective manufacturer warranties for your peace of mind.'
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
              src="/images/home/why-choose-us/happyseniorscloseup.jpeg"
              alt="Happy senior couple enjoying their newly renovated bathroom"
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content Side */}
          <div className="flex flex-col">
            <h2 className="text-primary text-2xl mb-4 italic">Why choose us?</h2>
            <h3 className="font-pt-serif text-4xl md:text-5xl mb-8 text-[#2F2F2F]">
              Better Results. A Better Experience.
            </h3>
            
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
              <Link 
                href="/process" 
                className="text-accent hover:text-accent/90 font-semibold inline-block"
              >
                Learn more about our process
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
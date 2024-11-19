'use client'

import React from 'react'
import { PhoneCall, Palette, Wrench } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: PhoneCall,
    title: 'Free Consultation',
    description: 'Schedule a no-obligation consultation. We will discuss your needs, share ideas, and provide a detailed quote.'
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design & Planning',
    description: 'Choose from hundreds of styles and accessories. Our experts will help create your perfect bathroom design.'
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Expert Installation',
    description: 'Our certified installers complete most projects in just one day, with minimal disruption to your home.'
  }
]

export function ProcessOverview() {
  return (
    <section className="w-full py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto text-center mb-16">
          <h2 className="text-primary text-2xl mb-4 italic">How it works</h2>
          <h3 className="font-pt-serif text-4xl md:text-5xl text-[#2F2F2F] mb-6">
            Transform Your Bathroom in Three Easy Steps
          </h3>
          <p className="text-gray-600 text-lg">
            From consultation to completion, we make the renovation process simple and stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative p-8 bg-[#F8F6F3] rounded-sm group hover:bg-primary transition-colors duration-300"
            >
              {/* Large Number Background */}
              <div className="absolute top-4 right-4 text-6xl font-bold opacity-10 group-hover:text-white">
                {step.number}
              </div>
              
              {/* Content */}
              <div className="relative">
                <step.icon className="w-12 h-12 text-primary mb-6 group-hover:text-white" />
                <h4 className="text-[#2F2F2F] group-hover:text-white text-2xl font-bold mb-4">
                  {step.title}
                </h4>
                <p className="text-gray-600 group-hover:text-white/90">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-primary/20" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/consultation"
            className="bg-accent px-8 py-3 rounded-sm font-montserrat font-semibold text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            GET STARTED TODAY
          </Link>
          <div className="mt-4">
            <Link
              href="/process"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Learn more about our process →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 
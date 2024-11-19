'use client'

import React from 'react'
import Image from 'next/image'
import { PhoneCall, Palette, Wrench } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    icon: PhoneCall,
    image: '/images/process/steps/consultation.jpeg',
    description: 'We start with a free, no-obligation consultation to understand your needs and vision.',
    details: [
      'Discuss your bathroom goals and challenges',
      'Take measurements and assess your space',
      'Review product options and design possibilities',
      'Provide a detailed quote on the spot',
      'Answer all your questions'
    ]
  },
  {
    number: '02',
    title: 'Design & Planning',
    icon: Palette,
    image: '/images/process/steps/designplanning.jpeg',
    description: 'Work with our design experts to create your perfect bathroom.',
    details: [
      'Choose from hundreds of styles and colors',
      'Select fixtures and accessories',
      'Review safety and accessibility features',
      'Finalize design and installation timeline',
      'Schedule your installation date'
    ]
  },
  {
    number: '03',
    title: 'Expert Installation',
    icon: Wrench,
    image: '/images/process/steps/Installation.jpeg',
    description: 'Our certified installers complete your project quickly and professionally.',
    details: [
      'Preparation and protection of your home',
      'Removal of old fixtures',
      'Professional installation',
      'Quality checks and testing',
      'Final walkthrough and cleanup'
    ]
  }
]

export function ProcessSteps(): React.JSX.Element {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Content Side */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                  <h2 className="font-pt-serif text-4xl text-[#2F2F2F]">
                    {step.title}
                  </h2>
                </div>
                
                <p className="text-gray-600 text-lg mb-8">
                  {step.description}
                </p>

                <div className="bg-[#F8F6F3] p-8 rounded-sm">
                  <h3 className="font-semibold text-[#2F2F2F] mb-4">What to Expect:</h3>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={step.image}
                  alt={`${step.title} process`}
                  fill
                  priority={index === 0}
                  className="object-cover rounded-sm"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
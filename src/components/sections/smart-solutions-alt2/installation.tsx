'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Calendar, Ruler, Wrench, CheckSquare, Shield } from 'lucide-react'

const steps = [
  {
    icon: Calendar,
    title: 'Free Consultation',
    time: '1 hour',
    description: 'Meet your installation team and get expert design advice',
    details: [
      'Discuss your vision',
      'Get accurate pricing',
      'Choose materials and features',
      'Schedule your installation'
    ]
  },
  {
    icon: Ruler,
    title: 'Professional Measurement',
    time: '1 hour',
    description: 'Precise measurements by your installer ensures perfect fit',
    details: [
      'Detailed measurements',
      'Structural assessment',
      'Final design confirmation',
      'Installation prep plan'
    ]
  },
  {
    icon: Wrench,
    title: 'Expert Installation',
    time: '1-3 days',
    description: 'Your dedicated team handles the entire transformation',
    details: [
      'Protection of your home',
      'Removal of old fixtures',
      'Professional installation',
      'Daily cleanup'
    ]
  },
  {
    icon: CheckSquare,
    title: 'Final Inspection',
    time: '30 minutes',
    description: 'Ensuring everything meets our high standards',
    details: [
      'Quality inspection',
      'Functionality check',
      'Clean and pristine',
      'Usage tutorial'
    ]
  }
]

export function InstallationProcess(): React.JSX.Element {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Our Installation Process
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Expert Installation, Minimal Disruption
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your dedicated team handles everything from consultation to completion, 
              ensuring a smooth and efficient transformation.
            </p>
          </div>
        </ScrollReveal>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Connector - Desktop */}
          <div className="hidden lg:block absolute top-[100px] left-[calc(25%+24px)] right-[calc(25%+24px)] h-[2px] bg-primary/20" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div className="group bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all">
                  {/* Step Number and Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-primary to-primary-dark text-white w-12 h-12 flex items-center justify-center rounded-sm shadow-md">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-accent/20" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-[#2F2F2F]">
                        {step.title}
                      </h3>
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>

                  {/* Step Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Clean Job Site Promise */}
        <ScrollReveal>
          <div className="mt-16 bg-[#F8F6F3] p-8 rounded-sm">
            <div className="flex items-start gap-6">
              <Shield className="w-12 h-12 text-primary shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-2">
                  Our Clean Job Site Promise
                </h3>
                <p className="text-gray-600">
                  We protect your home during installation and leave your space spotless. 
                  Daily cleanup, dust barriers, and thorough final cleaning included.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

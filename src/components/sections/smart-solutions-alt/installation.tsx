'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { Clock, Shield, CheckCircle, Calendar, Ruler, Wrench, Sparkles } from 'lucide-react'

type AnimationType = 'pulse' | 'spin' | 'bounce' | 'glow';

interface ProcessStep {
  step: number
  title: string
  time: string
  icon: typeof Calendar | typeof Ruler | typeof Wrench | typeof Sparkles
  animation: AnimationType
}

interface CleanlinessGuarantee {
  title: string
  details: string
}

interface InstallationWithTimelineProps {
  processSteps: ProcessStep[]
  cleanlinessGuarantee: CleanlinessGuarantee
}

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Free Consultation',
    time: '1 hour',
    icon: Calendar,
    animation: 'pulse'  // Gentle pulse to suggest "schedule now"
  },
  {
    step: 2,
    title: 'Professional Measurement',
    time: '1 hour',
    icon: Ruler,
    animation: 'bounce'  // Subtle bounce to suggest measuring action
  },
  {
    step: 3,
    title: 'One-Day Installation',
    time: '8 hours',
    icon: Wrench,
    animation: 'spin'  // Slow spin to suggest work in progress
  },
  {
    step: 4,
    title: 'Final Inspection',
    time: '30 minutes',
    icon: Sparkles,
    animation: 'glow'  // Glow effect to suggest completion
  }
]

export function InstallationWithTimeline({ 
  processSteps, 
  cleanlinessGuarantee 
}: InstallationWithTimelineProps) {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Your Perfect Shower Solution
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Whether you're replacing an old bathtub or updating your existing shower, we'll transform your 
              space with minimal disruption. Here's how it works:
            </p>
          </div>
        </ScrollReveal>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            {processSteps.map((step) => (
              <ScrollReveal key={step.step}>
                <div className="bg-[#F8F6F3] p-4 rounded-sm relative group hover:bg-[#F8F6F3]/80 transition-colors">
                  <div className="absolute -top-3 left-4 bg-primary text-white text-sm px-2 py-1 rounded-sm">
                    Step {step.step}
                  </div>
                  <div className="pt-4">
                    <div className={`
                      inline-block mb-3
                      ${step.animation === 'pulse' && 'animate-pulse'}
                      ${step.animation === 'spin' && 'animate-spin-slow'}
                      ${step.animation === 'bounce' && 'animate-bounce-gentle'}
                      ${step.animation === 'glow' && 'animate-glow'}
                    `}>
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-[#2F2F2F] mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{step.time}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Before/After Slider */}
          <ScrollReveal>
            <div className="relative">
              <p className="font-dancing text-2xl text-primary text-center mb-4">
                Slide to compare!
              </p>
              <div className="bg-[#EDEBE8] p-4 rounded-sm">
                <div className="relative aspect-[4/3] w-full">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src="https://placehold.co/800x600/016369/FFFFFF/png?text=Before"
                        alt="Before transformation"
                        style={{ objectFit: 'cover' }}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src="https://placehold.co/800x600/016369/FFFFFF/png?text=After"
                        alt="After transformation"
                        style={{ objectFit: 'cover' }}
                      />
                    }
                    position={50}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Cleanliness Promise */}
          <ScrollReveal>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                      {cleanlinessGuarantee.title}
                    </h3>
                    <p className="text-gray-600">
                      {cleanlinessGuarantee.details}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F8F6F3] p-4 rounded-sm">
                  <CheckCircle className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-gray-600">
                    Dust barriers protect your home
                  </p>
                </div>
                <div className="bg-[#F8F6F3] p-4 rounded-sm">
                  <CheckCircle className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm text-gray-600">
                    Professional cleanup included
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
} 
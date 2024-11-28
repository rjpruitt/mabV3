'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { Clock, Shield, CheckCircle, Calendar, Ruler, Wrench, Sparkles, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

type AnimationType = 'pulse' | 'spin' | 'bounce' | 'glow';

interface ProcessStep {
  step: number
  title: string
  time: string
  icon: typeof Calendar | typeof Ruler | typeof Wrench | typeof Sparkles
  animation: AnimationType
  benefits: string[]
  customerValue: string
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
    animation: 'pulse',  // Gentle pulse to suggest "schedule now"
    benefits: ['Dust barriers protect your home', 'Professional cleanup included'],
    customerValue: 'Your satisfaction is our top priority'
  },
  {
    step: 2,
    title: 'Professional Measurement',
    time: '1 hour',
    icon: Ruler,
    animation: 'bounce',  // Subtle bounce to suggest measuring action
    benefits: ['Dust barriers protect your home', 'Professional cleanup included'],
    customerValue: 'Your satisfaction is our top priority'
  },
  {
    step: 3,
    title: 'One-Day Installation',
    time: '8 hours',
    icon: Wrench,
    animation: 'spin',  // Slow spin to suggest work in progress
    benefits: ['Dust barriers protect your home', 'Professional cleanup included'],
    customerValue: 'Your satisfaction is our top priority'
  },
  {
    step: 4,
    title: 'Final Inspection',
    time: '30 minutes',
    icon: Sparkles,
    animation: 'glow',  // Glow effect to suggest completion
    benefits: ['Dust barriers protect your home', 'Professional cleanup included'],
    customerValue: 'Your satisfaction is our top priority'
  }
]

export function InstallationWithTimeline({ 
  processSteps, 
  cleanlinessGuarantee 
}: InstallationWithTimelineProps) {
  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        {/* More compact header */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-pt-serif text-3xl md:text-4xl text-[#2F2F2F] mb-2">
              Your Perfect Shower Solution
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Whether you're replacing an old bathtub or updating your existing shower, we'll transform your 
              space with minimal disruption.
            </p>
          </div>
        </ScrollReveal>

        {/* No-Pressure Promise Banner */}
        <div className="mb-8 bg-white rounded-sm shadow-sm p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
            <div>
              <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                Our No-Pressure Promise
              </h3>
              <p className="text-gray-600">
                Unlike other companies, we don't employ salespeople. You'll work directly with your dedicated project team from consultation through completion - no high-pressure sales tactics, just honest advice from the experts who will handle your renovation.
              </p>
            </div>
          </div>
        </div>

        {/* More compact process steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[100px] right-[100px] h-[2px] bg-gradient-to-r from-primary/20 via-primary/20 to-primary/20" />
          
          {processSteps.map((step, index) => (
            <ScrollReveal 
              key={step.step} 
              delay={index * 0.15}
              className="relative"
            >
              <div className="group bg-[#F8F6F3] rounded-sm p-4 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Compact header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-sm shadow-md">
                      {step.step}
                    </div>
                    <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-colors" />
                  </div>
                  <div className="bg-primary/10 p-2 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2F2F2F] group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                </div>

                {/* Compact time display */}
                <div className="flex items-center gap-2 text-gray-600 mb-3 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{step.time}</span>
                </div>

                {/* Compact benefits */}
                <ul className="space-y-2 mb-4 text-sm">
                  {step.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Compact value statement */}
                <p className="text-sm text-gray-600 italic border-t border-primary/10 pt-2">
                  {step.customerValue}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Clean Job Site Promise */}
        <div className="mt-8 bg-white rounded-sm shadow-sm p-6">
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
      </div>
    </section>
  )
} 
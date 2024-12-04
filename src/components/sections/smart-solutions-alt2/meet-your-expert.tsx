'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { UserCheck, ShieldCheck, HardHat } from 'lucide-react'

const teamFeatures = [
  {
    icon: UserCheck,
    title: 'Your Personal Expert',
    description: 'Meet your Installation Team Leader - the same professional who guides your project from start to finish.'
  },
  {
    icon: ShieldCheck,
    title: 'Direct Communication',
    description: 'No salespeople or call centers - work directly with your experienced installation expert.'
  },
  {
    icon: HardHat,
    title: 'Professional Standards',
    description: 'Uniformed, certified teams who take pride in transforming bathrooms with care and expertise.'
  }
]

export function MeetYourExpert() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Meet Your Installation Expert
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Work Directly with Your Team Leader
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Skip the sales pitch. Your Installation Team Leader handles your consultation, 
              oversees your installation, and ensures every detail meets our high standards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/Alt2-Campaign/installation-expert/teamlead.jpeg"
                alt="Installation Team Leader consulting with homeowner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              {teamFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-sm shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#2F2F2F] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
} 
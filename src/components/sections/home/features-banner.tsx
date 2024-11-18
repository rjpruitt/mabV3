'use client'

import React from 'react'
import { Clock, Shield, Award, Hammer } from 'lucide-react'

const features = [
  {
    icon: Clock,
    text: 'Expert Installation'
  },
  {
    icon: Shield,
    text: 'Fully Insured'
  },
  {
    icon: Award,
    text: 'Quality Guaranteed'
  },
  {
    icon: Hammer,
    text: 'Professional Results'
  }
]

export function FeaturesBanner() {
  return (
    <section className="w-full bg-[#F8F6F3] py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 justify-center"
            >
              <feature.icon className="w-5 h-5 text-[#2F2F2F] shrink-0" />
              <span className="font-montserrat text-[17px] font-semibold leading-normal text-[#2F2F2F]">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ShieldCheck, Heart, Grip, Footprints } from 'lucide-react'

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Built-in Safety",
    description: "Anti-slip surfaces and reinforced walls come standard with every Smart Solutions shower."
  },
  {
    icon: Heart,
    title: "Aging in Place",
    description: "Future-proof your bathroom with accessibility features that maintain style and elegance."
  },
  {
    icon: Grip,
    title: "Support Options",
    description: "Strategically placed grab bars provide stability without compromising design."
  },
  {
    icon: Footprints,
    title: "Easy Access",
    description: "Low-threshold entry and non-slip surfaces ensure safe entry and use."
  }
]

export function SafetyFeatures() {
  return (
    <section className="w-full py-12 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Safety & Accessibility Built In
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Every Smart Solutions shower can be customized with safety features that blend 
              seamlessly into your design. Create a space that's both beautiful and accessible.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <ScrollReveal>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://placehold.co/800x600/016369/FFFFFF/png?text=Safety+Features"
                alt="Accessible shower featuring built-in seat, grab bars, and anti-slip surfaces"
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Features Side */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="bg-white p-6 rounded-sm">
                <h3 className="font-semibold text-xl text-[#2F2F2F] mb-4">
                  Available Safety Features:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-[#2F2F2F]">Built-in shower seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-[#2F2F2F]">ADA-compliant grab bars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-[#2F2F2F]">Anti-slip floor surfaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-[#2F2F2F]">Low-threshold entry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-[#2F2F2F]">Handheld shower heads</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
              {safetyFeatures.map((feature) => (
                <ScrollReveal key={feature.title}>
                  <div className="bg-white p-4 rounded-sm h-[200px] flex flex-col">
                    <feature.icon className="w-8 h-8 text-primary mb-3 shrink-0" />
                    <h4 className="font-semibold text-lg text-[#2F2F2F] mb-2 shrink-0">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
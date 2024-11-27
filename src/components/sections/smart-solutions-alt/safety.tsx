'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ShieldCheck, Heart, Grip, Footprints, Clock, Wrench, CheckCircle, Star } from 'lucide-react'

interface TeamInfo {
  title: string
  experience: string
  training: string
  background: string
}

interface TimelineInfo {
  title: string
  morning: string
  midday: string
  afternoon: string
}

interface SafetyWithProcessProps {
  teamInfo: TeamInfo
  timelineInfo: TimelineInfo
}

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

export function SafetyWithProcess({ teamInfo, timelineInfo }: SafetyWithProcessProps) {
  return (
    <section className="w-full py-12 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Safety & Peace of Mind
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Every Smart Solutions shower is designed with safety in mind and installed by experienced professionals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Safety Features */}
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

          {/* Right Column - Installation Process */}
          <div className="space-y-8">
            {/* Team Info */}
            <ScrollReveal>
              <div className="bg-white p-6 rounded-sm">
                <div className="flex items-start gap-4">
                  <Star className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl text-[#2F2F2F] mb-4">
                      {teamInfo.title}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-[#2F2F2F]">{teamInfo.experience}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-[#2F2F2F]">{teamInfo.training}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-[#2F2F2F]">{teamInfo.background}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Installation Timeline */}
            <ScrollReveal>
              <div className="bg-white p-6 rounded-sm">
                <h3 className="font-semibold text-xl text-[#2F2F2F] mb-4">
                  {timelineInfo.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-sm">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2F2F2F] mb-1">Morning</h4>
                      <p className="text-gray-600 text-sm">{timelineInfo.morning}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-sm">
                      <Wrench className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2F2F2F] mb-1">Midday</h4>
                      <p className="text-gray-600 text-sm">{timelineInfo.midday}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-sm">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2F2F2F] mb-1">Afternoon</h4>
                      <p className="text-gray-600 text-sm">{timelineInfo.afternoon}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
} 
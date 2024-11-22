'use client'

import { useState } from 'react'
import { ResourceLeadForm } from '@/components/shared/resource-lead-form/index'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Download, Heart, Users, Clock } from 'lucide-react'

const benefits = [
  {
    icon: Heart,
    title: "Compassionate Care Guide",
    description: "Learn how to provide supportive care while maintaining independence"
  },
  {
    icon: Users,
    title: "Family Support Tips",
    description: "Strategies for involving family members in care responsibilities"
  },
  {
    icon: Clock,
    title: "Daily Routine Planning",
    description: "Create effective routines for bathroom safety and accessibility"
  }
]

const testimonials = [
  {
    quote: "This guide helped our whole family understand how to better support mom while respecting her independence.",
    author: "Michael R., Overland Park"
  },
  {
    quote: "The daily routine suggestions made a huge difference in our caregiving approach.",
    author: "Linda S., Lee's Summit"
  }
]

export default function CareGuidePage() {
  const [showLeadForm, setShowLeadForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <ScrollReveal>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Family Caregiver's Guide to Bathroom Safety
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Support your loved ones with confidence. Our comprehensive guide helps 
                  families create safe, accessible bathroom environments while maintaining dignity.
                </p>
                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-4 rounded-sm transition-colors"
                >
                  <Download className="inline-block mr-2 h-5 w-5" />
                  Get Your Free Guide
                </button>
              </ScrollReveal>
            </div>
            <div className="w-full md:w-1/2">
              <ScrollReveal>
                <div className="bg-white p-8 rounded-sm shadow-lg">
                  <h3 className="text-primary text-2xl font-semibold mb-4">
                    What's Inside:
                  </h3>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      <span>Communication strategies for sensitive topics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      <span>Daily care routines and checklists</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      <span>Family coordination guidelines</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      <span>Emergency preparation tips</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4">
                Support Your Family Better
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our guide helps you provide better care while maintaining dignity and independence.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index}>
                <div className="p-6 bg-gray-50 rounded-sm hover:shadow-md transition-shadow">
                  <benefit.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-[#2F2F2F]">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4">
                From Other Caregivers
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index}>
                <div className="p-8 bg-white rounded-sm shadow-md">
                  <p className="text-lg mb-4 italic text-gray-600">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-primary font-medium">
                    - {testimonial.author}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <ResourceLeadForm
        resourceId="care-guide"
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
      />
    </div>
  )
} 
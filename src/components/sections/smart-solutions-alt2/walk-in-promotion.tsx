'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ArrowRight, ShowerHead, Bath } from 'lucide-react'
import { OfferModal } from '@/components/ui/offer-modal'
import { DesignConsultation } from '@/components/ui/design-consultation'

const options = [
  {
    icon: Bath,
    title: "Tub-to-Shower Conversion",
    description: "Transform your outdated tub into a modern walk-in shower.",
    benefits: [
      "Maximize your space.",
      "One-day installation available.",
      "Modern, easy-clean design."
    ],
    id: 'tub'
  },
  {
    icon: ShowerHead,
    title: "Shower Replacement",
    description: "Upgrade to a premium walk-in shower system.",
    benefits: [
      "Premium fixtures included.",
      "Custom storage solutions.",
      "Low-maintenance materials."
    ],
    id: 'shower'
  }
]

// Offer data
const tubOffer = {
  title: "Limited Time Tub-to-Shower Offer",
  offer: {
    headline: "Transform Your Tub into a Modern Walk-In Shower",
    details: [
      "Free premium glass door upgrade ($1,200 value)",
      "Free shower storage solutions ($400 value)",
      "Free fixture finish upgrade ($300 value)",
      "Professional installation included"
    ],
    savings: "Total Savings: $1,900",
    validUntil: "December 31, 2024"
  }
}

const showerOffer = {
  title: "Limited Time Shower Replacement Offer",
  offer: {
    headline: "Upgrade to a Premium Walk-In Shower",
    details: [
      "Free rainfall shower head upgrade ($800 value)",
      "Free built-in storage system ($400 value)",
      "Free designer hardware upgrade ($300 value)",
      "Professional installation included"
    ],
    savings: "Total Savings: $1,500",
    validUntil: "December 31, 2024"
  }
}

export function WalkInPromotion() {
  const [showTubModal, setShowTubModal] = useState(false)
  const [showShowerModal, setShowShowerModal] = useState(false)
  const [showConsultation, setShowConsultation] = useState(false)

  const handleConsultationStart = () => {
    setShowTubModal(false)
    setShowShowerModal(false)
    setShowConsultation(true)
  }

  return (
    <section className="py-12 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="text-accent font-medium mb-2 block">
              Limited Time Offer
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Transform Your Bathroom with a New Walk-In Shower
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the perfect solution for your space and save with our special promotion
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {options.map((option) => (
            <ScrollReveal key={option.title}>
              <div className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">
                    {option.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {option.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => option.id === 'tub' ? setShowTubModal(true) : setShowShowerModal(true)}
                  className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-sm flex items-center justify-center gap-2 group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Modals */}
        <OfferModal
          isOpen={showTubModal}
          onClose={() => setShowTubModal(false)}
          title={tubOffer.title}
          offer={tubOffer.offer}
          type="tub-conversion"
          onConsultationClick={handleConsultationStart}
        />

        <OfferModal
          isOpen={showShowerModal}
          onClose={() => setShowShowerModal(false)}
          title={showerOffer.title}
          offer={showerOffer.offer}
          type="shower-replacement"
          onConsultationClick={handleConsultationStart}
        />

        <DesignConsultation
          isOpen={showConsultation}
          onClose={() => setShowConsultation(false)}
          onComplete={(responses: ConsultationResponse) => {
            console.log('Consultation responses:', responses)
            setShowConsultation(false)
          }}
        />
      </div>
    </section>
  )
} 
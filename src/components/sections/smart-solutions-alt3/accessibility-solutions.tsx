'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Shield, Heart, HandHeart, Download, Award } from 'lucide-react'
import { AccessibilityConsultation } from '@/components/ui/accessibility-consultation/accessibility-consultation'

const safetyFeatures = [
  {
    icon: Shield,
    title: 'Safety First Design',
    features: [
      'Anti-slip flooring',
      'Sturdy grab bars',
      'Zero-threshold entry',
      'Built-in shower seats'
    ]
  },
  {
    icon: Heart,
    title: 'Comfort & Convenience',
    features: [
      'Hand-held shower heads',
      'Easy-reach controls',
      'Adequate lighting',
      'Wide entry space'
    ]
  }
]

const certifications = [
  {
    image: '/images/badges/certifications/ada.webp',
    alt: 'ADA Compliant - Committed to Americans with Disabilities Act Standards'
  },
  {
    image: '/images/badges/certifications/CAPS-1-194x300.png',
    alt: 'Certified Aging-in-Place Specialist (CAPS) - National Association of Home Builders'
  },
  {
    image: '/images/badges/certifications/Landing-page-Badge-06-600x600.png',
    alt: 'NKBA KBIS Universal Design Specialty Badge - National Kitchen & Bath Association'
  }
]

const accessibilityTestimonial = {
  quote: "I can finally shower independently again. The grab bars and built-in seat make me feel completely safe and secure.",
  author: "Margaret R., 73",
  location: "Overland Park"
}

export function AccessibilitySolutions() {
  const [showConsultation, setShowConsultation] = useState(false)

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-12">
            <span className="text-accent font-medium mb-2 md:mb-4 block">
              Safe & Accessible Solutions
            </span>
            <h2 className="font-pt-serif text-3xl md:text-4xl text-[#2F2F2F] mb-2 md:mb-4">
              Aging in Place with Confidence
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Expert solutions for maintaining independence and safety in your home. 
              Our accessibility specialists ensure your bathroom meets your needs today and tomorrow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/solutions/smart-solutions/showers/alt2/accessibility/safety-accessibility.jpeg"
                alt="Senior woman standing confidently in an accessible shower featuring safety grab bars, built-in seating, and modern fixtures"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col justify-between h-full">
              <blockquote className="bg-white rounded-sm p-6 shadow-sm mb-6">
                <p className="text-xl text-gray-600 italic mb-4">
                  "{accessibilityTestimonial.quote}"
                </p>
                <footer>
                  <cite className="text-[#2F2F2F] font-semibold block">
                    {accessibilityTestimonial.author}
                  </cite>
                  <span className="text-gray-500">{accessibilityTestimonial.location}</span>
                </footer>
              </blockquote>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {certifications.map((cert, index) => (
                  <div key={index} className="relative w-[120px] h-[60px]">
                    <Image
                      src={cert.image}
                      alt={cert.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {safetyFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <div className="bg-white rounded-sm p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2F2F2F]">
                    {feature.title}
                  </h3>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="bg-[#F8F6F3] p-6 md:p-8 rounded-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-4 flex-1">
                <HandHeart className="w-12 h-12 text-primary shrink-0" />
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                    Free Safety Assessment
                  </h3>
                  <p className="text-gray-600">
                    Get personalized recommendations for your space
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowConsultation(true)}
                  className="w-full sm:w-auto bg-accent text-white px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors"
                >
                  Schedule Assessment
                </button>
                <button className="w-full sm:w-auto bg-white text-primary px-6 py-3 rounded-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Safety Guide
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <AccessibilityConsultation
          isOpen={showConsultation}
          onClose={() => setShowConsultation(false)}
          onComplete={(responses) => {
            console.log('Consultation responses:', responses)
            setShowConsultation(false)
          }}
        />
      </div>
    </section>
  )
} 
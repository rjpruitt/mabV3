'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type TestimonialType = {
  id: number
  quote: string
  author: string
  location: string
  rating: number
  projectType: string
}

const testimonials: TestimonialType[] = [
  {
    id: 1,
    quote: "I can't say enough good things about the quality of the workmanship and the knowledge and professionalism of our installer...",
    author: "Elaine Stashak",
    location: "Tulsa, OK",
    rating: 5,
    projectType: "Tub-to-Shower Conversion"
  },
  {
    id: 2,
    quote: "The safety features they installed in my bathroom have given me back my independence. The whole process was quick and the team was so respectful of my home.",
    author: "Robert Johnson",
    location: "Oklahoma City, OK",
    rating: 5,
    projectType: "Accessible Bathroom"
  },
  {
    id: 3,
    quote: "From start to finish, the experience was fantastic. They helped us design exactly what we wanted and completed the installation in just two days.",
    author: "Sarah & Mike Peters",
    location: "Norman, OK",
    rating: 5,
    projectType: "Complete Bathroom Remodel"
  },
  {
    id: 4,
    quote: "The walk-in shower they installed is beautiful and so much safer than our old tub. The installers were professional and kept everything clean.",
    author: "Patricia Williams",
    location: "Broken Arrow, OK",
    rating: 5,
    projectType: "Walk-In Shower Installation"
  },
  {
    id: 5,
    quote: "We were amazed at how quickly they transformed our outdated bathroom. The quality is outstanding and the new fixtures are beautiful.",
    author: "David & Mary Thompson",
    location: "Edmond, OK",
    rating: 5,
    projectType: "Bathroom Modernization"
  }
]

export function Testimonials(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="relative w-full bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/testimonials/happyseniorstestimonial.jpeg"
          alt="Happy customers"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative w-full">
        {/* Testimonials */}
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-[800px] mx-auto text-center text-white">
            {/* Quote */}
            <h2 className="font-dancing text-5xl md:text-6xl mb-8">
              {activeTestimonial.quote}
            </h2>

            {/* Rating */}
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>

            {/* Author Info */}
            <div className="space-y-2 mb-12">
              <p className="text-xl font-semibold">{activeTestimonial.author}</p>
              <p className="text-white/80">{activeTestimonial.location}</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveIndex(prev => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full">
          <div className="max-w-[800px] mx-auto text-center px-4 pb-32">
            <h3 className="font-pt-serif text-4xl text-white mb-4">
              Ready To Speak With A Mid America Bathworks Expert?
            </h3>
            <p className="text-white/80 mb-8">
              Book a FREE consultation by calling us at <span className="text-accent">1 (555) 555-5555</span> or by using
              the link below to book a preferred date and time!
            </p>
            <Link
              href="/consultation"
              className="bg-accent px-8 py-3 rounded-sm font-montserrat font-semibold text-white hover:opacity-90 transition-opacity inline-block"
            >
              BOOK A FREE CONSULTATION
            </Link>
            <p className="font-dancing text-2xl mt-8 text-white">
              It's quick, free and easy!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 
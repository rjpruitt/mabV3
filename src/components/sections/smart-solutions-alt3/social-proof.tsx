'use client'

import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Sarah M.',
    location: 'Kansas City',
    image: '/images/Alt2-Campaign/social-proof/SarahM.jpeg',
    imagePosition: 'object-[50%_30%]',
    rating: 5,
    text: 'Working directly with the installation team made all the difference. No sales pressure, just honest advice and excellent work.'
  },
  {
    name: 'Michael R.',
    location: 'Overland Park',
    image: '/images/Alt2-Campaign/social-proof/MichaelR.jpeg',
    imagePosition: 'object-[50%_35%]',
    rating: 5,
    text: 'They transformed our bathroom in just two days. The quality is outstanding and the team was professional throughout.'
  },
  {
    name: 'Jennifer L.',
    location: 'Lee\'s Summit',
    image: '/images/Alt2-Campaign/social-proof/JenniferL.jpeg',
    imagePosition: 'object-[50%_40%]',
    rating: 5,
    text: 'Love our new walk-in shower! The design team helped us choose the perfect style and features for our space.'
  }
]

export function SocialProof(): React.JSX.Element {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent font-medium mb-4 block">
              Customer Stories
            </span>
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied homeowners who have transformed their 
              bathrooms with Mid America Bathworks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <div className="bg-white rounded-sm p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className={`object-cover ${review.imagePosition}`}
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2F2F2F]">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.location}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{review.text}"</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

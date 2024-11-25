'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { HoverCard } from '@/components/ui/hover-card'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'

const tiers = [
  {
    level: 'Smart Solutions',
    description: 'Quality updates that maximize value',
    timeframe: '1-2 Days',
    priceIndicator: '$',
    features: [
      'Tub or shower updates',
      'New fixtures and hardware',
      'Safety features',
      'Basic design options',
      'Quick installation'
    ],
    idealFor: 'Perfect for focused updates and safety improvements'
  },
  {
    level: 'Premium Upgrades',
    description: 'Enhanced materials and options',
    timeframe: '2-4 Days',
    priceIndicator: '$$',
    features: [
      'Custom shower solutions',
      'Premium fixtures',
      'Extended design choices',
      'Additional accessories',
      'Coordinated design elements'
    ],
    idealFor: 'Ideal for comprehensive bathroom updates'
  },
  {
    level: 'Luxury Transformations',
    description: 'Complete high-end renovations',
    timeframe: '5-10 Days',
    priceIndicator: '$$$',
    features: [
      'Full custom designs',
      'Luxury materials',
      'High-end fixtures',
      'Unlimited design options',
      'Complete transformations'
    ],
    idealFor: 'For those seeking the ultimate bathroom experience'
  }
]

export function BudgetTiers(): React.JSX.Element {
  return (
    <div 
      className="w-full py-20 bg-white"
      aria-label="Budget tier options"
    >
      <div className="container mx-auto px-4">
        <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4 text-center">
          Solutions For Every Need
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
          We offer a range of options to fit your style, timeline, and budget. Every solution includes our quality guarantee and professional installation.
        </p>
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
        >
          {tiers.map((tier) => (
            <HoverCard key={tier.level}>
              <div 
                className="bg-[#F8F6F3] p-8 rounded-sm hover:shadow-lg transition-shadow"
                role="listitem"
                tabIndex={0}
                aria-labelledby={`tier-${tier.level}`}
              >
                <div className="text-center mb-8">
                  <div 
                    className="text-primary font-dancing text-2xl mb-2"
                    aria-label={`Price range: ${tier.priceIndicator}`}
                  >
                    {tier.priceIndicator}
                  </div>
                  <Heading 
                    id={`tier-${tier.level}`}
                    className="font-pt-serif text-2xl text-[#2F2F2F] mb-2"
                  >
                    {tier.level}
                  </Heading>
                  <p className="text-gray-600 text-sm">
                    {tier.description}
                  </p>
                </div>

                <div 
                  className="space-y-4 mb-8"
                  role="list"
                  aria-label={`Features included in ${tier.level}`}
                >
                  {tier.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-start gap-3"
                      role="listitem"
                    >
                      <Check 
                        className="w-5 h-5 text-primary shrink-0 mt-0.5" 
                        aria-hidden="true"
                      />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div 
                  className="text-center pt-4 border-t border-gray-200"
                  aria-label={`Timeframe for ${tier.level}`}
                >
                  <div className="text-primary font-semibold mb-2">
                    Typical Timeframe
                  </div>
                  <div className="text-gray-600 text-sm">
                    {tier.timeframe}
                  </div>
                </div>

                {/* Hidden but available to screen readers */}
                <div className="sr-only">
                  Ideal for: {tier.idealFor}
                </div>
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  )
} 
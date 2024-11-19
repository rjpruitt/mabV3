'use client'

import React from 'react'
import { Check } from 'lucide-react'

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
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
            Solutions For Every Need
          </h2>
          <p className="text-gray-600">
            We offer a range of options to fit your style, timeline, and budget. 
            Every solution includes our quality guarantee and professional installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.level}
              className="bg-[#F8F6F3] p-8 rounded-sm hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-8">
                <div className="text-primary font-dancing text-2xl mb-2">
                  {tier.priceIndicator}
                </div>
                <h3 className="font-pt-serif text-2xl text-[#2F2F2F] mb-2">
                  {tier.level}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-primary font-semibold mb-2">
                  Typical Timeframe
                </div>
                <div className="text-gray-600 text-sm">
                  {tier.timeframe}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
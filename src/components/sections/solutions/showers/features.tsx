'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const showerSolutions = [
  {
    id: 'tub-to-shower',
    title: 'Tub-to-Shower Conversion',
    description: 'Transform your unused tub into a modern, accessible walk-in shower.',
    budgetOptions: [
      {
        level: 'Smart Solutions',
        price: '$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Conversion',
        features: [
          'One-day installation in most cases',
          'Standard height acrylic walls',
          'Basic shower head and controls',
          'Standard shower base with integrated drain',
          'Basic glass door',
          'Single shower caddy',
          'Standard grab bar',
          'Limited color options',
          'Basic fixtures and hardware'
        ],
        benefits: [
          'Affordable transformation',
          'Quick turnaround',
          'Low maintenance materials',
          'Basic safety features',
          'Improved accessibility'
        ]
      },
      {
        level: 'Premium Upgrades',
        price: '$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Conversion',
        features: [
          'Custom wall height options',
          'Premium fixtures and hardware',
          'Built-in corner shelving',
          'Expanded color and pattern choices',
          'Semi-frameless glass options',
          'Rainfall shower head',
          'Handheld shower option',
          'Multiple safety grab bars',
          'Textured slip-resistant flooring',
          'Designer drain covers',
          'Accent panels and trim options'
        ],
        benefits: [
          'More design flexibility',
          'Enhanced safety features',
          'Better water control',
          'Premium look and feel',
          'Increased home value'
        ]
      },
      {
        level: 'Luxury Transformations',
        price: '$$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Luxury+Conversion',
        features: [
          'Floor-to-ceiling custom walls',
          'Natural stone looks',
          'Digital shower controls',
          'Multiple shower heads',
          'Body sprays',
          'Built-in seating',
          'Custom storage solutions',
          'Frameless glass enclosure',
          'Premium designer hardware',
          'Custom tile-look patterns',
          'Decorative accent panels',
          'Integrated lighting options',
          'Custom drain designs'
        ],
        benefits: [
          'Spa-like experience',
          'Maximum customization',
          'Latest technology',
          'Highest quality materials',
          'Significant home value increase'
        ]
      }
    ]
  },
  {
    id: 'walk-in',
    title: 'Walk-In Showers',
    description: 'Custom walk-in showers designed for style and functionality.',
    budgetOptions: [
      {
        level: 'Smart Solutions',
        price: '$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Walk+In',
        features: [
          'Standard height walls',
          'Clear glass door',
          'Basic shower head',
          'Corner shelf',
          'Standard drain',
          'Limited color options'
        ],
        benefits: [
          'Cost-effective solution',
          'Clean, modern look',
          'Easy maintenance'
        ]
      },
      {
        level: 'Premium Upgrades',
        price: '$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Walk+In',
        features: [
          'Extended height walls',
          'Semi-frameless glass',
          'Multiple shower heads',
          'Built-in storage',
          'Designer drain options',
          'Wide color selection'
        ],
        benefits: [
          'Enhanced features',
          'More design options',
          'Premium materials'
        ]
      },
      {
        level: 'Luxury Transformations',
        price: '$$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Luxury+Walk+In',
        features: [
          'Floor-to-ceiling design',
          'Frameless glass enclosure',
          'Digital controls',
          'Body sprays',
          'Custom storage solutions',
          'Premium finishes'
        ],
        benefits: [
          'Spa-like experience',
          'Maximum customization',
          'High-end materials'
        ]
      }
    ]
  },
  {
    id: 'barrier-free',
    title: 'Barrier-Free Showers',
    description: 'Zero-threshold showers designed for maximum accessibility and safety.',
    budgetOptions: [
      {
        level: 'Smart Solutions',
        price: '$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Barrier+Free',
        features: [
          'Zero-threshold entry',
          'Grab bars',
          'Anti-slip flooring',
          'Hand-held shower head',
          'Basic bench',
          'Standard drain'
        ],
        benefits: [
          'Safe accessibility',
          'Essential features',
          'Value-focused'
        ]
      },
      {
        level: 'Premium Upgrades',
        price: '$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Barrier+Free',
        features: [
          'Curbless design',
          'Multiple grab bars',
          'Textured flooring',
          'Dual shower heads',
          'Built-in seating',
          'Linear drain'
        ],
        benefits: [
          'Enhanced safety',
          'More comfort features',
          'Better aesthetics'
        ]
      },
      {
        level: 'Luxury Transformations',
        price: '$$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Luxury+Barrier+Free',
        features: [
          'Custom threshold-free design',
          'Designer safety features',
          'Premium non-slip surfaces',
          'Digital temperature control',
          'Heated seating',
          'Custom drainage system'
        ],
        benefits: [
          'Ultimate accessibility',
          'Premium safety features',
          'Luxurious comfort'
        ]
      }
    ]
  }
]

export function ShowersFeatures() {
  // Track which solution section is expanded on mobile
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null)
  // Track expanded budget options within each solution
  const [expandedDetails, setExpandedDetails] = useState<Record<string, Set<string>>>({})

  const toggleSolution = (solutionId: string) => {
    setExpandedSolution(current => current === solutionId ? null : solutionId)
  }

  const toggleExpanded = (e: React.MouseEvent, solutionId: string, optionLevel: string) => {
    // Prevent event from bubbling up to parent card
    e.stopPropagation()
    
    setExpandedDetails(prev => {
      const current = prev[solutionId] || new Set()
      const next = new Set(current)
      
      if (next.has(optionLevel)) {
        next.delete(optionLevel)
      } else {
        next.add(optionLevel)
      }

      return {
        ...prev,
        [solutionId]: next
      }
    })
  }

  const isExpanded = (solutionId: string, optionLevel: string) => {
    return expandedDetails[solutionId]?.has(optionLevel) || false
  }

  return (
    <div className="py-[120px]">
      <div className="space-y-8 md:space-y-[120px]">
        {showerSolutions.map((solution) => (
          <div 
            key={solution.id}
            className="w-full bg-white"
          >
            {/* Mobile Accordion Header */}
            <button
              className="w-full flex items-center justify-between p-4 md:hidden"
              onClick={() => toggleSolution(solution.id)}
            >
              <div>
                <h2 className="font-pt-serif text-2xl text-[#2F2F2F] text-left">
                  {solution.title}
                </h2>
                <p className="text-gray-600 text-sm text-left">
                  {solution.description}
                </p>
              </div>
              {expandedSolution === solution.id ? (
                <ChevronUp className="w-6 h-6 text-primary shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-6 h-6 text-primary shrink-0 ml-4" />
              )}
            </button>

            {/* Mobile Expanded Content */}
            <div className={`
              md:block
              ${expandedSolution === solution.id ? 'block' : 'hidden'}
            `}>
              {/* Desktop Header */}
              <div className="hidden md:block text-center mb-16">
                <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
                  {solution.title}
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {solution.description}
                </p>
              </div>

              <div className="container mx-auto px-4">
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">
                  {solution.budgetOptions.map((option) => (
                    <ScrollReveal key={option.level}>
                      <div 
                        className={`bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer
                          ${expandedDetails[solution.id]?.has(option.level) ? 'ring-2 ring-primary' : ''}
                        `}
                        onClick={(e) => toggleExpanded(e, solution.id, option.level)}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={option.image}
                            alt={`${option.level} ${solution.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover rounded-t-sm"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-[#2F2F2F]">
                              {option.level}
                            </h3>
                            <span className="text-primary text-xl">
                              {option.price}
                            </span>
                          </div>
                          
                          {/* Expandable Button */}
                          <button
                            onClick={(e) => toggleExpanded(e, solution.id, option.level)}
                            className="w-full flex items-center justify-between py-2 text-primary"
                          >
                            <span>View Features & Benefits</span>
                            {isExpanded(solution.id, option.level) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {/* Expandable Content */}
                          {isExpanded(solution.id, option.level) && (
                            <div className="pt-4 space-y-6">
                              <div>
                                <h4 className="font-semibold text-[#2F2F2F] mb-4">
                                  Features Include:
                                </h4>
                                <ul className="space-y-3">
                                  {option.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                      <span className="text-gray-600">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#2F2F2F] mb-4">
                                  Key Benefits:
                                </h4>
                                <ul className="space-y-3">
                                  {option.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                      <span className="text-gray-600">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-8">
                  {solution.budgetOptions.map((option) => (
                    <ScrollReveal key={option.level}>
                      <div className="bg-white rounded-sm shadow-sm">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={option.image}
                            alt={`${option.level} ${solution.title}`}
                            fill
                            sizes="100vw"
                            className="object-cover rounded-t-sm"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-[#2F2F2F]">
                              {option.level}
                            </h3>
                            <span className="text-primary text-xl">
                              {option.price}
                            </span>
                          </div>
                          
                          {/* Expandable Button */}
                          <button
                            onClick={(e) => toggleExpanded(e, solution.id, option.level)}
                            className="w-full flex items-center justify-between py-2 text-primary"
                          >
                            <span>View Features & Benefits</span>
                            {isExpanded(solution.id, option.level) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {/* Expandable Content */}
                          {isExpanded(solution.id, option.level) && (
                            <div className="pt-4 space-y-6">
                              <div>
                                <h4 className="font-semibold text-[#2F2F2F] mb-4">
                                  Features Include:
                                </h4>
                                <ul className="space-y-3">
                                  {option.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                      <span className="text-gray-600">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#2F2F2F] mb-4">
                                  Key Benefits:
                                </h4>
                                <ul className="space-y-3">
                                  {option.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                      <span className="text-gray-600">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const bathtubSolutions = [
  {
    id: 'walk-in-tubs',
    title: 'Walk-In Bathtubs',
    description: 'Safe, luxurious bathing solutions that combine comfort with accessibility.',
    budgetOptions: [
      {
        level: 'Smart Solutions',
        price: '$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Walk+In+Tub',
        features: [
          'Low-threshold entry door',
          'Built-in safety grab bars',
          'Non-slip surfaces',
          'Standard faucet and hand shower',
          'Quick-drain technology',
          'ADA compliant seating',
          'Basic hydrotherapy jets',
          'Standard size options',
          'Limited color choices'
        ],
        benefits: [
          'Enhanced safety and accessibility',
          'Independent bathing',
          'Basic therapeutic features',
          'Quick installation',
          'Budget-friendly option'
        ]
      },
      {
        level: 'Premium Upgrades',
        price: '$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Walk+In+Tub',
        features: [
          'Wide entry door with low threshold',
          'Ergonomic safety features',
          'Heated seating and backrest',
          'Multiple hydrotherapy jets',
          'Chromotherapy lighting',
          'Hand-held shower with multiple settings',
          'Rapid drain system',
          'Custom size options',
          'Extended warranty coverage',
          'Premium finish options'
        ],
        benefits: [
          'Enhanced comfort features',
          'Therapeutic benefits',
          'Customizable experience',
          'Premium safety features',
          'Increased home value'
        ]
      },
      {
        level: 'Luxury Transformations',
        price: '$$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Luxury+Walk+In+Tub',
        features: [
          'Spa-like design and features',
          'Digital controls with memory settings',
          'Advanced hydrotherapy system',
          'Air jet massage system',
          'Aromatherapy system',
          'Premium chromotherapy',
          'Heated surfaces throughout',
          'Ozone sterilization system',
          'Custom design options',
          'Lifetime warranty'
        ],
        benefits: [
          'Complete spa experience',
          'Maximum therapeutic benefits',
          'Ultimate comfort and luxury',
          'Top-tier safety features',
          'Significant home value increase'
        ]
      }
    ]
  },
  {
    id: 'tub-conversion',
    title: 'Traditional to Walk-In Conversion',
    description: 'Convert your existing bathtub into a safe, accessible walk-in tub while maintaining style.',
    budgetOptions: [
      {
        level: 'Smart Solutions',
        price: '$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Conversion',
        features: [
          'Basic walk-in door installation',
          'Standard safety features',
          'Essential grab bars',
          'Basic faucet and controls',
          'Standard seat installation',
          'Quick-drain system',
          'Basic surround update'
        ],
        benefits: [
          'Improved accessibility',
          'Basic safety features',
          'Maintained footprint',
          'Cost-effective solution',
          'Quick installation'
        ]
      },
      {
        level: 'Premium Upgrades',
        price: '$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Conversion',
        features: [
          'Wide door options',
          'Enhanced safety features',
          'Hydrotherapy jets',
          'Premium fixtures',
          'Heated seating',
          'Improved drainage',
          'Designer surround options',
          'Multiple color choices'
        ],
        benefits: [
          'Enhanced comfort',
          'Better therapeutic options',
          'More style choices',
          'Improved functionality',
          'Added home value'
        ]
      },
      {
        level: 'Luxury Transformations',
        price: '$$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Luxury+Conversion',
        features: [
          'Custom door designs',
          'Full hydrotherapy system',
          'Air jet massage',
          'Digital controls',
          'Premium surround materials',
          'Chromotherapy lighting',
          'Aromatherapy system',
          'Heated surfaces',
          'Custom design options'
        ],
        benefits: [
          'Maximum luxury',
          'Full therapeutic suite',
          'Complete customization',
          'Premium safety',
          'Highest value addition'
        ]
      }
    ]
  },
  {
    id: 'tub-replacement',
    title: 'Bathtub & Surround Replacement',
    description: 'Transform your existing bathroom with a modern, stylish bathtub and surround system.',
    budgetOptions: [
      {
        level: 'Smart Solutions',
        price: '$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Replacement',
        features: [
          'Standard acrylic tub',
          'Basic wall surround system',
          'Essential fixtures and hardware',
          'Standard shower head',
          'Basic storage solutions',
          'Limited color options',
          'Standard drain placement'
        ],
        benefits: [
          'Fresh, updated look',
          'Easy maintenance',
          'Quick installation',
          'Cost-effective solution',
          'Improved functionality'
        ]
      },
      {
        level: 'Premium Upgrades',
        price: '$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Replacement',
        features: [
          'Premium acrylic tub design',
          'Designer wall patterns',
          'Built-in storage solutions',
          'Dual shower heads',
          'Premium fixtures',
          'Extended color options',
          'Flexible drain placement',
          'Designer accent panels'
        ],
        benefits: [
          'Enhanced style options',
          'Better functionality',
          'Quality materials',
          'Increased durability',
          'Modern aesthetic'
        ]
      },
      {
        level: 'Luxury Transformations',
        price: '$$$',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Luxury+Replacement',
        features: [
          'High-end tub designs',
          'Custom wall solutions',
          'Premium stone-look finishes',
          'Integrated lighting',
          'Digital shower controls',
          'Custom storage solutions',
          'Heated surfaces',
          'Designer hardware',
          'Custom tile-look patterns'
        ],
        benefits: [
          'Luxury spa experience',
          'Maximum customization',
          'Premium materials',
          'Sophisticated design',
          'Optimal resale value'
        ]
      }
    ]
  }
]

export function BathtubsFeatures() {
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
        {bathtubSolutions.map((solution) => (
          <Section 
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
          </Section>
        ))}
      </div>
    </div>
  )
} 
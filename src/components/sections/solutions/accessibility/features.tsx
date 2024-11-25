'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const accessibilitySolutions = [
  {
    id: 'mobility-support',
    title: 'Mobility & Support Solutions',
    description: 'Essential safety features that blend seamlessly with your bathroom\'s design.',
    solutions: [
      {
        name: 'Designer Grab Bars',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Designer+Grab+Bars',
        description: 'Stylish support that complements your décor while providing essential safety',
        features: [
          'Multiple finish options (brushed nickel, chrome, bronze)',
          'Decorative designs that match your fixtures',
          'ADA compliant weight capacity',
          'Various lengths and configurations',
          'Concealed mounting hardware',
          'Coordinating toilet paper holders and towel bars'
        ]
      },
      {
        name: 'Premium Seating',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Premium+Seating',
        description: 'Comfortable, secure seating solutions that enhance bathing safety',
        features: [
          'Teak fold-down shower seats',
          'Built-in corner benches',
          'Padded comfort seating',
          'Wall-mounted options',
          'Quick-dry materials',
          'Designer finishes'
        ]
      },
      {
        name: 'Non-Slip Surfaces',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Non+Slip',
        description: 'Advanced surface treatments for maximum safety',
        features: [
          'Invisible grip technology',
          'Textured floor patterns',
          'Built-in traction zones',
          'Easy-clean surfaces',
          'Lifetime warranty',
          'ADA compliant materials'
        ]
      }
    ]
  },
  {
    id: 'accessible-entry',
    title: 'Accessible Entry Solutions',
    description: 'Make your bathroom easily accessible while maintaining elegant design.',
    solutions: [
      {
        name: 'Zero-Threshold Entries',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Zero+Threshold',
        description: 'Seamless transitions for easy access',
        features: [
          'Completely flat entry',
          'Custom drainage solutions',
          'Decorative linear drains',
          'Slip-resistant flooring',
          'Multiple finish options',
          'Waterproofing guarantee'
        ]
      },
      {
        name: 'Wide Entry Designs',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Wide+Entry',
        description: 'Spacious openings for comfortable access',
        features: [
          '36" minimum door width',
          'Sliding door options',
          'Frameless glass designs',
          'Easy-glide systems',
          'Multiple handle options',
          'Custom glass treatments'
        ]
      },
      {
        name: 'Barrier-Free Solutions',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Barrier+Free',
        description: 'Complete accessibility without compromising style',
        features: [
          'Open concept designs',
          'Curbless shower bases',
          'Integrated water containment',
          'Designer floor patterns',
          'Multiple drain options',
          'Custom sizing available'
        ]
      }
    ]
  },
  {
    id: 'smart-controls',
    title: 'Smart Controls & Fixtures',
    description: 'Intuitive controls and fixtures designed for ease of use and safety.',
    solutions: [
      {
        name: 'Digital Controls',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Digital+Controls',
        description: 'Advanced technology for precise control and safety',
        features: [
          'Touch-screen interfaces',
          'Voice-activated options',
          'Temperature limiters',
          'Flow control settings',
          'Memory functions',
          'Emergency shut-off'
        ]
      },
      {
        name: 'Accessible Fixtures',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Accessible+Fixtures',
        description: 'Easy-to-use fixtures that enhance independence',
        features: [
          'Lever-handle faucets',
          'Hand-held shower systems',
          'Height-adjustable heads',
          'Easy-grip controls',
          'Anti-scald protection',
          'Multiple spray patterns'
        ]
      },
      {
        name: 'Smart Lighting',
        image: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Smart+Lighting',
        description: 'Intelligent lighting for safety and ambiance',
        features: [
          'Motion-activated lights',
          'Under-cabinet guidance',
          'Illuminated grab bars',
          'Night light features',
          'Dimming controls',
          'Energy efficient LEDs'
        ]
      }
    ]
  }
]

export function AccessibilityFeatures() {
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null)
  const [expandedDetails, setExpandedDetails] = useState<Record<string, Set<string>>>({})

  const toggleSolution = (solutionId: string) => {
    setExpandedSolution(current => current === solutionId ? null : solutionId)
  }

  const toggleExpanded = (e: React.MouseEvent, solutionId: string, solutionName: string) => {
    e.stopPropagation()
    
    setExpandedDetails(prev => {
      const current = prev[solutionId] || new Set()
      const next = new Set(current)
      
      if (next.has(solutionName)) {
        next.delete(solutionName)
      } else {
        next.add(solutionName)
      }

      return {
        ...prev,
        [solutionId]: next
      }
    })
  }

  const isExpanded = (solutionId: string, solutionName: string) => {
    return expandedDetails[solutionId]?.has(solutionName) || false
  }

  return (
    <div className="py-[120px]">
      <div className="space-y-8 md:space-y-[120px]">
        {accessibilitySolutions.map((solution) => (
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
                  {solution.solutions.map((item) => (
                    <ScrollReveal key={item.name}>
                      <div 
                        className={`bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer
                          ${expandedDetails[solution.id]?.has(item.name) ? 'ring-2 ring-primary' : ''}
                        `}
                        onClick={(e) => toggleExpanded(e, solution.id, item.name)}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={item.image}
                            alt={`${item.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover rounded-t-sm"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="font-semibold text-[#2F2F2F] text-xl">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">
                              {item.description}
                            </p>
                          </div>
                          
                          {/* Expandable Button */}
                          <button
                            onClick={(e) => toggleExpanded(e, solution.id, item.name)}
                            className="w-full flex items-center justify-between py-2 text-primary"
                          >
                            <span>View Features</span>
                            {isExpanded(solution.id, item.name) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {/* Expandable Content */}
                          {isExpanded(solution.id, item.name) && (
                            <div className="pt-4">
                              <h4 className="font-semibold text-[#2F2F2F] mb-4">
                                Features Include:
                              </h4>
                              <ul className="space-y-3">
                                {item.features.map((feature) => (
                                  <li key={feature} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                    <span className="text-gray-600">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-8">
                  {solution.solutions.map((item) => (
                    <ScrollReveal key={item.name}>
                      <div className="bg-white rounded-sm shadow-sm">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={item.image}
                            alt={`${item.name}`}
                            fill
                            sizes="100vw"
                            className="object-cover rounded-t-sm"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="font-semibold text-[#2F2F2F] text-xl">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">
                              {item.description}
                            </p>
                          </div>
                          
                          {/* Expandable Button */}
                          <button
                            onClick={(e) => toggleExpanded(e, solution.id, item.name)}
                            className="w-full flex items-center justify-between py-2 text-primary"
                          >
                            <span>View Features</span>
                            {isExpanded(solution.id, item.name) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>

                          {/* Expandable Content */}
                          {isExpanded(solution.id, item.name) && (
                            <div className="pt-4">
                              <h4 className="font-semibold text-[#2F2F2F] mb-4">
                                Features Include:
                              </h4>
                              <ul className="space-y-3">
                                {item.features.map((feature) => (
                                  <li key={feature} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                    <span className="text-gray-600">{feature}</span>
                                  </li>
                                ))}
                              </ul>
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
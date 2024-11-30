'use client'

import React, { useState } from 'react'
import { BaseQuestionProps } from './types'
import { CheckCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'

const styles = [
  {
    id: 'modern',
    name: 'Modern & Sleek',
    image: '/images/solutions/smart-solutions/showers/alt2/styles/modernblackrainfall.jpeg',
    description: 'Clean lines and contemporary design',
    features: [
      'Frameless glass',
      'Minimalist fixtures',
      'Built-in storage'
    ]
  },
  {
    id: 'spa',
    name: 'Spa Retreat',
    image: '/images/solutions/smart-solutions/showers/alt2/styles/transitionalrainfall.jpeg',
    description: 'Your daily sanctuary',
    features: [
      'Rainfall shower head',
      'Premium finishes',
      'Soothing colors'
    ]
  },
  {
    id: 'traditional',
    name: 'Timeless Classic',
    image: '/images/solutions/smart-solutions/showers/alt2/styles/subway.jpeg',
    description: 'Enduring beauty and elegance',
    features: [
      'Classic patterns',
      'Elegant fixtures',
      'Lasting appeal'
    ]
  },
  {
    id: 'accessible',
    name: 'Safety & Style',
    image: '/images/solutions/smart-solutions/showers/alt2/styles/seatgrabrainfall.jpeg',
    description: 'Beautiful and accessible design',
    features: [
      'Zero-threshold entry',
      'Built-in seating',
      'Stylish grab bars'
    ]
  }
]

export function StyleSelect({ value = [], onChange, step }: BaseQuestionProps) {
  const [selections, setSelections] = useState<string[]>(value)

  const toggleSelection = (styleId: string) => {
    let newSelections: string[]
    if (selections.includes(styleId)) {
      newSelections = selections.filter(id => id !== styleId)
    } else {
      newSelections = [...selections, styleId]
    }
    setSelections(newSelections)
    onChange(newSelections)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => toggleSelection(style.id)}
            className={`
              group relative overflow-hidden rounded-sm transition-all
              ${selections.includes(style.id) 
                ? 'ring-2 ring-accent' 
                : 'hover:ring-2 hover:ring-accent/50'
              }
            `}
          >
            {/* Style Image */}
            <div className="relative aspect-[4/3]">
              <Image
                src={style.image}
                alt={style.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Selection Overlay */}
              <div className={`
                absolute inset-0 transition-all
                ${selections.includes(style.id)
                  ? 'bg-accent/10'
                  : 'bg-black/0 group-hover:bg-black/10'
                }
              `} />
              {/* Selection Indicator */}
              {selections.includes(style.id) && (
                <div className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full shadow-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Style Info */}
            <div className="p-4 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-[#2F2F2F]">{style.name}</h4>
                  <p className="text-gray-600 text-sm">{style.description}</p>
                </div>
                <Sparkles className={`
                  w-5 h-5 transition-colors shrink-0
                  ${selections.includes(style.id) ? 'text-accent' : 'text-gray-400'}
                `} />
              </div>
              
              {/* Features */}
              <ul className="mt-3 space-y-1">
                {style.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>

      {/* Help Text */}
      <div className="text-center text-gray-600 text-sm">
        Select any styles that appeal to you. Your design consultant will help you explore these and other options.
      </div>
    </div>
  )
} 
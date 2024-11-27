'use client'

import React, { useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Shield, Star, Award, ThumbsUp } from 'lucide-react'

interface TrustBadge {
  icon: typeof Shield | typeof Star | typeof Award | typeof ThumbsUp
  title: string
  description: string
}

const badges: TrustBadge[] = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full coverage for your peace of mind"
  },
  {
    icon: Star,
    title: "5-Star Rated",
    description: "Consistently top-rated by customers"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Industry-leading materials & craftsmanship"
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "Your complete satisfaction is our priority"
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0)

  useEffect(() => {
    // Function to check if we're between sections
    const checkPosition = () => {
      const sections = document.querySelectorAll('section')
      let inBetweenSections = false

      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          const rect = section.getBoundingClientRect()
          const nextRect = sections[index + 1].getBoundingClientRect()
          
          // If there's at least 100px gap between sections and we're in that gap
          if (nextRect.top - rect.bottom > 100 && 
              window.scrollY > rect.bottom && 
              window.scrollY < nextRect.top - 100) {
            inBetweenSections = true
          }
        }
      })

      setIsVisible(inBetweenSections)
    }

    window.addEventListener('scroll', checkPosition)
    return () => window.removeEventListener('scroll', checkPosition)
  }, [])

  // Rotate badges every 3 seconds when visible
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentBadgeIndex((prev) => (prev + 1) % badges.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible) return null

  const currentBadge = badges[currentBadgeIndex]

  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-40">
      <div 
        className="bg-white/95 backdrop-blur-sm shadow-lg rounded-sm px-6 py-4 
                   transition-all duration-300 ease-in-out transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, ${isVisible ? '0' : '20px'})`
        }}
      >
        <div className="flex items-center gap-3">
          <currentBadge.icon className="w-5 h-5 text-primary shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-[#2F2F2F]">
              {currentBadge.title}
            </h4>
            <p className="text-xs text-gray-600">
              {currentBadge.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
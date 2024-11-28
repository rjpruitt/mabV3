'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Shield, Star, CheckCircle } from 'lucide-react'

const trustBadges = [
  {
    icon: Shield,
    text: "Fully Insured",
    description: "Full coverage for your peace of mind"
  },
  {
    icon: Star,
    text: "5-Star Rated",
    description: "Consistently top-rated by customers"
  },
  {
    icon: CheckCircle,
    text: "100% Satisfaction Guarantee",
    description: "Your complete satisfaction is our priority"
  }
]

export function SmartHeroWithBadges() {
  const [badgeVisibility, setBadgeVisibility] = useState<boolean[]>([false, false, false])
  const lastScrollY = useRef(0)
  const animationStarted = useRef(false)
  const hasScrolled = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroImage = document.querySelector('.hero-image')
      if (!heroImage) return

      const rect = heroImage.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollingDown = window.scrollY > lastScrollY.current

      // Calculate when image is fully visible and we've scrolled enough
      const imageInView = rect.top <= viewportHeight && rect.bottom >= 0
      const scrolledEnough = rect.top < viewportHeight * 0.3 // Trigger when top 30% of image is scrolled

      // Show badges when scrolling down and we've scrolled enough
      if (imageInView && scrolledEnough && scrollingDown && !animationStarted.current) {
        animationStarted.current = true
        setBadgeVisibility([true, false, false])
        setTimeout(() => setBadgeVisibility([true, true, false]), 500)
        setTimeout(() => setBadgeVisibility([true, true, true]), 1000)
      }
      // Hide badges when scrolling back up past trigger point
      else if ((!imageInView || !scrolledEnough) && !scrollingDown) {
        setBadgeVisibility([false, false, false])
        animationStarted.current = false
      }

      lastScrollY.current = window.scrollY
    }

    // Throttle scroll handler
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener, { passive: true })
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <section className="relative w-full pb-6 bg-white overflow-x-hidden mt-[var(--campaign-header-height)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal 
            variant="fadeInUp" 
            delay={0.2} 
            duration={0.8} 
            className="opacity-0"  // Start hidden
          >
            <div>
              <h1 className="font-montserrat md:font-pt-serif text-5xl md:text-6xl text-[#2F2F2F] transform transition-all">
                Beautiful walk-in showers that elevate your daily life
              </h1>
              <p className="text-gray-600 text-lg mt-6 transform transition-all">
                Premium shower systems trusted by <span className="font-semibold">over 100,000 homeowners</span> nationwide. 
                Professional installation with minimal disruption to your home.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-[4/3] hero-image">
                <Image
                  src="/images/solutions/smart-solutions/showers/alt/hero/lowesmaxxutil.jpeg"
                  alt="Luxurious walk-in shower transformation"
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </ScrollReveal>

            {/* Trust Badges */}
            {trustBadges.map((badge, index) => (
              <div
                key={badge.text}
                className={`
                  absolute right-0 transform transition-all duration-700 ease-in-out
                  ${badgeVisibility[index] 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                  }
                `}
                style={{
                  top: `${20 + (index * 30)}%`,
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-l-sm shadow-lg">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium text-[#2F2F2F]">{badge.text}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
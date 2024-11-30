'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Heart, Clock, Shield } from 'lucide-react'

const emotionalTriggers = [
  {
    icon: Heart,
    text: "Fall in Love with Your Bathroom Again",
    description: "Experience the joy of a beautifully updated space"
  },
  {
    icon: Clock,
    text: "Transform Your Daily Routine",
    description: "Start and end each day in your personal sanctuary"
  },
  {
    icon: Shield,
    text: "Peace of Mind Installation",
    description: "Expert team handling everything for you"
  }
]

export function LifestyleHero() {
  const [messageVisibility, setMessageVisibility] = useState<boolean[]>([false, false, false])
  const lastScrollY = useRef(0)
  const animationStarted = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.lifestyle-hero')
      if (!heroSection) return

      const rect = heroSection.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollingDown = window.scrollY > lastScrollY.current

      // Trigger when 20% scrolled for earlier engagement
      const inView = rect.top <= viewportHeight && rect.bottom >= 0
      const scrolledEnough = rect.top < viewportHeight * 0.2

      if (inView && scrolledEnough && scrollingDown && !animationStarted.current) {
        animationStarted.current = true
        setMessageVisibility([true, false, false])
        setTimeout(() => setMessageVisibility([true, true, false]), 500)
        setTimeout(() => setMessageVisibility([true, true, true]), 1000)
      }
      else if ((!inView || !scrolledEnough) && !scrollingDown) {
        setMessageVisibility([false, false, false])
        animationStarted.current = false
      }

      lastScrollY.current = window.scrollY
    }

    // Throttled scroll listener
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
    <section className="
      relative w-full overflow-hidden min-h-screen lifestyle-hero
      mt-[var(--campaign-header-height)]
    ">
      {/* Hero Image - Full screen with proper positioning */}
      <div className="absolute inset-0">
        <Image
          src="/images/solutions/smart-solutions/showers/alt2/hero/lifestyle-hero.jpeg"
          alt="Happy couple enjoying their beautifully transformed bathroom"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Emotional Triggers - Animate in on scroll */}
      <div className="relative container mx-auto px-4 h-full">
        <div className="h-full flex flex-col items-end" style={{ paddingTop: '50vh' }}>
          {emotionalTriggers.map((trigger, index) => (
            <div
              key={trigger.text}
              className={`
                transform transition-all duration-700 ease-out mb-6 w-full md:w-auto
                ${messageVisibility[index] 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
                }
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-sm shadow-lg max-w-lg mx-auto md:mx-0 md:mr-24">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-accent/10 p-3 rounded-sm">
                    <trigger.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#2F2F2F]">
                    {trigger.text}
                  </h2>
                </div>
                <p className="text-gray-600">
                  {trigger.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
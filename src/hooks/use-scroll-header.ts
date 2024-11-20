'use client'

import { useState, useEffect } from 'react'

export function useScrollHeader() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isCondensed, setIsCondensed] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Update visibility based on scroll direction
          if (currentScrollY > lastScrollY) {
            // Scrolling down
            if (currentScrollY > 100) { // Only hide after scrolling down 100px
              setIsVisible(false)
            }
          } else {
            // Scrolling up
            setIsVisible(true)
          }

          // Update condensed state
          setIsCondensed(currentScrollY > window.innerHeight * 0.3)
          
          // Update scroll position
          setScrollY(currentScrollY)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial state
    setScrollY(window.scrollY)
    setIsCondensed(window.scrollY > window.innerHeight * 0.3)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    scrollY,
    isVisible,
    isCondensed
  }
} 
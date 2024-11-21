'use client'

import React, { useState, useEffect } from 'react'
import { TopBanner } from './top-banner'
import { MainNav } from './main-nav'

function throttle(func: (...args: any[]) => void, limit: number) {
  let inThrottle = false
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isCondensed, setIsCondensed] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.6
      
      // Get header height directly
      const headerHeight = 170 // Combined height of banner (40px) and nav (130px)
      
      // Visibility logic
      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      // Condensed state
      if (currentScrollY > heroHeight) {
        setIsCondensed(true)
      } else {
        setIsCondensed(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    const throttledControlNavbar = throttle(controlNavbar, 50)

    window.addEventListener('scroll', throttledControlNavbar)
    return () => window.removeEventListener('scroll', throttledControlNavbar)
  }, [lastScrollY])

  return (
    <div 
      className={`
        fixed w-full top-0 left-0 right-0 z-50
        transform-gpu transition-transform duration-200 ease-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
      style={{
        height: isCondensed ? 'var(--header-height-condensed)' : 'var(--header-height-normal)',
        willChange: 'transform'
      }}
    >
      <div className="h-full flex flex-col bg-white">
        {!isCondensed && <TopBanner />}
        <MainNav isCondensed={isCondensed} />
      </div>
    </div>
  )
} 
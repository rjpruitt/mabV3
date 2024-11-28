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

type HeaderState = 'initial' | 'visible' | 'hidden' | 'condensed'

export function Header() {
  const [headerState, setHeaderState] = useState<HeaderState>('initial')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.6
      const headerHeight = 170 // Combined height: TopBanner (40px) + MainNav (130px)
      const initialDelay = headerHeight + 115
      
      const isScrollingDown = currentScrollY > lastScrollY
      
      switch (headerState) {
        case 'initial':
          if (currentScrollY > initialDelay && isScrollingDown) {
            setHeaderState('hidden')
          }
          break
          
        case 'visible':
          if (isScrollingDown && currentScrollY > initialDelay) {
            setHeaderState('hidden')
          } else if (currentScrollY > heroHeight) {
            setHeaderState('condensed')
          }
          break
          
        case 'hidden':
          if (!isScrollingDown) {
            setHeaderState(currentScrollY > heroHeight ? 'condensed' : 'visible')
          }
          break
          
        case 'condensed':
          if (isScrollingDown && currentScrollY > initialDelay) {
            setHeaderState('hidden')
          } else if (currentScrollY <= heroHeight) {
            setHeaderState('visible')
          }
          break
      }
      
      setLastScrollY(currentScrollY)
    }

    const throttledControlNavbar = throttle(controlNavbar, 50)

    window.addEventListener('scroll', throttledControlNavbar)
    return () => window.removeEventListener('scroll', throttledControlNavbar)
  }, [lastScrollY, headerState])

  const isVisible = headerState !== 'hidden'
  const isCondensed = headerState === 'condensed'

  return (
    <div 
      className={`
        header
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
'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? 'none' : 'translateY(20px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
      }}
    >
      {children}
    </div>
  )
} 
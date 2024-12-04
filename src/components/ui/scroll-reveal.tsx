'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  variant?: 'fadeIn' | 'fadeInUp' | 'slideIn' | 'scale'
  delay?: number
  duration?: number
}

export function ScrollReveal({ children, className, variant = 'fadeIn', delay = 0, duration = 0.9 }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const getVariantStyles = () => {
    switch (variant) {
      case 'fadeInUp':
        return {
          transform: isInView ? 'none' : 'translateY(20px)',
          opacity: isInView ? 1 : 0,
        }
      case 'slideIn':
        return {
          transform: isInView ? 'none' : 'translateX(-20px)',
          opacity: isInView ? 1 : 0,
        }
      case 'scale':
        return {
          transform: isInView ? 'none' : 'scale(0.95)',
          opacity: isInView ? 1 : 0,
        }
      case 'fadeIn':
      default:
        return {
          opacity: isInView ? 1 : 0,
        }
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getVariantStyles(),
        transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  )
} 
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /**
   * Animation variants
   * @default 'fadeInUp'
   */
  variant?: 'fadeInUp' | 'fadeIn' | 'slideIn' | 'scale'
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number
  /**
   * Amount of element that needs to be in view before animating (0-1)
   * @default 0.2
   */
  threshold?: number
  /**
   * Whether to disable animation for users who prefer reduced motion
   * @default true
   */
  respectMotionPreference?: boolean
}

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
}

export function ScrollReveal({ 
  children, 
  className = '', 
  variant = 'fadeInUp',
  delay = 0,
  threshold = 0.2,
  respectMotionPreference = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true,
    amount: threshold
  })

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false

  // If user prefers reduced motion and we should respect it, skip animation
  const shouldAnimate = !(respectMotionPreference && prefersReducedMotion)

  return (
    <motion.div
      ref={ref}
      variants={shouldAnimate ? variants[variant] : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={shouldAnimate ? (isInView ? "visible" : "hidden") : "visible"}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={className}
      // Ensure content is accessible even if animation hasn't triggered
      aria-hidden="false"
    >
      {children}
    </motion.div>
  )
} 
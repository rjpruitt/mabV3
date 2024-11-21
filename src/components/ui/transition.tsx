'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TransitionProps {
  children: React.ReactNode
  className?: string
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number
  /**
   * Whether to disable animation for users who prefer reduced motion
   * @default true
   */
  respectMotionPreference?: boolean
}

export function Transition({ 
  children, 
  className = '', 
  delay = 0,
  respectMotionPreference = true
}: TransitionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    if (respectMotionPreference) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setShouldAnimate(!prefersReducedMotion)
    }
  }, [respectMotionPreference])

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={className}
      // Ensure content remains accessible during animation
      aria-hidden="false"
      // Prevent animation from blocking interaction
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
} 
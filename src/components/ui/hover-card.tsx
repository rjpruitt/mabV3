'use client'

import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  /**
   * Duration of hover animation in seconds
   * @default 0.2
   */
  duration?: number
}

export function HoverCard({ 
  children, 
  className = '',
  duration = 0.2 
}: HoverCardProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Trigger hover effect on focus and space/enter press
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      setIsFocused(!isFocused)
    }
  }, [isFocused])

  const isActive = isHovered || isFocused

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      animate={{ 
        scale: isActive ? 1.02 : 1,
        y: isActive ? -5 : 0
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      {children}
    </motion.div>
  )
} 
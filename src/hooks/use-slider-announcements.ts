'use client'

import { useCallback } from 'react'
import { useAccessibility } from '@/providers/accessibility-provider'

export function useSliderAnnouncements() {
  const { announce } = useAccessibility()

  const handleSliderChange = useCallback((position: number) => {
    if (position === 0) {
      announce('Showing before image only', 'polite')
    } else if (position === 100) {
      announce('Showing after image only', 'polite')
    } else if (position === 50) {
      announce('Showing equal parts of before and after', 'polite')
    } else if (position < 50) {
      announce('Showing more of before image', 'polite')
    } else {
      announce('Showing more of after image', 'polite')
    }
  }, [announce])

  const handleSliderKeyDown = useCallback((e: React.KeyboardEvent, currentPosition: number) => {
    const step = 10
    let newPosition = currentPosition

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        newPosition = Math.max(0, currentPosition - step)
        announce(`Moved slider left to ${newPosition}%`, 'polite')
        break
      case 'ArrowRight':
        e.preventDefault()
        newPosition = Math.min(100, currentPosition + step)
        announce(`Moved slider right to ${newPosition}%`, 'polite')
        break
      case 'Home':
        e.preventDefault()
        newPosition = 0
        announce('Showing before image only', 'polite')
        break
      case 'End':
        e.preventDefault()
        newPosition = 100
        announce('Showing after image only', 'polite')
        break
    }

    return newPosition
  }, [announce])

  return {
    handleSliderChange,
    handleSliderKeyDown
  }
} 
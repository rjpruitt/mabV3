'use client'

import { useCallback, useState } from 'react'
import { useAccessibility } from '@/providers/accessibility-provider'

interface UseComparisonSliderProps {
  initialPosition?: number
  step?: number
  onPositionChange?: (position: number) => void
}

export function useComparisonSlider({
  initialPosition = 50,
  step = 10,
  onPositionChange
}: UseComparisonSliderProps = {}) {
  const [position, setPosition] = useState(initialPosition)
  const { announce } = useAccessibility()

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let newPosition = position

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        newPosition = Math.max(0, position - step)
        announce(`Showing more of before image at ${newPosition}%`, 'polite')
        break
      case 'ArrowRight':
        e.preventDefault()
        newPosition = Math.min(100, position + step)
        announce(`Showing more of after image at ${newPosition}%`, 'polite')
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
      case ' ':
      case 'Enter':
        e.preventDefault()
        newPosition = position === 50 ? 100 : 50
        announce(`Showing ${position === 50 ? 'after' : 'balanced view'}`, 'polite')
        break
      default:
        return
    }

    setPosition(newPosition)
    onPositionChange?.(newPosition)
  }, [position, step, announce, onPositionChange])

  return {
    position,
    setPosition,
    handleKeyDown
  }
} 
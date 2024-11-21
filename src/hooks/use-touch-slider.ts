'use client'

import { useCallback, useState, useRef } from 'react'
import { haptics } from '@/lib/haptics'

interface TouchSliderProps {
  onPositionChange: (position: number) => void
  containerRef: React.RefObject<HTMLDivElement>
}

export function useTouchSlider({ onPositionChange, containerRef }: TouchSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const lastPosition = useRef<number>(50)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    haptics.light()
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const touch = e.touches[0]
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))

    // Provide haptic feedback at boundaries
    if ((newPosition === 0 && lastPosition.current > 0) || 
        (newPosition === 100 && lastPosition.current < 100)) {
      haptics.boundary()
    } 
    // Light feedback during normal sliding
    else if (Math.abs(newPosition - lastPosition.current) > 5) {
      haptics.slide()
    }

    lastPosition.current = newPosition
    onPositionChange(newPosition)
  }, [isDragging, containerRef, onPositionChange])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    haptics.light()
  }, [])

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging
  }
} 
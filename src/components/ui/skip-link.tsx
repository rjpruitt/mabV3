'use client'

import { useState, useCallback } from 'react'

export function SkipLink() {
  const [isFocused, setIsFocused] = useState(false)

  const handleSkip = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    const main = document.querySelector('main')
    if (main) {
      main.tabIndex = -1
      main.focus()
      main.scrollIntoView()
    }
  }, [])

  return (
    <a
      href="#main"
      className={`
        fixed top-0 left-0 p-3 bg-primary text-white z-50
        transform -translate-y-full transition-transform
        focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${isFocused ? 'translate-y-0' : ''}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={handleSkip}
      onKeyDown={(e) => e.key === 'Enter' && handleSkip(e)}
    >
      Skip to main content
    </a>
  )
} 
'use client'

import React, { createContext, useContext, useCallback } from 'react'

interface AccessibilityContextType {
  /**
   * Announce a message to screen readers
   */
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  /**
   * Trap focus within a container when needed (modals, dialogs)
   */
  trapFocus: (containerId: string) => void
  /**
   * Release focus trap
   */
  releaseFocus: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  // Announce messages to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.setAttribute('class', 'sr-only')
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    // Remove after announcement is read
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 3000)
  }, [])

  // Trap focus within a container
  const trapFocus = useCallback((containerId: string) => {
    const container = document.getElementById(containerId)
    if (!container) return

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    // Handle tab key
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus()
          e.preventDefault()
        }
      }
    })

    // Focus first element
    firstFocusable?.focus()
  }, [])

  // Release focus trap
  const releaseFocus = useCallback(() => {
    // Implementation depends on how you want to handle focus restoration
  }, [])

  return (
    <AccessibilityContext.Provider value={{
      announce,
      trapFocus,
      releaseFocus
    }}>
      {/* Live regions for announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
      <div 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
      />
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
} 
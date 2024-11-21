'use client'

export const haptics = {
  light() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10)
      } catch (e) {
        // Fail silently - vibration may not be supported or permitted
      }
    }
  },

  medium() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(20)
      } catch (e) {
        // Fail silently
      }
    }
  },

  heavy() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([30, 10, 30])
      } catch (e) {
        // Fail silently
      }
    }
  },

  // For slider interactions
  slide() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(5)
      } catch (e) {
        // Fail silently
      }
    }
  },

  // For reaching slider bounds
  boundary() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([10, 5, 10])
      } catch (e) {
        // Fail silently
      }
    }
  }
} 
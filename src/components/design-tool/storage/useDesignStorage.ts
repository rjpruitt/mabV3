import { useState, useEffect } from 'react'
import { DesignState, DesignChoice, StorageKeys } from './types'

const STORAGE_KEYS: StorageKeys = {
  CURRENT_DESIGN: 'mab_current_design',
  SAVED_DESIGNS: 'mab_saved_designs'
}

export function useDesignStorage() {
  const [currentDesign, setCurrentDesign] = useState<DesignState | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load current design from localStorage on mount
  useEffect(() => {
    if (isClient) {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_DESIGN)
        if (stored) {
          setCurrentDesign(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading design from storage:', error)
      }
    }
  }, [isClient])

  // Save current design to localStorage whenever it changes
  useEffect(() => {
    if (isClient && currentDesign) {
      try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_DESIGN, JSON.stringify(currentDesign))
      } catch (error) {
        console.error('Error saving design to storage:', error)
      }
    }
  }, [currentDesign, isClient])

  const startNewDesign = (path: 'designer-package' | 'custom') => {
    const newDesign: DesignState = {
      id: crypto.randomUUID(),
      path,
      choices: [],
      lastUpdated: new Date().toISOString(),
      isComplete: false
    }
    setCurrentDesign(newDesign)
    return newDesign
  }

  const updateDesign = (updates: Partial<DesignState>) => {
    setCurrentDesign(prev => {
      if (!prev) return null
      return {
        ...prev,
        ...updates,
        lastUpdated: new Date().toISOString()
      }
    })
  }

  const addChoice = (choice: DesignChoice) => {
    setCurrentDesign(prev => {
      if (!prev) return null
      const currentChoices = prev.choices || []
      const filteredChoices = currentChoices.filter(c => c.category !== choice.category)
      return {
        ...prev,
        choices: [...filteredChoices, choice],
        lastUpdated: new Date().toISOString()
      }
    })
  }

  const removeChoice = (category: string) => {
    setCurrentDesign(prev => {
      if (!prev) return null
      const currentChoices = prev.choices || []
      return {
        ...prev,
        choices: currentChoices.filter(c => c.category !== category),
        lastUpdated: new Date().toISOString()
      }
    })
  }

  const clearCurrentDesign = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_DESIGN)
    setCurrentDesign(null)
  }

  const saveDesign = () => {
    if (!currentDesign) return

    const savedDesigns = getSavedDesigns()
    const updatedDesigns = [...savedDesigns, currentDesign]
    localStorage.setItem(STORAGE_KEYS.SAVED_DESIGNS, JSON.stringify(updatedDesigns))
  }

  const getSavedDesigns = (): DesignState[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_DESIGNS)
    return stored ? JSON.parse(stored) : []
  }

  return {
    currentDesign,
    startNewDesign,
    updateDesign,
    addChoice,
    removeChoice,
    clearCurrentDesign,
    saveDesign,
    getSavedDesigns
  }
} 
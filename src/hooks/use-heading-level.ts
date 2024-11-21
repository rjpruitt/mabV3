'use client'

import React, { createContext, useContext } from 'react'

const HeadingLevelContext = createContext(1)

export function useHeadingLevel() {
  return useContext(HeadingLevelContext)
}

interface HeadingLevelProviderProps {
  children: React.ReactNode
  level?: number
}

export function HeadingLevelProvider({ children, level = 1 }: HeadingLevelProviderProps) {
  const currentLevel = useHeadingLevel()
  const nextLevel = Math.min(currentLevel + (level - 1), 6)

  return React.createElement(
    HeadingLevelContext.Provider,
    { value: nextLevel },
    children
  )
} 
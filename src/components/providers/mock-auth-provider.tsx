'use client'

import { createContext, useContext, ReactNode } from 'react'

interface MockAuthContextType {
  user: {
    id: string
    email: string
  } | null
  isLoading: boolean
}

const MockAuthContext = createContext<MockAuthContextType>({
  user: {
    id: 'test-user',
    email: 'test@example.com'
  },
  isLoading: false
})

export function MockAuthProvider({ children }: { children: ReactNode }) {
  return (
    <MockAuthContext.Provider 
      value={{
        user: {
          id: 'test-user',
          email: 'test@example.com'
        },
        isLoading: false
      }}
    >
      {children}
    </MockAuthContext.Provider>
  )
}

export const useMockAuth = () => useContext(MockAuthContext) 
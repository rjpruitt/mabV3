'use client'

import { AccessibilityProvider } from '@/providers/accessibility-provider'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { SkipLink } from '@/components/ui/skip-link'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      <ErrorBoundary>
        <SkipLink />
        {children}
      </ErrorBoundary>
    </AccessibilityProvider>
  )
} 
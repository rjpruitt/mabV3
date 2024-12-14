'use client'

import { MockAuthProvider } from '@/components/providers/mock-auth-provider'

export default function TestTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return <MockAuthProvider>{children}</MockAuthProvider>
} 
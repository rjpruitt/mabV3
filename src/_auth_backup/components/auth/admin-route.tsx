'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { ProtectedRoute } from './protected-route'

interface AdminRouteProps {
  children: React.ReactNode
  redirectTo?: string
  loadingComponent?: React.ReactNode
}

export function AdminRoute({ 
  children, 
  redirectTo = '/login',
  loadingComponent 
}: AdminRouteProps) {
  return (
    <ProtectedRoute
      requiredRoles={['admin']}
      redirectTo={redirectTo}
      loadingComponent={loadingComponent}
    >
      {children}
    </ProtectedRoute>
  )
}

export function ConsultantRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['admin', 'design_consultant']}>
      {children}
    </ProtectedRoute>
  )
}

export function CatalogueManagerRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['admin', 'catalogue_manager']}>
      {children}
    </ProtectedRoute>
  )
} 
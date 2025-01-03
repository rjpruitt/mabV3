'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { hasRole } from '@/lib/auth/utils'
import { LoadingSpinner } from '../ui/loading-spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  redirectTo?: string
  loadingComponent?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/login',
  loadingComponent = (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  )
}: ProtectedRouteProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    async function checkAccess() {
      if (!isLoading) {
        if (!user) {
          router.push(`${redirectTo}?redirectTo=${window.location.pathname}`)
          return
        }

        if (requiredRoles.length > 0) {
          const hasAccess = await hasRole(user, requiredRoles[0])
          if (!hasAccess) {
            router.push('/')
          }
        }
      }
    }

    checkAccess()
  }, [user, isLoading, router, redirectTo, requiredRoles])

  if (isLoading) {
    return loadingComponent
  }

  if (!user) {
    return null
  }

  return <>{children}</>
} 
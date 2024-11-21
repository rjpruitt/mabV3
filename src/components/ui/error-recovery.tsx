'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Home, RefreshCcw, ArrowLeft, Phone } from 'lucide-react'

interface ErrorRecoveryProps {
  error: Error
  onRetry?: () => void
}

export function ErrorRecovery({ error, onRetry }: ErrorRecoveryProps) {
  const router = useRouter()

  // Determine error type and suggest appropriate actions
  const getRecoveryActions = () => {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return [
        {
          label: 'Check your internet connection and try again',
          icon: RefreshCcw,
          action: onRetry || (() => window.location.reload()),
          primary: true
        },
        {
          label: 'Return to homepage',
          icon: Home,
          action: () => router.push('/'),
          primary: false
        }
      ]
    }

    if (error.message.includes('not found') || error.message.includes('404')) {
      return [
        {
          label: 'Return to homepage',
          icon: Home,
          action: () => router.push('/'),
          primary: true
        },
        {
          label: 'Go back',
          icon: ArrowLeft,
          action: () => router.back(),
          primary: false
        }
      ]
    }

    // Default actions for unknown errors
    return [
      {
        label: 'Try again',
        icon: RefreshCcw,
        action: onRetry || (() => window.location.reload()),
        primary: true
      },
      {
        label: 'Contact support',
        icon: Phone,
        action: () => window.location.href = 'tel:1-555-555-5555',
        primary: false
      }
    ]
  }

  const recoveryActions = getRecoveryActions()

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium text-red-800">
        Suggested Actions:
      </h3>
      <div className="flex flex-col gap-3">
        {recoveryActions.map((action, index) => (
          <button
            key={index}
            onClick={() => action.action()}
            className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-colors
              ${action.primary 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'text-red-600 hover:bg-red-50'
              }
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
          >
            <action.icon className="w-5 h-5" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
} 
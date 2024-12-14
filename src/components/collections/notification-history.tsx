'use client'

import { useState } from 'react'
import { EmailNotification, CollectionShare } from '@/types/products'
import { emailService } from '@/lib/services/service-provider'

interface NotificationHistoryProps {
  share: CollectionShare
  onUpdate: () => void
}

export function NotificationHistory({ share, onUpdate }: NotificationHistoryProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  async function handleResend(notificationId: string) {
    setIsLoading(true)
    setError(undefined)

    try {
      await emailService.resendNotification(notificationId)
      onUpdate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend notification')
    } finally {
      setIsLoading(false)
    }
  }

  if (!share.notifications?.length) {
    return <p className="text-gray-500">No notifications sent</p>
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {share.notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`p-4 rounded-lg border ${
            notification.status === 'failed' ? 'border-red-200 bg-red-50' : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                {notification.type === 'share' && 'Share Notification'}
                {notification.type === 'removal' && 'Access Removal'}
                {notification.type === 'expiration_warning' && 'Expiration Warning'}
              </p>
              <p className="text-sm text-gray-600">
                Sent to: {notification.recipient}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(notification.sentAt).toLocaleString()}
              </p>
              {notification.status === 'failed' && notification.error && (
                <p className="text-sm text-red-600 mt-1">
                  Error: {notification.error}
                </p>
              )}
            </div>
            {notification.status === 'failed' && (
              <button
                onClick={() => handleResend(notification.id)}
                disabled={isLoading}
                className="text-blue-500 hover:text-blue-600 disabled:opacity-50"
              >
                Resend
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 
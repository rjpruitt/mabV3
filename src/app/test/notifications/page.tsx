'use client'

import { useState, useEffect } from 'react'
import { Collection, EmailNotification } from '@/types/products'
import { createTestCollection, shareTestCollection } from '@/lib/test-utils/mock-services'
import { collectionService, emailService } from '@/lib/services/service-provider'

export default function TestNotificationsPage() {
  const [collection, setCollection] = useState<Collection>()
  const [notifications, setNotifications] = useState<EmailNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const coll = await createTestCollection()
      setCollection(coll)
      await refreshNotifications()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  async function refreshNotifications() {
    const data = await emailService.getNotifications()
    setNotifications(data)
  }

  async function handleShare() {
    if (!collection) return
    setLoading(true)
    try {
      await shareTestCollection(collection.id)
      await refreshNotifications()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share collection')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Notifications</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Collection</h2>
          {collection ? (
            <div className="border rounded p-4">
              <p className="font-medium">{collection.name}</p>
              <p className="text-gray-600">{collection.description}</p>
              <button
                onClick={handleShare}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Share Test Collection
              </button>
            </div>
          ) : (
            <p>No collection created</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.status === 'failed' ? 'border-red-200 bg-red-50' : 'border-gray-200'
                }`}
              >
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
            ))}
            {notifications.length === 0 && (
              <p className="text-gray-500">No notifications sent</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
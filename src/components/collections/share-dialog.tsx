'use client'

import { useState } from 'react'
import { CollectionShare, CollectionShareType } from '@/types/products'
import { collectionService } from '@/lib/services/service-provider'
import { NotificationHistory } from './notification-history'

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  onShare: (email: string, type: CollectionShareType, expiresIn?: number) => Promise<void>
  currentShares: CollectionShare[]
  onRemoveShare: (shareId: string) => Promise<void>
}

export function ShareDialog({
  isOpen,
  onClose,
  onShare,
  currentShares,
  onRemoveShare
}: ShareDialogProps) {
  const [email, setEmail] = useState('')
  const [type, setType] = useState<CollectionShareType>('view')
  const [expiresIn, setExpiresIn] = useState<number>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  const [shareLink, setShareLink] = useState<string>()
  const [linkType, setLinkType] = useState<'email' | 'link'>('email')
  const [copySuccess, setCopySuccess] = useState(false)

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(undefined)

    try {
      await onShare(email, type, expiresIn)
      setEmail('')
      setType('view')
      setExpiresIn(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share collection')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCreateLink() {
    setIsSubmitting(true)
    setError(undefined)
    setCopySuccess(false)

    try {
      const share = await collectionService.shareCollection(
        currentShares[0]?.collectionId!, // Get collection ID from existing share
        'link-share',
        type,
        expiresIn
      )
      const shareLink = `${window.location.origin}/shared/collections/${share.collectionId}?share=${share.id}`
      setShareLink(shareLink)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create share link')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function copyToClipboard() {
    if (!shareLink) return

    try {
      await navigator.clipboard.writeText(shareLink)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      setError('Failed to copy link')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Share Collection</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setLinkType('email')}
              className={`flex-1 py-2 px-4 rounded ${
                linkType === 'email' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100'
              }`}
            >
              Share via Email
            </button>
            <button
              onClick={() => setLinkType('link')}
              className={`flex-1 py-2 px-4 rounded ${
                linkType === 'link' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100'
              }`}
            >
              Get Share Link
            </button>
          </div>
        </div>

        {linkType === 'email' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Type
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as CollectionShareType)}
                className="w-full border rounded p-2"
              >
                <option value="view">View Only</option>
                <option value="edit">Can Edit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expires In (optional)
              </label>
              <select
                value={expiresIn || ''}
                onChange={e => setExpiresIn(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full border rounded p-2"
              >
                <option value="">Never</option>
                <option value="24">24 hours</option>
                <option value="72">3 days</option>
                <option value="168">1 week</option>
              </select>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Sharing...' : 'Share'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Type
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as CollectionShareType)}
                className="w-full border rounded p-2"
              >
                <option value="view">View Only</option>
                <option value="edit">Can Edit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link Expires In (optional)
              </label>
              <select
                value={expiresIn || ''}
                onChange={e => setExpiresIn(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full border rounded p-2"
              >
                <option value="">Never</option>
                <option value="24">24 hours</option>
                <option value="72">3 days</option>
                <option value="168">1 week</option>
              </select>
            </div>

            {shareLink ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 border rounded p-2 bg-gray-50"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleCreateLink}
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Share Link'}
              </button>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        {currentShares.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Current Shares</h3>
            <div className="space-y-3">
              {currentShares.map(share => (
                <div key={share.id} className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{share.sharedWith}</p>
                      <p className="text-sm text-gray-500">
                        {share.type === 'edit' ? 'Can edit' : 'View only'}
                        {share.expiresAt && ` • Expires ${new Date(share.expiresAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveShare(share.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Notification History
                    </p>
                    <NotificationHistory
                      share={share}
                      onUpdate={onClose}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
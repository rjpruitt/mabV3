'use client'

import { useSearchParams } from 'next/navigation'
import { CollectionShare } from '@/types/products'

interface ShareStatusProps {
  shares: CollectionShare[]
}

export function ShareStatus({ shares }: ShareStatusProps) {
  const searchParams = useSearchParams()
  const shareId = searchParams?.get('share') || null
  
  if (!shareId) return null
  
  const share = shares.find(s => s.id === shareId)
  if (!share) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h2 className="text-lg font-medium text-blue-800 mb-2">
        Shared Collection
      </h2>
      <p className="text-sm text-blue-600">
        You are viewing this collection through a share link
        {share.type === 'edit' && ' with edit permissions'}
        {share.expiresAt && (
          <>
            {' '}that expires on{' '}
            <time dateTime={share.expiresAt.toISOString()}>
              {new Date(share.expiresAt).toLocaleDateString()}
            </time>
          </>
        )}
      </p>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { Collection, Product, CollectionShare } from '@/types/products'
import { collectionService, productService } from '@/lib/services/service-provider'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShareStatus } from '@/components/collections/share-status'
import { EditCollection } from '@/components/collections/edit-collection'
import { ManageProducts } from '@/components/collections/manage-products'

export default function SharedCollectionPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const searchParams = useSearchParams()
  const shareId = searchParams?.get('share') || null
  
  const [collection, setCollection] = useState<Collection>()
  const [products, setProducts] = useState<Record<string, Product>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [hasAccess, setHasAccess] = useState(false)
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    async function loadCollection() {
      try {
        // For testing, we'll use either link-share or test user ID
        const testUserId = shareId ? 'link-share' : 'shared-user'
        
        // Check if user has access and edit permissions
        const [access, editAccess] = await Promise.all([
          collectionService.hasAccess(testUserId, params.id),
          collectionService.hasAccess(testUserId, params.id, 'edit')
        ])
        
        setHasAccess(access)
        setCanEdit(editAccess)
        
        if (!access) {
          if (shareId) {
            // Check if share exists and is valid
            const collection = await collectionService.getCollectionById(params.id)
            const share = collection?.shares?.find((share: CollectionShare) => share.id === shareId)
            
            if (!share) {
              setError('This share link is invalid or has expired')
              return
            }
            
            if (share.expiresAt && new Date(share.expiresAt) < new Date()) {
              setError('This share link has expired')
              return
            }
            
            setHasAccess(true)
          } else {
            setError('You do not have access to this collection')
            return
          }
        }

        // Load collection
        const collectionData = await collectionService.getCollectionById(params.id)
        if (!collectionData) {
          setError('Collection not found')
          return
        }
        
        setCollection(collectionData)

        // Load products
        const productIds = collectionData.products.map(p => p.productId)
        const productsData: Record<string, Product> = {}
        
        await Promise.all(
          productIds.map(async (id) => {
            const [product] = await productService.listProducts({ externalId: id })
            if (product) productsData[id] = product
          })
        )

        setProducts(productsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load collection')
      } finally {
        setLoading(false)
      }
    }

    loadCollection()
  }, [params.id, shareId])

  if (loading) return <div className="p-8">Loading collection...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!hasAccess) return <div className="p-8">Access denied</div>
  if (!collection) return <div className="p-8">Collection not found</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {collection?.shares && (
        <ShareStatus shares={collection.shares} />
      )}
      <div className="mb-8">
        <EditCollection
          collection={collection}
          onUpdate={setCollection}
          canEdit={canEdit}
        />
        <div className="mt-4 flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-sm ${
            collection.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            collection.status === 'shared' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {collection.status}
          </span>
          {collection.isPublic && (
            <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
              Public
            </span>
          )}
        </div>
      </div>

      <ManageProducts
        collection={collection}
        products={products}
        onUpdate={setCollection}
        canEdit={canEdit}
      />
    </div>
  )
} 
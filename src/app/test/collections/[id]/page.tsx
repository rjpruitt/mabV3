'use client'

import { useState, useEffect } from 'react'
import { Collection, Product, CollectionShareType } from '@/types/products'
import { collectionService, productService } from '@/lib/services/service-provider'
import Link from 'next/link'
import { ShareDialog } from '@/components/collections/share-dialog'
import { useRouter } from 'next/navigation'

export default function TestCollectionDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [collection, setCollection] = useState<Collection>()
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [selectedProductId, setSelectedProductId] = useState('')
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const [collectionData, productsData] = await Promise.all([
          collectionService.getCollectionById(params.id),
          productService.listProducts({ status: 'active' })
        ])
        
        if (!collectionData) throw new Error('Collection not found')
        
        setCollection(collectionData)
        setAvailableProducts(productsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load collection')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id])

  async function handleAddProduct(productId: string) {
    try {
      await collectionService.updateCollection(params.id, {
        products: [{
          productId,
          quantity: 1
        }]
      })
      router.refresh()
    } catch (error) {
      console.error('Failed to add product:', error)
    }
  }

  async function handleRemoveProduct(productId: string) {
    try {
      await collectionService.updateCollection(params.id, {
        products: []  // Remove all products
      })
      router.refresh()
    } catch (error) {
      console.error('Failed to remove product:', error)
    }
  }

  async function updateCollection(updates: Partial<Collection>) {
    if (!collection) return

    try {
      const updated = await collectionService.updateCollection(
        collection.id,
        updates
      )
      setCollection(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update collection')
    }
  }

  async function handleShare(email: string, type: CollectionShareType, expiresIn?: number) {
    if (!collection) return
    
    try {
      await collectionService.shareCollection(
        collection.id,
        email,
        type,
        expiresIn
      )
      
      // Refresh collection to get updated shares
      const updated = await collectionService.getCollectionById(collection.id)
      if (updated) setCollection(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share collection')
    }
  }

  async function handleRemoveShare(shareId: string) {
    if (!collection) return
    
    try {
      await collectionService.removeShare(collection.id, shareId)
      
      // Refresh collection to get updated shares
      const updated = await collectionService.getCollectionById(collection.id)
      if (updated) setCollection(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove share')
    }
  }

  if (loading) return <div className="p-8">Loading collection...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!collection) return <div className="p-8">Collection not found</div>

  return (
    <div className="p-8">
      <Link href="/test/collections" className="text-blue-500 hover:underline mb-8 inline-block">
        ← Back to Collections
      </Link>

      <div className="max-w-4xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
            <p className="text-gray-600">{collection.description}</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => updateCollection({ isPublic: !collection.isPublic })}
              className={`w-full px-4 py-2 rounded ${
                collection.isPublic 
                  ? 'bg-gray-100 hover:bg-gray-200' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {collection.isPublic ? 'Make Private' : 'Make Public'}
            </button>
            <button
              onClick={() => updateCollection({ 
                status: collection.status === 'draft' ? 'shared' : 'draft' 
              })}
              className={`w-full px-4 py-2 rounded ${
                collection.status === 'shared'
                  ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {collection.status === 'shared' ? 'Return to Draft' : 'Share Collection'}
            </button>
            <button
              onClick={() => setIsShareDialogOpen(true)}
              className="w-full px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
            >
              Share Collection
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <div className="flex gap-4">
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="flex-1 border rounded p-2"
            >
              <option value="">Select a product...</option>
              {availableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.brand}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAddProduct(selectedProductId)}
              disabled={!selectedProductId}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Add to Collection
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Products in Collection</h2>
          <div className="space-y-4">
            {collection.products.map(({ productId, quantity }) => {
              const product = availableProducts.find(p => p.id === productId)
              if (!product) return null

              return (
                <div key={productId} className="flex justify-between items-center border rounded p-4">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(productId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              )
            })}
            {collection.products.length === 0 && (
              <p className="text-gray-500">No products in collection</p>
            )}
          </div>
        </div>
      </div>

      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        onShare={handleShare}
        currentShares={collection.shares || []}
        onRemoveShare={handleRemoveShare}
      />
    </div>
  )
} 
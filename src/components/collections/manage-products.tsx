'use client'

import { useState } from 'react'
import { Collection, Product } from '@/types/products'
import { collectionService, productService } from '@/lib/services/service-provider'

interface ManageProductsProps {
  collection: Collection
  products: Record<string, Product>
  onUpdate: (updated: Collection) => void
  canEdit: boolean
}

export function ManageProducts({ 
  collection, 
  products, 
  onUpdate, 
  canEdit 
}: ManageProductsProps) {
  const [selectedProductId, setSelectedProductId] = useState('')
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  // Load available products when adding
  async function handleAddClick() {
    setIsLoading(true)
    setError(undefined)

    try {
      const data = await productService.listProducts({ status: 'active' })
      setAvailableProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddProduct(productId: string) {
    try {
      await collectionService.updateCollection(collection.id, {
        products: [{
          productId,
          quantity: 1
        }]
      })
    } catch (error) {
      console.error('Failed to add product:', error)
    }
  }

  async function handleRemoveProduct(productId: string) {
    try {
      await collectionService.updateCollection(collection.id, {
        products: collection.products.filter(p => p.productId !== productId)
      })
    } catch (error) {
      console.error('Failed to remove product:', error)
    }
  }

  async function handleQuantityChange(productId: string, newQuantity: number) {
    if (newQuantity < 1) return
    setIsLoading(true)
    setError(undefined)

    try {
      const updated = await collectionService.updateProductQuantity(
        collection.id,
        productId,
        newQuantity
      )
      if (updated) onUpdate(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quantity')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        {canEdit && (
          <button
            onClick={handleAddClick}
            className="text-blue-500 hover:text-blue-600"
          >
            Add Product
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {availableProducts.length > 0 && (
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
            disabled={!selectedProductId || isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add to Collection'}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {collection.products.map(({ productId, quantity }) => {
          const product = products[productId]
          if (!product) return null

          return (
            <div key={productId} className="border rounded-lg p-4">
              <div className="flex gap-4">
                {product.images[0] && (
                  <img
                    src={product.images[0].sourceUrl}
                    alt={product.images[0].alt}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-600">{product.brand}</p>
                      <p className="text-sm text-gray-500">Model: {product.model_no || 'N/A'}</p>
                      <p className="mt-2 font-medium">
                        {
                          typeof product.price === 'number' 
                            ? `$${product.price.toFixed(2)} USD`
                            : product.price
                              ? `$${product.price.retail.toFixed(2)} ${product.price.currency}`
                              : 'N/A'
                        }
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Quantity:</span>
                        {canEdit ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(productId, quantity - 1)}
                              disabled={quantity <= 1 || isLoading}
                              className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(productId, quantity + 1)}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span>{quantity}</span>
                        )}
                      </div>
                    </div>
                    {canEdit && (
                      <button
                        onClick={() => handleRemoveProduct(productId)}
                        disabled={isLoading}
                        className="text-red-500 hover:text-red-600 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {collection.products.length === 0 && (
          <p className="text-gray-500">No products in collection</p>
        )}
      </div>
    </div>
  )
} 
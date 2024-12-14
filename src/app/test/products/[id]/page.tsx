'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/products'
import { productService } from '@/lib/services/service-provider'
import Link from 'next/link'

export default function TestProductDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function loadProduct() {
      try {
        const [data] = await productService.listProducts({ externalId: params.id })
        if (!data) throw new Error('Product not found')
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  if (loading) return <div className="p-8">Loading product...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!product) return <div className="p-8">Product not found</div>

  return (
    <div className="p-8">
      <Link href="/test/products" className="text-blue-500 hover:underline mb-8 inline-block">
        ← Back to Products
      </Link>

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <div className="mb-6">
          <p className="text-xl text-gray-600">{product.brand}</p>
          <p className="text-gray-500">Model: {product.model_no || 'N/A'}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {product.specifications.map(spec => (
              <div key={spec.name}>
                <p className="font-medium">{spec.name}</p>
                <p className="text-gray-600">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Price</h2>
          <p className="text-2xl font-bold">
            {typeof product.price === 'number' ? (
              `$${product.price.toFixed(2)} USD`
            ) : product.price ? (
              `$${product.price.retail.toFixed(2)} ${product.price.currency}`
            ) : (
              'Price not available'
            )}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Inventory</h2>
          <p className={`font-medium ${product.inventory.isInStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inventory.isInStock ? 'In Stock' : 'Out of Stock'}
          </p>
          {product.inventory.quantity && (
            <p className="text-gray-600">{product.inventory.quantity} units available</p>
          )}
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useEffect, useState } from 'react'
import { Collection, Product } from '@/types/products'
import { createTestServices } from '@/lib/test-utils/mock-services'

const services = createTestServices()

export default function TestPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function loadData() {
      try {
        const [collectionsData, productsData] = await Promise.all([
          services.collectionService.listCollections('test-user', 'customer'),
          services.productService.listProducts()
        ])
        
        setCollections(collectionsData)
        setProducts(productsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Test Page</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Collections</h2>
        <pre>{JSON.stringify(collections, null, 2)}</pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </section>
    </div>
  )
} 
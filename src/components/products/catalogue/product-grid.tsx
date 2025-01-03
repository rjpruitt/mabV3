'use client'

import { useProductContext } from '@/contexts/product-context'
import { ProductCard } from '@/components/products/catalogue/product-card'
import { LoadingProductGrid } from './loading-product-grid'

export function ProductGrid() {
  const { products, isLoading, error } = useProductContext()

  if (isLoading) {
    return <LoadingProductGrid />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700">{error}</p>
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={index < 4}
        />
      ))}
    </div>
  )
} 
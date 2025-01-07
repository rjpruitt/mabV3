'use client'

import { useProducts } from '@/hooks/use-products'
import { ProductCard } from './product-card'
import { LoadingProductGrid } from './loading-product-grid'
import { CatalogueProduct } from '@/lib/products/types/catalogue'

interface ProductGridProps {
  filters: Record<string, string[]>
}

export function ProductGrid({ filters }: ProductGridProps) {
  const { products, isLoading, error } = useProducts<CatalogueProduct>()

  if (isLoading) {
    return <LoadingProductGrid />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products)
    return (
      <div className="text-center py-12">
        <p className="text-gray-700">No products available</p>
      </div>
    )
  }

  const filteredProducts = products.filter(product => {
    // Check each filter group
    return Object.entries(filters).every(([group, values]) => {
      if (!values?.length) return true
      
      // Check product categorization
      if (group === 'topCategory') {
        return values.some(v => product.categorization?.type?.includes(v))
      }
      
      if (group === 'showerType') {
        return values.some(v => product.categorization?.type?.includes(v))
      }
      
      if (group === 'productFormat') {
        return values.some(v => product.designTool?.classification?.format === v)
      }
      
      return true
    })
  })

  if (!filteredProducts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700">No products match the selected filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 
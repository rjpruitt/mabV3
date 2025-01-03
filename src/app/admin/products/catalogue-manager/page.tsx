'use client'

import { ProductGrid } from '@/components/products/catalogue/product-grid'
import { ProductToolbar } from '@/components/products/catalogue/product-toolbar'
import { ProductFilters } from '@/components/products/catalogue/product-filters'
import { ProductProvider } from '@/contexts/product-context'

export default function CatalogueManagerPage() {
  return (
    <ProductProvider>
      <div className="container mx-auto p-6 pt-[200px]">
        <ProductToolbar />
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <ProductFilters />
          </aside>
          <main className="flex-1">
            <ProductGrid />
          </main>
        </div>
      </div>
    </ProductProvider>
  )
}

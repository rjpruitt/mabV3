'use client'

/**
 * Product Catalogue Manager Page
 * Displays a filterable grid of products with search functionality
 * and the ability to add new products via a wizard interface
 */

import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/products/catalogue/product-grid'
import { FilterBar } from '@/components/products/catalogue/filter-bar'
import { ManualEntryWizard } from '@/components/products/manual-entry-wizard/wizard/ManualEntryWizard'
import type { ProductWithRelations } from '@/lib/types/product'
import type { CatalogueFormData } from '@/lib/products/types/catalogue'

export default function CatalogueManagerPage() {
  const [filters, setFilters] = useState({
    suppliers: [] as string[],
    categories: [] as string[],
    status: [] as string[],
    visibility: [] as string[]
  })
  const [products, setProducts] = useState<ProductWithRelations[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddWizard, setShowAddWizard] = useState(false)

  // Load products with filters
  const loadProducts = async (params = {}) => {
    try {
      setIsLoading(true)
      const queryParams = new URLSearchParams()
      
      // Add search query if present
      if (searchQuery) {
        queryParams.set('search', searchQuery)
      }

      // Add active filters
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          queryParams.set(key, values.join(','))
        }
      })

      // Add any additional params
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.set(key, String(value))
        }
      })
      
      const response = await fetch('/api/products?' + queryParams)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadProducts()
  }, [])

  // Handle filter changes
  const handleFilterChange = async (newFilters: typeof filters) => {
    setFilters(newFilters)
    await loadProducts()
  }

  // Handle wizard completion
  const handleWizardComplete = async (data: CatalogueFormData) => {
    setShowAddWizard(false)
    await loadProducts() // Refresh the product list
  }

  const handleComplete = async (data: CatalogueFormData) => {
    // Handle form completion
  }

  const handleCancel = () => {
    // Handle cancellation
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow text-gray-800">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Catalogue</h1>
        <button
          onClick={() => setShowAddWizard(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search products..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          availableFilters={{
            suppliers: ['castico', 'other-supplier'],
            categories: ['base-and-wall-kits', 'shower-walls', 'shower-bases'],
            status: ['active', 'draft', 'archived'],
            visibility: ['public', 'private']
          }}
        />
      </div>

      {/* Product Grid */}
      <ProductGrid 
        products={products}
        isLoading={isLoading}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Manual Entry Wizard */}
      {showAddWizard && (
        <ManualEntryWizard
          onComplete={handleWizardComplete}
          onCancel={() => setShowAddWizard(false)}
        />
      )}
    </div>
  )
}

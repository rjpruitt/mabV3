'use client'

import { useProductContext } from '@/contexts/product-context'

export function ProductFilters() {
  const { filters, setFilters } = useProductContext()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 border rounded-lg text-gray-900 placeholder:text-gray-600"
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Category</h4>
        <div className="space-y-2">
          {['faucets', 'showers', 'bathtubs'].map((category) => (
            <label key={category} className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={filters.category?.includes(category) || false}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...(filters.category || []), category]
                    : (filters.category || []).filter(c => c !== category)
                  setFilters({ ...filters, category: newCategories })
                }}
                className="mr-2"
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Supplier Filter */}
      <div>
        <h4 className="font-medium mb-2">Supplier</h4>
        <div className="space-y-2">
          {['supplier1', 'supplier2', 'supplier3'].map((supplier) => (
            <label key={supplier} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.supplier?.includes(supplier) || false}
                onChange={(e) => {
                  const newSuppliers = e.target.checked
                    ? [...(filters.supplier || []), supplier]
                    : (filters.supplier || []).filter(s => s !== supplier)
                  setFilters({ ...filters, supplier: newSuppliers })
                }}
                className="mr-2"
              />
              {supplier}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
} 
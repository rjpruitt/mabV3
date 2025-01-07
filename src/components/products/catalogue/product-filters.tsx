'use client'

import { useProductContext } from '@/contexts/product-context'
import { useState } from 'react'

interface FilterOption {
  id: string
  label: string
}

interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
  dependsOn?: {
    group: string
    values: string[]
  }
}

const PRODUCT_FILTERS: FilterGroup[] = [
  {
    id: 'topCategory',
    label: 'Product Category',
    options: [
      { id: 'SHOWERS', label: 'Showers' },
      { id: 'BATHTUBS', label: 'Bathtubs' },
      { id: 'ACCESSIBILITY_SAFETY', label: 'Accessibility & Safety' },
      { id: 'WALLS_WAINSCOTTING', label: 'Walls & Wainscotting' },
      { id: 'ACCESSORIES', label: 'Accessories' }
    ]
  },
  {
    id: 'showerType',
    label: 'Shower Type',
    options: [
      { id: 'WALK_IN', label: 'Walk-In Shower' },
      { id: 'TUB_SHOWER_COMBO', label: 'Tub-Shower Combo' }
    ],
    dependsOn: {
      group: 'topCategory',
      values: ['SHOWERS']
    }
  },
  {
    id: 'productFormat',
    label: 'Format',
    options: [
      { id: 'KIT', label: 'Complete Kit' },
      { id: 'INDIVIDUAL_COMPONENT', label: 'Individual Component' }
    ]
  }
]

interface FilterState {
  category?: string[]
  supplier?: string[]
  search?: string
}

export function ProductFilters() {
  const { filters, setFilters } = useProductContext()
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const current = prev[groupId] || []
      const updated = checked 
        ? [...current, value]
        : current.filter(v => v !== value)
      
      return {
        ...prev,
        [groupId]: updated
      }
    })
  }

  // Get visible filters based on dependencies
  const getVisibleFilters = () => {
    return PRODUCT_FILTERS.filter(group => {
      if (!group.dependsOn) return true
      
      const parentValues = activeFilters[group.dependsOn.group] || []
      return group.dependsOn.values.some(v => parentValues.includes(v))
    })
  }

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

      {getVisibleFilters().map(group => (
        <div key={group.id}>
          <h4 className="font-medium text-gray-900 mb-2">{group.label}</h4>
          <div className="space-y-2">
            {group.options.map(option => (
              <label key={option.id} className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={activeFilters[group.id]?.includes(option.id) || false}
                  onChange={(e) => {
                    handleFilterChange(group.id, option.id, e.target.checked)
                    setFilters({ ...filters, [group.id]: activeFilters[group.id] || [] })
                  }}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 
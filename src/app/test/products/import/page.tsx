'use client'

import { useState } from 'react'
import { unwrangleService } from '@/lib/services/service-provider'
import { Product } from '@/types/products'
import { PLACEHOLDER_IMAGE } from './constants'
import { ImportProductImage } from '@/components/ui/import-product-image'
import { ProductImageErrorBoundary } from '@/components/ui/product-image-error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ProductCardSkeleton } from '@/components/ui/product-card-skeleton'

export default function TestProductImportPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [results, setResults] = useState<any>(null)
  const [totalPages, setTotalPages] = useState(1)

  async function handleSearch(platform: 'homedepot' | 'lowes') {
    try {
      setLoading(true)
      setError(undefined)
      
      const data = platform === 'homedepot' 
        ? await unwrangleService.searchHomeDepot({ search, page })
        : await unwrangleService.searchLowes({ search, page })
      
      setResults(data)
      setTotalPages(data.no_of_pages || 1)

      console.log('Pagination:', {
        currentPage: page,
        totalPages: data.no_of_pages,
        totalResults: data.total_results,
        resultCount: data.result_count
      })
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
    handleSearch('homedepot')
  }

  function renderLoadingState() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Product Import</h1>

      <div className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-full max-w-md text-gray-900"
          />
        </div>

        <div className="space-x-4">
          <button
            onClick={() => handleSearch('homedepot')}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
          >
            {loading && <LoadingSpinner size="sm" className="mr-2" />}
            Search Home Depot
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      {loading && renderLoadingState()}
      
      {!loading && results && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {results.results?.map((product: any) => (
              <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm text-gray-900">
                <ProductImageErrorBoundary>
                  <ImportProductImage
                    thumbnails={product.thumbnails}
                    alt={product.name}
                    className="mb-4"
                  />
                </ProductImageErrorBoundary>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 font-medium">{product.brand}</p>
                <p className="text-gray-900 font-bold">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Model: {product.model_number || 'N/A'}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || totalPages === 0}
              className="px-3 py-1 border rounded disabled:opacity-50 bg-white text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-gray-700 bg-white border rounded">
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 border rounded disabled:opacity-50 bg-white text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          
          <details className="mt-8">
            <summary className="cursor-pointer text-gray-500">Raw Data</summary>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-gray-900 mt-2">
              {JSON.stringify(results, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
} 
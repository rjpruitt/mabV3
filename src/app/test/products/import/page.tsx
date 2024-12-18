'use client'

import { useEffect, useState, useCallback } from 'react'
import { unwrangleService, productsService } from '@/lib/services/service-provider'
import { Product } from '@/types/products'
import { PLACEHOLDER_IMAGE } from './constants'
import { ImportProductImage } from '@/components/ui/import-product-image'
import { ProductImageErrorBoundary } from '@/components/ui/product-image-error-boundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ProductCardSkeleton } from '@/components/ui/product-card-skeleton'
import dynamic from 'next/dynamic'
import { ImportWizard } from '@/components/products/import-wizard'
import { ImportFormData } from '@/components/products/types'

export default function TestProductImportPage() {
  const [isClient, setIsClient] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [results, setResults] = useState<any>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [storeNo, setStoreNo] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [currentPlatform, setCurrentPlatform] = useState<'homedepot' | 'lowes'>('homedepot')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [selectedForImport, setSelectedForImport] = useState<any>(null)
  const [importing, setImporting] = useState(false)

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
    handleSearch(currentPlatform)
  }, [currentPlatform, handleSearch])

  const handleViewDetails = useCallback(async (product: Product) => {
    if (!product.url) {
      console.error('Product URL is missing')
      setError('Cannot view details: Product URL is missing')
      return
    }

    setLoadingDetails(true)
    try {
      console.log('Getting details for product:', product)

      const details = product.source === 'lowes'
        ? await unwrangleService.getLowesProductDetails({
            url: product.url,
            zipcode: '99504',
            store_no: '2955',
            zip_state: 'AK'
          })
        : await unwrangleService.getHomeDepotProductDetails({
            url: product.url
          })

      console.log('Got product details:', details)

      // Create a merged product with both search and detail data
      const mergedProduct = {
        ...product,
        details,  // Keep the original details
        // Add detail fields to top level for modal
        description: details.description,
        specifications: details.specifications,
        highlights: details.highlights,
        categories: details.categories,
        dimensions: details.measurements,
        features: details.highlights,  // Using highlights as features
        upc: details.barcode,
        retail_id: details.sku_id,
        // Preserve search data
        name: product.name || details.name,
        brand: product.brand || details.brand,
        model_no: product.model_no || details.model_no,
        price: product.price || details.price,
        rating: product.rating || details.rating,
        total_reviews: product.total_reviews || details.total_reviews,
        inventory_quantity: product.inventory_quantity || details.inventory_quantity
      }

      console.log('Setting merged product:', mergedProduct)

      setSelectedProduct(mergedProduct)
    } catch (error) {
      console.error('Error fetching product details:', error)
      setError(error instanceof Error ? error.message : 'Failed to load product details')
    } finally {
      setLoadingDetails(false)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="p-8 pt-[200px]">Loading...</div>
  }

  async function handleSearch(platform: 'homedepot' | 'lowes') {
    try {
      setLoading(true)
      setError(undefined)
      setCurrentPlatform(platform)
      
      const data = platform === 'homedepot' 
        ? await unwrangleService.searchHomeDepot({ 
            search, 
            page,
            store_no: storeNo,
            zipcode
          })
        : await unwrangleService.searchLowes({ 
            search, 
            page,
            store_no: storeNo,
            zipcode
          })
      
      if (!data) {
        throw new Error(`No results found for ${platform} search`)
      }
      
      setResults(data)
      setTotalPages(data.no_of_pages || 1)

      console.log('Pagination:', {
        currentPage: page,
        totalPages: data.no_of_pages,
        totalResults: data.total_results,
        resultCount: data.result_count
      })
    } catch (err) {
      console.error(`${platform} search error:`, err)
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
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

  async function handleImport(data: ImportFormData) {
    try {
      setImporting(true)
      const response = await fetch('/api/products/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error)
      }

      console.log('Product imported:', result.product)
      setSelectedForImport(null)
    } catch (error) {
      console.error('Import failed:', error)
      setError(error instanceof Error ? error.message : 'Import failed')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="p-8 pt-[200px]">
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

        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Number
            </label>
            <input
              type="text"
              value={storeNo}
              onChange={(e) => setStoreNo(e.target.value)}
              placeholder="Store #"
              className="border rounded px-3 py-2 w-32 text-gray-900"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="ZIP"
              className="border rounded px-3 py-2 w-32 text-gray-900"
            />
          </div>
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
          <button
            onClick={() => handleSearch('lowes')}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
          >
            {loading && <LoadingSpinner size="sm" className="mr-2" />}
            Search Lowes
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
              <div key={`${currentPlatform}-${product.id}`} className="border rounded-lg p-4 bg-white shadow-sm text-gray-900">
                <div className="flex justify-end mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {currentPlatform === 'homedepot' ? 'Home Depot' : 'Lowes'}
                  </span>
                </div>

                <ProductImageErrorBoundary>
                  <ImportProductImage
                    thumbnails={product.thumbnails}
                    alt={product.name}
                    className="mb-4"
                  />
                </ProductImageErrorBoundary>
                
                {/* Primary Info */}
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 font-medium">{product.brand}</p>
                
                {/* Price Section */}
                <div className="mb-2">
                  {product.price_reduced ? (
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 font-bold">${product.price_reduced.toFixed(2)}</p>
                      <p className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</p>
                    </div>
                  ) : (
                    <p className="text-gray-900 font-bold">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                    </p>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-1 text-sm text-gray-500">
                  <p>Model: {product.model_no || 'N/A'}</p>
                  
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span>{product.rating || 'N/A'}</span>
                    </div>
                    <span>({product.total_reviews || 0} reviews)</span>
                  </div>
                  
                  {/* Inventory & Popularity */}
                  <div className="flex items-center justify-between">
                    <span>Stock: {product.inventory_quantity || 'N/A'}</span>
                    {product.favorite_count && (
                      <span>❤️ {product.favorite_count}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleViewDetails(product)}
                    disabled={loadingDetails}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 disabled:opacity-50 flex items-center gap-2"
                  >
                    {loadingDetails && <LoadingSpinner size="sm" />}
                    {loadingDetails ? 'Loading Details...' : 'View Details'}
                  </button>
                </div>
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

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with Close Button */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Basic Info */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Brand:</span>{' '}
                    <span className="text-gray-600">{selectedProduct.brand}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Model:</span>{' '}
                    <span className="text-gray-600">{selectedProduct.model_no}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">UPC:</span>{' '}
                    <span className="text-gray-600">{selectedProduct.upc}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">SKU:</span>{' '}
                    <span className="text-gray-600">{selectedProduct.sku_id}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Retail ID:</span>{' '}
                    <span className="text-gray-600">{selectedProduct.retail_id}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Pricing & Availability</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Regular Price:</span>{' '}
                    <span className="text-gray-600">${selectedProduct.price?.toFixed(2)}</span>
                  </p>
                  {selectedProduct.price_reduced && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Sale Price:</span>{' '}
                      <span className="text-green-600">${selectedProduct.price_reduced?.toFixed(2)}</span>
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-medium text-gray-700">Stock:</span>{' '}
                    <span className="text-gray-600">{selectedProduct.inventory_quantity || 'N/A'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.categories?.map((cat: any) => (
                  <span key={`category-${selectedProduct.id}-${cat.name}`} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            {selectedProduct.dimensions && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Dimensions</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(selectedProduct.dimensions).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-gray-700">{key}:</span>{' '}
                      <span className="text-gray-600">{String(value || 'N/A')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {selectedProduct.features?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedProduct.features?.map((feature: string, index: number) => (
                    <li key={`feature-${selectedProduct.id}-${index}`} className="text-sm text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {selectedProduct.highlights?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Highlights</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedProduct.highlights?.map((highlight: string, index: number) => (
                    <li key={`highlight-${selectedProduct.id}-${index}`} className="text-sm text-gray-600">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {selectedProduct.specifications?.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {selectedProduct.specifications?.map((spec: any) => (
                    <div key={`spec-${selectedProduct.id}-${spec.name}`} className="text-sm">
                      <span className="font-medium text-gray-700">{spec.name}:</span>{' '}
                      <span className="text-gray-600">{String(spec.value || 'N/A')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Summary */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Reviews</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-700">{selectedProduct.rating || 'N/A'}</span>
                  <span className="text-gray-600">({selectedProduct.total_reviews || 0} reviews)</span>
                </div>
                {selectedProduct.favorite_count && (
                  <p className="text-sm text-gray-600">
                    ❤️ {selectedProduct.favorite_count} favorites
                  </p>
                )}
              </div>
            </div>

            {/* Product URL */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Product Link</h3>
              <a 
                href={selectedProduct.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 break-all"
              >
                {selectedProduct.url}
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedForImport(selectedProduct)  // Open import wizard
                  setSelectedProduct(null)  // Close details modal
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Import Product
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedForImport && (
        <ImportWizard
          productData={selectedForImport}
          onClose={() => setSelectedForImport(null)}
          onImport={handleImport}
        />
      )}
    </div>
  )
} 
'use client'

interface ProductSummaryHeaderProps {
  product: {
    name: string
    brand: string
    model_no?: string
    url?: string
    images?: string[]
    supplier?: string
  }
}

export function ProductSummaryHeader({ product }: ProductSummaryHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="flex items-start space-x-4 p-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-medium text-gray-900 truncate">{product.name}</h2>
          <div className="mt-1 space-y-1">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Manufacturer:</span> {product.brand}
            </p>
            {product.model_no && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Model:</span> {product.model_no}
              </p>
            )}
            {product.supplier && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Source:</span> {product.supplier}
              </p>
            )}
          </div>
        </div>

        {/* View Source Link */}
        {product.url && (
          <div className="flex-shrink-0">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              View Source
              <span className="sr-only">, opens in new tab</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
} 
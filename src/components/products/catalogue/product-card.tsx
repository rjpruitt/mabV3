'use client'

import { CatalogueProduct, ProductImage } from '@/lib/products/types/catalogue'
import Image from 'next/image'

interface ProductCardProps {
  product: CatalogueProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img: ProductImage) => img.isPrimary)
  const imageUrl = primaryImage?.url || '/images/no-image.png'
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-4 aspect-h-3 relative">
        <Image
          src={imageUrl}
          alt={primaryImage?.alt || product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        
        <div className="mt-2 text-sm text-gray-500">
          {product.designTool?.classification?.format === 'KIT' ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Complete Kit
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Individual Component
            </span>
          )}
        </div>
      </div>
    </div>
  )
} 
'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  // Get index of card in grid to set priority on first few images
  const isPriority = priority || false

  // Add debugging logs
  console.log('Product:', {
    id: product.id,
    name: product.name,
    imageCount: product.images.length,
    images: product.images,
    primaryImage: product.images.find(img => img.isPrimary),
  })

  const getImageUrl = (url: string | undefined): string => {
    // Add debugging for URL transformation
    console.log('Processing URL:', {
      input: url,
      isAbsolute: url?.startsWith('http'),
      isPlaceholder: url === 'placeholder-url',
      isLocalWithSlash: url?.startsWith('/'),
    })

    if (!url) {
      console.log('No URL provided, using placeholder')
      return '/images/no-image.png'
    }
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log('Using absolute URL:', url)
      return url
    }
    
    if (url === 'placeholder-url') {
      console.log('Found placeholder-url, using no-image')
      return '/images/no-image.png'
    }
    
    if (url.startsWith('/')) {
      console.log('Using local URL with slash:', url)
      return url
    }
    
    const result = `/${url}`
    console.log('Adding slash to local URL:', result)
    return result
  }

  const primaryImage = product.images.find(img => img.isPrimary)
  const imageUrl = !imageError 
    ? getImageUrl((primaryImage || product.images[0])?.url)
    : '/images/no-image.png'

  console.log('Final image URL:', imageUrl)

  return (
    <div className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
          priority={isPriority}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium truncate text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-700 truncate">{product.brand}</p>
      </div>

      {/* Actions Menu */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
} 
import { ProductImage } from '@/types/products'

// Mock data for testing
const mockImageCache: Record<string, ProductImage[]> = {
  'prod-1': [
    {
      id: 'img-1',
      sourceUrl: 'https://example.com/vanity.jpg',
      localUrl: '/images/cached/vanity.jpg',
      thumbnailUrl: '/images/cached/vanity-thumb.jpg',
      alt: 'Front view',
      isPrimary: true,
      width: 1200,
      height: 800,
      status: 'cached',
      lastChecked: new Date()
    }
  ]
}

export class ImageService {
  async ensureProductImages(productId: string): Promise<ProductImage[]> {
    // Mock image processing
    const images = mockImageCache[productId] || []
    
    if (!images.length) {
      // Simulate new image caching
      const newImage: ProductImage = {
        id: `img-${Date.now()}`,
        sourceUrl: 'https://example.com/placeholder.jpg',
        localUrl: '/images/cached/placeholder.jpg',
        thumbnailUrl: '/images/cached/placeholder-thumb.jpg',
        alt: 'Product image',
        isPrimary: true,
        width: 800,
        height: 600,
        status: 'cached',
        lastChecked: new Date()
      }
      
      mockImageCache[productId] = [newImage]
      return [newImage]
    }

    return images
  }

  async refreshProductImages(productId: string): Promise<ProductImage[]> {
    // Mock image refresh
    const images = mockImageCache[productId] || []
    
    return images.map(img => ({
      ...img,
      status: 'cached',
      lastChecked: new Date()
    }))
  }

  async deleteProductImages(productId: string): Promise<void> {
    delete mockImageCache[productId]
  }

  async getProductImages(productId: string): Promise<ProductImage[]> {
    return mockImageCache[productId] || []
  }
} 
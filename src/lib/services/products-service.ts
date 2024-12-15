import { ImportFormData } from '@/components/products/types'
import { db } from '@/lib/db'  // We'll create this

export class ProductsService {
  async importProduct(data: ImportFormData) {
    try {
      console.log('Starting product import:', {
        name: data.name,
        brand: data.brand,
        categories: data.categories
      })

      // 1. Validate data
      this.validateImportData(data)

      // 2. Process images
      const processedImages = await this.processImages(data.images)
      console.log('Processed images:', processedImages)

      // 3. Create product record
      const product = await db.product.create({
        data: {
          name: data.name,
          brand: data.brand,
          description: {
            supplier: data.description.supplier,
            internal: data.description.internal
          },
          categories: {
            create: [
              ...data.categories.style.map(style => ({
                type: 'style',
                name: style
              })),
              ...data.categories.type.map(type => ({
                type: 'product_type',
                name: type
              }))
            ]
          },
          images: {
            create: processedImages.map(img => ({
              url: img.url,
              source: img.source,
              isPrimary: img.primary
            }))
          },
          specifications: {
            create: data.specifications.map(spec => ({
              name: spec.name,
              value: spec.value
            }))
          },
          visibility: data.visibility,
          metadata: {
            supplier: data.metadata.supplier,
            externalId: data.metadata.externalId,
            importedAt: data.metadata.importedAt
          }
        },
        include: {
          categories: true,
          images: true,
          specifications: true
        }
      })

      console.log('Product imported successfully:', product)
      return product
    } catch (error) {
      console.error('Product import failed:', error)
      throw error
    }
  }

  private validateImportData(data: ImportFormData) {
    if (!data.name) throw new Error('Product name is required')
    if (!data.brand) throw new Error('Brand is required')
    if (!data.categories.type.length) throw new Error('At least one product type is required')
    // Add more validation as needed
  }

  private async processImages(images: ImportFormData['images']) {
    // TODO: Implement image processing
    // - Download supplier images
    // - Upload to our storage
    // - Generate thumbnails
    // - Return processed image data
    return images
  }
}

export const productsService = new ProductsService() 
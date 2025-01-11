/**
 * Product Import Service
 * Handles importing scraped product data into the database
 * 
 * Features:
 * - Transforms scraped data to database schema
 * - Creates or connects suppliers
 * - Handles image relationships
 * - Sets default visibility settings
 * - Manages product categorization
 * 
 * Default Settings:
 * - Team visibility enabled
 * - Customer visibility disabled
 * - Images linked to patterns
 * - Supplier auto-creation if needed
 */

import type { ProductRepository } from '@/lib/products/repositories/product.repository'
import type { ScrapedProduct } from './scraper/scraper-service'
import type { Prisma } from '@prisma/client'

export class ProductImportService {
  constructor(private productRepo: ProductRepository) {}

  async importProduct(product: ScrapedProduct, supplier: string) {
    try {
      const dbProduct: Prisma.ProductCreateInput = {
        name: product.name,
        brand: supplier,
        description: {
          marketing: product.description.marketing || '',
          internal: product.description.internal || '',
          supplier: product.description.supplier || ''
        },
        categorization: {
          style: Array.isArray(product.categorization.style) ? product.categorization.style : [],
          type: Array.isArray(product.categorization.type) ? product.categorization.type : []
        },
        specifications: {
          dimensions: product.specifications.dimensions,
          features: product.specifications.features,
          technicalSpecs: product.specifications.technicalSpecs
        },
        images: {
          create: product.patterns.flatMap(pattern => 
            pattern.images.map(image => ({
              url: image.url,
              alt: image.alt || '',
              isPrimary: image.isPrimary,
              visibility: {
                create: {
                  team: true,
                  customer: false
                }
              }
            }))
          )
        },
        supplier: {
          connectOrCreate: {
            where: { code: supplier.toLowerCase() },
            create: { 
              code: supplier.toLowerCase(),
              name: supplier
            }
          }
        },
        visibility: {
          create: {
            roles: ['TEAM']
          }
        }
      }

      return await this.productRepo.create(dbProduct)
    } catch (error) {
      console.error('Import failed:', error)
      throw error
    }
  }
} 
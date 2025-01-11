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

import { PrismaClient, Prisma, ProductImage } from '@prisma/client'
import { promises as fs } from 'fs'
import path from 'path'

interface PatternVariation {
  id: string
  name: string
  order: number
  images: Array<{
    url: string
    localPath: string
    view: string
    isPrimary: boolean
    alt?: string
  }>
}

export class ProductImportService {
  constructor(private prisma: PrismaClient) {}

  async importScrapedProduct(
    sourcePath: string,
    category: string
  ) {
    // Get supplier first
    const supplier = await this.prisma.supplier.findUnique({
      where: { code: 'CASTICO' }
    })
    
    if (!supplier) {
      throw new Error('Supplier CASTICO not found')
    }

    // Read product JSON
    const productData = JSON.parse(
      await fs.readFile(path.join(sourcePath, 'product.json'), 'utf-8')
    )

    // Create product record first to get CUID
    const product = await this.prisma.product.create({
      data: {
        name: productData.name,
        brand: productData.brand,
        description: {
          supplier: productData.description.supplier,
          marketing: productData.description.marketing,
          internal: productData.description.internal || ''
        },
        categorization: {
          categories: productData.categorization.type,
          style: productData.categorization.style
        },
        specifications: {
          dimensions: productData.specifications.dimensions,
          features: productData.specifications.features,
          technicalSpecs: productData.specifications.technicalSpecs
        },
        supplierId: supplier.id,
        visibility: {
          create: {
            roles: ['CUSTOMER', 'TEAM'],
            promotions: Prisma.JsonNull,
            designTools: Prisma.JsonNull
          }
        },
        variations: {
          patterns: (productData.patterns as PatternVariation[]).map(pattern => ({
            id: pattern.id,
            name: pattern.name,
            order: pattern.order
          }))
        },
        supplierPricing: {
          create: {
            listPrice: productData.price,
            effectiveDate: new Date(),
            discount: 0,
            supplierName: 'Castico',
            supplierSku: '',
            updatedAt: new Date()
          }
        }
      }
    })

    // Now handle images with the product's CUID
    await this.importProductImages(
      product.id,
      category,
      productData.patterns,
      sourcePath
    )

    return product
  }

  private async importProductImages(
    productId: string,
    category: string,
    patterns: any[],
    sourcePath: string
  ) {
    const uploadDir = path.join(
      process.cwd(),
      'public/images/uploads',
      category,
      productId,
      'patterns'
    )

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true })

    // Process each pattern's images
    for (const pattern of patterns) {
      const patternDir = path.join(uploadDir, pattern.name.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      await fs.mkdir(patternDir, { recursive: true })

      // Copy and register each image
      for (const image of pattern.images) {
        // Copy file to new location
        const destPath = path.join(patternDir, path.basename(image.localPath))
        await fs.copyFile(image.localPath, destPath)

        // Create image with explicit type
        const imageData: Prisma.ProductImageCreateInput = {
          product: {
            connect: { id: productId }
          },
          url: `/images/uploads/${category}/${productId}/patterns/${pattern.name}/${path.basename(image.localPath)}`,
          alt: image.alt || pattern.name,
          isPrimary: image.isPrimary,
          view: image.view
        }

        await this.prisma.productImage.create({
          data: imageData
        })
      }
    }
  }
} 
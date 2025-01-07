import { chromium, type Page } from 'playwright'
import { PrismaClient, Prisma } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import path from 'path'
import fs from 'fs/promises'

const prisma = new PrismaClient()

export interface ScrapedImage {
  url: string
  alt?: string
  localPath: string
  view: string // e.g., 'front', 'side', etc.
  isPrimary: boolean
}

export interface PatternVariation {
  id: string
  name: string
  thumbnail: {
    url: string
    localPath: string
  }
  images: ScrapedImage[]
  order: number
}

export interface ProductSpec {
  name: string
  value: string
}

export interface ScrapedProduct {
  url: string
  name: string
  price: string
  description: string
  includes: string[]
  patterns: PatternVariation[]
  technicalSpecs: ProductSpec[]
  features: string[]
  metadata: {
    scrapedAt: string
    productType: string
    dimensions: {
      width: number
      depth: number
      height: number
    }
  }
}

export interface CategoryInfo {
  name: string
  url: string
  expectedCount?: number
}

export abstract class ScraperService {
  abstract extractProductDetails(page: Page): Promise<{
    url: string
    name: string
    price: string
    description: string
    includes: string[]
    technicalSpecs: ProductSpec[]
    features: string[]
    metadata: {
      scrapedAt: string
      productType: string
      dimensions: {
        width: number
        depth: number
        height: number
      }
    }
  }>
  abstract extractImages(page: Page, pattern: string): Promise<ScrapedImage[]>
  abstract extractPatternVariations(page: Page): Promise<PatternVariation[]>
  abstract downloadImage(url: string): Promise<Buffer>
  abstract scrapeProduct(url: string): Promise<ScrapedProduct>

  async importProduct(scrapedProduct: ScrapedProduct, supplierId: string) {
    // Create product in database
    const product = await prisma.product.create({
      data: {
        name: scrapedProduct.name,
        brand: 'Castico',
        description: scrapedProduct.description,
        supplierId,
        visibility: { showToCustomer: false, showToSalesRep: true } as Prisma.InputJsonValue,
        metadata: scrapedProduct.metadata as Prisma.InputJsonValue,
        sourceData: Prisma.JsonNull
      }
    })

    // Create technical specifications
    if (scrapedProduct.technicalSpecs.length) {
      await prisma.specification.createMany({
        data: scrapedProduct.technicalSpecs.map(spec => ({
          productId: product.id,
          name: spec.name,
          value: spec.value
        }))
      })
    }

    // Create features as specifications
    if (scrapedProduct.features.length) {
      await prisma.specification.createMany({
        data: scrapedProduct.features.map(feature => ({
          productId: product.id,
          name: 'Feature',
          value: feature
        }))
      })
    }

    // Create images for each pattern
    for (const pattern of scrapedProduct.patterns) {
      for (const image of pattern.images) {
        try {
          const imageBuffer = await this.downloadImage(image.url)
          await prisma.productImage.create({
            data: {
              url: image.url,
              productId: product.id,
              source: 'supplier',
              isPrimary: image.isPrimary,
              alt: image.alt,
              metadata: {
                pattern: pattern.name,
                view: image.view
              } as Prisma.InputJsonValue
            }
          })
        } catch (error) {
          console.error(`Failed to process image ${image.url}:`, error)
        }
      }
    }

    return product
  }

  // Add this helper method to normalize line endings
  private normalizeLineEndings(text: string): string {
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  }

  // Update the saveResults method
  protected async saveResults(data: any, filename: string) {
    const resultsDir = path.join(process.cwd(), 'debug', 'results')
    await fs.mkdir(resultsDir, { recursive: true })
    
    // Stringify with normalized line endings
    const jsonString = this.normalizeLineEndings(
      JSON.stringify(data, null, 2)
    )
    
    const filepath = path.join(resultsDir, filename)
    await fs.writeFile(filepath, jsonString, 'utf8')
    console.log(`Results saved to: ${filepath}`)
  }
} 
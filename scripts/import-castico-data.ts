import { fileURLToPath } from 'url'
import { dirname, join, basename } from 'path'
import { prisma } from '../src/lib/prisma'
import { StorageService } from '../src/lib/storage'
import { Prisma } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

// Get current file directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Update types to match our needs
interface ScrapedImage {
  filename: string
  url: string
  alt?: string
  localPath: string
}

interface ScrapedProduct {
  name: string
  brand: string
  description: {
    supplier: string
    marketing: string
  }
  categories: string[]
  specifications: Record<string, string | number>
  images: ScrapedImage[]
}

interface ScrapedProductRaw {
  url: string
  details: {
    name: string
    brand: string
    description: {
      supplier: string
      marketing: string
    }
    metadata: {
      sku: string
      price: string
      supplierUrl: string
    }
  }
  images: Array<{
    url: string
    alt: string
    localPath: string
    isPrimary: boolean
  }>
  specs: Array<{
    name: string
    value: string
  }>
}

// Transform raw data to our expected format
function transformProduct(raw: ScrapedProductRaw): ScrapedProduct {
  return {
    name: raw.details.name,
    brand: raw.details.brand,
    description: raw.details.description,
    categories: ['SHOWERS'],
    specifications: Object.fromEntries(
      raw.specs.map(spec => [spec.name, spec.value])
    ),
    images: raw.images.map(img => ({
      filename: basename(img.localPath),
      url: img.url,
      alt: img.alt,
      localPath: img.localPath
    }))
  }
}

// Helper type for JSON-serializable data
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

type SerializedProduct = Omit<ScrapedProduct, 'images'> & {
  images: Array<Omit<ScrapedImage, 'filename'>>
}

type ImportSummary = {
  total: number
  processed: number
  imported: number
  failed: number
  images: {
    total: number
    uploaded: number
    failed: number
  }
  errors: Array<{
    product: string
    error: string
  }>
}

// Update validation function
function validateProduct(product: unknown): product is ScrapedProductRaw {
  if (!product || typeof product !== 'object') return false
  
  const p = product as any
  return (
    p.url &&
    p.details?.name &&
    p.details?.brand &&
    Array.isArray(p.images) &&
    Array.isArray(p.specs) &&
    p.images.every((img: any) => 
      typeof img === 'object' && 
      typeof img.localPath === 'string' &&
      typeof img.url === 'string'
    )
  )
}

async function importCasticoData() {
  try {
    // Clean up uploads directory
    const uploadsDir = join(process.cwd(), 'public/uploads')
    const scrapedDir = join(process.cwd(), 'scraped-images')
    
    console.log('Cleaning uploads directory:', uploadsDir)
    
    // Clean uploads directory
    const files = await fs.readdir(uploadsDir)
    for (const file of files) {
      if (file === '.gitkeep') continue
      await fs.unlink(join(uploadsDir, file))
    }
    console.log(`Cleaned ${files.length - 1} files from uploads directory`)

    // Verify scraped images exist
    try {
      await fs.access(scrapedDir)
    } catch (e) {
      throw new Error('Scraped images directory not found. Run the scraper first.')
    }

    // Read product data
    const dataPath = join(process.cwd(), 'castico-products.json')
    const rawData = await fs.readFile(dataPath, 'utf-8')
    const products: ScrapedProduct[] = JSON.parse(rawData)

    const summary: ImportSummary = {
      total: 0,
      processed: 0,
      imported: 0,
      failed: 0,
      images: {
        total: 0,
        uploaded: 0,
        failed: 0
      },
      errors: []
    }

    for (const product of products) {
      try {
        // Copy images to uploads directory first
        for (const img of product.images) {
          const sourcePath = img.localPath
          const destPath = join(uploadsDir, basename(img.localPath))
          
          console.log(`Copying ${basename(img.localPath)}...`)
          await fs.copyFile(sourcePath, destPath)
        }

        // Then create database record
        const dbProduct = await prisma.product.create({
          data: {
            name: product.name,
            brand: product.brand,
            description: product.description as Prisma.InputJsonValue,
            supplierId: "b1600d85-b2a6-43fb-ab97-07faac395cf8",
            visibility: {
              published: false,
              showToCustomer: true,
              showToSalesRep: true
            } as Prisma.InputJsonValue,
            sourceData: JSON.parse(JSON.stringify({
              ...product,
              importedAt: new Date().toISOString()
            })) as Prisma.InputJsonValue,
            metadata: {
              importedAt: new Date().toISOString(),
              source: 'castico-scraper'
            } as Prisma.InputJsonValue,
            images: {
              create: product.images.map((img, index) => ({
                url: `/uploads/${path.basename(img.localPath)}`,
                isPrimary: index === 0,
                alt: img.alt || product.name,
                source: 'supplier' as const
              }))
            },
            categories: {
              create: product.categories.map(cat => ({
                name: cat,
                type: 'PRIMARY'
              }))
            },
            specifications: {
              create: Object.entries(product.specifications).map(([name, value]) => ({
                name,
                value: String(value)
              }))
            }
          }
        })

        summary.imported++
        console.log(`✓ Imported: ${dbProduct.name}`)
        console.log(`  - ${product.images.length} images uploaded`)
        console.log(`  - ${product.categories.length} categories created`)
        console.log(`  - ${Object.keys(product.specifications).length} specifications added`)

      } catch (error) {
        summary.failed++
        summary.errors.push({
          product: product.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
        console.error(`✗ Failed to import ${product.name}:`, error)
      }
    }

    // Print summary
    console.log('\n=== Import Summary ===')
    console.log(`Total products found: ${summary.total}`)
    console.log(`Products processed: ${summary.processed}`)
    console.log(`Successfully imported: ${summary.imported}`)
    console.log(`Failed imports: ${summary.failed}`)
    console.log('\nImage Statistics:')
    console.log(`Total images: ${summary.images.total}`)
    console.log(`Successfully uploaded: ${summary.images.uploaded}`)
    console.log(`Failed uploads: ${summary.images.failed}`)

    if (summary.errors.length > 0) {
      console.log('\nErrors:')
      summary.errors.forEach(({ product, error }) => {
        console.log(`- ${product}: ${error}`)
      })
    }

  } catch (error) {
    console.error('Import failed:', error)
    process.exit(1)
  }
}

importCasticoData() 
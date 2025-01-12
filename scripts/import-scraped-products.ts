import { ServiceProvider } from '../src/lib/services/service-provider'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { promises as fs } from 'fs'

async function importScrapedProducts() {
  const serviceProvider = ServiceProvider.getInstance()
  const importService = serviceProvider.getProductImportService()
  const prisma = new PrismaClient()
  
  try {
    // First ensure supplier exists
    const supplier = await prisma.supplier.upsert({
      where: {
        code: 'CASTICO'
      },
      update: {},
      create: {
        name: 'Castico',
        code: 'CASTICO'
      }
    })
    
    console.log('Supplier ready:', supplier.name, 'with ID:', supplier.id)

    // Import shower bases products
    const resultsDir = path.join(process.cwd(), 'debug/results/shower-bases')
    const scrapeDir = path.join(resultsDir, '2025-01-12 01-16-48')
    const productFolders = await fs.readdir(scrapeDir)

    console.log(`Found ${productFolders.length} products to import`)

    for (const folder of productFolders) {
      try {
        const product = await importService.importScrapedProduct(
          path.join(scrapeDir, folder),
          'shower-bases'
        )
        console.log('Successfully imported product:', product.name)
      } catch (error) {
        console.error(`Failed to import ${folder}:`, error)
      }
    }

    console.log('Import complete!')
  } catch (error) {
    console.error('Import failed:', error)
  }
}

importScrapedProducts() 
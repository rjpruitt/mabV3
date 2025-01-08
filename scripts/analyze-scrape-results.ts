import fs from 'fs/promises'
import path from 'path'

interface Pattern {
  name: string
  images: any[]
}

interface ProductData {
  name: string
  patterns: Pattern[]
}

async function analyzeScrapeResults() {
  const resultsDir = path.join(process.cwd(), 'debug', 'results', 'base-and-wall-kits', '2025-01-08')
  
  const productDirs = await fs.readdir(resultsDir)
  let totalProducts = 0
  let productsWithoutPatterns = 0
  let productsWithoutImages = 0
  
  for (const dir of productDirs) {
    const productPath = path.join(resultsDir, dir, 'product.json')
    try {
      const productData = JSON.parse(await fs.readFile(productPath, 'utf-8')) as ProductData
      totalProducts++
      
      if (!productData.patterns || productData.patterns.length === 0) {
        console.log(`❌ No patterns found: ${productData.name}`)
        productsWithoutPatterns++
        continue
      }

      let hasImages = false
      for (const pattern of productData.patterns) {
        if (pattern.images && pattern.images.length > 0) {
          hasImages = true
          break
        }
      }

      if (!hasImages) {
        console.log(`❌ No images found for any patterns: ${productData.name}`)
        console.log(`   Patterns: ${productData.patterns.map((p: Pattern) => p.name).join(', ')}`)
        productsWithoutImages++
      }

    } catch (error) {
      console.error(`Error processing ${dir}:`, error)
    }
  }

  console.log('\nSummary:')
  console.log(`Total products: ${totalProducts}`)
  console.log(`Products without patterns: ${productsWithoutPatterns}`)
  console.log(`Products with patterns but no images: ${productsWithoutImages}`)
}

analyzeScrapeResults() 
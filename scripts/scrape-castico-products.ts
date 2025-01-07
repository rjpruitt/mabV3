import { CasticoScraper } from '../src/lib/services/scraper/suppliers/castico'
import { ScrapedProduct } from '../src/lib/services/scraper/scraper-service'

async function main() {
  const scraper = new CasticoScraper()
  await scraper.initialize()

  try {
    const products = await scraper.scrapeAllProducts()
    
    // Save products to JSON file
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const outputPath = path.join(process.cwd(), 'castico-products.json')
    await fs.writeFile(outputPath, JSON.stringify(products, null, 2))
    
    console.log(`Saved ${products.length} products to ${outputPath}`)
    
  } catch (error) {
    console.error('Scraping failed:', error)
    process.exit(1)
  } finally {
    await scraper.cleanup()
  }
}

main() 
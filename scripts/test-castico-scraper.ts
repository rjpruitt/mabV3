import { CasticoScraper } from '../src/lib/services/scraper/suppliers/castico.js'
import { ScrapedProduct } from '../src/lib/services/scraper/scraper-service.js'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  const scraper = new CasticoScraper()
  await scraper.initialize()

  try {
    const category = scraper.categories[0] // BASE & WALL KITS
    const products = await scraper.scrapeAllProducts(category)
    
    console.log('\nScraping Complete!')
    console.log('------------------------')
    console.log(`Total products scraped: ${products.length}`)
    
  } finally {
    await scraper.cleanup()
  }
}

main().catch(console.error) 
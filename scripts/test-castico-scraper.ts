import { CasticoScraper } from '../src/lib/services/scraper/suppliers/castico.js'
import { ScrapedProduct } from '../src/lib/services/scraper/scraper-service.js'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const scraper = new CasticoScraper()

async function saveResults(product: ScrapedProduct) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `castico-product-${timestamp}.json`
  
  try {
    // Create results directory if it doesn't exist
    const resultsDir = path.join(process.cwd(), 'debug', 'results')
    await fs.mkdir(resultsDir, { recursive: true })
    
    const filepath = path.join(resultsDir, filename)
    await fs.writeFile(filepath, JSON.stringify(product, null, 2))
    console.log(`Results saved to: ${filepath}`)
  } catch (error) {
    console.error('Failed to save results:', error)
  }
}

async function main() {
  await scraper.initialize()

  try {
    const testUrl = 'https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-geometric-2-wall-decor/'
    
    console.log('Starting test scrape of:', testUrl)
    const product = await scraper.scrapeProduct(testUrl)
    
    await saveResults(product)
    
    console.log('Test complete!')
    console.log('Found patterns:', product.patterns.length)
    console.log('Found technical specs:', product.technicalSpecs.length)
    console.log('Found features:', product.features.length)

  } catch (error) {
    console.error('Test failed:', error)
  } finally {
    await scraper.cleanup()
  }
}

main().catch(console.error) 
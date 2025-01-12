/**
 * Base & Wall Kits Scraper
 * 
 * Original scraper script used for testing the base & wall kits category.
 * Uses index 0 of the category configuration in CasticoScraper.
 * 
 * Features:
 * - Scrapes all base & wall kit products
 * - Extracts patterns and variations
 * - Downloads and saves images
 * - Creates debug/results output
 * 
 * Usage:
 * ```bash
 * npm run test-scraper-shower-walls -- 0
 * ```
 * 
 * Output:
 * - Saves results to debug/results/base-and-wall-kits/[timestamp]/
 * - Creates product.json for each product
 * - Downloads and organizes images by pattern
 */

import { ServiceProvider } from '../src/lib/services/service-provider'

async function testScraper() {
  console.log('Starting scraper test...')
  
  try {
    const services = ServiceProvider.getInstance()
    const scraper = services.getCasticoScraper()
    
    console.log('Initialized scraper, starting product scrape...')
    const products = await scraper.scrapeProducts()
    
    console.log('Scraped products:', products.length)
    console.log('First product:', JSON.stringify(products[0], null, 2))
    
  } catch (error) {
    console.error('Scraper test failed:', error)
    throw error
  }
}

testScraper()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Test failed:', error)
    process.exit(1)
  }) 
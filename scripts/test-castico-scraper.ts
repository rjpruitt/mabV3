/**
 * Test script for the Castico product scraper
 * Scrapes product data and saves it to the debug/results directory
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
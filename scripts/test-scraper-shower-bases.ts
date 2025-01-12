/**
 * Shower Bases Scraper
 * 
 * Scraper script for the shower bases category.
 * Uses index 2 of the category configuration in CasticoScraper.
 * 
 * Features:
 * - Scrapes all shower base products
 * - Extracts patterns and variations
 * - Downloads and saves images
 * - Creates debug/results output
 * - Handles fractional dimensions (e.g., 1-1/8")
 * 
 * Usage:
 * ```bash
 * npm run test-scraper-shower-bases
 * ```
 * 
 * Output:
 * - Saves results to debug/results/shower-bases/[timestamp]/
 * - Creates product.json for each product
 * - Downloads and organizes images by pattern
 */

import { ServiceProvider } from '../src/lib/services/service-provider'

async function testShowerBasesScraper() {
  const serviceProvider = ServiceProvider.getInstance()
  const scraper = serviceProvider.getCasticoScraper()
  
  try {
    // Use index 2 for SHOWER BASES category
    await scraper.scrapeProducts(2)
    console.log('Scrape complete!')
  } catch (error) {
    console.error('Scrape failed:', error)
  }
}

testShowerBasesScraper() 
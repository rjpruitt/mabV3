/**
 * Shower Walls Scraper
 * 
 * Scraper script for the shower walls category.
 * Uses index 1 of the category configuration in CasticoScraper.
 * 
 * Features:
 * - Scrapes all shower wall products
 * - Extracts patterns and variations
 * - Downloads and saves images
 * - Creates debug/results output
 * - Handles wall dimensions (e.g., 84" height)
 * 
 * Usage:
 * ```bash
 * npm run test-scraper-shower-walls
 * ```
 * 
 * Output:
 * - Saves results to debug/results/shower-walls/[timestamp]/
 * - Creates product.json for each product
 * - Downloads and organizes images by pattern
 */

import { ServiceProvider } from '../src/lib/services/service-provider'

async function testShowerWallsScraper() {
  const serviceProvider = ServiceProvider.getInstance()
  const scraper = serviceProvider.getCasticoScraper()
  
  try {
    await scraper.scrapeProducts(1)
    console.log('Scrape complete!')
  } catch (error) {
    console.error('Scrape failed:', error)
  }
}

testShowerWallsScraper() 
import { chromium } from 'playwright'
import { CasticoScraper } from '../src/lib/services/scraper/suppliers/castico'
import * as fs from 'fs'

// Add this to the top of the file to enable ES modules
await import('playwright')

async function testScrape() {
  const url = 'https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-decoratice-tile-studio-2-wall-decor/'
  const browser = await chromium.launch({ 
    headless: false, // Set to false to see the browser while scraping
    slowMo: 100 // Slow down operations to see what's happening
  })

  try {
    console.log('Starting test scrape...')
    const page = await browser.newPage()
    await page.goto(url)

    // Log the page title
    console.log('Page Title:', await page.title())

    // Take a screenshot
    await page.screenshot({ path: 'castico-test.png' })

    // Test our scraper
    const scraper = new CasticoScraper()
    const details = await scraper.extractProductDetails(page)
    const images = await scraper.extractImages(page)
    const specs = await scraper.extractSpecifications(page)

    const result = {
      details,
      images,
      specs
    }

    // Save results to a file
    fs.writeFileSync(
      'castico-test-results.json',
      JSON.stringify(result, null, 2)
    )

    console.log('\nTest Results:')
    console.log(JSON.stringify(result, null, 2))
    console.log('\nResults have been saved to castico-test-results.json')

  } catch (error) {
    console.error('Scraping failed:', error)
  } finally {
    await browser.close()
  }
}

// Use top-level await
await testScrape() 
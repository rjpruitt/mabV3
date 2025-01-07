import { ScraperService } from '../scraper-service'
import { Page } from 'playwright'

export class AmericanStandardScraper extends ScraperService {
  async extractProductDetails(page: Page) {
    const details = await page.evaluate(() => {
      const name = document.querySelector('h1.product-name')?.textContent?.trim()
      if (!name) throw new Error('Product name not found')

      return {
        name,
        brand: 'American Standard',
        description: {
          supplier: document.querySelector('.product-description')?.textContent?.trim() || '',
          marketing: document.querySelector('.marketing-description')?.textContent?.trim() || ''
        },
        metadata: {
          sku: document.querySelector('.product-sku')?.textContent?.trim(),
          modelNumber: document.querySelector('.model-number')?.textContent?.trim(),
          supplierUrl: window.location.href
        }
      }
    })

    return details
  }

  async extractImages(page: Page) {
    return await page.evaluate(() => {
      const images = document.querySelectorAll('.product-gallery img')
      return Array.from(images).map((img, index) => ({
        url: img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || '',
        isPrimary: index === 0
      })).filter(img => img.url !== '') // Filter out images without URLs
    })
  }

  async extractSpecifications(page: Page) {
    return await page.evaluate(() => {
      const specs = document.querySelectorAll('.specifications-table tr')
      return Array.from(specs).map(row => {
        const name = row.querySelector('th')?.textContent?.trim() || ''
        const value = row.querySelector('td')?.textContent?.trim() || ''
        return { name, value }
      }).filter(spec => spec.name !== '') // Filter out specs without names
    })
  }
} 
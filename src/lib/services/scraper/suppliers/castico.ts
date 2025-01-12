/**
 * Castico Product Scraper
 * Implements ScraperService for Castico product catalogue
 * Handles product data extraction, image downloads, and result storage
 * Supports pattern variations and technical specifications
 */

import { 
  ScraperService, 
  type ScrapedProduct, 
  type ScrapedImage, 
  type PatternVariation, 
  type ProductSpec, 
  type CategoryInfo 
} from '../scraper-service'
import { type Page, Browser, chromium } from 'playwright'
import { type ServiceProvider } from '../../service-provider'
import fs from 'fs/promises'
import path from 'path'

export class CasticoScraper implements ScraperService {
  private browser: Browser | null = null
  private readonly screenshotsDir = path.join(process.cwd(), 'debug', 'screenshots')
  private enableScreenshots = process.env.SAVE_SCRAPER_SCREENSHOTS === 'true'
  private debug = process.env.DEBUG_SCRAPER === 'true'
  private scrapeTimestamp: string | null = null

  public readonly categories: CategoryInfo[] = [
    {
      name: 'BASE & WALL KITS',
      url: 'https://castico-tx.com/product-category/castico-online/shower-kits-base-wall/',
    },
    {
      name: 'SHOWER WALLS',
      url: 'https://castico-tx.com/shop/?filter_product-category=shower-walls',
      expectedCount: 18
    },
    {
      name: 'SHOWER BASES',
      url: 'https://castico-tx.com/shop/?filter_product-category=shower-bases',
      expectedCount: 42
    },
    {
      name: 'ACCESSORIES',
      url: 'https://castico-tx.com/shop/?filter_product-category=accessories',
      expectedCount: 14
    }
  ]

  constructor(private services: ServiceProvider) {}

  private cleanText(text: string): string {
    return text
      .replace(/[\t\r\n\u2028\u000b\u001c\u001d\u001e\u001f]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  private async initialize() {
    console.log('Initializing scraper...')
    
    // Create required directories
    await fs.mkdir(this.screenshotsDir, { recursive: true })

    // Only launch if not already launched
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: [
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ],
        timeout: 120000
      })
    }

    await this.cleanupOldScreenshots()
  }

  async scrapeProducts(categoryIndex: number = 0): Promise<ScrapedProduct[]> {
    console.log('Starting Castico scrape...')
    try {
      await this.initialize()
      
      const category = this.categories[categoryIndex]
      console.log(`Scraping category: ${category.name}`)
      
      const products = await this.scrapeAllProducts(category)
      console.log(`Scraped ${products.length} products`)
      
      return products
    } catch (error) {
      console.error('Error in CasticoScraper:', error)
      throw error
    } finally {
      await this.cleanup()
    }
  }

  async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }

  private async cleanupOldScreenshots() {
    if (!this.enableScreenshots) return
    
    try {
      const files = await fs.readdir(this.screenshotsDir)
      const now = Date.now()
      const oneDay = 24 * 60 * 60 * 1000

      for (const file of files) {
        const filePath = path.join(this.screenshotsDir, file)
        const stats = await fs.stat(filePath)
        if (now - stats.mtime.getTime() > oneDay) {
          await fs.unlink(filePath)
        }
      }
    } catch (error) {
      console.error('Failed to cleanup screenshots:', error)
    }
  }

  private async scrapeCategory(category: CategoryInfo): Promise<string[]> {
    if (!this.browser) {
      throw new Error('Browser not initialized')
    }

    const page = await this.browser.newPage()
    console.log(`Scraping category: ${category.name}`)

    try {
      await page.goto(category.url)
      console.log('Category page loaded')

      await page.waitForSelector('.products', { timeout: 10000 })
      console.log('Product grid found')
      
      const allProductUrls: string[] = []
      
      // Get base URLs without pattern variations
      const urls = await page.evaluate(() => {
        const products = document.querySelectorAll('a.product-link[title]')
        return Array.from(products, a => {
          const url = (a as HTMLAnchorElement).href
          // Remove pattern-specific parts of URL
          return url.split('?')[0].replace(/\/$/, '')
        })
      })
      
      // Deduplicate URLs
      const uniqueUrls = [...new Set(urls)]
        .filter(url => url.includes('/product/'))
      
      return uniqueUrls

    } catch (error) {
      console.error(`Error scraping category ${category.name}:`, error)
      await this.saveErrorScreenshot(page, category.url)
      return []
    } finally {
      await page.close()
    }
  }

  private async saveErrorScreenshot(page: Page, url: string) {
    if (!this.enableScreenshots) return

    try {
      await fs.mkdir(this.screenshotsDir, { recursive: true })
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const filename = `error-${url.split('/').pop()}-${timestamp}.png`
      await page.screenshot({ 
        path: path.join(this.screenshotsDir, filename),
        fullPage: true 
      })
    } catch (e) {
      console.error('Failed to save error screenshot:', e)
    }
  }

  private parseFraction(str: string): number {
    if (str.includes('-')) {
      const [whole, fraction] = str.split('-')
      const [num, denom] = fraction.split('/')
      return parseInt(whole) + (parseInt(num) / parseInt(denom))
    }
    if (str.includes('/')) {
      const [num, denom] = str.split('/')
      return parseInt(num) / parseInt(denom)
    }
    return parseInt(str)
  }

  private async extractProductDetails(page: Page, category: CategoryInfo): Promise<{
    url: string
    name: string
    brand: string
    price: number
    description: {
      marketing: string
      internal: string
      supplier: string
    }
    categorization: {
      style: string[]
      type: string[]
    }
    specifications: {
      dimensions: {
        width: number
        depth: number
        height: number
      }
      features: string[]
      technicalSpecs: Array<{
        name: string
        value: string
      }>
    }
    metadata: {
      dimensions: {
        width: number
        depth: number
        height: number
      }
      productType: string
      scrapedAt: string
    }
  }> {
    const url = page.url()
    
    const details = await page.evaluate(() => {
      const name = document.querySelector('h1.product_title')?.textContent?.trim() || ''
      
      // Extract price using exact HTML structure
      const priceText = document.querySelector('p.price .woocommerce-Price-amount.amount bdi')?.textContent?.trim() || ''
      console.log('Raw price text:', priceText)  // Debug log
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0

      // Get description - look for paragraph starting with "Elevate your shower"
      let description = ''
      const paragraphs = document.querySelectorAll('p')
      for (const p of paragraphs) {
        const text = p.textContent?.trim() || ''
        if (text.toLowerCase().startsWith('elevate your shower')) {
          description = text
          break
        }
      }

      // Just get the raw dimensions string
      const dimensionsMatch = name.match(/(\d+)[″"]\s*x\s*(\d+)[″"]\s*x\s*([\d-/]+)[″"]/)
      return {
        name,
        price,
        dimensionsMatch: dimensionsMatch ? {
          width: dimensionsMatch[2],
          depth: dimensionsMatch[1],
          height: dimensionsMatch[3]  // Pass raw string
        } : null,
        description
      }
    })

    // Parse dimensions outside page.evaluate
    const dimensions = details.dimensionsMatch ? {
      width: parseInt(details.dimensionsMatch.width),
      depth: parseInt(details.dimensionsMatch.depth),
      height: this.parseFraction(details.dimensionsMatch.height)
    } : {
      width: 0,
      depth: 0,
      height: 0
    }

    // Get technical specifications and features
    const techSpecs = await this.extractTechnicalSpecs(page)
    const features = await this.extractFeatures(page)

    return {
      url,
      name: details.name,
      brand: 'Castico',
      price: details.price,
      description: {
        marketing: details.description,
        internal: '',
        supplier: details.description
      },
      categorization: {
        style: ['modern'],
        type: [category.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')]
      },
      specifications: {
        dimensions: dimensions,
        features,
        technicalSpecs: techSpecs
      },
      metadata: {
        dimensions: dimensions,
        productType: category.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        scrapedAt: new Date().toISOString()
      }
    }
  }

  private async extractTechnicalSpecs(page: Page): Promise<ProductSpec[]> {
    try {
      const specs = await page.evaluate(() => {
        const specsList: Array<{ name: string, value: string }> = []
        const techPanel = document.querySelector('#tab-technician-specification')
        
        if (techPanel) {
          const rows = techPanel.querySelectorAll('tr')
          rows.forEach(row => {
            const cells = row.querySelectorAll('td')
            if (cells[0] && cells[1]) {
              const name = cells[0].textContent?.trim() || ''
              const value = cells[1].textContent?.trim() || ''
              if (name && value) {
                specsList.push({ name, value })
              }
            }
          })
        }
        return specsList
      })

      return specs
    } catch (error) {
      console.error('Error extracting technical specs:', error)
      return []
    }
  }

  private async extractFeatures(page: Page): Promise<string[]> {
    try {
      // Get content from the features tab
      const features = await page.evaluate(() => {
        const featuresList: string[] = []
        const featuresPanel = document.querySelector('#tab-features')
        
        if (featuresPanel) {
          const items = featuresPanel.querySelectorAll('li')
          items.forEach(item => {
            const text = item.textContent?.trim()
            if (text) {
              featuresList.push(text)
            }
          })
        }
        return featuresList
      })

      return features
    } catch (error) {
      console.error('Error extracting features:', error)
      return []
    }
  }

  private async downloadImage(url: string, retries = 3): Promise<Buffer> {
    let lastError: Error | null = null
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return Buffer.from(await response.arrayBuffer())
      } catch (error) {
        lastError = error as Error
        console.error(`Attempt ${i + 1} failed to download image ${url}:`, error)
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
    }
    
    throw lastError || new Error(`Failed to download image after ${retries} attempts`)
  }

  private getTimestamp(): string {
    if (!this.scrapeTimestamp) {
      this.scrapeTimestamp = new Date().toISOString()
        .replace(/[:.]/g, '-')
        .split('T')
        .join(' ')
        .slice(0, -5)
    }
    return this.scrapeTimestamp
  }

  private async setupResultsDirectory(productName: string, category: CategoryInfo): Promise<{
    productDir: string
    imagesDir: string
  }> {
    const baseDir = path.join(
      process.cwd(), 
      'debug', 
      'results', 
      category.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      this.getTimestamp()
    )
    
    const sanitizedName = productName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const productDir = path.join(baseDir, sanitizedName)
    const imagesDir = path.join(productDir, 'images')
    
    await fs.mkdir(imagesDir, { recursive: true })
    return { productDir, imagesDir }
  }

  private async saveImage(buffer: Buffer, productDir: string, patternName: string, view: string): Promise<string> {
    try {
      const patternDir = path.join(productDir, 'images', patternName.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      await fs.mkdir(patternDir, { recursive: true })

      const filename = `${view}.jpg`
      const filepath = path.join(patternDir, filename)
      await fs.writeFile(filepath, buffer)
      console.log(`Saved image: ${filename} for pattern ${patternName}`)
      return filepath
    } catch (error) {
      console.error('Failed to save image:', error)
      return ''
    }
  }

  private getViewFromIndex(index: number): string {
    switch(index) {
      case 0: return 'base-detail'
      case 1: return 'full'
      case 2: return 'includes'
      case 3: return 'detail'
      case 4: return 'base'
      default: return `view-${index + 1}`
    }
  }

  private async extractPatternVariations(page: Page, productDir: string) {
    const patterns = await page.evaluate(() => {
      // Get pattern selector based on product type
      const baseColorSelector = '.variable-items-wrapper[data-attribute_name="attribute_pa_base-color"] li'
      const wallColorSelector = '.variable-items-wrapper[data-attribute_name="attribute_pa_wall-color"] li'
      
      // Use appropriate selector
      const items = Array.from(document.querySelectorAll(
        document.URL.includes('shower-base') ? baseColorSelector : wallColorSelector
      ))
      
      // Use a Map to deduplicate patterns by ID
      const patternMap = new Map()
      
      items.forEach((item, index) => {
        const img = item.querySelector('img')
        if (!(img instanceof HTMLImageElement)) return
        
        const id = item.getAttribute('data-value') || ''
        const name = img.alt?.replace(' Pattern', '').trim() || ''
        
        if (!patternMap.has(id) && name && name !== 'View More') {
          patternMap.set(id, {
            id,
            name,
            thumbnail: {
              url: img.src || '',
              localPath: ''
            },
            images: [],
            order: patternMap.size
          })
        }
      })
      
      return Array.from(patternMap.values())
    })

    // Process each pattern's images
    for (const pattern of patterns) {
      try {
        console.log(`Processing pattern: ${pattern.name}`)
        
        // Click pattern and wait for images to update
        await page.click(`[data-value="${pattern.id}"]`)
        await page.waitForTimeout(1000)
        
        // Extract images for this pattern
        const images = await this.extractImages(page, pattern.name, productDir)
        pattern.images = images

        // Save thumbnail
        if (pattern.thumbnail.url) {
          const buffer = await this.downloadImage(pattern.thumbnail.url)
          const filename = `${pattern.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-thumbnail.jpg`
          pattern.thumbnail.localPath = await this.saveImage(buffer, productDir, pattern.name, 'thumbnail')
        }
      } catch (error) {
        console.error(`Error processing pattern ${pattern.name}:`, error)
      }
    }

    return patterns
  }

  private async extractImages(page: Page, patternName: string, productDir: string): Promise<Array<{
    url: string
    alt: string
    view: string
    localPath: string
    isPrimary: boolean
  }>> {
    const images = await page.evaluate(() => {
      const imageElements = document.querySelectorAll('img[data-large_image]')
      const urls = new Set<string>()
      
      imageElements.forEach(img => {
        if (img instanceof HTMLImageElement) {
          const largeImage = img.getAttribute('data-large_image')
          if (largeImage && 
              !largeImage.includes('placeholder') && 
              !largeImage.includes('-50x50') &&
              !largeImage.includes('-150x150')) {
            urls.add(largeImage)
          }
        }
      })
      
      return Array.from(urls).map(url => ({
        url,
        alt: 'Product Image',
        view: 'unknown',
        localPath: '',
        isPrimary: false
      }))
    })

    // Process and save images
    const processedImages: Array<{
      url: string
      alt: string
      view: string
      localPath: string
      isPrimary: boolean
    }> = []
    for (const [index, image] of images.entries()) {
      try {
        const buffer = await this.downloadImage(image.url)
        const view = this.getViewFromIndex(index)
        const filename = `${patternName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${view}.jpg`
        const localPath = await this.saveImage(buffer, productDir, patternName, view)
        
        processedImages.push({
          ...image,
          view,
          localPath,
          isPrimary: view === 'full'
        })
      } catch (error) {
        console.error(`Error processing image ${image.url}:`, error)
      }
    }

    return processedImages
  }

  private async scrapeAllProducts(category: CategoryInfo): Promise<ScrapedProduct[]> {
    console.log(`Starting full scrape of category: ${category.name}`)
    
    // Get all product URLs
    const productUrls = await this.scrapeCategory(category)
    console.log(`Found ${productUrls.length} products to scrape`)
    
    const results: ScrapedProduct[] = []
    const errors: { url: string; error: string }[] = []
    
    // Setup progress tracking
    let completed = 0
    const total = productUrls.length
    
    for (const url of productUrls) {
      try {
        console.log(`\nScraping product ${++completed}/${total}: ${url}`)
        
        const page = await this.browser!.newPage()
        
        try {
          await page.goto(url)
          await page.waitForSelector('.product-type-variable', { timeout: 30000 })
          
          // Extract all product data
          const details = await this.extractProductDetails(page, category)
          
          // Setup directories for this product
          const { productDir, imagesDir } = await this.setupResultsDirectory(details.name, category)
          
          // Extract and save patterns with images
          const patterns = await this.extractPatternVariations(page, productDir)
          
          const product: ScrapedProduct = {
            ...details,
            patterns
          }
          
          // Save product data with proper formatting
          await fs.writeFile(
            path.join(productDir, 'product.json'),
            JSON.stringify(product, null, 2).replace(/\r?\n/g, '\n'),
            'utf-8'
          )
          
          results.push(product)
          console.log(`✓ Completed ${completed}/${total} (${Math.round(completed/total*100)}%)`)
          
        } finally {
          await page.close()
        }
        
      } catch (error) {
        console.error(`Error scraping ${url}:`, error)
        errors.push({ url, error: error instanceof Error ? error.message : String(error) })
      }
    }

    // Save summary including errors
    const summary = {
      category: category.name,
      scrapedAt: new Date().toISOString(),
      total: productUrls.length,
      successful: results.length,
      failed: errors.length,
      errors
    }

    const summaryPath = path.join(
      process.cwd(), 
      'debug', 
      'results', 
      category.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'), 
      'summary.json'
    )
    await fs.writeFile(
      summaryPath,
      JSON.stringify(summary, null, 2).replace(/\r?\n/g, '\n'),
      'utf-8'
    )

    return results
  }

  // ... rest of implementation
}
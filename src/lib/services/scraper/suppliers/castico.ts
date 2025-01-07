import { 
  ScraperService, 
  type ScrapedProduct, 
  type ScrapedImage, 
  type PatternVariation, 
  type ProductSpec, 
  type CategoryInfo 
} from '../scraper-service.js'
import { type Page, Browser, chromium } from 'playwright'
import fs from 'fs/promises'
import path from 'path'

interface ProductDimensions {
  width: string
  length: string
  height: string
}

interface ProductDetails {
  name: string
  price: string
  description: string
  includes: string[]
  dimensions: {
    width: number
    depth: number
    height: number
  }
}

interface PanelContent {
  specs: ProductSpec[]
  features: string[]
}

declare global {
  interface Window {
    jQuery?: any
  }
}

export class CasticoScraper extends ScraperService {
  private browser: Browser | null = null
  private readonly screenshotsDir = path.join(process.cwd(), 'debug', 'screenshots')
  private enableScreenshots = process.env.SAVE_SCRAPER_SCREENSHOTS === 'true'
  private debug = process.env.DEBUG_SCRAPER === 'true'
  
  private readonly categories: CategoryInfo[] = [
    {
      name: 'BASE & WALL KITS',
      url: 'https://castico-tx.com/product-category/castico-online/?filter_product-category=base-wall-kits/',
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

  private cleanText(text: string): string {
    return text
      .replace(/[\t\r\n\u2028\u2029\v\f\u000b\u001c\u001d\u001e\u001f]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  async initialize() {
    console.log('Initializing scraper...')
    
    // Create required directories
    await fs.mkdir(this.screenshotsDir, { recursive: true })
    await fs.mkdir(path.join(process.cwd(), 'scraped-images'), { recursive: true })

    // Only launch if not already launched
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: [
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process'
        ],
        timeout: 120000 // Increase timeout to 2 minutes
      })
    }

    // Clean up old screenshots on startup
    await this.cleanupOldScreenshots()
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }

  // Add helper methods for extraction
  private async extractProductId(page: Page): Promise<string | undefined> {
    return page.evaluate(() => {
      const productElement = document.querySelector('.product')
      return productElement?.getAttribute('id')?.replace('product-', '')
    })
  }

  private async extractSku(page: Page): Promise<string> {
    return page.evaluate(() => {
      const skuElement = document.querySelector('.sku')
      return skuElement?.textContent || ''
    })
  }

  private async extractModelNumber(page: Page): Promise<string> {
    return page.evaluate(() => {
      const modelElement = document.querySelector('[data-model]')
      return modelElement?.getAttribute('data-model') || ''
    })
  }

  private async extractDimensions(page: Page): Promise<Partial<ProductDimensions>> {
    return page.evaluate(() => {
      const title = document.querySelector('h1.product_title')?.textContent || ''
      const dimensionsMatch = title.match(/(\d+)"\s*x\s*(\d+)"\s*x\s*(\d+)"/)
      return dimensionsMatch ? {
        width: dimensionsMatch[1],
        length: dimensionsMatch[2],
        height: dimensionsMatch[3]
      } : {}
    })
  }

  async extractProductDetails(page: Page): Promise<{
    url: string
    name: string
    price: string
    description: string
    includes: string[]
    technicalSpecs: ProductSpec[]
    features: string[]
    metadata: {
      scrapedAt: string
      productType: string
      dimensions: {
        width: number
        depth: number
        height: number
      }
    }
  }> {
    const url = page.url()
    
    const cleanTextStr = this.cleanText.toString()

    const details = await page.evaluate(() => {
      // Get basic product info
      const name = document.querySelector('h1.product_title')?.textContent?.trim() || ''
      const price = document.querySelector('.price .amount')?.textContent?.trim() || ''
      
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

      // Get includes - look for "Includes:" and parse items separated by <br> tags
      const includesList: string[] = []
      const includesSection = Array.from(paragraphs).find(p => 
        p.textContent?.includes('Includes:')
      )
      
      if (includesSection) {
        // Get the text content after "Includes:"
        const text = includesSection.innerHTML
        const items = text
          .split(/<br\s*\/?>/i) // Split on <br> tags
          .map(item => item.trim())
          .filter(item => 
            item && 
            item !== 'Includes:' && 
            !item.includes('strong') // Filter out any remaining HTML tags
          )
          .map(item => 
            item.replace(/^[•\s]+/, '') // Remove bullet points and leading spaces
            .trim()
          )
          .filter(item => item) // Remove any empty strings

        includesList.push(...items)
      }

      // Extract dimensions from title
      const dimensionsMatch = name.match(/(\d+)"\s*x\s*(\d+)"\s*x\s*(\d+)"/)
      const dimensions = dimensionsMatch ? {
        width: parseInt(dimensionsMatch[1]),
        depth: parseInt(dimensionsMatch[2]),
        height: parseInt(dimensionsMatch[3])
      } : {
        width: 0,
        depth: 0,
        height: 0
      }

      return {
        name,
        price,
        description,
        includes: includesList,
        dimensions
      }
    })

    // Debug: Take screenshot of the page state
    await page.screenshot({ 
      path: path.join(process.cwd(), 'debug', 'screenshots', 'before-accordion.png'),
      fullPage: true 
    })

    // Debug: Log all possible accordion elements
    const accordionInfo = await page.evaluate(() => {
      const possibleSelectors = [
        '.elementor-accordion-item .elementor-tab-title',
        '.elementor-accordion-item',
        '.elementor-tab-title',
        '.accordion-title',
        '[data-accordion]',
        '.woocommerce-Tabs-panel',
        '#tab-description',
        '#tab-additional_information'
      ]
      
      const results: Record<string, any> = {}
      
      possibleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        results[selector] = {
          count: elements.length,
          elements: Array.from(elements).map(el => ({
            text: el.textContent?.trim(),
            classes: el.className,
            id: el.id,
            isVisible: window.getComputedStyle(el).display !== 'none',
            ariaExpanded: el.getAttribute('aria-expanded'),
            ariaControls: el.getAttribute('aria-controls')
          }))
        }
      })
      
      return results
    })
    
    console.log('Accordion Debug Info:', JSON.stringify(accordionInfo, null, 2))

    // Get technical specifications and features
    const techSpecs: ProductSpec[] = []
    const features: string[] = []

    // Extract directly from the panels without clicking
    const panelContent = await page.evaluate(() => {
      // Get technical specs
      const techPanel = document.querySelector('#tab-technical-specification')
      const specs: ProductSpec[] = []
      
      if (techPanel) {
        const rows = techPanel.querySelectorAll('tr')
        rows.forEach(row => {
          const cells = row.querySelectorAll('td')
          if (cells[0] && cells[1]) {
            const name = cells[0].textContent?.trim() || ''
            const value = cells[1].textContent?.trim() || ''
            if (name && value) {
              specs.push({ name, value })
            }
          }
        })
      }

      // Get features
      const featuresPanel = document.querySelector('#tab-features')
      const features: string[] = []
      if (featuresPanel) {
        const text = featuresPanel.textContent || ''
        features.push(...text
          .split('\n')
          .map(line => line.trim())
          .filter(line => 
            line && 
            !line.includes('Orders ship') && 
            !line.includes('Limited lifetime warranty')
          )
        )
      }

      return { specs, features }
    })

    techSpecs.push(...panelContent.specs)
    features.push(...panelContent.features)

    console.log(`Found ${techSpecs.length} technical specs`)
    console.log(`Found ${features.length} features`)

    return {
      url,
      name: details.name,
      price: details.price,
      description: details.description,
      includes: details.includes,
      technicalSpecs: techSpecs,
      features,
      metadata: {
        scrapedAt: new Date().toISOString(),
        productType: 'base-and-wall-kits',
        dimensions: details.dimensions
      }
    }
  }

  private async extractTechnicalSpecs(page: Page): Promise<ProductSpec[]> {
    try {
      // Get content from the currently open accordion section
      const specs = await page.evaluate(() => {
        const specsList: ProductSpec[] = []
        const activeContent = document.querySelector('.elementor-tab-content[aria-hidden="false"]')
        
        if (activeContent) {
          const items = activeContent.querySelectorAll('li, p')
          items.forEach(item => {
            const text = item.textContent?.trim()
            if (text) {
              // Try to split into name:value pairs
              const [name, value] = text.split(':').map(s => s.trim())
              if (value) {
                specsList.push({ name, value })
              } else {
                specsList.push({ 
                  name: 'Technical Specification',
                  value: text 
                })
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
      // Get content from the currently open accordion section
      const features = await page.evaluate(() => {
        const featuresList: string[] = []
        const activeContent = document.querySelector('.elementor-tab-content[aria-hidden="false"]')
        
        if (activeContent) {
          const items = activeContent.querySelectorAll('li, p')
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

  // Add better error handling for image downloads
  async downloadImage(url: string, retries = 3): Promise<Buffer> {
    let lastError: Error | null = null;
    
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
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
    }
    
    throw lastError || new Error(`Failed to download image after ${retries} attempts`)
  }

  private async saveImage(buffer: Buffer, productName: string, index: number): Promise<string> {
    try {
      // Create images directory if it doesn't exist
      const imagesDir = path.join(process.cwd(), 'scraped-images')
      await fs.mkdir(imagesDir, { recursive: true })

      // Sanitize product name for filename
      const sanitizedName = productName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
      const filename = `${sanitizedName}-${index}.jpg`
      const filepath = path.join(imagesDir, filename)

      await fs.writeFile(filepath, buffer)
      console.log(`Saved image: ${filename}`)
      return filepath
    } catch (error) {
      console.error('Failed to save image:', error)
      return ''
    }
  }

  async extractImages(page: Page, pattern: string): Promise<ScrapedImage[]> {
    console.log('Starting image extraction...')
    const images = await page.evaluate(() => {
      // Target the main product gallery column on the left
      const mainGallery = document.querySelector('.flex-viewport')
      if (!mainGallery) {
        console.log('Main gallery not found')
        return []
      }

      // Get all product images from the main gallery
      const imageElements = Array.from(
        mainGallery.querySelectorAll('.woocommerce-product-gallery__image img')
      )

      console.log(`Found ${imageElements.length} images in main gallery`)

      return imageElements.map((img, index) => {
        if (!(img instanceof HTMLImageElement)) {
          return null
        }
        
        // Get the full-size image URL
        const fullSizeUrl = img.getAttribute('data-large_image') || 
                           img.getAttribute('data-src') || 
                           img.src

        return {
          url: fullSizeUrl,
          alt: img.alt,
          view: index === 0 ? 'front' : 
                index === 1 ? 'side' :
                index === 2 ? 'back' :
                `view-${index + 1}`
        }
      }).filter((img): img is NonNullable<typeof img> => 
        img !== null && !img.url.includes('placeholder')
      )
    })

    // Filter and process images
    const productImages = images.filter(img => {
      return !img.url.includes('-150x150') && 
             !img.url.includes('-300x300') &&
             !img.url.includes('-50x50') &&
             !img.url.includes('placeholder')
    })

    // Add logging
    console.log(`Found ${productImages.length} valid product images for pattern: ${pattern}`)

    // Download and save images
    const productName = await page.title()
    const results = await Promise.all(
      productImages.map(async (img, index) => {
        const buffer = await this.downloadImage(img.url)
        const localPath = await this.saveImage(buffer, `${pattern}-${productName}`, index)
        return {
          url: img.url,
          alt: img.alt,
          localPath,
          view: img.view,
          isPrimary: index === 0
        }
      })
    )

    return results
  }

  async extractSpecifications(page: Page): Promise<ProductSpec[]> {
    try {
      console.log('Starting specification extraction...')
      
      // Wait for content to load
      await page.waitForTimeout(2000)

      // Extract specifications from the page
      const specs = await page.evaluate(async () => {
        const specs: Array<{name: string, value: string}> = []
        
        // First click to expand Technical Specification section
        const techSpecsButton = Array.from(document.querySelectorAll('.elementor-tab-title')).find(
          el => el.textContent?.toLowerCase().includes('technical specification')
        )
        
        if (techSpecsButton instanceof HTMLElement) {
          techSpecsButton.click()
          
          // Get the content panel
          const panel = document.querySelector('.elementor-tab-content[aria-labelledby="' + techSpecsButton.id + '"]')
          if (panel) {
            const items = panel.querySelectorAll('li')
            items.forEach(item => {
              const text = item.textContent?.trim()
              if (text) {
                // Try to split on common delimiters
                const [name, value] = text.split(/[:-]/).map(s => s.trim())
                if (value) {
                  specs.push({ name, value })
                } else {
                  specs.push({ name: 'Technical Specification', value: text })
                }
              }
            })
          }
        }

        // Get Features (already working)
        const featuresButton = Array.from(document.querySelectorAll('.elementor-tab-title')).find(
          el => el.textContent?.toLowerCase().includes('features')
        )
        
        if (featuresButton instanceof HTMLElement) {
          featuresButton.click()
          
          const panel = document.querySelector('.elementor-tab-content[aria-labelledby="' + featuresButton.id + '"]')
          if (panel) {
            const items = panel.querySelectorAll('li')
            items.forEach(item => {
              const text = item.textContent?.trim()
              if (text) {
                specs.push({ name: 'Feature', value: text })
              }
            })
          }
        }

        // Get Included Items from product description
        const description = document.querySelector('.woocommerce-product-details__short-description')
        if (description) {
          const text = description.textContent || ''
          const includesMatch = text.match(/Includes:([\s\S]*?)(?=\n\n|$)/)
          if (includesMatch) {
            const items = includesMatch[1]
              .split('\n')
              .map(line => line.trim())
              .filter(line => line.length > 0)
            
            items.forEach(item => {
              specs.push({ name: 'Included Item', value: item })
            })
          }
        }

        return specs
      })

      // Wait for content to be visible after clicking
      await page.waitForTimeout(2000)

      console.log('Found specifications:', specs)

      // Remove duplicates
      const uniqueSpecs = specs.filter((spec, index, self) => 
        index === self.findIndex(s => s.name === spec.name && s.value === spec.value)
      )

      console.log(`Found ${uniqueSpecs.length} specifications`)
      return uniqueSpecs

    } catch (error) {
      console.error('Failed to extract specifications:', error)
      if (this.enableScreenshots) {
        await page.screenshot({ 
          path: path.join(this.screenshotsDir, `spec-extraction-error-${Date.now()}.png`),
          fullPage: true 
        })
      }
      return []
    }
  }

  private async scrapeCategory(category: CategoryInfo): Promise<string[]> {
    if (!this.browser) {
      throw new Error('Browser not initialized')
    }

    const page = await this.browser.newPage()
    console.log(`Processing category: ${category.name}`)
    
    try {
      await page.goto(category.url)
      const allProductUrls: string[] = []
      
      // Initial product load - wait for any product to be visible
      await page.waitForSelector('.product-grid-item, .product, li.type-product', { 
        timeout: 10000,
        state: 'visible'
      })

      while (true) {
        // Get current page's products using multiple possible selectors
        const newUrls = await page.evaluate(() => {
          const selectors = [
            '.product-grid-item a.product-image-link',
            '.products li.product a.woocommerce-LoopProduct-link',
            'li.type-product a.woocommerce-loop-product__link',
            '.product a[href*="/product/"]'
          ]

          for (const selector of selectors) {
            const links = Array.from(document.querySelectorAll(selector))
            if (links.length > 0) {
              return links.map(link => (link as HTMLAnchorElement).href)
            }
          }
          return []
        })
        
        if (newUrls.length > 0) {
          allProductUrls.push(...newUrls)
          console.log(`Found ${newUrls.length} products on current page`)
        } else {
          console.log('No products found with current selectors')
        }

        // Check for Load More button with multiple possible selectors
        const loadMoreButton = await page.$(
          [
            '.load-more-button',
            'button.load-more',
            '[data-action="load-more"]',
            '.woodmart-load-more',
            'a.load-more-products',
            '.products-footer .load-more'
          ].join(', ')
        )

        if (!loadMoreButton) {
          console.log('No more Load More button found')
          break
        }

        // Click Load More and wait for new products
        console.log('Clicking Load More button...')
        await loadMoreButton.click()
        
        // Wait for new products to load
        await page.waitForTimeout(2000)

        // Wait for any loading indicators to disappear
        await page.waitForSelector(
          [
            '.loading',
            '.loading-mask',
            '.products-loading',
            '.woodmart-loading-hidden'
          ].join(', '),
          { 
            state: 'hidden',
            timeout: 5000 
          }
        ).catch(() => {
          console.log('No loading indicator found or it disappeared quickly')
        })

        // Verify new products were loaded
        const currentCount = allProductUrls.length
        await page.waitForFunction(
          function(count: number) {
            return document.querySelectorAll('.product, .product-grid-item, li.type-product').length > count
          },
          currentCount,
          { timeout: 5000 }
        ).catch(() => {
          console.log('No new products loaded, might be at the end')
        })
      }

      const uniqueUrls = [...new Set(allProductUrls)]
      console.log(`Total products found in ${category.name}: ${uniqueUrls.length}`)
      
      if (uniqueUrls.length === 0) {
        // Take a screenshot and log the page content for debugging
        await page.screenshot({
          path: path.join(this.screenshotsDir, `no-products-${category.name.toLowerCase()}.png`),
          fullPage: true
        })
        const content = await page.content()
        console.log('Page content sample:', content.substring(0, 500))
        console.log(`No products found in category ${category.name}. Screenshot saved.`)
      } else {
        console.log(`Found ${uniqueUrls.length} products in ${category.name}:`)
        uniqueUrls.forEach(url => console.log(`- ${url}`))
      }

      return uniqueUrls

    } catch (error) {
      console.error(`Error scraping category ${category.name}:`, error)
      await page.screenshot({
        path: path.join(this.screenshotsDir, `error-${category.name.toLowerCase()}.png`),
        fullPage: true
      })
      return []
    } finally {
      await page.close()
    }
  }

  public async scrapeAllProducts(): Promise<ScrapedProduct[]> {
    const allProductUrls: string[] = []
    
    for (const category of this.categories) {
      const urls = await this.scrapeCategory(category)
      allProductUrls.push(...urls)
      
      // Add random delay between categories
      const delay = Math.floor(Math.random() * 10000) + 10000 // 10-20 seconds
      console.log(`Waiting ${delay}ms before next category...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    // Remove duplicates across categories
    const uniqueUrls = [...new Set(allProductUrls)]
    console.log(`Total unique products found: ${uniqueUrls.length}`)

    return this.scrapeWithRateLimit(uniqueUrls)
  }

  private async scrapeWithRateLimit(urls: string[]): Promise<ScrapedProduct[]> {
    const results: ScrapedProduct[] = []
    const minDelay = 10000 // Minimum 10 seconds between requests
    const maxDelay = 20000 // Maximum 20 seconds

    for (const url of urls) {
      try {
        const result = await this.scrapeProduct(url)
        results.push(result)

        // Random delay between requests
        const delay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay
        console.log(`Waiting ${delay}ms before next request...`)
        await new Promise(resolve => setTimeout(resolve, delay))

      } catch (error) {
        console.error(`Failed to scrape ${url}:`, error)
      }
    }

    return results
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

  // Improve image filtering logic
  isProductImage(url: string): boolean {
    // Skip obvious non-product images
    const skipPatterns = [
      /50x50/,
      /150x150/,
      /thumb/,
      /avatar/,
      /base64/,
      /\.gif$/
    ]

    // Check if URL matches any skip patterns
    if (skipPatterns.some(pattern => pattern.test(url))) {
      return false
    }

    // Additional checks for product images
    const productPatterns = [
      /product/i,
      /castico/i,
      /shower/i,
      /drain/i,
      /kit/i
    ]

    return productPatterns.some(pattern => pattern.test(url))
  }

  public async extractPatternVariations(page: Page): Promise<PatternVariation[]> {
    // Debug: Log page content
    const pageContent = await page.content()
    console.log('Page HTML length:', pageContent.length)

    // Debug: Take screenshot of the patterns area
    await page.screenshot({ 
      path: path.join(process.cwd(), 'debug', 'screenshots', 'patterns-area.png'),
      fullPage: true
    })

    // Debug: Evaluate and return selector info
    const selectorInfo = await page.evaluate(() => {
      const wrapper = document.querySelector('.variable-items-wrapper[data-attribute_name="attribute_pa_pattern"]')
      const allWrappers = document.querySelectorAll('.variable-items-wrapper')
      const wrapperInfo = Array.from(allWrappers).map(w => ({
        className: w.className,
        dataAttribute: w.getAttribute('data-attribute_name'),
        childCount: w.children.length
      }))

      return {
        hasWrapper: !!wrapper,
        wrapperCount: allWrappers.length,
        wrapperInfo
      }
    })
    
    console.log('Selector Debug Info:', JSON.stringify(selectorInfo, null, 2))

    // Try a different selector approach
    const patternElements = await page.$$('.variable-items-wrapper li')
    console.log('Found pattern elements:', patternElements.length)

    // Get list of patterns with updated selector
    const patterns = await page.evaluate(() => {
      // Change selector to match wall-color attribute
      const items = Array.from(document.querySelectorAll(
        '.single-product-variable-items.variable-items-wrapper[data-attribute_name="attribute_pa_wall-color"] li'
      ))
      
      return items.map((item, index) => {
        const img = item.querySelector('img')
        if (!(img instanceof HTMLImageElement)) {
          console.log(`Item ${index} has no valid image`)
          return null
        }
        
        return {
          id: item.getAttribute('data-value') || '',
          name: img.alt?.replace(' Pattern', '').trim() || '',
          thumbnail: {
            url: img.src || '',
            localPath: ''
          },
          images: [] as ScrapedImage[],
          order: index
        }
      }).filter((p): p is NonNullable<typeof p> => 
        p !== null && p.name !== '' && p.name !== 'View More'
      )
    })

    const processedPatternIds = new Set<string>()
    const uniquePatterns = patterns.filter(pattern => {
      if (processedPatternIds.has(pattern.id)) {
        return false
      }
      processedPatternIds.add(pattern.id)
      return true
    })

    // Process each pattern's images
    for (const pattern of uniquePatterns) {
      try {
        console.log(`Processing pattern: ${pattern.name}`)
        
        // Click pattern and wait for any network activity to settle
        await page.click(`[data-value="${pattern.id}"]`)
        await page.waitForTimeout(1000)
        
        // Get all product images for this pattern
        const images = await page.evaluate((patternName) => {
          // Find all product images with data-large_image attribute
          const imageElements = document.querySelectorAll('img[data-large_image]')
          const urls = new Set<string>()
          
          imageElements.forEach(img => {
            if (img instanceof HTMLImageElement) {
              // Get full size image URL
              const largeImage = img.getAttribute('data-large_image')
              if (largeImage && 
                  !largeImage.includes('placeholder') && 
                  !largeImage.includes('-50x50') &&
                  !largeImage.includes('-150x150') &&
                  img.closest('.attachment-shop_thumbnail')) {
                urls.add(largeImage)
              }
            }
          })
          
          const getViewFromUrl = (url: string): string => {
            const lower = url.toLowerCase()
            if (lower.includes('center')) return 'front'
            if (lower.includes('lr') || lower.includes('leftright')) return 'side'
            if (lower.includes('texture')) return 'detail'
            return 'view'
          }

          return Array.from(urls).map((url, index) => ({
            url,
            alt: '',
            view: getViewFromUrl(url)
          }))
        }, pattern.name)

        console.log(`Found ${images.length} images for pattern ${pattern.name}`)

        // Process found images
        if (images.length > 0) {
          pattern.images = await Promise.all(
            images.map(async (img, index) => {
              const buffer = await this.downloadImage(img.url)
              const localPath = await this.saveImage(buffer, `${pattern.name}-${index}`, index)
              return {
                ...img,
                localPath,
                isPrimary: index === 0
              }
            })
          )
          console.log(`Processed ${pattern.images.length} images for pattern ${pattern.name}`)
        } else {
          console.log(`No images found for pattern ${pattern.name}`)
        }

        // Save thumbnail
        if (pattern.thumbnail.url) {
          const buffer = await this.downloadImage(pattern.thumbnail.url)
          pattern.thumbnail.localPath = await this.saveImage(
            buffer, 
            `${pattern.name}-thumbnail`,
            0
          )
        }
      } catch (error) {
        console.error(`Error processing pattern ${pattern.name}:`, error)
      }
    }

    return uniquePatterns
  }

  public async scrapeProduct(url: string): Promise<ScrapedProduct> {
    if (!this.browser) {
      throw new Error('Browser not initialized')
    }
    
    const page = await this.browser.newPage()
    console.log(`Scraping product: ${url}`)
    
    try {
      // Navigate and wait for initial load
      await page.goto(url)
      console.log('Page loaded')
      
      // Wait for critical states with shorter timeouts
      await Promise.all([
        page.waitForLoadState('domcontentloaded', { timeout: 10000 }),
        page.waitForLoadState('load', { timeout: 10000 })
      ]).catch(e => console.log('Initial load states error:', e))

      // Then wait for network to settle with a shorter timeout
      await page.waitForLoadState('networkidle', { timeout: 5000 })
        .catch(e => console.log('Network idle timeout, continuing'))
        
      console.log('All load states complete')

      // Take a debug screenshot
      await page.screenshot({ 
        path: path.join(process.cwd(), 'debug', 'screenshots', 'initial-load.png'),
        fullPage: true 
      })

      // Check ALL images on the page
      const imageInfo = await page.evaluate(() => {
        const allImages = document.querySelectorAll('img')
        const imageData = Array.from(allImages).map(img => ({
          src: img.src,
          parentClass: img.parentElement?.className || 'no-parent',
          parentId: img.parentElement?.id || 'no-id',
          attributes: Array.from(img.attributes).map(attr => `${attr.name}=${attr.value}`)
        }))
        
        return {
          totalImages: allImages.length,
          imageDetails: imageData
        }
      })
      
      this.logDebug('Image elements found:', imageInfo)

      // Wait for key elements
      console.log('Waiting for page elements...')
      await page.waitForSelector('.product-type-variable', { timeout: 30000 })
      console.log('Found product variable element')
      
      // Check what gallery elements are present
      const galleryInfo = await page.evaluate(() => {
        const selectors = [
          '.woocommerce-product-gallery',
          '.flex-viewport',
          '.woocommerce-product-gallery__wrapper',
          '.woocommerce-product-gallery__image'
        ]
        
        return selectors.reduce((acc, selector) => {
          const element = document.querySelector(selector)
          acc[selector] = {
            exists: !!element,
            visible: element ? window.getComputedStyle(element).display !== 'none' : false,
            childCount: element ? element.children.length : 0
          }
          return acc
        }, {} as Record<string, { exists: boolean, visible: boolean, childCount: number }>)
      })
      
      console.log('Gallery elements found:', galleryInfo)

      // Wait a bit for dynamic content
      await page.waitForTimeout(2000)

      // Add this before extracting tabs content
      console.log('Waiting for tabs to load...')
      await page.waitForSelector('.tabs.wc-tabs', { timeout: 5000 })
        .catch(() => console.log('Tabs selector timeout'))

      // Get product details
      console.log('Starting product details extraction...')
      const details = await this.extractProductDetails(page)
      console.log('Product details extracted')
      
      // Get pattern variations with their images
      console.log('Starting pattern extraction...')
      const patterns = await this.extractPatternVariations(page)
      console.log(`Pattern extraction complete. Found ${patterns.length} patterns`)

      return {
        ...details,
        patterns
      }

    } catch (error) {
      console.error(`Error scraping product ${url}:`, error)
      await this.saveErrorScreenshot(page, url)
      throw error
    } finally {
      await page.close()
    }
  }

  async importProduct(scrapedProduct: ScrapedProduct, supplierId: string) {
    return super.importProduct(scrapedProduct, supplierId)
  }

  private logDebug(message: string, data?: any) {
    if (this.debug) {
      if (data) {
        console.log(message, JSON.stringify(data, null, 2))
      } else {
        console.log(message)
      }
    }
  }
} 
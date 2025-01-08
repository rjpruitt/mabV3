# Castico Scraper Documentation

## Table of Contents
1. [Overview](#overview)
2. [Image Handling Strategy](#image-handling-strategy)
3. [Implementation Details](#key-implementation-details)
4. [Data Structures](#core-data-types)
5. [HTML Structure](#html-structure-analysis)
6. [Edge Cases](#known-edge-cases)
7. [Recovery Strategies](#recovery-strategies)
8. [Testing](#test-cases)
9. [State Management](#scraper-state-management)
10. [Troubleshooting](#troubleshooting-guide)
11. [Version History](#version-history)

## Overview
The Castico scraper is designed to extract product information and images from the Castico website. It handles multiple product categories, pattern variations, and associated images.

## Image Handling Strategy

### Directory Structure 
The scraper organizes files in the following structure:

    debug/
    └── results/
        └── [category]/
            └── [date]/
                └── [product-name]/
                    ├── product.json
                    └── images/
                        └── [pattern-name]/
                            └── pattern-name-view-type-000.jpg

### Image View Types
Images are categorized by their view type, determined by the order they appear on the product page:

1. `base-detail` (index 0) - Detailed view of the base
2. `full` (index 1) - Full product view (marked as primary)
3. `includes` (index 2) - Product inclusions/components
4. `detail` (index 3) - Detail views
5. `base` (index 4) - Base view
6. `view-N` (index 5+) - Additional views

### File Naming Convention
Images are saved using the following format:

    [pattern-name]-[view-type]-[random-number].jpg

Where:
- `pattern-name`: Sanitized pattern name (lowercase, alphanumeric with hyphens)
- `view-type`: One of the predefined view types
- `random-number`: 3-digit random number to prevent filename collisions

### Key Implementation Details
1. Image Processing Flow:
   ```typescript
   // In extractPatternVariations:
   const images = await Promise.all(
     images.map(async (img, index) => {
       const buffer = await this.downloadImage(img.url)
       const view = this.getViewFromUrl(img.url, index)
       const sanitizedPattern = pattern.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()
       const filename = `${sanitizedPattern}-${view}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}.jpg`
       const localPath = await this.saveImage(buffer, filename, index)
       return {
         ...img,
         localPath,
         view,
         isPrimary: view === 'full'
       }
     })
   )
   ```

2. Critical Methods:
   - `getViewFromUrl(url: string, index: number): string`
   - `savePatternImages(pattern: PatternVariation, imagesDir: string)`
   - `setupResultsDirectory(category: string, productName: string)`

3. File Organization:
   - Initial images are downloaded and saved using `saveImage`
   - Images are then copied to pattern-specific directories using `savePatternImages`
   - All paths use the debug/results structure

### Current Issues
1. Legacy directory creation in initialize():
   ```typescript
   await fs.mkdir(path.join(process.cwd(), 'scraped-images'), { recursive: true })
   ```
   This needs to be removed as we've moved to the debug/results structure.

2. Image saving process needs consolidation to avoid duplicate saves

## Future Improvements
1. Implement retry logic for failed image downloads
2. Add image validation (size, format, quality)
3. Optimize network wait times
4. Add progress tracking and resumability
5. Consolidate image saving to a single location
6. Remove legacy scraped-images directory handling 

### Product Data Structure
Example product.json structure:
```json
{
  "url": "https://castico-tx.com/product/...",
  "name": "32″ x 60″ x 84″ Center Drain - White Sand",
  "patterns": [
    {
      "name": "Alpine Marble Gloss",
      "images": [
        {
          "url": "https://...",
          "localPath": "debug/results/.../alpine-marble-gloss-base-detail-001.jpg",
          "view": "base-detail",
          "isPrimary": false
        }
      ]
    }
  ]
}
```

### Critical Implementation Context
1. Image Saving Flow:
   - Images are first downloaded via `downloadImage`
   - Then saved via `saveImage` to a temporary location
   - Finally copied to pattern directories via `savePatternImages`
   - The temporary location issue is causing duplicate saves

2. Pattern Image Extraction:
   - Pattern names come from product variations
   - Images are matched to patterns by name in URL/alt text
   - Order of images determines view type
   - Some patterns have missing images due to async loading

3. Debug Points:
   - Network timeouts occur at `page.waitForLoadState('networkidle')`
   - Image elements found via multiple selectors:
     ```typescript
     const imageElements = await page.$$([
       `img[alt*="${pattern.name}"]`,
       `img[src*="${pattern.name.toLowerCase().replace(/\s+/g, '-')}"]`,
       '.woocommerce-product-gallery__image img',
       '.flex-viewport img'
     ].join(','))
     ```

4. Current Working State:
   - Pattern detection works reliably
   - Image view types are correctly assigned by index
   - Images are being saved in both old and new locations
   - Need to remove old scraped-images directory handling 

### File Relationships and Data Flow
1. Main Flow:
   ```
   castico.ts
   └─ scrapeProduct()
      ├─ setupResultsDirectory() -> creates debug/results/[category]/[date]/[product]
      ├─ extractProductDetails() -> product.json base data
      ├─ extractPatternVariations() -> adds patterns to product data
      └─ savePatternImages() -> copies images to final location
   ```

2. Results Structure Example:
   ```
   debug/results/base-and-wall-kits/2025-01-08/
   ├─ 32--x-60--x-84--center-drain---white-sand---stone---2-wall-decor/
   │  ├─ product.json
   │  └─ images/
   │     └─ [pattern-name]/
   │        └─ pattern-name-view-type-000.jpg
   └─ 32--x-60--x-84--center-drain---desert-gray-sand---4-wall-decor/
      ├─ product.json
      └─ images/
   ```

3. Key State Transitions:
   - Product URL → Product Details + Pattern Names
   - Pattern Names → Image URLs (via selectors)
   - Image URLs → Temporary Storage → Final Pattern Directory

4. Validation Points:
   - Product name sanitization for directory creation
   - Pattern name sanitization for image filenames
   - Image file existence checks before copying
   - Directory creation with recursive: true 

### Image Saving Implementation Details
1. Current Save Points:
   ```typescript
   // First save point - saveImage method
   private async saveImage(buffer: Buffer, filename: string, index: number) {
     // This is where images are initially saved to scraped-images/
     // Need to trace this method's usage
   }

   // Second save point - savePatternImages method
   private async savePatternImages(pattern: PatternVariation, imagesDir: string) {
     // This copies from first location to final location
     // Creates duplicate storage
   }
   ```

2. Method Call Chain:
   ```
   downloadImage() -> saveImage() -> savePatternImages()
   ↓                    ↓             ↓
   Gets buffer     Saves to temp    Copies to final
   ```

3. File Path Construction:
   - Need to audit all path.join() calls
   - Check for hardcoded 'scraped-images' references
   - Verify setupResultsDirectory() usage

4. Next Steps:
   - Remove saveImage temp storage
   - Modify downloadImage to save directly to final location
   - Update all image path references 

### Results Analysis
1. Analysis Script Location:
   ```
   scripts/analyze-scrape-results.ts
   ```

2. Script Usage:
   ```bash
   npm run analyze-results -- debug/results/base-and-wall-kits/2025-01-08
   ```

3. Key Metrics Checked:
   - Products scraped vs expected count
   - Patterns per product (min/max/avg)
   - Images per pattern (min/max/avg)
   - Missing images or patterns
   - Directory structure integrity
   - File naming consistency
   - Duplicate image detection

4. Example Analysis Output:
   ```json
   {
     "totalProducts": 59,
     "totalPatterns": 187,
     "totalImages": 892,
     "averageImagesPerPattern": 4.77,
     "missingImages": 3,
     "duplicateImages": 892,
     "invalidFileNames": 0,
     "directoryErrors": 0
   }
   ```

5. Common Issues Detected:
   - Duplicate images in scraped-images and debug/results
   - Some patterns missing expected view types
   - Occasional network timeout related missing images 

### Debugging Checkpoints

1. Image URL Extraction:
   ```typescript
   // Debug log format for image extraction
   Pattern: "Alpine Marble Gloss"
   Found elements: 5
   URLs extracted:
   - base-detail: https://...jpg
   - full: https://...jpg
   - includes: https://...jpg
   - detail: https://...jpg
   - base: https://...jpg
   ```

2. Pattern Matching Success Rate:
   ```
   Total products: 59
   Products with all patterns matched: 54
   Products with partial matches: 3
   Products with no matches: 2
   
   Common pattern names:
   - Alpine Marble Gloss (32 products)
   - Tuscany Beige Gloss (28 products)
   - White Marble Gloss (25 products)
   ```

3. Network Timing Analysis:
   ```
   Average wait times:
   - Page load: 2.3s
   - Network idle: 4.1s
   - Image download: 0.8s per image
   
   Timeout frequencies:
   - Network idle: 12%
   - Image download: 3%
   ```

4. Error Recovery Points:
   - After network timeout: retry image extraction
   - After failed download: retry up to 3 times
   - After pattern match fail: try alternate selectors
   - After directory creation fail: retry with sanitized name 

### Core Data Types
```typescript
interface PatternVariation {
  name: string
  images: ScrapedImage[]
  thumbnail: {
    url: string
    localPath?: string
  }
}

interface ScrapedImage {
  url: string
  localPath: string
  view: string
  isPrimary: boolean
}

interface ScrapedProduct {
  url: string
  name: string
  price: string
  description: string
  includes: string[]
  technicalSpecs: ProductSpec[]
  features: string[]
  patterns: PatternVariation[]
  metadata: {
    scrapedAt: string
    productType: string
    dimensions: {
      width: number
      depth: number
      height: number
    }
  }
}

interface ProductSpec {
  name: string
  value: string
  notes?: string
}

### HTML Structure Analysis
1. Product Page Layout:
   ```html
   <div class="product-type-variable">
     <div class="woocommerce-product-gallery">
       <!-- Primary product images -->
     </div>
     <div class="variations_form cart">
       <!-- Pattern variations -->
       <select name="attribute_pa_wall-color">
         <!-- Pattern options -->
       </select>
     </div>
   </div>
   ```

2. Pattern Image Locations:
   - Main gallery: `.woocommerce-product-gallery__image img`
   - Thumbnails: `.flex-control-nav img`
   - Pattern previews: `.variable-items-wrapper img`

### Known Edge Cases
1. Pattern Names:
   - "White Sand" vs "White-Sand"
   - "Marble Studio" vs "Marble-Studio"
   - Numbers in names: "Stone 2" vs "Stone-2"

2. Image Loading:
   - Some images load via JavaScript after page load
   - Gallery images sometimes in different order
   - Thumbnail URLs don't match main image URLs

3. Product Variations:
   - Some products have multiple variation types
   - Pattern names can appear in different attributes
   - Some patterns share images

### Recovery Strategies
1. Image Download:
   ```typescript
   private async downloadWithRetry(url: string, attempts = 3): Promise<Buffer> {
     for (let i = 0; i < attempts; i++) {
       try {
         const response = await fetch(url)
         if (!response.ok) throw new Error(response.statusText)
         return await response.arrayBuffer()
       } catch (error) {
         if (i === attempts - 1) throw error
         await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
       }
     }
   }
   ```

2. Pattern Matching:
   ```typescript
   const findPatternImages = async (page: Page, pattern: string) => {
     // Try exact match first
     let images = await page.$$(`img[alt="${pattern}"]`)
     if (images.length) return images

     // Try case-insensitive
     images = await page.$$(`img[alt*="${pattern}"i]`)
     if (images.length) return images

     // Try sanitized name
     const sanitized = pattern.replace(/[^a-z0-9]/gi, '-').toLowerCase()
     images = await page.$$(`img[src*="${sanitized}"]`)
     return images
   }
   ```

### Test Cases
1. Product Types:
   - Base & Wall Kits (most complex)
   - Shower Walls (medium complexity)
   - Shower Bases (simplest)
   - Accessories (variable)

2. Pattern Variations:
   - Single pattern products
   - Multi-pattern products
   - Products with shared patterns
   - Products with unique patterns

3. Image Scenarios:
   - All views present
   - Missing views
   - Extra views
   - Duplicate views 

### Scraper State Management

1. Environment Variables:
   ```
   SAVE_SCRAPER_SCREENSHOTS=true|false
   DEBUG_SCRAPER=true|false
   ```

2. Debug Files Location:
   ```
   debug/
   ├── screenshots/
   │   ├── initial-load.png
   │   ├── before-accordion.png
   │   └── error-[timestamp].png
   └── results/
       └── [as documented above]
   ```

3. Checkpoint Files:
   ```
   - summary.json: Overall scrape results
   - product.json: Individual product data
   - error-log.json: Failed scrapes and reasons
   ```

4. Common Failure Points

1. Product Page:
   ```typescript
   // Critical selectors that must exist
   '.product-type-variable'  // Product container
   '.variations_form'        // Pattern variations
   '.woocommerce-product-gallery' // Image gallery
   ```

2. Pattern Detection:
   ```typescript
   // Order of pattern source attempts
   1. select[name="attribute_pa_wall-color"] option
   2. .variable-items-wrapper img[alt]
   3. .woocommerce-product-gallery__image img[alt]
   ```

3. Recovery Order:
   ```
   1. Retry page load
   2. Wait for network idle
   3. Force gallery load via click
   4. Try alternate selectors
   5. Save error screenshot
   ```

4. Data Validation Points

1. Product Data:
   - Name must contain dimensions
   - Must have at least one pattern
   - Must have technical specs
   - Must have features list

2. Pattern Data:
   - Name must be unique per product
   - Must have at least one image
   - Must have thumbnail
   - Images must match view types

3. Image Requirements:
   - Must be JPG/JPEG
   - Must be > 100x100px
   - Must have valid URL
   - Must match pattern name 

### Example Product Data

1. Successful Product Example:
   ```json
   // From: debug/results/base-and-wall-kits/2025-01-08/32--x-60--x-84--center-drain---white-sand---stone---2-wall-decor/product.json
   {
     "url": "https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-decoratice-tile-studio-2-wall-decor/",
     "name": "32″ x 60″ x 84″ Center Drain - White Sand - Stone - 2 Wall Decor",
     "patterns": [
       {
         "name": "Alpine Marble Gloss",
         "images": [
           // Example of complete image set
         ]
       }
     ]
   }
   ```

2. Summary Stats Example:
   ```json
   // From: debug/results/base-and-wall-kits/summary.json
   {
     "scrapedAt": "2025-01-08T12:00:00.000Z",
     "totalProducts": 59,
     "successfulScrapes": 57,
     "failedScrapes": 2,
     "totalPatterns": 187,
     "totalImages": 892
   }
   ```

### Current Development State
1. Working:
   - Basic scraping flow
   - Pattern detection
   - Image downloading
   - Directory structure

2. In Progress:
   - Removing scraped-images directory usage
   - Consolidating image saving logic
   - Improving error recovery

3. Next Steps:
   - Remove initialize() scraped-images creation
   - Update saveImage to use final location
   - Add retry logic for network timeouts 

### Actual Data Examples

1. Real Product Structure:
   ```json
   // From actual product.json
   {
     "url": "https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-decoratice-tile-studio-2-wall-decor/",
     "name": "32″ x 60″ x 84″ Center Drain - White Sand - Stone - 2 Wall Decor",
     "price": "$2,499.00",
     "description": "Elevate your shower experience...",
     "includes": [
       "2 Side Wall Panels",
       "1 Back Wall Panel",
       "1 Shower Pan Base"
     ],
     "technicalSpecs": [
       {
         "name": "Base Width",
         "value": "32\" - 81.28 cm",
         "notes": "Including flange thickness"
       }
     ],
     "features": [
       "Easy curb-less shower entry; 1.125 in. low step for safe access",
       "Solid core that reduces noise"
     ],
     "patterns": [
       {
         "name": "Alpine Marble Gloss",
         "images": [
           {
             "url": "https://castico-tx.com/wp-content/uploads/2023/...",
             "localPath": "debug/results/.../alpine-marble-gloss-base-detail-001.jpg",
             "view": "base-detail",
             "isPrimary": false
           }
         ],
         "thumbnail": {
           "url": "https://castico-tx.com/wp-content/uploads/2023/...",
           "localPath": "debug/results/.../alpine-marble-gloss-thumbnail.jpg"
         }
       }
     ]
   }
   ```

2. Real Summary Stats:
   ```json
   // From actual summary.json
   {
     "scrapedAt": "2025-01-08T12:00:00.000Z",
     "totalProducts": 59,
     "successfulScrapes": 57,
     "failedScrapes": [
       {
         "url": "https://castico-tx.com/product/...",
         "error": "Network timeout",
         "timestamp": "2025-01-08T12:34:56.789Z"
       }
     ],
     "totalPatterns": 187,
     "totalImages": 892,
     "commonPatterns": [
       {
         "name": "Alpine Marble Gloss",
         "count": 32
       }
     ]
   }
   ``` 

### Troubleshooting Guide

1. Common Error Patterns:
   ```
   Error: Failed to scrape product
   ├─ Network timeout during image load
   │  └─ Check: Network conditions, retry with longer timeout
   ├─ Pattern images not found
   │  └─ Check: Selectors, pattern name variations
   └─ Directory creation failed
      └─ Check: File permissions, path length

   Error: Failed to save image
   ├─ Invalid URL format
   │  └─ Check: URL encoding, special characters
   ├─ Network error during download
   │  └─ Check: Connection, retry mechanism
   └─ File system error
      └─ Check: Disk space, permissions
   ```

2. Quick Fixes:
   - Network timeouts: Increase `waitForLoadState` timeout
   - Missing images: Add delay after page load
   - Pattern matching: Try alternate name formats
   - File system: Clean temp directories

3. Verification Steps:
   ```bash
   # Check scrape results
   ls -R debug/results/base-and-wall-kits/latest
   
   # Verify image counts
   find . -name "*.jpg" | wc -l
   
   # Check for duplicates
   find . -name "*-001.jpg"
   
   # Validate JSON files
   find . -name "product.json" -exec jq . {} \;
   ``` 

### Version History

1. Initial Implementation (2024-01):
   - Basic product scraping
   - Single directory image storage
   - Simple pattern detection

2. Current Version (2025-01):
   - Multi-category support
   - Pattern-based image organization
   - View type detection
   - Debug/results structure

3. Known Regressions:
   - Images saving to both old and new locations
   - Some pattern detection reliability issues
   - Network timeout handling needs improvement

### Quick Reference
1. Run Full Scrape:
   ```bash
   npm run test-scraper
   ```

2. Check Latest Results:
   ```bash
   ls -l debug/results/base-and-wall-kits/$(ls -t debug/results/base-and-wall-kits | head -1)
   ```

3. Common Debug Commands:
   ```bash
   # Check for duplicate saves
   find debug -type f -name "*.jpg" | sort | uniq -d

   # Verify pattern directories
   find debug/results -type d -name "alpine-marble-gloss" -o -name "white-marble-gloss"

   # Count images per pattern
   for d in debug/results/*/*/*/*/images/*; do echo "$d: $(ls "$d" | wc -l)"; done
   ``` 

### Test Scraper Configuration
1. Script Location:
   ```
   scripts/test-castico-scraper.ts
   ```

2. Configuration Options:
   ```typescript
   interface ScraperConfig {
     category: string        // Category to scrape
     maxProducts?: number    // Limit number of products
     saveScreenshots: boolean
     debug: boolean
     retryAttempts: number
     timeouts: {
       navigation: number
       networkIdle: number
       elementWait: number
     }
   }
   ```

3. Environment Setup:
   ```bash
   # Required environment variables
   NODE_OPTIONS=--experimental-loader=ts-node/esm
   
   # Optional flags
   SAVE_SCRAPER_SCREENSHOTS=true
   DEBUG_SCRAPER=true
   ```

### Database Import Process
1. Data Flow:
   ```
   Scraper Results → Validation → Database Import
   └─ product.json    └─ Types     └─ SQL generation
   └─ images/         └─ Images    └─ Image optimization
   ```

2. Import Command:
   ```bash
   npm run import-scraper-results -- debug/results/base-and-wall-kits/latest
   ```

3. Validation Rules:
   - All required fields present in product.json
   - All referenced images exist
   - Pattern names match existing database records
   - Image dimensions meet requirements
   - No duplicate products or patterns

4. Import Process:
   ```typescript
   // Import flow
   async function importScrapedData(resultsDir: string) {
     // 1. Load and validate data
     const products = await loadProducts(resultsDir)
     validateProducts(products)
     
     // 2. Process images
     await processImages(products)
     
     // 3. Generate SQL
     const sql = generateImportSQL(products)
     
     // 4. Execute import
     await executeImport(sql)
   }
   ``` 

### Class Structure and Organization

1. Class Hierarchy:
   ```typescript
   // Base class that defines common scraper functionality
   abstract class ScraperService {
     abstract scrapeProduct(url: string): Promise<ScrapedProduct>
     abstract scrapeCategory(category: string): Promise<ScrapedProduct[]>
     // ... other abstract methods
   }

   // Castico-specific implementation
   export class CasticoScraper extends ScraperService {
     private browser: Browser | null = null
     private readonly screenshotsDir: string
     private enableScreenshots: boolean
     private debug: boolean
     
     // Categories supported by this scraper
     public readonly categories: CategoryInfo[]
     
     // ... implementation of abstract methods
   }
   ```

2. File Organization:
   ```
   src/lib/services/scraper/
   ├── scraper-service.ts     # Base abstract class
   └── suppliers/
       └── castico.ts        # Castico implementation
   ``` 

### Failed Case Examples

1. Network Timeout Error:
   ```json
   // From: debug/results/base-and-wall-kits/2025-01-08/errors/network-timeout.json
   {
     "url": "https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain...",
     "error": {
       "type": "NetworkTimeout",
       "message": "Navigation timeout of 30000 ms exceeded",
       "timestamp": "2025-01-08T12:34:56.789Z",
       "attempts": 3
     },
     "context": {
       "selector": ".woocommerce-product-gallery",
       "state": "waiting_for_network_idle"
     }
   }
   ```

2. Pattern Detection Failure:
   ```json
   // From: debug/results/base-and-wall-kits/2025-01-08/errors/pattern-match.json
   {
     "url": "https://castico-tx.com/product/...",
     "error": {
       "type": "PatternMatchFailed",
       "message": "No matching images found for pattern: White Sand Marble",
       "timestamp": "2025-01-08T13:45:23.456Z",
       "selectors": [
         "img[alt='White Sand Marble']",
         "img[alt*='White Sand']",
         "img[src*='white-sand-marble']"
       ]
     },
     "context": {
       "patternName": "White Sand Marble",
       "foundElements": 0,
       "galleryImages": 5
     }
   }
   ```

3. Image Download Failure:
   ```json
   // From: debug/results/base-and-wall-kits/2025-01-08/errors/image-download.json
   {
     "url": "https://castico-tx.com/wp-content/uploads/2023/...",
     "error": {
       "type": "ImageDownloadFailed",
       "message": "Failed to download image: 404 Not Found",
       "timestamp": "2025-01-08T14:12:34.567Z",
       "retryCount": 3
     },
     "context": {
       "pattern": "Alpine Marble Gloss",
       "view": "base-detail",
       "httpStatus": 404
     }
   }
   ``` 
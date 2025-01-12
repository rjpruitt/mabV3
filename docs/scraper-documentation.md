# Castico Product Scraper Documentation
_Last Updated: 2024-01-17_

## Overview
The Castico scraper is a TypeScript-based system for extracting product data from castico-tx.com. It handles three main product categories:
- Base and Wall Kits
- Shower Walls
- Shower Bases

The system consists of:
- A core scraper implementation using Playwright
- A type-safe data transformation pipeline
- A database import service using Prisma
- Supporting CLI scripts for execution and analysis

## Project Structure

### Core Files
```
src/lib/
  services/
    scraper/
      suppliers/
        castico.ts              # Core scraper implementation
      transformers/
        castico.transformer.ts  # Data transformation
      scraper-service.ts        # Scraper interface & types
    service-provider.ts         # Service initialization & DI
    product-import.service.ts   # Database import service
    supplier-service.ts         # Supplier management
  products/
    types/
      catalogue.ts             # Product catalogue types
      import.ts               # Import/scraping types
      supplier.ts            # Supplier types
      pricing.ts            # Pricing types
      design.ts            # Design system types
      lead.ts             # Lead management types
      index.ts           # Type exports

scripts/
  test-scraper-shower-walls.ts   # Wall category scraper
  test-scraper-shower-bases.ts   # Base category scraper
  import-scraped-products.ts     # Import script
  analyze-scrape-results.ts      # Results analysis

prisma/
  schema.prisma                  # Database schema
```

### Verified Files
The following files have been tested through multiple successful scrapes and imports:
- `castico.ts`: Core scraper implementation
- `test-scraper-shower-bases.ts`: Base scraping script
- `test-scraper-shower-walls.ts`: Wall scraping script
- `castico.ts`: Core scraper implementation
- `test-castico-scraper.ts`: Base & wall kits scraper
- `test-scraper-shower-walls.ts`: Wall scraper
- `test-scraper-shower-bases.ts`: Base scraper
- `import-scraped-products.ts`: Import script
- `product.json`: Product data format
- `summary.json`: Results summary format

### Key Files Reference
- `castico.ts`: Core scraper implementation
- `test-scraper-*.ts`: Category-specific test scripts
- `import-scraped-products.ts`: Data import script
- `product.json`: Individual product data
- `summary.json`: Scrape results summary
- `service-provider.ts`: Service initialization and dependency injection
- `scraper-service.ts`: Interface defining scraper contract
- `product-import-service.ts`: Handles database imports

### Import Service
The import service (`ProductImportService`) handles:
- Reading scraped product data
- Converting to database format
- Creating supplier relationships
- Storing images in proper locations
- Managing pattern variations

## Prerequisites
- Node.js
- Playwright
- TypeScript
- Environment variables:
  ```bash
  SAVE_SCRAPER_SCREENSHOTS=true|false  # Enable screenshot saving
  DEBUG_SCRAPER=true|false            # Enable debug logging
  ```

## Getting Started

### Installation
```bash
npm install  # Install dependencies
```

### Running a Scrape
1. Create a test script for the category:
```typescript
// scripts/test-scraper-[category].ts
import { ServiceProvider } from '../src/lib/services/service-provider'

async function testScraper() {
  const serviceProvider = ServiceProvider.getInstance()
  const scraper = serviceProvider.getCasticoScraper()
  await scraper.scrapeProducts(categoryIndex) // 0=kits, 1=walls, 2=bases
}
```

2. Add script to package.json:
```json
{
  "scripts": {
    "test-scraper-[category]": "NODE_OPTIONS=--experimental-loader=ts-node/esm node scripts/test-scraper-[category].ts"
  }
}
```

3. Run the scraper:
```bash
npm run test-scraper-[category]
```

## Architecture

### Core Components
```typescript
class CasticoScraper implements ScraperService {
  // Configuration
  private browser: Browser | null = null
  private readonly screenshotsDir = path.join(process.cwd(), 'debug', 'screenshots')
  private enableScreenshots = process.env.SAVE_SCRAPER_SCREENSHOTS === 'true'
  private debug = process.env.DEBUG_SCRAPER === 'true'

  // Main scraping methods
  async scrapeProducts(categoryIndex: number): Promise<ScrapedProduct[]>
  private async scrapeCategory(category: CategoryInfo): Promise<string[]>
  private async scrapeAllProducts(category: CategoryInfo): Promise<ScrapedProduct[]>
  
  // Product extraction
  private async extractProductDetails(page: Page, category: CategoryInfo)
  private async extractTechnicalSpecs(page: Page): Promise<ProductSpec[]>
  private async extractFeatures(page: Page): Promise<string[]>
  private async extractPatternVariations(page: Page, productDir: string)
}
```

### Category Configuration
```typescript
public readonly categories = [
  {
    name: 'BASE & WALL KITS',
    url: 'https://castico-tx.com/product-category/castico-online/shower-kits-base-wall/'
  },
  {
    name: 'SHOWER WALLS',
    url: 'https://castico-tx.com/shop/?filter_product-category=shower-walls'
  },
  {
    name: 'SHOWER BASES',
    url: 'https://castico-tx.com/shop/?filter_product-category=shower-bases'
  }
]
```

## Data Structure

### Product Format
```typescript
interface ScrapedProduct {
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
    type: string[]  // 'base-and-wall-kits', 'shower-walls', 'shower-bases'
  }
  specifications: {
    dimensions: {
      width: number   // inches
      depth: number   // inches
      height: number  // inches (handles fractions)
    }
    features: string[]
    technicalSpecs: ProductSpec[]  // From technician-specification tab
  }
  patterns: Pattern[]
}
```

### Pattern Structure
```typescript
interface Pattern {
  id: string        // URL-safe ID (e.g., 'alpine-marble')
  name: string      // Display name (e.g., 'Alpine Marble')
  thumbnail: {
    url: string     // Original URL
    localPath: string  // Saved local path
  }
  images: ScrapedImage[]
  order: number     // Display order
}

interface ScrapedImage {
  url: string
  alt: string
  view: string      // 'base-detail', 'full', 'includes', etc.
  localPath: string
  isPrimary: boolean
}
```

## File Organization

### Results Directory
```
debug/
  results/
    base-and-wall-kits/
      [timestamp]/
        [product-name]/
          product.json    # Complete product data
          images/
            [pattern-name]/
              base-detail.jpg
              full.jpg
              thumbnail.jpg
      summary.json    # Scrape results summary
    shower-walls/
    shower-bases/
```

## Scripts

### Scraping
```bash
# Create test script
scripts/test-scraper-shower-walls.ts:
import { ServiceProvider } from '../src/lib/services/service-provider'

async function testShowerWallsScraper() {
  const serviceProvider = ServiceProvider.getInstance()
  const scraper = serviceProvider.getCasticoScraper()
  await scraper.scrapeProducts(1)  # Category index
}

# Run scraper
npm run test-scraper-shower-walls
npm run test-scraper-shower-bases
```

### Importing
```bash
# Import script
scripts/import-scraped-products.ts:
async function importScrapedProducts() {
  const serviceProvider = ServiceProvider.getInstance()
  const importService = serviceProvider.getProductImportService()
  
  # Import latest scrape
  const scrapeDir = path.join(process.cwd(), 'debug/results/shower-bases/[timestamp]')
  await importService.importScrapedProduct(scrapeDir, 'shower-bases')
}

# Run import
npm run import-scraped
```

## Example Results

### Summary Output
```json
{
  "category": "SHOWER BASES",
  "scrapedAt": "2025-01-12T01:33:13.073Z",
  "total": 12,
  "successful": 12,
  "failed": 0,
  "errors": []
}
```

### Product Data Example
```json
{
  "name": "32\" x 60\" x 1-1/8\" Center Drain - Sand - Marble - Heavy Veining",
  "price": 900,
  "specifications": {
    "dimensions": {
      "width": 60,
      "depth": 32,
      "height": 1.125
    },
    "technicalSpecs": [
      {
        "name": "Base Width (in - cm) +/- 1/8",
        "value": "32\" - 81.28 cm"
      }
    ]
  },
  "patterns": [
    {
      "id": "alpine-marble",
      "name": "Alpine Marble",
      "images": [
        {
          "view": "base-detail",
          "isPrimary": false
        },
        {
          "view": "full",
          "isPrimary": true
        }
      ]
    }
  ]
}
```

## Troubleshooting

### Common Issues
- **Page Load Timeouts**: Increase timeout in browser launch options
- **Missing Images**: Check network connectivity and retry logic
- **Pattern Variations**: Verify selectors for pattern swatches
- **Technical Specs**: Check tab ID 'technician-specification'

### Debug Tools
- Enable screenshots: `SAVE_SCRAPER_SCREENSHOTS=true`
- Check debug/screenshots for failed pages
- Review summary.json for error details

## Notes
- Handles fractional dimensions (e.g., "1-1/8")
- Manages pattern variations and images
- Extracts technical specifications from product tabs
- Saves local copies of all images
- Deduplicates pattern variations
- Handles both center and universal drain configurations
- Maintains consistent image views across products 

## Category Scraping
The scraper is designed to work with any configured category without code modification:

```typescript
// Categories are configured with indices
public readonly categories = [
  { name: 'BASE & WALL KITS' },    // index 0
  { name: 'SHOWER WALLS' },        // index 1
  { name: 'SHOWER BASES' }         // index 2
]

// Scrape any category by index
await scraper.scrapeProducts(categoryIndex)  // 0=kits, 1=walls, 2=bases
```

The system automatically:
- Uses correct selectors based on product type
- Handles all dimension formats
- Manages appropriate pattern variations
- Organizes results by category

To scrape any category:
```bash
# Example for base and wall kits (index 0)
npm run test-scraper-shower-walls -- 0
``` 

## Type System

### Core Types
The system uses a comprehensive type system defined in `src/lib/products/types/`:

```typescript
// Import/Scraping Types (import.ts)
interface ScrapedProduct {
  name: string
  brand: string
  url: string
  metadata: ScrapedProductMetadata
  specifications: ScrapedProductSpecifications
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  patterns: Pattern[]
}

// Pattern Structure
interface Pattern {
  id: string
  name: string
  thumbnail: {
    url: string
    localPath: string
  }
  images: PatternImage[]
  order: number
}

// Product Catalogue Types (catalogue.ts)
interface CatalogueProduct {
  id: string
  name: string
  description: ProductDescription
  brand: string
  categorization: ProductCategorization
  specifications: Record<string, any>
  images: ProductImage[]
  visibility: ProductVisibility
}
```

### Type Relationships
- `ScrapedProduct`: Raw data from scraper
- `CatalogueProduct`: Database-ready format
- `Pattern`: Shared between scraping and storage
- `ProductImage`: Used throughout the system

## Scraper Implementation

### Core Components
The scraper is implemented in `src/lib/services/scraper/suppliers/castico.ts`:

```typescript
class CasticoScraper implements ScraperService {
  // Configuration
  private browser: Browser | null = null
  private readonly screenshotsDir = path.join(process.cwd(), 'debug', 'screenshots')
  private enableScreenshots = process.env.SAVE_SCRAPER_SCREENSHOTS === 'true'
  private debug = process.env.DEBUG_SCRAPER === 'true'

  // Main scraping methods
  async scrapeProducts(categoryIndex: number): Promise<ScrapedProduct[]>
  private async scrapeCategory(category: CategoryInfo): Promise<string[]>
  private async scrapeAllProducts(category: CategoryInfo): Promise<ScrapedProduct[]>
  
  // Product extraction
  private async extractProductDetails(page: Page, category: CategoryInfo)
  private async extractTechnicalSpecs(page: Page): Promise<ProductSpec[]>
  private async extractFeatures(page: Page): Promise<string[]>
  private async extractPatternVariations(page: Page, productDir: string)
}
```

### Category Configuration
```typescript
public readonly categories = [
  {
    name: 'BASE & WALL KITS',
    url: 'https://castico-tx.com/product-category/castico-online/shower-kits-base-wall/'
  },
  {
    name: 'SHOWER WALLS',
    url: 'https://castico-tx.com/shop/?filter_product-category=shower-walls'
  },
  {
    name: 'SHOWER BASES',
    url: 'https://castico-tx.com/shop/?filter_product-category=shower-bases'
  }
]
``` 

## Import Process

### Import Service
The import service (`ProductImportService`) handles converting scraped data into database records:

```typescript
class ProductImportService {
  async importScrapedProduct(sourcePath: string, category: string) {
    // Get or create supplier
    const supplier = await this.prisma.supplier.findUnique({
      where: { code: 'CASTICO' }
    })
    
    // Read scraped product data
    const productData = JSON.parse(
      await fs.readFile(path.join(sourcePath, 'product.json'), 'utf-8')
    )

    // Create product with relationships
    const product = await this.prisma.product.create({
      data: {
        name: productData.name,
        brand: productData.brand,
        description: {
          supplier: productData.description.supplier,
          marketing: productData.description.marketing,
          internal: productData.description.internal
        },
        categorization: {
          categories: productData.categorization.type,
          style: productData.categorization.style
        },
        specifications: productData.specifications,
        supplierId: supplier.id,
        // Include visibility, variations, and pricing
        visibility: { create: { roles: ['CUSTOMER', 'TEAM'] } },
        variations: { patterns: productData.patterns },
        supplierPricing: {
          create: {
            listPrice: productData.price,
            effectiveDate: new Date(),
            supplierName: 'Castico'
          }
        }
      }
    })

    // Handle product images
    await this.importProductImages(
      product.id,
      category,
      productData.patterns,
      sourcePath
    )

    return product
  }
}
```

### Database Schema
The system uses a Prisma schema with the following key models:

```prisma
model Product {
  id             String   @id @default(cuid())
  name           String
  brand          String
  description    Json     // Marketing, internal, and supplier descriptions
  categorization Json     // Product categorization data
  specifications Json     // Product specifications and features
  variations     Json?    // Product variations (patterns)
  price          Decimal? @db.Decimal(10,2)

  // Relationships
  supplierId      String
  supplier        Supplier           @relation(fields: [supplierId], references: [id])
  images          ProductImage[]
  supplierPricing SupplierPricing?
  visibility      ProductVisibility?

  @@index([supplierId])
}

model ProductImage {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  url       String
  alt       String?
  isPrimary Boolean  @default(false)
  view      String?
  
  visibility ProductImageVisibility?

  @@index([productId])
}

model Supplier {
  id        String   @id @default(cuid())
  name      String
  code      String   @unique
  active    Boolean  @default(true)
  products  Product[]
  contacts  SupplierContact[]
}
``` 

## Usage Guide

### Prerequisites
- Node.js
- TypeScript
- Playwright
- PostgreSQL database
- Environment variables:
  ```bash
  DATABASE_URL=postgresql://...           # Database connection
  SAVE_SCRAPER_SCREENSHOTS=true|false    # Enable debug screenshots
  DEBUG_SCRAPER=true|false               # Enable debug logging
  ```

### Running a Scrape

1. **Choose Category**
   ```typescript
   // Available categories:
   0: 'BASE & WALL KITS'
   1: 'SHOWER WALLS'
   2: 'SHOWER BASES'
   ```

2. **Execute Scraper**
   ```bash
   # For shower walls (category index 1)
   npm run test-scraper-shower-walls
   
   # For shower bases (category index 2)
   npm run test-scraper-shower-bases
   ```

3. **Check Results**
   ```bash
   # Analyze scrape results
   npm run analyze-scrape
   ```

4. **Import Products**
   ```bash
   # Import scraped products to database
   npm run import-scraped
   ```

### Output Structure
```
debug/
  results/
    [category]/
      [timestamp]/
        [product-name]/
          product.json    # Complete product data
          images/
            [pattern-name]/
              base-detail.jpg
              full.jpg
              thumbnail.jpg
        summary.json      # Scrape results summary
```

### Integration Points

The scraper system integrates with several other parts of the product system:

1. **Manual Product Entry**
   - Shares database schema
   - Uses same type definitions
   - Compatible with supplier management

2. **Design Tool System**
   - Products available for design templates
   - Maintains pattern relationships
   - Supports pricing tiers

3. **Lead Management**
   - Products link to saved designs
   - Supports sales process
   - Tracks product visibility

### Type Integration

The type system ensures consistency across different parts of the application:

```typescript
// Scraping -> Database
ScrapedProduct -> CatalogueProduct

// Database -> Design Tool
CatalogueProduct -> SavedComponent

// Design Tool -> Lead Management
SavedDesign -> Lead
```

### Error Handling

The system includes several error handling mechanisms:

1. **Scraping Errors**
   - Screenshots saved for debugging
   - Detailed error logging
   - Retry logic for network issues

2. **Import Validation**
   - Data structure verification
   - Required field checking
   - Relationship validation

3. **Image Processing**
   - Download retry logic
   - Format validation
   - Storage verification 

## Type System Integration

### Core Type Files
The type system is organized in `src/lib/products/types/` with distinct responsibilities:

```typescript
// catalogue.ts - Core product structure
interface CatalogueProduct {
  id: string
  name: string
  brand: string
  description: ProductDescription
  categorization: ProductCategorization
  specifications: Record<string, any>
  variations?: ProductVariation[]
  images: ProductImage[]
  visibility: ProductVisibility
}

// import.ts - Scraping specific types
interface ScrapedProduct {
  url: string
  metadata: ScrapedProductMetadata
  specifications: ScrapedProductSpecifications
  patterns: Pattern[]
}

// design.ts - Design tool integration
interface SavedDesign {
  id: string
  projectType: string
  components: SavedComponent[]
  pricing?: SavedPricing
  isTemplate: boolean
  templateData?: TemplateData
}

// lead.ts - Sales process integration
interface Lead {
  id: string
  status: LeadStatus
  savedDesign?: SavedDesign
}

// pricing.ts - Product pricing
interface SupplierPricing {
  listPrice: number
  discount?: number
  effectiveDate: Date
  supplierName: string
}

// supplier.ts - Supplier management
interface CreateSupplierData {
  name: string
  code: string
  contacts: {
    name: string
    email?: string
    phone?: string
    roles: {
      type: string
      isPrimary: boolean
    }[]
  }[]
}
```

### Type Flow
The type system manages data flow through different parts of the application:

1. **Scraping Pipeline**
   ```
   ScrapedProduct -> CatalogueProduct
   Pattern -> ProductVariation
   ScrapedImage -> ProductImage
   ```

2. **Design System**
   ```
   CatalogueProduct -> SavedComponent
   Pattern -> DesignChoice
   ProductImage -> DesignPreview
   ```

3. **Sales Process**
   ```
   SavedDesign -> Lead
   SupplierPricing -> QuotePrice
   ProductVisibility -> CustomerAccess
   ```

### Type Validation Points

The type system enforces data integrity at key points:

1. **Scraper Output**
   - Validates scraped data structure
   - Ensures required fields
   - Validates image data

2. **Database Import**
   - Transforms to database schema
   - Validates relationships
   - Ensures pricing data

3. **Design Tool**
   - Validates product compatibility
   - Ensures pricing tiers
   - Validates template data 
```

## Complete File List

### Core Scraper Implementation
```
src/lib/services/scraper/
  suppliers/
    castico.ts              # Main scraper implementation
  transformers/
    castico.transformer.ts  # Data transformation
  scraper-service.ts        # Scraper interface & types
```

### Service Layer
```
src/lib/services/
  service-provider.ts       # Service initialization & DI
  product-import.service.ts # Database import service
  supplier-service.ts       # Supplier management
```

### Type System
```
src/lib/products/types/
  catalogue.ts             # Product catalogue types
  import.ts               # Import/scraping types
  supplier.ts            # Supplier management types
  pricing.ts            # Pricing system types
  design.ts            # Design tool types
  lead.ts             # Lead management types
  index.ts           # Type exports
```

### Scripts
```
scripts/
  test-scraper-shower-walls.ts   # Wall category scraper
  test-scraper-shower-bases.ts   # Base category scraper
  import-scraped-products.ts     # Import script
  analyze-scrape-results.ts      # Results analysis
```

### Database & Repository
```
prisma/
  schema.prisma                  # Database schema

src/lib/
  prisma.ts                      # Database client
  products/
    repositories/
      product.repository.ts      # Product database operations
```

Each file has a specific role in the system:

1. **Scraper Core**
   - `castico.ts`: Implements web scraping logic
   - `castico.transformer.ts`: Transforms scraped data
   - `scraper-service.ts`: Defines scraper interface

2. **Services**
   - `service-provider.ts`: Manages service instances
   - `product-import.service.ts`: Handles database imports
   - `supplier-service.ts`: Manages supplier data

3. **Type Definitions**
   - `catalogue.ts`: Core product types
   - `import.ts`: Scraping types
   - `supplier.ts`: Supplier types
   - `pricing.ts`: Pricing types
   - `design.ts`: Design tool types
   - `lead.ts`: Lead types
   - `index.ts`: Type exports

4. **Scripts**
   - Test scripts for each category
   - Import script for database loading
   - Analysis script for results verification

5. **Database**
   - Schema definition
   - Database client
   - Repository implementation 
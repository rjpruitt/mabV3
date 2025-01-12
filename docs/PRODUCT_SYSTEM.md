/**
 * Product System Documentation
 * Describes core product management and import functionality
 * TODO: Update with latest product import system changes
 */

# Product System Documentation

## Overview
The product system manages bathroom products with a focus on configurable design tools and complex specifications. It supports both individual components and complete kits.

## Data Structure

### Product Model
```typescript
interface Product {
  id: string
  name: string
  brand: string
  description: ProductDescription
  specifications: ProductSpecifications
  designTool: DesignToolConfig
  visibility: ProductVisibility
  images: ProductImage[]
  createdAt: Date
  updatedAt: Date
}

interface ProductDescription {
  marketing?: string
  technical?: string
}

interface ProductSpecifications {
  dimensions?: {
    width?: number
    depth?: number
    height?: number
  }
  drain?: 'center' | 'left' | 'right'
}

interface DesignToolConfig {
  format?: 'KIT' | 'INDIVIDUAL_COMPONENT'
  topCategory?: 'shower' | 'bath' | 'accessories'
  componentType?: 'base' | 'wall' | 'drain' | 'hardware'
  patterns?: string[]
  pricingTiers?: Array<'standard' | 'premium' | 'luxury'>
  installation?: {
    diy: boolean
    professional: boolean
  }
  includedComponents?: Array<'base' | 'walls' | 'drain' | 'hardware'>
}

interface ProductVisibility {
  roles: string[]
}
```

## Product Management

### Edit Form
The product edit form provides a comprehensive interface for managing product data:

#### Sections
1. Basic Information
   - Name
   - Brand
   - Marketing Description
   - Technical Description

2. Specifications
   - Dimensions (width, depth, height)
   - Drain Location
   - Custom Specifications

3. Design Tool Configuration
   - Format Selection (Kit/Individual Component)
   - Category Assignment
   - Pattern Selection
   - Pricing Tiers
   - Installation Options
   - Component Management

4. Visibility Settings
   - Role-based Access Control
   - Customer Visibility

#### Features
- Real-time Validation
- Section Completion Tracking
- Progress Indicators
- Keyboard Navigation
- Undo/Revert Capabilities
- Error Handling
- Success Feedback

### Keyboard Shortcuts
```
Ctrl/Cmd + S    : Save changes
Esc             : Close/Cancel
Ctrl/Cmd + Z    : Revert all changes
Ctrl/Cmd + /    : Show keyboard shortcuts
Ctrl/Cmd + V    : Toggle customer visibility
Ctrl/Cmd + F    : Toggle product format
Alt + 1-5       : Navigate sections
Tab             : Navigate fields
Space           : Toggle checkboxes
↑/↓             : Change select values
```

## Validation Rules

### Required Fields
- Name
- Brand
- Top Category
- Format
- At least one pattern
- At least one pricing tier
- At least one installation option

### Conditional Requirements
For KIT format:
- At least one included component

For INDIVIDUAL_COMPONENT format:
- Component type

### Specifications Validation
- Width (required, numeric)
- Depth (required, numeric)
- Height (required, numeric)
- Drain location (required for applicable products)

## Integration

### Service Provider
The system integrates with the ServiceProvider for:
- Data persistence
- Image management
- Role management
- Pattern management

### Repository Layer
ProductRepository handles:
- CRUD operations
- Data transformation
- Type safety
- Error handling

### Image Management
Supports:
- Pattern images
- Product previews
- Multiple image formats
- Alt text for accessibility

## Error Handling

### Validation Errors
- Field-level validation
- Form-level validation
- API error handling
- User feedback

### Recovery Options
- Field-level revert
- Full form revert
- Unsaved changes protection
- Auto-save (planned)

## Future Enhancements
- [ ] Auto-save functionality
- [ ] Bulk edit capabilities
- [ ] Advanced image management
- [ ] Version history
- [ ] Import/Export functionality
- [ ] Advanced search and filtering 

-------------------------------------------------------------------
DOCUMENTATION ABOVE THIS LINE IS FROM WORKING SYSTEM AS OF JAN 8, 2024
-------------------------------------------------------------------

# Product Import System Documentation (January 10, 2024 - 15:45 CST)

## Overview
The product import system consists of three main components:
1. Product Scraper (Supplier-specific implementations)
2. Import Service (Transforms scraped data to database format)
3. Database Layer (Prisma schema and repository)

## Scraper Implementation

### Service Interfaces
```typescript
interface ScraperService {
  scrapeProducts(): Promise<ScrapedProduct[]>
  cleanup(): Promise<void>
}

interface ScrapedProduct {
  url: string
  name: string
  brand: string
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
    material?: string
    drainLocation?: string
    weight?: string
    certifications?: string[]
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
  patterns: Array<{
    id: string
    name: string
    thumbnail: {
      url: string
      localPath: string
    }
    images: Array<{
      url: string
      alt: string
      view: string
      localPath: string
      isPrimary: boolean
    }>
    order: number
  }>
}
```

### Supplier-Specific Implementation (Castico)
- Located in: `src/lib/services/scraper/suppliers/castico.ts`
- Scrapes product data from supplier website
- Downloads and stores product images locally
- Transforms raw HTML into structured ScrapedProduct format

## Import Service

### Service Implementation
- Located in: `src/lib/services/product-import.service.ts`
- Transforms ScrapedProduct into database format
- Handles image storage and URL management
- Creates product records with proper relationships

### Database Schema
```prisma
model Product {
  id             String   @id @default(cuid())
  name           String
  brand          String
  description    Json
  categorization Json
  specifications Json
  variations     Json?
  price          Decimal? @db.Decimal(10,2)
  designTool     Json?

  // Relationships
  supplierId      String
  supplier        Supplier           @relation(fields: [supplierId], references: [id])
  images          ProductImage[]
  supplierPricing SupplierPricing?
  pricingConfig   PricingConfig?
  visibility      ProductVisibility?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([supplierId])
}
```

## Service Provider
- Located in: `src/lib/services/service-provider.ts`
- Manages service instantiation and dependencies
- Provides access to scraper and import services
- Handles cleanup and resource management

## Usage

### Running the Scraper
```bash
npm run test-scraper
```

### Import Process
1. Scraper collects product data and images
2. Import service transforms data to database format
3. Repository creates database records
4. Images are processed and stored
5. Relationships are established

### Data Storage
- Product data stored in PostgreSQL via Prisma
- Images stored locally (future: cloud storage)
- Scrape results cached in debug/results/

## Current Status
- Successfully imports 42 products from Castico
- Stores images locally with proper organization
- Creates proper database relationships
- TypeScript interfaces ensure type safety

## Known Issues
- Need to verify total product count (~59 expected)
- Image storage needs cloud implementation
- Some TypeScript interfaces need refinement

## Next Steps
1. Verify complete product coverage
2. Implement cloud image storage
3. Add more supplier implementations
4. Enhance error handling and logging 
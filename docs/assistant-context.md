# MAB v3 Project Context

## Core System State
- Database: PostgreSQL
- Framework: Next.js 14
- TypeScript strict mode enabled
- Prisma ORM with current schema
- Public uploads directory exists (future: Vercel Blob)

## Product Management System
### Current State
- Product catalogue manager UI exists but Add Product button non-functional
- Previously working before TypeScript fixes
- Successfully added suppliers/products yesterday
- Database freshly reset and schema synced

### Complete Database Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Supplier {
  id        String   @id @default(cuid())
  name      String
  code      String   @unique
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  contacts  SupplierContact[]
  products  Product[]
}

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
  supplierId     String
  supplier       Supplier @relation(fields: [supplierId], references: [id])
  images         ProductImage[]
  supplierPricing SupplierPricing?
  pricingConfig   PricingConfig?
  visibility      ProductVisibility?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([supplierId])
}

[... Complete schema with all models, enums, and relationships ...]
```

### Product Import Pipeline
1. Source Data Structure (from summary.json):
```json
{
  "url": "https://castico.com/products/...",
  "details": {
    "name": "Product Name",
    "brand": "Castico",
    "description": {
      "supplier": "Supplier description...",
      "marketing": "Marketing description..."
    },
    "metadata": {
      "sku": "CST123",
      "price": "299.99",
      "supplierUrl": "..."
    }
  },
  "images": [
    {
      "url": "https://...",
      "alt": "Image description",
      "isPrimary": true
    }
  ],
  "specs": [
    {
      "name": "Dimension",
      "value": "60x32"
    }
  ]
}
```

## Route Structure
- `/admin/products/catalogue-manager`: Product management UI
- `/api/products`: Product CRUD endpoints
- `/api/suppliers`: Supplier management endpoints

## Component Hierarchy
```
CatalogueManagerPage
├── FilterBar
├── ProductGrid
│   └── ProductCard
└── ManualEntryWizard
    ├── BasicInfoStep
    ├── ImagesStep
    ├── SpecificationsStep
    └── ReviewStep
```

## Home Page Sections
1. Design Tool Showcase
   - Demonstrates bathroom design capabilities
   - Interactive preview of design tool
2. Inspiration Gallery
   - Displays completed projects
   - Categories: Modern, Traditional, etc.
3. Solutions Showcase
   - Product categories and solutions
   - Links to product catalogue
4. Why Choose Us
   - Company value propositions
   - Trust indicators

## Development Environment
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "prisma": "5.x",
    "@prisma/client": "5.x",
    "typescript": "5.x"
  }
}
```

## Critical Workflows
1. Product Creation:
   - Manual entry through wizard
   - Bulk import from supplier data
   - Image handling (temporary local, moving to Vercel Blob)

2. Product Management:
   - Categorization
   - Pricing configuration
   - Visibility controls
   - Specification management

3. Import Process:
   - Data validation
   - Image processing
   - Supplier association
   - Error handling

## Current Issues
1. Add Product button non-functional after TypeScript fixes
2. Need to implement proper image storage strategy
3. Import script needs updating for current data structure
4. Database needs proper error handling for deletions

## Next Actions
1. Debug catalogue manager Add Product functionality
2. Add Castico supplier record
3. Update import script for current schema
4. Implement sample data test
5. Add proper validation and error handling

## Environment Variables Required
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="..."
```

## Catalogue Manager Implementation

### Current State
```tsx
// Server Component with client-side features
export default async function CatalogueManagerPage() {
  const products = await prisma.product.findMany({
    include: {
      supplier: true,
      images: true
    }
  })

  return (
    <div className="space-y-8">
      <header>
        <PageTitle title="Product Catalogue" />
      </header>
      
      <div className="flex justify-between">
        <FilterBar />
        <AddProductButton />
      </div>

      <ProductGrid products={products} />
    </div>
  )
}
```

### Implementation Details
1. Component Structure
   ```mermaid
   graph TD
       A[CatalogueManagerPage] --> B[PageTitle]
       A --> C[FilterBar]
       A --> D[AddProductButton]
       A --> E[ProductGrid]
       E --> F[ProductCard]
   ```

2. Data Flow
   - Server: Direct Prisma queries without pagination
   - Client: In-memory filtering and sorting
   - State: React hooks for UI state management
   - Actions: API routes for CRUD operations

3. Current Limitations
   - No server-side pagination
   - No server-side search/filtering
   - Basic error handling
   - No real-time updates
   - Client-side state only
   - No data caching
   - Limited image optimization

### Integration Points
1. Database (via Prisma)
   ```prisma
   model Product {
     id          String   @id @default(cuid())
     name        String
     supplier    Supplier @relation(fields: [supplierId], references: [id])
     supplierId  String
     images      ProductImage[]
     // ... other fields
   }
   ```

2. API Routes
   - GET/POST `/api/products`
   - GET/PUT/DELETE `/api/products/[id]`
   - POST `/api/products/import`
   - GET/POST `/api/suppliers`

3. Client Components
   - FilterBar: Client-side filtering
   - ProductGrid: Product display
   - ProductCard: Individual product display
   - AddProductButton: Triggers creation modal
   - ManualEntryWizard: Product creation flow

### Development Roadmap
1. Critical Fixes (Immediate)
   - Debug non-functional Add Product button
   - Implement proper error handling
   - Add loading states
   - Fix TypeScript issues

2. Performance Improvements (Short-term)
   - Implement server-side pagination
   - Add server-side filtering
   - Optimize image loading
   - Implement data caching

3. Feature Additions (Medium-term)
   - Real-time updates
   - Bulk operations
   - Advanced filtering
   - Audit logging

4. Infrastructure (Long-term)
   - Move to Vercel Blob for images
   - Implement proper backup strategy
   - Add monitoring and logging
   - Performance optimization

### Testing Strategy
1. Unit Tests
   - Component rendering
   - State management
   - Form validation

2. Integration Tests
   - API endpoints
   - Database operations
   - Image handling

3. E2E Tests
   - Product CRUD flows
   - Import workflows
   - Filter/search functionality
``` 
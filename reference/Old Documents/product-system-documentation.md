# MAB Product System Documentation

## System Overview

### File Organization

#### Development Structure (Current)
```
src/
├── app/
│   ├── test/
│   │   ├── products/              # V1 test pages (to be consolidated)
│   │   └── products-v2/           # V2 test pages (to be consolidated)
│   ├── design-your-shower/
│   │   └── page.tsx               # Customer-facing design tool
│   └── api/
│       └── products/
│           └── route.ts           # API endpoints
├── components/
│   ├── products/                  # V1 components (to be consolidated)
│   │   └── steps/
│   │       ├── basic-info-step.tsx
│   │       ├── images-step.tsx
│   │       └── review-step.tsx
│   └── products-v2/               # V2 components (to be consolidated)
│       ├── dynamic-import-wizard.tsx
│       ├── product-summary-header.tsx
│       ├── progress-indicator.tsx
│       └── steps/
│           └── dynamic-category-step.tsx
└── lib/
    ├── types/
    │   └── product-types.ts
    └── prisma.ts
```

#### Final Structure (Planned)
```
src/
├── app/
│   ├── product-import/            # Production routes
│   │   └── page.tsx
│   ├── api/
│   │   └── products/
│   │       └── route.ts
│   └── design-your-shower/
│       └── page.tsx
├── components/
│   └── product-import/            # Final consolidated components
│       ├── import-wizard/
│       │   ├── wizard.tsx
│       │   ├── product-header.tsx
│       │   ├── progress-indicator.tsx
│       │   └── steps/
│       │       ├── basic-info.tsx
│       │       ├── categorization.tsx
│       │       ├── images.tsx
│       │       └── review.tsx
│       └── shared/                # Reusable components
└── lib/
    ├── product-import/            # Business logic and types
    │   ├── types.ts
    │   ├── validation.ts
    │   └── categorization.ts
    └── prisma/                    # Database
        ├── schema.prisma
        └── migrations/
```

#### Consolidation Plan
1. Complete V2 development in current location
2. Test all features thoroughly
3. Create new directory structure
4. Migrate components to final locations
5. Update imports and references
6. Test consolidated version
7. Remove development directories
8. Final testing pass

### Core Components
- Import Wizard (V2)
- Design Tool
- Management Console (Planned)

### Key Files
```
src/
├── components/
│   ├── products-v2/
│   │   ├── dynamic-import-wizard.tsx      # New wizard with dynamic categorization
│   │   ├── product-summary-header.tsx     # Product header with visibility controls
│   │   ├── progress-indicator.tsx         # Step progress tracking
│   │   └── steps/
│   │       └── dynamic-category-step.tsx  # Dynamic decision tree UI
│   └── products/
│       └── steps/                         # Original V1 components we're keeping
│           ├── basic-info-step.tsx        # Product name and descriptions
│           ├── images-step.tsx            # Image management
│           └── review-step.tsx            # Final review
├── lib/
│   ├── types/
│   │   └── product-types.ts              # TypeScript interfaces
│   └── prisma.ts                         # Database models
└── app/
    ├── design-your-shower/
    │   └── page.tsx                      # Customer-facing design tool
    └── api/
        └── products/
            └── route.ts                  # API endpoints
```

## Data Architecture

### Database Schema
```prisma
// Raw Product Data
model RawProduct {
  id          String   @id @default(uuid())
  source      String   // homedepot, lowes, etc.
  sourceId    String   // Original supplier ID
  rawData     Json     // Complete supplier data
  fetchedAt   DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  customProducts CustomProduct[] // Link to our custom versions
}

// Our Customized Product Data
model CustomProduct {
  id                  String   @id @default(uuid())
  originalName        String
  internalName        String
  displayName         String
  marketingDescription String  // Customer-facing
  internalNotes       String   // Team-facing
  specifications      Json[]   // Structured specs with visibility
  images             Image[]
  rawProducts        RawProduct[]
  categorization     Json      // Dynamic categorization data
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

// Product Images
model Image {
  id              String   @id @default(uuid())
  url             String
  source          String   // supplier or internal
  customerVisible Boolean
  teamVisible     Boolean
  isPrimary       Boolean
  productId       String
  product         CustomProduct @relation(fields: [productId], references: [id])
}
```

### TypeScript Interfaces
```typescript
// Dynamic Categorization
interface CategoryStep {
  id: string
  label: string
  options: string[] | ((selections: Record<string, string | string[]>) => string[])
  dependsOn?: {
    step: string | ((selections: Record<string, string | string[]>) => string)
    values: string[]
    conditions?: (selections: Record<string, string | string[]>) => boolean
  }
  multiSelect?: boolean
  groupedOptions?: Record<string, OptionGroup>
}

// Form Data
interface DynamicImportFormData {
  name: string
  brand: string
  description: {
    supplier: string
    internal: string
    marketing: string
  }
  categorization: Record<string, string | string[]>
  specifications: Array<{
    name: string
    value: string
    visibility: {
      customer: boolean
      team: boolean
    }
  }>
  images: Array<{
    url: string
    source: 'supplier' | 'internal'
    visibility: {
      customer: boolean
      team: boolean
    }
    primary: boolean
  }>
}
```

## Import Process

### 1. Data Fetching
- Unwrangle API fetches product data
- Raw data stored immediately
- Links maintained to supplier sources

### 2. Import Wizard Steps
1. **Basic Information**
   - Display supplier data
   - Create marketing description
   - Add internal notes
   - Manage specification visibility

2. **Dynamic Categorization**
   - Component selection
   - Specific attributes based on type:
     - Base: colors, materials, drain types
     - Walls: materials, panels
     - Fixtures: types, finishes
     - Doors: types, hardware, glass
     - Accessories: types, finishes

3. **Image Management**
   - Import supplier images
   - Set visibility levels
   - Add internal images
   - Select primary image

4. **Review**
   - Preview all visibility levels
   - Validate required fields
   - Confirm categorization

### Current Implementation Status

#### Complete
- Basic wizard structure
- Dynamic categorization logic
- Product summary header
- Progress indicator
- Multi-select support
- Visibility toggles

#### In Progress
- Step navigation
- Validation rules
- Review step updates
- Database schema migration

#### Next Steps
1. Complete step navigation
2. Implement validation
3. Add review step
4. Update database schema
5. Build management console

## Visibility System

### Customer View
- Marketing description
- Selected specifications
- Curated images
- Guided selection process

### Sales/Installation Team View
- Technical specifications
- Installation notes
- Additional images
- Internal product notes

### Management Console
- Complete data access
- Raw supplier data
- Update history
- Relationship management

## Component-Specific Rules

### Shower Base
- Required: color, material, dimensions
- Optional: drain type, anti-slip
- Validation: compatible dimensions

### Wall Panels
- Required: material, panel type
- Optional: color, texture
- Validation: matching set components

### Fixtures
- Required: type, finish
- Optional: flow rate, features
- Validation: compatibility with system

### Doors
- Required: type, size, glass type
- Optional: hardware finish
- Validation: opening dimensions

### Accessories
- Required: type, mounting
- Optional: finish, dimensions
- Validation: compatibility with walls

## Design Tool Integration
- Uses categorization for filtering
- Shows only customer-visible data
- Validates compatibility
- Guides selection process

## Management Console (Planned)
- Complete data management
- Relationship maintenance
- Update synchronization
- Analytics and reporting

---

[Accept Implementation Plan]
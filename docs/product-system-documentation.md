# Product Management System Documentation

## System Context
This product management system is part of our bathroom remodeling platform. It provides the backend infrastructure and admin interfaces needed to:
1. Import and manage products from suppliers (currently Home Depot and Lowes)
2. Organize products for use in customer-facing design tools
3. Create product packages for promotional campaigns
4. Manage promotional campaigns and their available products

The initial focus is on shower transformations, but the system is designed to support full bathroom remodeling in the future.

## Current Implementation

### Database Schema
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description Json     // { supplier: string, internal: string }
  brand       String
  categories  Json     // { style: string[], type: string[] }
  images      Json[]   // { url: string, source: 'supplier' | 'custom', primary: boolean }
  visibility  Json     // { showToCustomer: boolean, showToSalesRep: boolean }
  specifications Json[] // { name: string, value: string }
  variants    Json[]   
  metadata    Json     // { supplier: string, externalId: string, importedAt: Date }
  designTool  Json?    // Design tool specific data
}
```

### Import Wizard Implementation
Currently implemented in `src/components/products/import-wizard.tsx`:
1. Basic Information Step
   - Product name
   - Brand
   - Descriptions (supplier and internal)
   - Specifications

2. Categories Step
   - Style categories
   - Type categories

3. Design Tool Step
   - Category selection (SHOWER_BASES, etc.)
   - Subcategory selection
   - Dimensions (width, height, depth)
   - Installation requirements
   - Compatibility settings

4. Images Step
   - Product images from supplier
   - Custom image upload
   - Primary image selection

5. Visibility Step
   - Customer visibility
   - Sales rep visibility

6. Review Step
   - Complete product overview
   - Import confirmation

### Design Tool Integration
Products imported include specific data for the shower design tool:
```typescript
interface DesignToolProductData {
  category: keyof typeof DESIGN_TOOL_CATEGORIES | undefined
  subcategory: string | undefined
  dimensions: {
    width: number
    height: number
    depth?: number
    squareFeet?: number
  }
  installation: {
    type: string
    requirements: string[]
    difficulty: 'easy' | 'moderate' | 'complex'
  }
  compatibility: {
    requiredProducts: string[]
    incompatibleWith: string[]
  }
}
```

### API Endpoints
Currently implemented:
```
/api/products/
├── import              # POST: Import new product
└── clear              # POST: Clear all products (dev only)
```

## Required Extensions

### 1. Product Management
New database fields needed:
```prisma
model Product {
  // Existing fields...
  priceLevel      String    // 'smart' | 'premium' | 'luxury'
  finishGroup     String?   // Links products with same model, different finishes
  finishType      String?   // The specific finish of this product
  isPrimary       Boolean   // Is this the primary product in its finish group?
  compatibility   Json      // Required/compatible product rules
  packages        Package[] // Packages this product belongs to
}
```

Required UI components:
```
src/components/products/management/
├── product-list.tsx        # Product listing with filters
├── product-editor.tsx      # Individual product editing
└── relationship-manager.tsx # Manage finish groups and compatibility
```

### 2. Package System
New schema needed:
```prisma
model Package {
  id          String    @id @default(cuid())
  name        String
  description String
  type        String    // 'designer' | 'value' | 'custom'
  products    Product[]
  pricing     Json      // Bundle pricing rules
  campaigns   Campaign[]
}
```

Package creation rules:
1. Must include one product from each required category
2. Optional add-ons allowed but not required
3. Package price can differ from sum of components
4. Can be associated with multiple campaigns

### 3. Campaign System
New schema needed:
```prisma
model Campaign {
  id          String    @id @default(cuid())
  name        String
  startDate   DateTime
  endDate     DateTime
  packages    Package[]
  pricePoints Json      // Available price points
  restrictions Json     // Product/package availability rules
}
```

Campaign requirements:
1. Must have at least one package or product
2. Must have defined price points
3. Can restrict available products by:
   - Price level
   - Category
   - Specific products

## Implementation Priorities

1. Product Management (In Progress)
   - Complete design tool configuration
   - Add price level support
   - Implement finish variants

2. Package Builder (Next)
   - Package creation interface
   - Component selection
   - Pricing configuration

3. Campaign Management (Future)
   - Campaign creation
   - Package/product selection
   - Price point configuration

## Technical Requirements

### State Management
- Use React's useState for component-level state
- Implement proper error handling and loading states
- Maintain consistent state between steps

### API Structure
- RESTful endpoints for CRUD operations
- Proper error handling and validation
- Consistent response formats

### Performance Considerations
- Lazy loading for product images
- Pagination for product lists
- Caching for frequently accessed data

### Security Requirements
- Admin-only access to management interfaces
- Validation of all inputs
- Proper error handling and logging
 
1.Product Import & Management
Import products from suppliers (Home Depot, Lowes)
Categorize them for use in design tools
Tag them by price level (Smart Solutions, Premium, Luxury)
Group products that are the same item in different finishes
Manage product relationships (what works with what)
Bulk operations for managing multiple products
Edit/update product information after import
2.Package Creation
Create named collections of products (e.g., "Designer Shower Package")
Each package needs specific components (base, walls, door, etc.)
Set package pricing (can differ from sum of components)
Link packages to specific campaigns/promotions
Define optional add-ons for packages
Create different package types (designer, value, custom)
3.Campaign Management
Create promotional campaigns (e.g., "$5,999 Shower Transformation")
Set which products/packages are available in each campaign
Define price points for the campaign
Restrict product choices based on price level or other criteria
Set campaign duration/validity periods
Track campaign performance/analytics
4.Design Tool Integration
Products need specific data for design tools (dimensions, installation requirements)
Products need compatibility rules (what bases work with what walls)
Products can be restricted by campaign (only show Smart Solutions products)
Products need proper categorization for where they appear in the tool
Support multiple design tools (shower designer, full bath designer)
5.Product Relationships
Finish variants (same product, different finishes)
Required accessories/components
Compatible products
Replacement/alternative products
Installation requirements and compatibility
6.Price Level Management
Smart Solutions (value tier)
Premium Upgrades (mid tier)
Luxury (high end)
Package-specific pricing
Campaign-specific pricing


Here was the list of things that need to be defined to build the system:
1. Specific Data Models/Schema
Exact fields needed for each entity (Product, Package, Campaign)
Relationships between entities (how products link to packages, etc.)
Required vs optional fields
Data types and constraints
2. Design Tool Requirements
Exact dimensions needed for shower products
Required compatibility rules (what bases work with what walls)
Installation requirements format
Visual display requirements
3.Business Rules
How price levels are determined
Rules for package creation (minimum components, etc.)
Campaign restrictions logic
Product relationship validation rules
4. UI/UX Specifications
Import wizard step requirements
Package builder interface requirements
Campaign manager workflow details
Product management interface specifications
5.Implementation Details
Current progress/state of implementation
Existing components and their purposes
API endpoints needed
Database migrations required

6. Integration Points
How the product system connects to design tools
Data flow between components
Event handling patterns
Cache/performance considerations
7. Category System
Complete product category hierarchy
How categories map to design tools
Category validation rules
Category relationships
8. Price System
Price calculation rules for packages
Discount/promotion rules
Price level qualification criteria
Price display formatting
9. State Management
How data flows between components
What needs to be cached
What needs to be real-time
Error state handling
10. Validation System
Input validation rules
Business rule validation
Cross-entity validation (packages, campaigns)
Error message handling
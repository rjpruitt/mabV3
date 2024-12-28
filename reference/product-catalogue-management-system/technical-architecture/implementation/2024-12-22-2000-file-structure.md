# Product Catalogue Implementation File Structure

## Import System Evolution

### V1 Implementation (Archive)
- `src/archive/products/v1/import/page.tsx`
  - Original import with Unwrangle integration
  - Complete product search and import
  - Reference for supplier API integration

### V2 Implementation (Archive)
- `src/archive/products/v2/import/page.tsx`
  - Dynamic import with categorization
  - Component-based architecture
  - Reference for wizard structure

### Current Implementation
- `src/components/products/import/wizard/dynamic-import-wizard.tsx`
- `src/components/products/import/config/category-steps.ts`
- `src/components/products/import/types.ts`
- `src/app/admin/products/import/page.tsx`

## API Layer
- `src/app/api/products/route.ts`
- `src/lib/services/service-provider.ts`
- `src/lib/services/unwrangle-service.ts`

## Core Types & Schema
- `src/types/products.ts`
- `prisma/schema.prisma`

## Implementation Notes
1. V1 archive contains working Unwrangle integration
2. V2 archive has dynamic categorization patterns
3. Current implementation combines best of both
4. API layer handles both import and management 
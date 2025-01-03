# Design Tool Documentation

## Overview
The design tool is a multi-step configurator that helps users design their shower renovation project. It consists of two main paths:
1. Designer Packages - Pre-configured design collections
2. Custom Design - Step-by-step customization

## Current Implementation Status

### Protected Route Setup
- Authentication temporarily disabled during development
- Auth protection to be implemented after core functionality

### Entry Point Components

#### 1. DesignToolEntry Component
**Location**: `src/components/design-tool/entry/DesignToolEntry.tsx`
- Main entry component for the design tool
- Shows two paths: Designer Packages and Custom Design
- Uses Next.js Image component for visuals
- Integrates with lead capture system
- Requires image paths from `constants/images.ts`
- Currently has placeholder images that need to be replaced

#### 2. Design Your Shower Page
**Location**: `src/app/design-your-shower/page.tsx`
- Server component that renders the design tool entry point
- Renders DesignToolEntry component
- Future: Will implement authentication checks

### Price Calculation System
**Location**: `src/components/design-tool/utils/pricing.ts`

Features:
- Base price configuration for three tiers:
  - Smart Solutions
  - Premium
  - Luxury
- Project type multipliers:
  - Tub-to-shower: 1.2
  - Shower-replacement: 1.0
- Size multipliers:
  - Small: 0.9
  - Standard: 1.0
  - Large: 1.2
- Material upgrade pricing for walls and base
- Fixture costs for shower heads, controls, and hand showers
- Accessory pricing for grab bars, shelves, niches, and seats
- Detailed price breakdown component in `src/components/design-tool/pricing/PriceBreakdown.tsx`

### Review Step Implementation
**Location**: `src/components/design-tool/steps/review/ReviewStep.tsx`

Features:
- Displays calculated price range
- Shows collapsible price breakdown
- Lists all selected options
- Provides edit capabilities for each section
- Uses Framer Motion for animations
- Responsive design for mobile

### Image System Status
- Currently defined paths in `src/components/design-tool/constants/images.ts`
- Attempted Canvas-based placeholder generation (to be removed)
- Need to implement SVG placeholder system

Required image categories:
- Entry page: hero-bg, designer-packages, custom-design
- Steps: project type, shape, plumbing, base, walls, fixtures, accessories
- All images need both desktop and mobile versions

### Database Integration
- Using Prisma for database operations
- PostgreSQL running in Docker container
- Need to implement design saving functionality

## Key Files to Track
1. `src/middleware.ts` - (temporarily disabled)
2. `src/components/design-tool/entry/DesignToolEntry.tsx` - Main entry
3. `src/components/design-tool/entry/DesignPackages.tsx` - Package selection
4. `src/components/design-tool/utils/pricing.ts` - Price calculations
5. `src/components/design-tool/pricing/PriceBreakdown.tsx` - Price display
6. `src/components/design-tool/constants/images.ts` - Image paths
7. `src/components/design-tool/steps/review/ReviewStep.tsx` - Review step
8. `src/lib/types/database.types.ts` - Database types
9. `src/app/design-your-shower/page.tsx` - Main page
10. `src/app/page.tsx` - Home page with auth redirect handling

## Recent Changes
- Added authentication protection to design tool route
- Implemented comprehensive price calculation system
- Created animated review step with price breakdown
- Added image path constants
- Attempted Canvas placeholder generation (to be removed)

## Next Steps
1. Replace Canvas placeholders with SVG system
2. Complete designer packages implementation
3. Add material selection previews
4. Implement design saving to database
5. Add mobile-specific optimizations
6. Create print-friendly version of review step
7. Plan and implement authentication strategy

## Technical Dependencies
- Next.js 14 App Router
- Prisma ORM
- PostgreSQL Database
- Docker for development
- Framer Motion for animations
- TypeScript for type safety
- Tailwind CSS for styling

## Development Notes
- Authentication temporarily disabled during development
- Core functionality being developed without auth requirements
- All price calculations happen client-side
- Image paths are centrally managed in constants
- Review step uses staggered animations for better UX
- Price breakdown is collapsible for mobile
- Need to maintain both desktop and mobile layouts
- SVG placeholders should match final image dimensions


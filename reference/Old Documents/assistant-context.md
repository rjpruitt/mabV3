# Assistant Context: Product Import System

## Current Implementation State

### Core Components
1. **Product Import Flow**
   - Search interface (`test/products/import/page.tsx`)
   - Import wizard (`import-wizard.tsx`)
   - Steps:
     - Basic Info
     - Categories (recently updated)
     - Design Tool (recently updated)
     - Images
     - Visibility
     - Review

### Recent Changes
1. **Updated Data Structure**
   - Modified DesignToolData in `product-types.ts`
   - Added ProductFormat ('INDIVIDUAL_COMPONENT' | 'KIT')
   - Added price levels (SMART_SOLUTIONS, PREMIUM_UPGRADES, LUXURY)
   - Updated Categories step to handle new structure

### Current Issues
1. **TypeScript Errors**
   - Need to update import-wizard.tsx initial state to match new DesignToolData
   - Need to update review-step.tsx to match new structure
   - Previous attempts to fix these failed due to context overload

### Product Categorization Structure
1. **Top Level Categories**
   - BATHTUBS
   - SHOWERS (current focus)
   - ACCESSIBILITY_SAFETY
   - WALLS_WAINSCOTTING
   - ACCESSORIES
   - Future: CABINETS, LIGHTING, MIRRORS

2. **For SHOWERS Category**
   - Price Levels: SMART_SOLUTIONS ($), PREMIUM_UPGRADES ($$), LUXURY ($$$)
   - Format: INDIVIDUAL_COMPONENT or KIT
   - Component Types:
     - BASE
     - WALLS
     - WALL_ACCENTS
     - DOOR
     - CURTAIN_ROD
     - FIXTURES
     - ACCESSORIES
   - Shapes (for applicable components):
     - Alcove: SQUARE, RECTANGULAR
     - Corner: SQUARE, RECTANGULAR, NEO_ANGLE, ROUND

### Design Tool Integration
1. **Classification**
   - topCategory (e.g., 'SHOWERS')
   - format (INDIVIDUAL_COMPONENT or KIT)
   - componentType (for individual components)
   - includedComponents (for kits)
   - showerType
   - showerShape
   - subType

2. **Compatibility**
   - showerTypes
   - showerShapes
   - dimensions (min/max width/depth, height)

3. **Installation**
   - difficulty
   - requirements
   - notes

### Next Steps
1. Fix remaining TypeScript errors:
   - Update import-wizard.tsx initial state
   - Update review-step.tsx display
2. Test the complete import flow with new structure
3. Ensure proper handling of both individual components and kits
4. Validate price level integration

### Important Notes
- Focus is on shower transformations initially
- Need to maintain extensibility for full bathroom remodeling
- Keep supplier data separate from presentation data
- Design tool integration is critical for product filtering

### File Dependencies
- src/lib/types/product-types.ts (core types)
- src/components/products/types.ts (import form types)
- src/components/products/import-wizard.tsx (main wizard)
- src/components/products/steps/*.tsx (wizard steps)
- src/app/test/products/import/page.tsx (test interface)

### Current Session Context
- Successfully updated product types and categories step
- Experiencing issues with import wizard updates
- Need to maintain careful type checking
- Must preserve both supplier and internal presentation data 
# Castico Scraper Documentation

## Project Overview
A web scraper built to extract product information from Castico-tx.com, focusing on shower products, their variations, specifications, and images.

## Project Structure

### Key Files

The project consists of the following key files and directories:

src/
  lib/
    services/
      scraper/
        scraper-service.ts    # Base scraper interface
        suppliers/
          castico.ts          # Main scraper implementation
scripts/
  test-castico-scraper.ts    # Test runner
  register.ts                # TypeScript ESM registration
debug/
  screenshots/               # Debug screenshots
scraped-images/             # Downloaded product images

### Configuration

The project uses the following key dependencies and scripts in package.json:

Scripts:
- test-scraper: node --loader ts-node/esm scripts/test-castico-scraper.ts
- scrape-castico: NODE_PATH=./src node --loader ts-node/esm scripts/scrape-castico-products.ts

Dependencies:
- playwright: ^1.49.1
- typescript: ^5.0.0
- class-variance-authority: ^0.7.1

## Current Implementation

### Test Script
The main test URL being used is:
https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-geometric-2-wall-decor/

### Page Structure Analysis

#### Product Gallery
The product gallery is structured with the following elements:
- Main container: .woocommerce-product-gallery
- Gallery wrapper: .woocommerce-product-gallery__wrapper
- Individual images: .woocommerce-product-gallery__image
- Image elements with data attributes: data-large_image, src

Key challenges:
- Images are dynamically loaded
- Multiple image sources must be handled
- Gallery initialization is problematic

#### Accordion Sections
The page uses an accordion structure for product information:
- Technical Specifications section with .elementor-tab-title
- Features section with .elementor-tab-title
- Content contained in .elementor-tab-content
- Dynamic expansion causing reliability issues

#### Pattern Variations
Pattern selection is handled through:
- Main wrapper: .variable-items-wrapper[data-attribute_name="attribute_pa_wall-color"]
- Individual patterns: .variable-item
- Pattern switching affects gallery images

### Data Models

The scraper uses the following data structures:

ScrapedProduct:
- url: string
- name: string
- brand: string
- description: { supplier: string, marketing: string }
- metadata: { sku: string, price: string, supplierUrl: string, patterns?: string[] }
- images: ScrapedImage[]
- defaultImage?: string
- patterns: PatternVariation[]
- specs: ProductSpec[]

PatternVariation:
- id: string
- name: string
- thumbnail: string
- fullSizeImage: string
- order: number

ProductSpec:
- name: string
- value: string

## Current Issues

### 1. Gallery Image Extraction
Current problems:
- Gallery not initializing properly
- Images not loading consistently
- Multiple image sources causing confusion
- Need better timing for gallery access

### 2. Accordion Content
Issues include:
- Sections not expanding reliably
- Content not accessible after clicking
- Technical specifications missing from output
- Timing issues with content visibility

### 3. Pattern Processing
Challenges:
- Pattern switching affects gallery state
- Image association not reliable
- Need better state management
- Error recovery missing

## Debug Setup

### Screenshot Locations
Debug screenshots are saved in debug/screenshots/:
- initial-load.png: Page state after initial load
- accordions-expanded.png: State after expanding accordions
- page-loaded.png: Final page state

### Console Logging
Important logging points:
- Page load completion
- Gallery initialization attempts
- Accordion expansion status
- Pattern processing steps
- Image download progress

## Testing Instructions

1. Ensure all dependencies are installed:
   npm install

2. Run the test script:
   npm run test-scraper

3. Check debug/screenshots/ for visual verification

4. Review console output for:
   - Gallery initialization status
   - Accordion expansion success
   - Pattern processing completion
   - Image download confirmations

## Next Steps

### 1. Gallery Improvements
- Implement reliable gallery state detection
- Add retry mechanism for image loading
- Validate image quality and resolution
- Improve timing of gallery access

### 2. Specification Extraction
- Develop more robust accordion handling
- Implement content verification steps
- Add structured data parsing
- Improve timing of content access

### 3. Pattern Processing
- Add pattern state machine
- Implement rollback on failures
- Improve image association
- Add error recovery mechanisms

## Maintenance Notes

Regular maintenance tasks:
- Verify selectors are still valid
- Monitor for site structure changes
- Update test cases with new products
- Maintain debug screenshot history
- Check for new pattern variations

## Support

When investigating issues:
1. Check debug screenshots in debug/screenshots/
2. Review console output from test runs
3. Examine network requests in browser devtools
4. Verify DOM structure in page source
5. Validate pattern switching behavior

## Development History & Current State

### Latest Attempt Results
The most recent test run showed:
- Successfully detecting patterns (5 variations found)
- Features section content being extracted (11 items)
- Technical specifications section not being extracted
- Only capturing first image despite multiple being present
- Accordion expansion attempts failing after 3 retries

### Key Breakthrough Points
1. Pattern detection is working reliably using the variable-items-wrapper selector with wall-color attribute
2. Features extraction works when directly accessing the elementor-tab-content elements
3. Base product details extraction is working correctly

### Failed Approaches
1. Waiting for networkidle - page never reaches stable state
2. Using waitForSelector on gallery - timing issues
3. Clicking accordion titles programmatically - not triggering content display
4. Multiple selector attempts for images - only getting first image

### Current Working Theory
The page appears to have multiple initialization stages:
1. Initial DOM load
2. JavaScript framework initialization
3. Gallery component initialization
4. Dynamic content loading
5. Pattern variation handling

We need to:
1. Wait for each stage properly
2. Verify state before proceeding
3. Handle each component independently

### Critical Code Sections
The most problematic section is the accordion expansion where we're trying to click titles and wait for content, but the content remains hidden despite successful clicks.

### Environment Notes
- Running with headless=false for debugging
- Using slowMo=1000 to watch interactions
- Screenshots being saved at key points
- Console logging enabled for all steps

## Immediate Focus Areas

1. Technical Specifications Section
   - Located above Features in accordion
   - Not expanding properly
   - Content exists but not accessible
   - Needs new approach for expansion

2. Gallery Initialization
   - Need to understand initialization sequence
   - Multiple image sources available
   - Pattern switching affects gallery state
   - Current selectors not capturing all images

3. State Management
   - Need to track page state
   - Verify component initialization
   - Handle state transitions
   - Add rollback capabilities

## Test Cases & Expected Results

### Base Product
URL: https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-geometric-2-wall-decor/

Expected Data:
1. Technical Specifications:
   - Should include dimensions
   - Should include materials
   - Should include installation requirements
   - Currently missing completely

2. Images:
   - Main product image (currently working)
   - Pattern variation images (not capturing)
   - Installation diagrams (not capturing)
   - Need to handle multiple image sources

3. Features:
   - Currently extracting 11 items successfully
   - Formatting is correct
   - No duplicates
   - Working as expected

### Related Files
1. test-castico-scraper.ts: Main test runner
2. register.ts: Handles TypeScript/ESM setup
3. castico-products.json: Full product catalog data
4. test-product.json: Sample output for verification

### Debug Files Location
- Screenshots: debug/screenshots/
- Scraped images: scraped-images/
- Debug logs: Generated during test runs

### Current Workflow
1. Run test-scraper
2. Check debug screenshots
3. Verify console output
4. Compare against test-product.json
5. Analyze failed components

Next session should focus on:
1. Technical specifications extraction
2. Complete gallery image capture
3. Improving state management

## Additional Technical Details

### Browser Configuration
Current Playwright settings that are important:
- headless: false (needed for proper page rendering)
- slowMo: 1000 (helps with dynamic content)
- timeout: 120000 (2 minutes, increased from default)
- args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']

### Accordion Investigation Notes
The technical specifications section appears to use a different initialization pattern than the features section. While features content is accessible after a simple click, the technical specifications require:
1. Initial click
2. Wait for animation
3. Check for content visibility
4. Possible second click needed

### Gallery Behavior Patterns
The gallery shows different behavior depending on:
1. Initial page load (shows default pattern)
2. After pattern selection (shows pattern-specific images)
3. After hover interactions (loads additional views)
4. After click interactions (loads full-size images)

### Required Files for Testing
- .gitignore must include:
  - debug/screenshots/
  - debug/results/
  - scraped-images/
  - *.png
  - test-product.json
- test-product.json should contain expected output structure
- castico-products.json tracks all scraped products

### Test Script Location
scripts/test-castico-scraper.ts is the main entry point and should be run with NODE_PATH=./src for proper module resolution

## Website Behavior Notes

### Page Load Sequence
1. Initial HTML loads with placeholder content
2. WooCommerce gallery initializes (can see gallery container appear)
3. Product variations load (pattern swatches appear)
4. Gallery images load progressively
5. Elementor widgets initialize (accordions become interactive)

### Accordion Behavior Details
- Clicking title triggers CSS transition
- Height animation takes ~300ms
- Content becomes visible after animation
- Sometimes requires second click if first click doesn't register
- Features section more reliable than Technical section

### Pattern Selection Effects
1. Clicking pattern triggers:
   - Gallery refresh
   - Image swap
   - URL update
   - Price update (sometimes)
2. Need to wait for all changes before capturing new state

### Known Good Selectors
- Product title: .product_title
- Price: .price .amount
- SKU: .sku
- Features content: #elementor-tab-content-1462
- Technical specs content: #elementor-tab-content-1461

### Network Request Patterns
- Initial page load
- Gallery image requests
- Pattern variation requests
- Dynamic content loading
- Need to monitor all for completion

## Error Patterns & Debugging

### Common Error Scenarios
1. Timeout on Initial Load
   - Usually means page is still making background requests
   - Network activity continues past domcontentloaded
   - May need to ignore certain requests

2. Gallery Image Missing
   - Often related to pattern switching
   - Gallery reinitializes but images don't load
   - Need to verify gallery state before capture

3. Accordion Content Invisible
   - Content exists in DOM but height:0
   - CSS transitions not completing
   - Click events not registering properly

### Debugging Checkpoints
1. After Page Load:
   - Check .product_title visibility
   - Verify gallery container exists
   - Confirm pattern swatches loaded

2. Before Pattern Switch:
   - Save current gallery state
   - Note current URL
   - Record visible images

3. After Pattern Switch:
   - Compare gallery changes
   - Check for new images
   - Verify URL updates

### Error Recovery Strategies
1. For Gallery Issues:
   - Force hover events
   - Trigger click on thumbnails
   - Wait for network idle

2. For Accordion Issues:
   - Try multiple click methods
   - Force height via JavaScript
   - Check parent container state

3. For Pattern Issues:
   - Reset to default pattern
   - Clear any hover states
   - Reload gallery component

## Test Product Details

### Current Test Product
Product: 32" x 60" x 84" Center Drain - White Sand - Geometric - 2 Wall Decor
URL: https://castico-tx.com/product/shower-kit-32-x-60-x-84-center-drain-white-sand-geometric-2-wall-decor/

### Expected Content
1. Base Details:
   - Name: "32" x 60" x 84" Center Drain - White Sand - Geometric - 2 Wall Decor"
   - Brand: "Castico"
   - Price: "$2,400.00"
   - SKU: Should be present

2. Known Patterns:
   - Arrow Black
   - Balance
   - Circles
   - Signal Black
   - Signal Inverted

3. Known Features (11 items):
   - Easy curb-less shower entry
   - Solid core that reduces noise
   - Quick install over backer board
   - Easy to trim using tile saw
   - Groutless 4-piece look
   - Surface finished on all edges
   - Pre-sloped design
   - Walk-in opening details
   - Compatible with 2" drain
   - Install hardware on 2" perimeter
   - Compatible with 60" door

4. Technical Specifications (Currently Missing):
   - Dimensions should be listed
   - Material specifications
   - Installation requirements
   - Weight information

5. Expected Images:
   - Main product view
   - Side views
   - Installation diagram
   - Pattern variation views
   - Detail shots

This product was chosen as the test case because it includes all major features we need to scrape: patterns, specifications, multiple images, and technical details.

## Project Files Reference

### scripts/test-castico-scraper.ts
Main test runner that:
- Initializes the scraper
- Runs test against single product URL
- Outputs results to debug/results/
- Handles error reporting

### scripts/register.ts
TypeScript/ESM configuration that:
- Enables ES modules
- Sets up path aliases
- Configures TypeScript loader

### castico-products.json
JSON file containing:
- Full catalog of scraped products
- Used for verification and tracking
- Contains expected data structure

### test-product.json
Sample output file that:
- Shows expected data format
- Used for regression testing
- Updated with successful scrapes

### .gitignore
Must include these patterns:

Scraper debug files:
- debug/screenshots/
- debug/results/
- scraped-images/
- *.png
- test-product.json

Uploaded files:
- public/uploads/*
- !public/uploads/.gitkeep

## Database Integration

### Schema Mapping
Our Prisma schema defines a Product model with:
- id: String
- name: String  
- brand: String
- description: Json
- categories: Category[]
- images: ProductImage[]
- specifications: Specification[]
- visibility: Json
- metadata: Json?
- supplierId: String
- supplier: Supplier relation

And a ProductImage model with:
- id: String
- url: String
- alt: String?
- source: String (defaults to "supplier")
- isPrimary: Boolean
- productId: String
- product: Product relation

### Current Gaps

1. Data Structure Mismatches:
   - Scraped 'patterns' don't map to any current database model
   - Technical specifications need to be transformed into Specification records
   - Need to define how patterns relate to categories or metadata

2. Missing Transformations:
   - Need to convert pattern variations to appropriate database structure
   - Need to map scraped specs to standardized specification records
   - Need to define visibility rules for scraped products

3. Required Database Fields:
   - Need to ensure supplierId is captured
   - Need to structure visibility JSON
   - Need to define category relationships

### Next Steps for Database Integration
1. Define pattern handling:
   - As categories?
   - As metadata?
   - As new model?

2. Standardize specifications:
   - Create mapping for technical specs
   - Create mapping for features
   - Define standard names/types

3. Image handling:
   - Define primary image selection
   - Handle pattern variation images
   - Set up proper alt text

## Data Model Clarifications

### System-Controlled Fields
Important note: Several fields we initially thought might come from scraping are actually system-controlled:

1. Visibility
   - This is our internal control of product visibility
   - Not sourced from supplier data
   - Managed through our admin interface

2. Image isPrimary Flag
   - Our decision about which image is primary
   - Not determined by supplier data
   - Set through our product management

3. SupplierId
   - Our internal reference to the supplier
   - Assigned when we add a supplier to our system
   - Not derived from product data

### Pattern/Variation Handling
A key insight about product variations:

1. Castico's Approach:
   - Uses descriptive names without model numbers
   - Treats patterns as variations of a base product
   - Product identity based on dimensions and features

2. Home Depot's Approach (Alternative Supplier):
   - Assigns unique model numbers and SKUs to each variation
   - Treats each pattern/color as distinct product
   - More granular product identification

3. Implications for Our System:
   - Need to handle different supplier approaches
   - Must maintain relationships between variations
   - Consider using Home Depot's model numbers as reference
   - Need strategy for linking related pattern variations

### Data Structure Considerations

1. Pattern Variations Options:
   - Treat as separate products with relationships
   - Handle as variations within single product record
   - Create hybrid approach supporting multiple supplier methods

2. Database Design Questions:
   - Potential need for new variation model
   - How to link variations to base products
   - Handling different supplier approaches to same product
   - Managing cross-reference between supplier systems

3. Next Steps:
   - Complete basic data extraction (specs, features, images)
   - Document pattern relationships
   - Design variation handling system
   - Consider cross-supplier product matching

This understanding affects our scraping priorities and data structure design.

---

Last Updated: 2024-01-06 
# Product-Related Tools Definition Document

## Overview
This document outlines the suite of integrated tools needed for Mid America Bath's digital transformation of the sales and installation process.

## Core Tools

### 1. Interactive Shower Design Tool - Detailed Specification

#### Core Design Principles
- Based on Bathfitter's successful approach
- Progressive step-based interface
- Responsive design (desktop/iPad/mobile)
- 2D layered visualization

#### Desktop/iPad Layout
1. Top Navigation
   - Numbered steps: Bases → Walls → Faucets → Accessories → Doors → etc.
   - Clear visual progression
   - Reset option
   - Save/Load functionality

2. Split Screen Interface
   - Left: Selection panels
   - Right: Large visualization area
   - Zoom controls
   - Save/Share options

3. Selection Panel Organization
   - Grid layout for desktop
   - Clear categorization
   - Product thumbnails with names
   - Visual previews

#### Mobile Adaptation
1. Initial Choice Screen
   - Simple tub vs shower selection
   - Clean, card-based interface
   - Project loading option

2. Step Navigation
   - Clear step indicators
   - Back button
   - Book Now/Save options

3. Selection Interface
   - Horizontal sliders for options
   - Category labels as separators
   - Stack multiple sliders for complex steps (e.g., accessories)
   - Touch-friendly targets

#### Key Features
1. Project Management
   - Save/Load functionality
   - Share options
   - Project history

2. Visualization
   - Real-time updates
   - High-quality room rendering
   - Accurate material representation
   - Contextual elements (vanity, mirror, etc.)

3. Product Selection
   - Categorized options
   - Clear pricing (for sales team)
   - Compatibility checking
   - Accessibility options

#### Integration Points
- Links to Product Catalogue System
- Feeds into Price Estimation Tool
- Connects to Sales Presentation Tool
- Saves to Customer Project Database

#### Scene/Visualization Requirements

1. Base Scene Components
   - Complete bathroom environment
   - Shower enclosure area
   - Vanity cabinet and sink
   - Vanity mirror
   - Flooring
   - Walls
   - Lighting fixtures
   - Window (optional)
   - Decorative elements (towels, artwork)

2. Future-Proof Design
   - Scene structured to support future product categories
   - Modular component system for easy additions
   - Each element (vanity, mirror, etc.) prepared for future customization
   - Layered approach for independent updates

3. Visual Quality
   - Professional, photo-realistic rendering
   - Accurate lighting and shadows
   - Proper material reflections
   - Correct scale and proportions
   - High-resolution textures

4. Technical Considerations
   - 2D layered approach (vs 3D)
   - Base scene as foundation layer
   - Product selections as overlay layers
   - Efficient image loading and rendering
   - Mobile performance optimization

5. Scene Variations
   - Different layout options
   - Various room sizes
   - Window/no window versions
   - Left/right configurations
   - ADA-compliant versions

#### Initial User Flow

1. Welcome Screen
   - Clean, welcoming interface
   - Clear value proposition
   - "Design Your Own Bathroom" messaging
   - Emphasis on ease of use ("No interior design skills required")
   - Clear call-to-action to begin

2. Project Setup Flow
   - Project type selection (New vs Load Existing)
   - Basic configuration questions:
     - Room type (Full bath vs Half bath)
     - Project type (Tub → Shower vs Shower Update)
     - Room layout (Left/Right configuration)
     - Space dimensions
   - Accessibility requirements (if any)

3. Scene Selection
   - Based on user's configuration choices
   - Loads appropriate base scene
   - Sets initial product options
   - Prepares relevant product categories

4. Transition to Designer
   - Smooth loading transition
   - Clear introduction to the step-based process
   - Initial guidance/tutorial option
   - All previous choices reflected in starting view

#### Deployment Contexts & Versions

1. Main Website Version (Full Version)
   - Complete product catalog access
   - All budget tiers:
     - Smart Solutions (affordable, acrylic materials)
     - Premium (solid surface, synthetic stone)
     - Luxury (natural stone, tile, etc.)
   - Full range of customization options:
     - Bathtubs and showers
     - Vanities and cabinets
     - Countertops
     - Mirrors
     - Fixtures and faucets
     - Accessories
     - Accessibility features
     - Flooring options
     - Wall treatments
     - Lighting
   - Complete project saving/loading
   - Unrestricted room configurations

2. Promotional Landing Page Version (Targeted Version)
   - Configurable product subset
   - Promotion-specific options only
   - Examples:
     - One-day shower transformation promo:
       - Limited wall material options
       - Specific shower bases
       - Selected fixtures package
       - Basic accessories only
   - Simplified configuration flow
   - Focused call-to-actions
   - Promotion-specific pricing
   - Save design capability for sales follow-up

3. Sales Presentation Tool - Detailed Specification

#### Core Requirements
1. iPad-Based Presentation (13-inch)
   - Offline Capability:
     - Complete functionality without internet
     - Local storage of all presentation content
     - Cached product catalog and pricing
     - Ability to save customer designs locally
     - Sync when connection is restored
   - Touch-optimized interface
   - Smooth transitions
   - Professional appearance

2. Content Integration
   - Interactive shower design tool
   - Before/after galleries
   - Installation process videos
   - Customer testimonials
   - Product demonstrations
   - Clean guarantee details
   - Warranty information
   - Company history/credentials

3. Interactive Features
   - Swipeable before/after comparisons
   - Interactive product demonstrations
   - Video content integration
   - Real-time design modifications
   - Quick access to frequently asked questions
   - Price calculator integration
   - Financing options calculator

4. Sales Process Support
   - Structured presentation flow
   - Ability to jump to relevant sections
   - Quick access to supporting materials
   - Note-taking capability
   - Customer signature capture
   - Quote generation
   - Proposal creation

5. Customer Project Integration
   - Access to customer's saved designs
   - Ability to modify designs in real-time
   - Save presentation progress
   - Email follow-up materials
   - Share designs and quotes

6. Content Management
   - Centralized content updates
   - Version control
   - Regional pricing updates
   - Promotion management
   - Analytics tracking

#### Version Management
1. Configuration System
   - Product catalog filtering
   - Feature toggles
   - Budget tier controls
   - Promotion-specific settings
   - User interface adaptations

2. Design Compatibility
   - Cross-version design loading
   - Upgrade/downgrade handling
   - Version tracking in saved designs
   - Migration strategies

3. Access Control
   - Role-based permissions
   - Context-specific features
   - Price visibility rules
   - Save/load restrictions

### 2. Product Catalogue Management System - Detailed Specification

#### Core Components
1. Individual Product Management
   - Basic product information
   - Categorization
   - Pricing tiers
   - Images and assets
   - Specifications
   - Installation requirements

2. Design Collections Management
   - Leverages existing saved design functionality
   - Extended metadata:
     - Design type (Customer, Designer, Promotional)
     - Author/Designer attribution
     - Style categorization
     - Visibility controls
     - Featured status
     - Marketing descriptions
     - Hero images
   - Package presentation:
     - Display priority
     - Promotional flags
     - Price highlights
     - Feature highlights
   - Uses same underlying structure as customer saves
   - Maintains compatibility with design tool

3. Collection Builder Interface
   - Visual package assembly
   - Component selection
   - Pricing calculation
   - Preview generation
   - Description creation
   - Style tagging

4. Package Types
   - Complete bathroom designs
   - Shower-only packages
   - Accessibility-focused solutions
   - Budget-tier packages
     - Smart Solutions
     - Premium
     - Luxury
   - Promotion-specific packages

5. Package Presentation
   - Hero images
   - Style descriptions
   - Key features
   - Included components
   - Price points
   - Available variations

6. Integration Requirements
   - Interactive Design Tool
     - Package selection flow
     - Individual component selection flow
     - Hybrid approach (modify package)
   - Sales Presentation Tool
     - Package comparisons
     - Customization options
     - Pricing variations
   - Promotional Landing Pages
     - Featured packages
     - Limited-time offers
     - Special pricing

7. Data Structure Considerations
   - Package versioning
   - Component relationships
   - Pricing rules
   - Regional availability
   - Installation requirements
   - Material requirements

### 4. Price Estimation Tool
- Generates estimates based on design choices
- Integrates with shower design tool
- Real-time pricing updates

### 5. Finance Options Tool
- Displays payment options
- Financing application capability
- Integrates with price estimation tool

### 6. Sales Contract Tool
- Electronic contract generation
- Digital signature capability
- Legal compliance features

### 7. Payment Processing Tool
- Secure payment handling
- Multiple payment method support
- Integration with finance options

### 8. Installation Management Tool - Detailed Specification

#### Core Requirements
1. Project Information Access
   - Complete customer design choices
   - Sales consultation notes
   - Customer-specific requirements/preferences
   - Before images of existing bathroom
   - Project specifications
   - Special instructions
   - Customer contact information

2. Quality Control Process
   - Step-by-step installation checklist
   - Required photo documentation points
   - Digital sign-offs for each phase
   - Real-time progress tracking
   - Issue documentation and resolution
   - Clean guarantee verification

3. Installation Workflow
   - Pre-installation
     - Customer design review/confirmation
     - Review of notes and special requirements
     - Site preparation verification
     - Materials/products verification
     - Materials and Supplies Verification
       - Complete materials checklist review
       - Required quantities confirmation
       - Tools and equipment verification
       - Special items for custom work
       - Safety equipment verification
       - Clean promise supplies confirmation
   - During Installation
     - Step completion documentation
     - Photo requirements for each phase
     - Issue reporting and resolution
     - Clean promise adherence tracking
   - Post-installation
     - Final photos from specified locations
     - Before/after comparison shots
     - Customer gift presentation
     - Final walk-through checklist
     - Customer sign-off
     - Testimonial capture

4. Documentation Requirements
   - Photo/Video capture points
     - Pre-installation condition
     - Key installation steps
     - Clean promise verification
     - Final results
   - Digital signatures
     - Team lead verifications
     - Customer approvals
   - Notes and comments
   - Issue documentation

5. Integration Points
   - Access to original sales order
   - Customer design specifications
   - Product inventory system
   - Quality assurance database
   - Customer relationship management
   - Warranty registration

6. Mobile Features
   - Offline capability
   - Photo/video capture
   - Digital signatures
   - Checklist management
   - Real-time updates when online
   - Push notifications
   - Team communication

7. Reporting & Analytics
   - Installation time tracking
   - Quality metrics
   - Issue frequency analysis
   - Team performance metrics
   - Customer satisfaction data
   - Before/after documentation

8. Materials Management
   - Automated materials list generation
     - Based on customer design choices
     - Standard installation supplies
     - Project-specific requirements
     - Safety equipment needs
     - Clean promise supplies
   - Inventory verification
     - Digital checklist with quantities
     - Required sign-off for each item
     - Photo documentation of materials
     - Condition verification
     - Serial number recording (where applicable)
   - Pre-installation Timeline
     - Materials verification deadline
     - Advance notice of missing items
     - Reorder triggers
     - Delivery confirmation
   - Special Requirements
     - Custom materials tracking
     - Non-standard items
     - Specialty tools needed
     - Additional supplies for complex installations

## MVP Priority Focus

### Business Context
- New business launch (Next 60 days)
- Initial market: Oklahoma City metro, Tulsa metro, Central Oklahoma communities
- Current capacity:
  - One installation crew
  - One design consultant
  - Targeting specific geographic areas

### MVP Core Tools Priority
1. Lead Generation & Conversion Tools
   - Interactive Design Tool (Shower-focused)
     - Simplified product options
     - Basic save functionality
     - Mobile-responsive design
     - Integration with lead capture

   - Price Estimation Tool
     - Basic calculation engine
     - Core product/installation pricing
     - Initial geographic pricing structure

   - Online Finance Application
     - Basic integration with finance partners
     - Simple application process
     - Quick response functionality
     - Mobile-friendly form

   - Sales Presentation Tool
     - Core presentation flow
     - Essential before/after galleries
     - Basic product demonstrations
     - Offline capability
     - Design tool integration

2. Supporting Database Requirements
   - Essential product catalog
     - Shower-specific products
     - Basic pricing structure
     - Required images
     - Minimal configuration options

### Future Expansion Considerations
[Previous gap analysis list here]
1. Product Data Management
   - Products visible to customers
   - Products/supplies visible only to installation teams
   - Product images for visualization
   - Configuration options for different contexts
   - Product relationships/compatibility rules
   - Product dimensions and specifications
   - Product stock/availability status

[Continue with other categories from your gap analysis...]

## Next Steps
Let's discuss each tool in detail, focusing on:
- Specific user stories
- Key features
- User interactions
- Business requirements
- Integration points
- Technical considerations

Which tool would you like to explore first?

## Tool Dependencies & Relationships

### Interactive Design Tool as Core Driver
1. Product Catalogue Requirements
   - Product data structure
   - Image requirements
   - Categorization system
   - Pricing tiers
   - Compatibility rules
   - Scene/visualization assets

2. Price Estimation Dependencies
   - Product pricing structure
   - Installation pricing rules
   - Package/bundle pricing
   - Regional variations
   - Promotion handling

3. Sales Presentation Integration
   - Design tool embedding
   - Offline product data
   - Saved designs access
   - Package presentations
   - Price calculations

4. Installation Tool Requirements
   - Complete product specifications
   - Installation requirements
   - Material requirements
   - Tool requirements
   - Quality control points

5. Contract/Documentation Needs
   - Product specifications
   - Design choices
   - Customer preferences
   - Installation requirements
   - Pricing breakdown

6. Data Management Implications
   - Product database structure
   - Design save format
   - Customer data integration
   - Version control
   - Promotional configurations

#### Technical Implementation Requirements

1. Scene System
   - Base Bathroom Scenes
     - High-quality 2D renders
     - Multiple layout variations
       - Left/right configurations
       - Window/no window versions
       - Different room sizes
     - Layer Structure
       - Background (walls, floor)
       - Shower area
       - Vanity area
       - Fixture/accessory positions
       - Lighting and shadows
     - Scene Metadata
       - Dimensions
       - Anchor points
       - Layer ordering
       - Lighting information

2. Product Layer System
   - Product Image Requirements
     - Transparent PNG format
     - Multiple angles where needed
     - Consistent lighting/shadows
     - Proper scale relationships
   - Layer Management
     - Position data
     - Scale information
     - Z-index ordering
     - Shadow/lighting effects
   - Asset Organization
     - Category-based structure
     - Version control
     - Optimization for web/mobile
     - Caching strategy

3. Step-Based Navigation System
   - Progressive Flow
     - Shower Base
     - Walls
     - Faucets
     - Accessories
     - Doors
     - Additional elements
   - Step Management
     - Product category filtering
     - Compatibility checking
     - Price calculations
     - Installation requirements
     - Progress tracking

4. State Management
   - Selection Tracking
     - Current choices
     - Previous selections
     - Temporary changes
   - Validation
     - Product compatibility
     - Installation feasibility
     - Price updates
   - Project Management
     - Save functionality
     - Load capability
     - Version control
     - Share options

5. Asset Creation Requirements
   - Photography/3D Rendering
     - Base scene creation
     - Product photography
     - Lighting consistency
   - Image Processing
     - Layer separation
     - Background removal
     - Shadow generation
     - Size standardization
   - Quality Control
     - Visual consistency
     - Scale accuracy
     - Performance optimization
     - Mobile compatibility

#### Scene and Product Image Creation Workflow

1. Base Scene Creation
   - Software Options:
     - Primary 3D Tools:
       - Blender (free, open-source)
       - 3ds Max
       - SketchUp
       - Cinema 4D
     - Rendering Engines:
       - KeyShot
       - V-Ray
       - Lumion
   - Process:
     - Model basic room geometry
     - Apply materials and textures
     - Set up lighting systems
     - Create camera angles
     - Render to 2D images
     - Export scene variations
   - Advantages:
     - Complete control over environment
     - Easy variation creation
     - Consistent lighting across scenes
     - Perfect perspective control
     - Reusable assets

2. Product Image Processing
   - Primary Tool: Adobe Photoshop
   - Key Techniques:
     - Background Removal:
       - Pen tool for precise edges
       - Select and Mask for complex items
       - Channel-based selections
     - Perspective Adjustment:
       - Perspective Warp tool
       - Transform tools
       - Distort/Perspective transforms
     - Lighting Match:
       - Adjustment layers
       - Shadow creation
       - Highlight adjustment
     - Integration:
       - Layer effects
       - Blending modes
       - Opacity controls

3. Alternative Product Visualization
   - 3D Product Rendering:
     - Create 3D models of products
     - Render in multiple angles
     - Perfect lighting match
     - Consistent appearance
   - Benefits:
     - Any angle available
     - Perfect lighting control
     - Consistent quality
     - Reusable assets

4. Asset Management Workflow
   - File Organization:
     - Scene variations
     - Product categories
     - Layer structures
     - Source files
   - Version Control:
     - Original assets
     - Processed versions
     - Web-optimized files
   - Quality Standards:
     - Resolution requirements
     - File format specifications
     - Naming conventions
     - Metadata requirements

### MVP Interactive Design Tool Approach

1. Simplified Visualization
   - Replace full scene rendering with selection summary view
   - Display chosen products in organized grid/list
   - Show:
     - Product category headers
     - Product names
     - Manufacturer images
     - Key specifications
     - Selected options/colors
   - Basic print/save/share functionality

2. Benefits of This Approach
   - Faster development time
   - Uses existing product catalog structure
   - No complex image processing needed
   - Works with manufacturer-provided images
   - Easier to maintain
   - Quicker to update products
   - Mobile-friendly by default

3. Core Features to Retain
   - Step-based product selection
   - Category organization
   - Save/load functionality
   - Price calculations
   - Design sharing
   - Integration with sales tools

4. Implementation Using Existing Components
   - Leverage current product catalog management
   - Use existing product card components
   - Adapt current grid layouts
   - Maintain same data structures
   - Utilize existing image handling

5. Future Scene Integration
   - Design data structure to support future scene integration
   - Document visualization requirements for later phases
   - Plan for gradual transition to full scene approach
   - Keep product data separate from visualization data

### Access Control & Lead Capture Strategy

#### Public Access Features
1. Design Tool Access
   - Full product browsing/selection
   - Complete design capability
   - Save design progress locally
   - NO pricing displayed
   - NO ability to save to account

2. Designer Package Display
   - View curated collections
   - See features/specifications
   - View style details
   - NO pricing displayed
   - NO ability to save selections

#### Lead Capture Triggers
1. Strategic CTA Points
   - "Get Price" buttons
   - "Save Design" attempts
   - "Schedule Consultation" requests
   - "Apply for Financing" links
   - "Share Design" features

2. Required Information
   - Name
   - Phone
   - Email
   - Address/ZIP (service area validation)
   - Project timeframe
   - Optional: Budget range

#### Post-Lead Features
1. User Access
   - Full pricing information
   - Design saving/loading
   - Modification history
   - Sharing capabilities
   - Financing options

2. Sales Team Integration
   - Immediate lead notification
   - Design details access
   - Customer information
   - Follow-up scheduling
   - Notes/communication log

3. Customer Communication
   - Price estimate delivery
   - Financing options
   - Consultation scheduling
   - Design confirmation
   - Follow-up process

### MVP Development Priorities

#### 1. Product Database Foundation
- Base Structure:
  - Prisma schema
  - PostgreSQL database
  - Docker containerization
- Core Product Data:
  - Basic product information
  - Categorization system
    - Marketing categories (solutions-showcase)
    - Design tool categories (component-based)
  - Product relationships
  - Required attributes
  - Images/assets

#### 2. Product Management Tools
1. Product Entry Wizard
   - Guided product addition
   - Required field validation
   - Relationship creation
   - Category assignment
   - Attribute mapping
   - Image handling

2. Catalogue Manager
   - Product listing/search
   - Edit functionality
   - Delete capability
   - Bulk operations
   - Image management
   - Category management

#### 3. Pricing System
1. Component Pricing
   - Supplier base price
   - Markup percentage
   - Price adjustment field
   - Final price calculation

2. Labor Pricing
   - Job type rates
    - Tub to shower conversion
    - Walk-in shower replacement
    - Other job types
   - Material type multipliers
    - Smart Solutions (acrylic)
    - Premium (solid surface)
    - Luxury (stone/tile)
   - Regional adjustments
   - Promotion handling

#### 4. Design Tool Configuration System
1. Tool Version Manager
   - Create new configurations
   - Edit existing versions
   - Save/load configurations
   - Version control
   - Status tracking (active/inactive)

2. Product Selection Configuration
   - Category-based product filtering
   - Include/exclude products
   - Set display order
   - Define relationships
   - Set compatibility rules

3. Version Deployment
   - URL generation
   - Page association
   - Access control
   - Analytics tracking

#### 5. Design Tool Implementation
1. Base Version (Main Site)
   - Initial choice:
     - Designer packages
     - Custom design
   - Component selection flow
   - Lead capture integration
   - Local save functionality
   - Mobile responsiveness

2. Promotional Versions
   - Limited product selection
   - Simplified flow
   - Specific pricing
   - Custom CTAs
   - Campaign tracking

### Design Tool User Flow

#### 1. Entry Point
- Welcome screen
- Value proposition
- Two clear paths:
  A. "Choose a Designer Package"
  B. "Create Your Own Design"

#### 2A. Designer Package Path
1. Package Display
   - Filtered by project type
   - Style categories
   - Price range indicators (Good/Better/Best)
   - Featured packages first
   - Quick view options

2. Package Details
   - Large product images
   - Complete specifications
   - Included components
   - Available modifications
   - "Get Price" CTA
   - "Customize This Design" option
   - "Create Your Own Instead" option

#### 2B. Custom Design Path (Bathfitter Model)
1. Initial Questions
   - Project type (Tub→Shower, Shower Update)
   - Space configuration
   - Basic requirements

2. Step-Based Selection
   - Shower Base
   - Wall System
   - Door Style
   - Fixtures/Controls
   - Accessories
   - Safety Features
   - Additional Options

3. Each Selection Step
   - Category introduction
   - Filtered options display
   - Compatible choices only
   - Preview of selection
   - Previous/Next navigation
   - Save progress option

#### 3. Common Elements (Both Paths)
1. Lead Capture Points
   - "Get Price" clicks
   - Save attempts
   - Share design
   - Request consultation

2. After Lead Capture
   - Price display
   - Financing options
   - Consultation scheduling
   - Design modification options
   - Save/share capabilities

3. Navigation Features
   - Step progress indicator
   - Save/resume
   - Edit previous choices
   - Reset options
   - Help/support access

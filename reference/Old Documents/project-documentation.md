# MAB Collections System Documentation

## 🚨 CURRENT STATE SNAPSHOT - March 19, 2024 4:00 PM

### ACTIVE ISSUE: Auth Token Security
PROBLEM:
- Auth tokens exposed in URL after Google OAuth
- URL shows: @http://0.0.0.0:3000/#access_token=[token-exposed]
- Security risk: Tokens visible in browser history

REPRODUCTION STEPS:
1. Start dev server
2. Visit /login
3. Click "Sign in with Google"
4. Complete Google auth
5. Observe token in URL after redirect

ATTEMPTED SOLUTIONS:
1. Auth Callback Route (src/app/auth/callback/route.ts):
   ```typescript
   export async function GET(request: Request) {
     const requestUrl = new URL(request.url)
     const code = requestUrl.searchParams.get('code')
     const next = requestUrl.searchParams.get('next') || '/'
   
     if (code) {
       const supabase = createRouteHandlerClient({ cookies })
       await supabase.auth.exchangeCodeForSession(code)
     }
   
     return NextResponse.redirect(new URL(next, requestUrl.origin), {
       status: 302
     })
   }
   ```

2. Login Page Config (src/app/login/page.tsx):
   ```typescript
   <Auth
     supabaseClient={supabase}
     providers={['google']}
     view="sign_in"
     showLinks={false}
     redirectTo={`${window.location.origin}/auth/callback?next=/`}
   />
   ```

CURRENT STATE:
✅ Working:
- Google OAuth flow completes
- User gets logged in
- Session persists
- Login UI displays correctly (pt-[300px] spacing)

❌ Not Working:
- Token still exposed in URL
- Hash fragment (#) remains
- Clean redirect chain

ENVIRONMENT:
```bash
# Required in .env.local:
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://nucqtzkrooiuuaisraks.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]
```

RESEARCH NEEDED:
1. Supabase Auth UI configuration options
2. Token handling best practices
3. Alternative OAuth flow patterns

NEXT STEPS:
1. Research Supabase docs for auth configuration
2. Test custom callback implementation
3. Consider client-side token cleanup

FILES TO CHECK:
1. src/app/auth/callback/route.ts - Main callback handler
2. src/app/login/page.tsx - Login UI configuration
3. src/providers/auth-provider.tsx - Session management

TEST ACCOUNT:
- Email: rjpruitt@gmail.com
- Provider: Google
- Status: Working but needs URL cleanup

DEBUGGING CONTEXT:
- Token appears after Google OAuth redirect
- Happens before our callback route executes
- Likely default Supabase Auth UI behavior
- No console errors present

RELATED DOCUMENTATION:
- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- Next.js Auth Helpers: https://supabase.com/docs/guides/auth/auth-helpers/nextjs

## Quick Resume Notes

### Current Priority & State
CRITICAL RESUME CONTEXT - Auth Token Issue (March 19, 2024)

Current Problem:
- After Google OAuth login, tokens are exposed in URL
- URL pattern showing: @http://0.0.0.0:3000/#access_token=[full-token-exposed]
- This is a security issue that needs immediate fixing

Last Actions Taken:
1. Implemented auth callback route (src/app/auth/callback/route.ts)
2. Added status 302 to redirect
3. Modified login page redirect URL
But: Still seeing token in URL

Files Modified:
1. src/app/auth/callback/route.ts:
   - Added next param handling
   - Added 302 status to redirect
   - Exchanging code for session

2. src/app/login/page.tsx:
   - Added window.location.origin for redirect
   - Set view="sign_in"
   - Added pt-[300px] for header clearance

3. .env.local:
   - Verified NEXT_PUBLIC_SITE_URL=http://localhost:3000
   - Supabase credentials are correct and working

What's Working:
- Google OAuth completes successfully
- User gets logged in
- Session persists
- Login UI displays correctly

What's Not Working:
- Clean URL after auth
- Token security (exposed in URL)
- Proper redirect chain

Next Session Tasks:
1. Research Supabase auth flow options
2. Test different redirect strategies
3. Consider implementing custom callback handling

Test Account Ready:
- Email: rjpruitt@gmail.com
- Auth: Working with Google
- Can reproduce issue consistently

To Resume Work:
1. Start dev server
2. Visit /login
3. Try Google sign-in
4. Watch URL for token exposure
5. Check browser console for errors

## Current Session Context (Last Updated: [Current Date])

### Active Development Branch
- Currently working in main branch
- No feature branches yet

### Test Users
- Primary test account: [specific email used for testing]
- Additional test users needed for share testing

### Current Implementation Choices
1. Auth Flow:
   - Using redirect (not popup) for OAuth
   - No custom auth UI components yet
   - Session management in client only

2. Database Access:
   - Direct Supabase client calls (no API routes yet)
   - Need to move to API routes for better error handling
   - Currently using anon key for all operations

3. Type Safety:
   - Manual types in products.ts
   - Need to generate Supabase types
   - Some any types in auth handling need fixing

### Debugging Notes
- Google OAuth errors show in console only
- Collection service needs better error logging
- Auth state changes not properly tracked

### Last Working Commit
- Test UI with Google auth working
- Layout fixes implemented
- Basic collection service structure

### Paused/Postponed Work
1. Email service implementation
   - Needs provider decision
   - Templates not started

2. Share functionality
   - Database schema ready
   - UI not started
   - Need to implement expiration logic

3. Product Management
   - Types defined
   - UI not started
   - Need to implement selection interface

### Environment Setup Notes
1. Local Development:
   - Running on localhost:3000
   - Supabase running locally not required
   - Google OAuth needs local setup

2. Required Extensions/Tools:
   - Supabase VS Code extension recommended
   - React DevTools needed for auth debugging

### Database Workspace
- Project: nucqtzkrooiuuaisraks
- Region: [add region]
- Current tables created but no data
- No migrations implemented yet

### Authentication Flow Details
```typescript
// Current auth pattern in use:
supabase.auth.signInWithOAuth({ 
  provider: 'google',
  options: {
    redirectTo: 'http://localhost:3000/test/collections'
  }
})

// Session handling pattern:
const [session, setSession] = useState<Session | null>(null)
const [authLoading, setAuthLoading] = useState(true)
```

### UI Component Status
1. /test/collections/page.tsx
   - Basic auth flow working
   - Needs collection creation
   - Needs error handling

2. Layout Components
   - Header spacing fixed
   - No auth-aware navigation yet
   - Need to implement protected routes

### API Implementation Plan
- Currently direct Supabase calls
- Need to move to API routes:
  ```typescript
  // Planned structure:
  /api/collections
  /api/collections/[id]
  /api/collections/[id]/products
  /api/collections/[id]/share
  ```

### Just Completed
- Set up Google OAuth with external testing mode
- Implemented basic auth flow in test UI
- Fixed layout issues with header overlap (pt-24 spacing)
- Removed duplicate HTML tags in test layout

### Current Task
Working on auth implementation and testing. Specifically:
- Test UI at /test/collections showing auth flow
- Sign in/out working with Google
- Collections loading after auth (but empty due to permissive RLS)

### Known Working State
```typescript
// Test UI Location: src/app/test/collections/page.tsx
// Current working implementation includes:
- Session management with loading states
- Google OAuth sign in button
- Sign out functionality
- Collection refresh button
```

### Recent Changes
1. Layout fixes:
   ```typescript
   // src/app/test/layout.tsx
   <div className="min-h-screen bg-white pt-24">
     {children}
   </div>
   ```

2. Auth configuration:
   - Google OAuth set up as External
   - Test user(s): [List test emails]
   - Redirect URI: https://nucqtzkrooiuuaisraks.supabase.co/auth/v1/callback

### Immediate TODOs
1. Add proper collection creation back to test UI
2. Implement proper RLS based on auth
3. Test collection loading with authenticated user

### Current Issues Being Tracked
1. RLS policies too permissive
2. Need to implement collection creation
3. Auth error handling needs improvement
4. Collection service needs type safety improvements

## Project Overview

A collection management system allowing customers to create, share, and manage product collections. Built with Next.js, Supabase, and TypeScript.

### Key Features
- Google Authentication
- Collection CRUD operations
- Share collections with expiration
- Email notifications for shares
- Product selection and quantity tracking

### Current Status
- ✅ Basic database schema implemented
- ✅ Google Auth working
- ✅ Test UI with auth flow
- ⏳ RLS policies need refinement
- ⏳ Email service not implemented
- ⏳ Share functionality not tested

### Known Issues
1. Need proper error handling for auth failures
2. Collection service needs proper type checking
3. RLS policies are too permissive for production

## Implementation Details

### File Structure and Dependencies
```
src/
├── lib/
│   ├── services/
│   │   ├── collection-service.ts    # Main collection operations
│   │   ├── email-service.ts         # Not implemented yet
│   │   └── service-provider.ts      # Service instantiation
│   └── supabase.ts                  # Supabase client config
├── types/
│   ├── products.ts                  # Core type definitions
│   └── supabase.ts                  # DB types (needs generation)
└── app/
    └── test/
        └── collections/
            └── page.tsx             # Test UI implementation
```

### Database Schema Details

#### Collections Table
```sql
create table collections (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  description text,
  created_by_id text not null,
  created_by_type text not null check (created_by_type in ('customer', 'staff')),
  status text not null default 'draft',
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Key Decisions:
- Using text IDs for compatibility with Supabase Auth
- created_by_type supports future staff accounts
- Soft delete not implemented yet - considering for future

#### Current RLS Policies (Testing)
```sql
-- Temporary permissive policies
create policy "Public read access"
  on collections for select using (true);
```

TODO: Implement proper policies based on user_id and sharing

### Service Implementation Status

#### Collection Service
- ✅ Basic CRUD operations
- ✅ List collections by user
- ⏳ Share functionality
- ⏳ Product management
- ⏳ Error handling

Current implementation uses:
```typescript
interface Collection {
  id: string;
  name: string;
  description?: string;
  createdBy: {
    id: string;
    type: 'customer' | 'staff';
  };
  // ... see types/products.ts for full interface
}
```

#### Authentication Implementation
Currently using Supabase Auth with Google OAuth only. Test implementation in:
`src/app/test/collections/page.tsx`

Key Implementation Notes:
- Session management in client components
- No server-side auth checking yet
- Need to implement proper error boundaries
- Currently using basic redirect flow

### Critical Decisions Made
1. Using text IDs instead of UUID type for better Supabase compatibility
2. Opted for External OAuth for development flexibility
3. Keeping RLS permissive during initial development
4. Postponed email service implementation
5. Collection sharing designed but not implemented

### Current Development State
Working:
- ✅ Google Auth flow
- ✅ Basic collection creation
- ✅ User session management
- ✅ Test UI with auth protection

Not Working:
- ❌ Email notifications
- ❌ Share functionality
- ❌ Proper error handling
- ❌ Collection product management

### Environment Requirements
1. Supabase Project with:
   - Database created
   - Auth enabled
   - Google OAuth configured
2. Environment Variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
   ```

### Immediate Development Context
Currently working on:
1. Implementing proper RLS policies
2. Adding error handling to collection service
3. Setting up email notification structure

Next planned implementation:
1. Share functionality
2. Product management in collections
3. Email service integration

## Next Steps

### Immediate Tasks
1. Implement stricter RLS policies:
   - Users can only read their own collections
   - Shared collections accessible to shared users
   - Email notifications restricted appropriately

2. Add error handling:
   - Auth failures
   - Database operations
   - Share operations

3. Implement email service:
   - Share notifications
   - Expiration warnings
   - Share removal notifications

### Future Improvements
1. Add more auth providers
2. Implement rate limiting
3. Add user roles (admin, staff)
4. Add collection analytics

## Development Notes

### Testing
- Currently using test UI at /test/collections
- Google auth working in development
- Collections API needs error handling
- Share functionality not yet tested

### Security Considerations
- RLS policies need review
- Auth tokens handled by Supabase
- Need to implement proper CORS
- API rate limiting required

### Performance Notes
- No indexes yet on database
- Need to optimize collection queries
- Consider caching for shared collections

## Questions to Resolve
1. How to handle collection share expiration?
2. What email service to use?
3. How to implement proper error boundaries?
4. Should we add more auth providers?

## Reference Links
- [Supabase Dashboard](https://app.supabase.com)
- [Google Cloud Console](https://console.cloud.google.com)
- [Next.js Docs](https://nextjs.org/docs)

### Current Development Flow
1. Using test UI at /test/collections for all feature testing
2. No staging environment yet - all work in development
3. Manual testing process:
   - Start local server
   - Sign in with test account
   - Check browser console for errors
   - Verify database state in Supabase dashboard

### Critical Dependencies
```json
{
  "@supabase/supabase-js": "latest",
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x"
}
```

### Current Supabase Project
- Dashboard: https://app.supabase.com/project/nucqtzkrooiuuaisraks
- Project Reference ID: nucqtzkrooiuuaisraks
- Database: PostgreSQL 15.1
- Region: us-west-1

### Test Data Requirements
Need to create:
1. Test collections for authenticated user
2. Shared collections for testing access
3. Collections with products for UI testing

### Known Gotchas
1. Auth redirect must match Supabase settings exactly
2. RLS policies affect all service operations
3. Session state resets on page refresh
4. Layout spacing affects auth UI visibility

### Current Development Limitations
1. Supabase Free Tier Constraints:
   - Limited to 500MB database
   - Rate limits on auth operations
   - Edge function limitations

2. Local Development Constraints:
   - No local Supabase instance
   - Must use production database
   - Limited offline development capability

### Rollback Plan
If issues occur:
1. Auth: Revert to permissive RLS
2. Database: SQL backup available in documentation
3. UI: Test page provides minimal working example

### Development Shortcuts
```bash
# Quick start commands
npm run dev        # Start development server
npm run build     # Verify production build

# Useful URLs
http://localhost:3000/test/collections    # Test UI
https://app.supabase.com/project/nucqtzkrooiuuaisraks/auth/users  # User management
```

### Branch Strategy
- Currently all work in main
- Need to implement:
  - feature/* for new features
  - fix/* for bug fixes
  - release/* for version management

### Error Codes and Handling
```typescript
// Common error patterns we're seeing:
1. Auth Errors:
   - 400: "validation_failed" - Provider not enabled
   - 401: "Unauthorized" - Invalid/expired session

2. Database Errors:
   - RLS policy violations
   - Foreign key constraints
   - Unique constraint violations

// Current error handling pattern
try {
  // operation
} catch (err) {
  console.error('Context:', err)
  setError(err instanceof Error ? err.message : 'Unknown error')
}
```

### Testing Checklist
Before committing changes:
1. Auth Flow
   - [ ] Sign in works
   - [ ] Sign out works
   - [ ] Session persists on refresh
   - [ ] Redirect works correctly

2. Database Operations
   - [ ] Collections load
   - [ ] RLS policies working
   - [ ] No console errors

### Debug Commands
```bash
# Supabase CLI (when implemented)
supabase start    # Start local instance
supabase db reset # Reset database

# Database Queries
select * from auth.users;              # Check users
select * from collections;             # Check collections
select * from collection_shares;       # Check shares
```

### Recovery Steps
If development environment breaks:
1. Clear browser storage
2. Reset database (backup in schema)
3. Recreate test user
4. Verify environment variables

### Test UI Development Strategy

#### Why /test/collections?
- Isolated from main application
- Quick iteration on features
- Easy to reset/modify without affecting production
- Clear separation of concerns

#### Current Test UI Pattern
```typescript
// Three-state pattern we're using:
1. Loading state (authLoading)
2. Unauthenticated state (!session)
3. Authenticated state (session)

// Data loading pattern
const [collections, setCollections] = useState<Collection[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string>()

// This pattern to be used for all new features
```

#### Test UI Location Strategy
```
/test/
├── collections/     # Collection management testing
├── products/        # Product selection (planned)
└── sharing/         # Share functionality (planned)
```

#### Development Order
1. Implement in test UI
2. Verify functionality
3. Add error handling
4. Move to production UI

### Current Development Session (March 19, 2024)

#### Just Completed in This Session
- Fixed Google OAuth setup and configuration
- Resolved layout issues with header overlap
- Implemented basic auth flow in test UI
- Updated documentation with full context

#### Next Actions (In Priority Order)
1. Re-implement collection creation with auth
   ```typescript
   // Pattern to implement
   async function handleCreateCollection() {
     if (!session?.user) return
     // Add collection with authenticated user
   }
   ```

2. Test and verify RLS with authenticated operations
   ```sql
   -- Policies to implement
   create policy "Users can create their own collections"
     on collections for insert
     with check (auth.uid() = created_by_id);
   ```

3. Add error boundaries around auth components

#### Known Working State at Session End
- Google Auth configured and tested
- Test UI showing auth states correctly
- Layout issues resolved
- Documentation updated

### SQL Schema Verification
Run these queries to verify database state:
```sql
-- Check table structure
\d collections
\d collection_products
\d collection_shares
\d email_notifications

-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check existing policies
SELECT * FROM pg_policies;
```

### Current Test User Details
```typescript
// Test accounts configured:
const testUsers = {
  primary: "your.test@email.com",    // Has collections
  share: "share.test@email.com",     // For testing shares
  viewer: "viewer.test@email.com"    // For testing view access
}
```

### Development Timeline
- March 19: Auth implementation and testing
- March 20 (planned): Collection creation and RLS
- March 21 (planned): Share functionality

### Required Environment State
```bash
Node version: v18.x
NPM version: 9.x
Database: PostgreSQL 15.1
Supabase CLI: latest
```

### Component Patterns Established

#### Error Boundary Pattern
```typescript
// To be implemented around auth components
class AuthErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  render() {
    if (this.state.hasError) {
      return <AuthErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

#### Loading States Pattern
```typescript
// Consistent loading state management
interface LoadingState {
  loading: boolean
  authLoading: boolean
  dataLoading: boolean
  error?: string
}

// Usage pattern in components
const [loadingState, setLoadingState] = useState<LoadingState>({
  loading: true,
  authLoading: true,
  dataLoading: false
})
```

#### Auth Component Wrapper Pattern
```typescript
// To be used for all authenticated components
const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const [session, setSession] = useState<Session | null>(null)
    // ... auth logic
    if (!session) return <SignIn />
    return <Component {...props} session={session} />
  }
}
```

### Current Code Patterns to Maintain
1. Error Handling:
   - Always use try/catch with context
   - Log errors before UI display
   - Use error boundaries for auth

2. Auth Flow:
   - Check session before operations
   - Handle loading states
   - Clear data on sign out

3. Database Operations:
   - Verify RLS before queries
   - Include user context
   - Handle constraint violations

### Version Control and Deployment Notes

#### Current Git Strategy
```bash
# Currently in main branch
# Before creating feature branches:
git tag v0.1.0-auth    # Tag current working auth implementation
git push origin v0.1.0-auth

# For next features
git checkout -b feature/collection-creation
git checkout -b feature/rls-policies
```

#### Deployment Considerations
1. Environment Variables:
   - Different Supabase projects for dev/prod
   - OAuth redirects need updating
   - Service role key security

2. Database Migrations:
   - Need to implement migration strategy
   - Consider using Supabase CLI
   - Document RLS policy changes

3. Testing Requirements:
   - Auth flow in production
   - RLS policies verification
   - Rate limit testing

#### Rollback Procedures
```bash
# If auth implementation breaks
git checkout v0.1.0-auth

# Database rollback
-- Saved in schema.sql
drop table if exists email_notifications cascade;
drop table if exists collection_shares cascade;
drop table if exists collection_products cascade;
drop table if exists collections cascade;
```

### Monitoring and Debugging Setup

#### Development Tools Required
```bash
# Browser Extensions
- React Developer Tools
- Redux DevTools (for future state management)
- Supabase VS Code Extension

# CLI Tools
- Supabase CLI
- PostgreSQL client
```

#### Logging Strategy
```typescript
// Current logging pattern
console.error('[Context]', {
  error,
  userId: session?.user?.id,
  operation: 'collection.create'
})

// To be implemented
interface LogEntry {
  context: string
  error?: Error
  userId?: string
  operation: string
  timestamp: Date
}
```

#### Monitoring Points
1. Auth Flow:
   - OAuth redirect success/failure
   - Session establishment
   - Token refresh

2. Database Operations:
   - RLS policy blocks
   - Query performance
   - Connection issues

3. UI State:
   - Loading states
   - Error boundaries
   - Session management

### Test UI Implementation Details

#### Current Working Implementation
```typescript
// src/app/test/collections/page.tsx
// Key implementation patterns that work:

// 1. Session Management
const [session, setSession] = useState<Session | null>(null)
const [authLoading, setAuthLoading] = useState(true)

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
    setAuthLoading(false)
  })
}, [])

// 2. Layout Fix
// src/app/test/layout.tsx
<div className="min-h-screen bg-white pt-24">
  {children}
</div>

// 3. Collection Loading
async function loadCollections() {
  if (!session?.user) return
  // ... implementation
}
```

#### Test UI State Machine
```
Initial -> Checking Auth -> [No Session] -> Sign In -> Redirect -> Authenticated
                        -> [Has Session] -> Load Collections
```

#### Current Limitations
1. No error recovery - page refresh required
2. Session state not persisted
3. No loading indicators for operations
4. Basic styling only

#### Next UI Improvements
1. Add loading spinners
2. Implement error recovery
3. Add collection creation form
4. Improve responsive design

### Current Test Environment State

#### Active Test User
```typescript
// Currently testing with:
const primaryTestUser = {
  email: "your.test@email.com",
  id: "[user-id from Supabase]", // Need for debugging
  provider: "google"
}
```

#### Test Environment URLs
```bash
# Development
http://localhost:3000/test/collections

# Supabase Project
https://nucqtzkrooiuuaisraks.supabase.co

# OAuth Redirect
https://nucqtzkrooiuuaisraks.supabase.co/auth/v1/callback
```

#### Last Verified Working State
Timestamp: [Current DateTime]
- Auth flow working
- Layout fixed
- Collection loading implemented
- Documentation updated

#### Next Session Start
1. Verify auth still working
2. Implement collection creation
3. Test with authenticated user
4. Add proper RLS policies
```

## Product Import Implementation

### Overview
The product import functionality allows searching and importing products from Home Depot (and potentially Lowes) using the Unwrangle API service.

### Key Components

#### ImportProductImage Component
Located in `src/components/ui/import-product-image.tsx`, this component handles product images from external sources:
```typescript
interface ImportProductImageProps {
  thumbnails?: string[]
  alt: string
  className?: string
}
```
- Uses Next.js Image component for optimization and CORS handling
- Implements fallback behavior for failed image loads
- Handles multiple thumbnails with automatic fallback

#### Next.js Configuration
The `next.config.js` requires specific configuration for external images:
```javascript
{
  images: {
    unoptimized: true,
    domains: [
      'images.thdstatic.com'  // Home Depot CDN
    ]
  }
}
```

#### Product Types
Updated Product interface in `src/types/products.ts` includes:
```typescript
export interface Product {
  id: string
  name: string
  brand?: string
  model_no?: string
  price?: number
  url?: string
  thumbnails?: string[]
  // ... other fields
}
```

### Implementation Details

1. Image Loading Strategy:
   - Uses Next.js Image component with `fill` property
   - Implements progressive fallback for failed images
   - Handles CORS through Next.js image optimization

2. Search Results Display:
   - Responsive grid layout (1/2/3 columns)
   - Pagination support
   - Error handling and loading states

3. Data Flow:
   ```
   Search Input -> Unwrangle API -> Parse Results -> Display Products
   ```

### Usage Example
```typescript
<ImportProductImage
  thumbnails={product.thumbnails}
  alt={product.name}
  className="mb-4"
/>
```

### Known Issues & Solutions
1. CORS Warnings:
   - Browser extensions may show CORS errors in console
   - These don't affect functionality due to Next.js Image handling

2. Image Loading:
   - Multiple fallback thumbnails handled automatically
   - Placeholder image shown as last resort

### Future Improvements
1. Error Boundaries for image loading failures
2. Loading skeletons for images
3. Image caching layer
4. Additional retailer support (Lowes, etc)

### API Integration
The Unwrangle service handles product data fetching:
```typescript
const data = await unwrangleService.searchHomeDepot({ 
  search, 
  page 
})
```

### Related Files
- `src/app/test/products/import/page.tsx` - Main import page
- `src/components/ui/import-product-image.tsx` - Image component
- `src/types/products.ts` - Type definitions
- `next.config.js` - Next.js configuration
- `src/lib/services/unwrangle-service.ts` - API service

### Notes
- Keep image optimization enabled in production
- Monitor image loading performance
- Consider implementing image caching for frequently accessed products

### Browser Extension Considerations
- CORS warnings in console are expected from browser extensions
- These warnings don't affect functionality
- Extensions trying to scan product images may show errors

### Image Loading Strategy Details
```typescript
// Progressive fallback strategy:
1. Try first thumbnail from array
2. On failure, try next thumbnail
3. Finally fall back to placeholder

// Implementation in ImportProductImage:
const handleImageError = () => {
  if (thumbnails && currentImageIndex < thumbnails.length - 1) {
    setCurrentImageIndex(currentImageIndex + 1)
  } else {
    setError(true)
  }
}
```

### Unwrangle API Response Format
```typescript
interface UnwrangleSearchResponse {
  success: boolean
  store_no: string
  zipcode: string
  search: string
  page: number
  total_results: number
  no_of_pages: number
  result_count: number
  results: {
    id: string
    name: string
    model_no: string
    url: string
    brand: string
    thumbnails: string[]
    price: number
    currency: string
    rating?: number
    total_reviews?: number
    inventory_quantity?: number
  }[]
}
```

### Development Testing
1. Test search terms:
   - "M18 Inflator" - Multiple product variations
   - "Milwaukee Tools" - Large result set
   - "Ryobi" - Different brand testing

2. Image URL patterns to verify:
   - Product thumbnails load correctly
   - Fallback behavior works
   - Placeholder shows when appropriate

### Error Handling and Debugging

#### Common Issues
1. CORS Errors in Console:
   ```
   Access to image at 'https://images.thdstatic.com/...' from origin 'http://localhost:3000' 
   has been blocked by CORS policy
   ```
   - These errors are from browser extensions
   - Don't affect functionality
   - Can be ignored in development

2. Image Loading Failures:
   ```typescript
   // Handled automatically by ImportProductImage:
   - First thumbnail fails -> Try next thumbnail
   - All thumbnails fail -> Show placeholder
   - Network issues -> Show placeholder
   ```

#### Debugging Steps
1. Verify Next.js Config:
   ```javascript
   // next.config.js must include:
   images: {
     domains: ['images.thdstatic.com']
   }
   ```

2. Check Response Data:
   ```typescript
   // Verify thumbnails array in product data:
   console.log('Product data:', {
     id: product.id,
     thumbnails: product.thumbnails
   })
   ```

3. Monitor Network Tab:
   - Check image request responses
   - Verify CDN URLs are correct
   - Look for 404 or CORS errors

#### Performance Considerations
1. Image Optimization:
   - Next.js handles resizing
   - Caching headers respected
   - Progressive loading with fill

2. Memory Management:
   - Clear error states on unmount
   - Reset image indexes when data changes
   - Handle component cleanup properly

### Current Working State (March 19, 2024)

#### What's Working
- Product search with pagination
- Image loading with fallbacks
- Basic error handling
- Responsive grid layout

#### Known Limitations
1. No loading states during search
2. No error boundaries around image components
3. No image caching (every page load refetches)
4. Limited to Home Depot products

#### Test Cases That Pass
```typescript
// Search terms that work well:
- "M18 Inflator"      // Multiple variations, good for testing thumbnails
- "Milwaukee Tools"    // Large result set, tests pagination
- "Ryobi"             // Different brand, tests image loading

// Image loading scenarios that work:
- Multiple thumbnails -> Falls back correctly
- No thumbnails -> Shows placeholder
- Network issues -> Shows placeholder
```

#### Ready for Implementation
1. Error Boundaries:
   - Around image components
   - Around search results
   - With proper fallback UI

2. Loading States:
   - During search
   - During image loading
   - Between pagination

3. Image Caching:
   - Browser-level caching
   - Next.js image optimization
   - Cache invalidation strategy

#### Component Dependencies
```typescript
// Current component dependencies:
import { ImportProductImage } from '@/components/ui/import-product-image'
import { PLACEHOLDER_IMAGE } from './constants'
import { unwrangleService } from '@/lib/services/service-provider'

// Planned new components:
- ProductImageErrorBoundary
- LoadingSpinner
- ImageSkeleton
- CachedImage
```

### Unwrangle Service Integration Details

#### Service Configuration
```typescript
// Environment variables required:
UNWRANGLE_API_KEY=xxx
UNWRANGLE_API_URL=https://api.unwrangle.com/api/v1

// Service initialization pattern:
const unwrangleService = new UnwrangleService({
  apiKey: process.env.UNWRANGLE_API_KEY,
  apiUrl: process.env.UNWRANGLE_API_URL
})
```

#### API Rate Limits
- 100 requests per minute
- 1000 requests per day
- Consider implementing request queuing

#### Error Handling Patterns
```typescript
// Common Unwrangle API errors:
- 429: Rate limit exceeded
- 401: Invalid API key
- 400: Invalid search parameters

// Error handling strategy:
try {
  const results = await unwrangleService.searchHomeDepot(params)
} catch (err) {
  if (err.status === 429) {
    // Implement retry with backoff
  }
  // Log error and show user-friendly message
}
```

#### Search Parameters
```typescript
interface SearchParams {
  search: string           // Search query
  page?: number           // Pagination (1-based)
  store_no?: string       // Optional store location
  zipcode?: string        // Optional location filter
}
```

#### Response Caching Strategy
To be implemented:
```typescript
// Cache search results:
const cacheKey = `search:${query}:${page}`
const cachedResults = await cache.get(cacheKey)

// Cache individual product data:
const productKey = `product:${id}`
const cachedProduct = await cache.get(productKey)
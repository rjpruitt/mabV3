export interface ProductImage {
  id: string
  sourceUrl: string           
  localUrl?: string          
  thumbnailUrl?: string      
  alt: string
  isPrimary: boolean
  width?: number
  height?: number
  status: 'pending' | 'cached' | 'failed'
  lastChecked?: Date
}

export interface ProductSpecification {
  name: string
  value: string
  group?: string
}

export type ProductSource = 'homedepot' | 'lowes'
export type ProductStatus = 'pending' | 'active' | 'inactive' | 'discontinued'

export interface ProductPrice {
  retail: number          // Original retailer price
  reduced?: number        // Retailer sale price if any
  markup: number         // Our markup percentage
  calculated: number     // Our selling price
  currency: string       // Usually 'USD'
  lastUpdated: Date
}

export interface ProductInventory {
  isInStock: boolean
  quantity?: number
  storeId?: string
  storeName?: string
  lastChecked: Date
  status: 'available' | 'limited' | 'unavailable'
}

export type BathroomCategory = 
  | 'faucets'
  | 'showers'
  | 'bathtubs'
  | 'toilets'
  | 'vanities'
  | 'lighting'
  | 'accessories'
  | 'hardware'
  | 'wall_panels'
  | 'glass_doors'

export interface Product {
  id: string
  name: string
  brand?: string
  model_no?: string
  url?: string
  thumbnails?: string[]
  source: ProductSource
  externalId: string
  sourceUrl: string
  description: string
  category: BathroomCategory
  specifications: ProductSpecification[]
  images: ProductImage[]
  price: ProductPrice | number | undefined
  inventory: ProductInventory
  status: ProductStatus
  isActive: boolean
  lastUpdated: Date
  metadata?: Record<string, any>
}

export interface ProductImport {
  source: ProductSource
  sourceData: any        // Raw data from Unwrangle
  processedAt: Date
  status: 'pending' | 'processed' | 'failed'
  error?: string
}

export type CollectionStatus = 'draft' | 'shared' | 'archived'
export type CollectionShareType = 'view' | 'edit'

export interface EmailNotification {
  id: string
  type: 'share' | 'removal' | 'expiration_warning'
  shareId: string
  collectionId: string
  recipient: string
  sentAt: Date
  status: 'sent' | 'failed'
  error?: string
}

export interface CollectionShare {
  id: string
  collectionId: string
  sharedBy: string
  sharedWith: string
  type: CollectionShareType
  createdAt: Date
  expiresAt?: Date
  notifications?: EmailNotification[]  // Track emails sent for this share
  lastWarningAt?: Date  // Track when last expiration warning was sent
}

export interface Collection {
  id: string
  name: string
  description?: string
  createdBy: {
    id: string
    type: 'customer' | 'staff'
  }
  products: {
    productId: string
    quantity: number
    selectedOptions?: Record<string, string>
  }[]
  status: CollectionStatus
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  theme?: string
  style?: string
  shares?: CollectionShare[]
} 
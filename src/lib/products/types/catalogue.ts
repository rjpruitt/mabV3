/**
 * Product Catalogue Types
 * Type definitions for the product catalogue system
 * 
 * Core Types:
 * - CatalogueProduct: Main product interface
 * - ProductImage: Product image with visibility settings
 * - ProductVisibility: Access control and promotion settings
 * - DesignToolConfig: Design tool integration settings
 * - ProductVariation: Product variations (color, finish, size)
 * 
 * Form Types:
 * - CatalogueFormData: Form state for product management
 * - ProductVariant: Variant relationship data
 * 
 * Related Types:
 * - SupplierData: Supplier-specific product data
 * - SupplierPricing: Pricing information from suppliers
 * 
 * Note: Maintains backward compatibility with existing systems
 */

import { ComponentType } from '@/lib/types/product-types'
import { SupplierPricing } from './pricing'
import type { Prisma } from '@prisma/client'

// Remove re-export and define interface directly
export interface SupplierData {
  supplierId: string
  supplierName: string
  productName: string
  productDescription: string
  internetNumber: string
  itemNumber: string
  modelNumber: string
  listPrice: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  source: 'supplier' | 'custom'
  isPrimary: boolean
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  file?: File
}

export interface ProductVisibility {
  showToCustomer: boolean
  showToTeam: boolean
  roles?: string[]
  promotions?: Array<{
    id: string
    startDate?: Date
    endDate?: Date
    landingPages?: string[]
  }>
  designTools?: Array<{
    id: string
    pricingTiers: string[]
    isDefault?: boolean
  }>
}

export interface DesignToolConfig {
  format: 'KIT' | 'INDIVIDUAL_COMPONENT'
  topCategory: string
  componentType?: ComponentType
  includedComponents: string[]
}

export interface ProductVariation {
  type: 'color' | 'finish' | 'size'
  value: string
}

// Add these interfaces back
export interface ProductDescription {
  marketing: string
  internal: string
  supplier: string
}

export interface ProductCategorization {
  [key: string]: string | string[]
  style: string[]
  type: string[]
}

// Main product interface
export interface CatalogueProduct {
  id: string
  name: string
  description: ProductDescription
  brand: string
  categorization: ProductCategorization
  designTool: DesignToolConfig
  specifications: Record<string, any>
  variations?: ProductVariation[]
  
  // Relationships
  images: ProductImage[]
  supplierData?: SupplierData[]
  visibility: ProductVisibility
  
  createdAt: Date
  updatedAt: Date
}

// Form data interface (maintaining existing structure for compatibility)
export interface ProductVariant {
  parentId?: string
  type: string | null
  value: string
}

export interface Specification {
  name: string
  value: string
  source: 'supplier' | 'custom'
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
}

export interface CatalogueFormData {
  id?: string
  name: string
  brand: string
  supplierData: SupplierData[]
  variant?: {
    parentId?: string
    type: 'color' | 'finish' | 'size' | null
    value: string
  }
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  classification: {
    categories: string[]
    type: string
  }
  designTool: {
    enabled: boolean
    config?: Record<string, any>
  }
  priceLevel: 'Smart Solutions' | 'Premium' | 'Luxury'
  images: Array<{
    id: string
    url: string
    alt: string
    isPrimary: boolean
    source: 'supplier' | 'custom'
    visibility: {
      showToCustomer: boolean
      showToSalesRep: boolean
    }
  }>
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  categorization: {
    categories: string[]
    type: string
    style?: string[]
  }
  specifications: Specification[]
  patterns: Array<{
    id: string
    name: string
    thumbnail: {
      url: string
      localPath: string
    }
    images: Array<{
      url: string
      alt: string
      view: string
      localPath: string
      isPrimary: boolean
    }>
  }>
  choices?: Array<{
    category: string
    productId: string
  }>
} 
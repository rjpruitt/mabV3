/**
 * Product Import Types
 * Type definitions for the product import system
 * 
 * Core Types:
 * - ImportData: Product data with import metadata
 * - ImportResult: Results of import operation
 * - ImportValidation: Validation results and transformed data
 * 
 * Features:
 * - Tracks import source and timing
 * - Validation error collection
 * - Import status tracking
 * - Detailed error reporting
 * - Warning collection for non-blocking issues
 * 
 * Import Statuses:
 * - pending: Initial state
 * - validated: Data passed validation
 * - imported: Successfully imported
 * - error: Import failed
 */

import type { Prisma } from '@prisma/client'
import type { ProductImage, SupplierData } from './catalogue'

export interface ImportedProduct {
  name: string
  brand: string
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  categorization: Record<string, unknown>
  specifications: Record<string, unknown>
  images: ProductImage[]
  supplierData: SupplierData[]
}

export interface ImportFormData {
  name: string
  brand: string
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  source: {
    url: string
    supplierId: string
  }
  images: ProductImage[]
  supplierData: SupplierData[]
  categorization: Record<string, unknown>
  specifications: Record<string, unknown>
  rawData?: unknown
}

export interface ScrapedProductDimensions {
  width: number
  depth: number
  height: number
}

export interface ScrapedProductMetadata {
  dimensions: ScrapedProductDimensions
  productType: string
  scrapedAt: string
}

export interface ScrapedProductSpecifications {
  dimensions: ScrapedProductDimensions
  material: string
  finish: string
  color: string
  weight: string
  warranty: string
  certifications?: string[]
  features: string[]
  technicalSpecs: Array<{
    name: string
    value: string
  }>
}

export interface ScrapedProductImage {
  url: string
  alt: string
  isPrimary: boolean
  source: 'supplier'
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
}

export interface PatternImage {
  url: string
  alt: string
  view: string
  localPath: string
  isPrimary: boolean
}

export interface Pattern {
  id: string
  name: string
  thumbnail: {
    url: string
    localPath: string
  }
  images: PatternImage[]
  order: number
}

export interface ScrapedProduct {
  name: string
  brand: string
  url: string
  metadata: ScrapedProductMetadata
  specifications: ScrapedProductSpecifications
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  categorization: {
    categories: string[]
    type: string[]
    style: string[]
  }
  images: ScrapedProductImage[]
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  priceLevel: 'Smart Solutions' | 'Premium' | 'Luxury'
  patterns: Pattern[]
} 
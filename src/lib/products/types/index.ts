/**
 * Product Types Index
 * Central export point for all product-related type definitions
 * Defines core ProductBase interface and re-exports from sub-modules
 */

import { ProductDescription, ProductCategorization } from './catalogue'

// Core product types that are shared across systems
export interface ProductBase {
  name: string
  brand: string
  description: ProductDescription
  categorization: ProductCategorization
  specifications: Array<{
    name: string
    value: string
    source: 'supplier' | 'custom'
    visibility?: {
      customer?: boolean
      team?: boolean
    }
  }>
  images: Array<{
    id: string
    url: string
    alt: string
    isPrimary?: boolean
    source: 'supplier' | 'custom'
    visibility?: {
      customer: boolean
      team: boolean
    }
  }>
}

// Re-export everything
export * from './catalogue'
export * from './design'
export * from './pricing'
export * from './lead'
export * from './supplier' 
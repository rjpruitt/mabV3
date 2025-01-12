/**
 * Product Pricing Types
 * Type definitions for product pricing and cost management
 * 
 * Core Types:
 * - PricingConfig: Product pricing configuration with markups
 * - PriceAdjustment: Temporary or permanent price adjustments
 * - SupplierPricing: Supplier-provided pricing information
 * - SavedPricing: Calculated final pricing with components
 * 
 * Features:
 * - Multi-tier pricing support
 * - Price adjustment tracking
 * - Supplier price history
 * - Component and labor cost breakdown
 * - Markup management
 * 
 * Note: All monetary values are stored as numbers representing cents
 */

export interface PricingConfig {
  id: string
  productId: string
  baseMarkup: number
  tierMarkups: Record<string, number>
  adjustments: PriceAdjustment[]
  updatedAt: Date
}

export interface PriceAdjustment {
  amount: number
  reason: string
  appliedBy: string
  appliedDate: Date
  expirationDate?: Date
}

export interface SupplierPricing {
  id: string
  productId: string
  listPrice: number
  discount?: number
  effectiveDate: Date
  supplierSku?: string
  supplierName: string
  supplierProductName?: string
  updatedAt: Date
}

export interface SavedPricing {
  components: number
  labor: number
  total: number
  tier: string
} 
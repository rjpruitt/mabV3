/**
 * Design System Types
 * Type definitions for saved designs and templates
 * 
 * Core Types:
 * - SavedDesign: Complete design with components and pricing
 * - SavedComponent: Individual product selection with options
 * - TemplateData: Configuration for design templates
 * 
 * Features:
 * - Project tracking with leads
 * - Component quantity management
 * - Pricing calculations
 * - Template system
 * - Compatibility rules
 * - Promotion linking
 * 
 * Note: Templates support multiple pricing tiers and shower configurations
 */

import { ComponentType, ShowerType, ShowerShape } from '@/lib/types/product-types'
import { SavedPricing } from './pricing'

export interface SavedDesign {
  id: string
  name?: string
  userId?: string
  leadId?: string
  projectType: string
  components: SavedComponent[]
  pricing?: SavedPricing
  isTemplate: boolean
  templateData?: TemplateData
  createdAt: Date
  updatedAt: Date
}

export interface SavedComponent {
  productId: string
  quantity: number
  selectedOptions?: Record<string, any>
  componentType: ComponentType
}

export interface TemplateData {
  displayName: string
  description: string
  promotionIds: string[]
  designToolIds: string[]
  pricingTiers: string[]
  compatibility?: {
    showerTypes: ShowerType[]
    showerShapes: ShowerShape[]
  }
} 
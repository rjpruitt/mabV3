import { ProductBase } from './index'
import { ComponentType } from '@/lib/types/product-types'

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
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  categorization: {
    style: string[]
    type: string[]
  }
  classification: {
    style: string[]
    productType: string[]
  }
  designTool: {
    classification: {
      format: 'INDIVIDUAL_COMPONENT' | 'KIT'
      topCategory: 'BATHTUBS' | 'SHOWERS' | 'ACCESSIBILITY_SAFETY' | 'WALLS_WAINSCOTTING' | 'ACCESSORIES'
      componentType?: ComponentType
      includedComponents?: ComponentType[]
    }
  }
  priceLevel: 'SMART_SOLUTIONS' | 'PREMIUM_UPGRADES' | 'LUXURY'
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
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  specifications: Array<{
    name: string
    value: string
    source: 'supplier' | 'custom'
    visibility?: {
      customer?: boolean
      team?: boolean
    }
  }>
} 
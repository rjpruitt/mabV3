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

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
  source: 'supplier' | 'custom'
  visibility?: {
    customer: boolean
    team: boolean
  }
  file?: File
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
  images: ProductImage[]
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  specifications: Record<string, string | number | boolean | string[]>
  choices?: Array<{
    category: string
    productId: string
  }>
} 
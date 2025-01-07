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
  id?: string
  url: string
  alt?: string
  source?: string
  isPrimary?: boolean
  visibility?: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  file?: File
}

export interface CatalogueProduct {
  id: string
  name: string
  description?: {
    supplier: string
    marketing: string
    internal: string
  }
  brand: string
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
      format: 'KIT' | 'INDIVIDUAL_COMPONENT'
      topCategory: string
      componentType?: string
      includedComponents: string[]
    }
  }
  priceLevel: string
  images: ProductImage[]
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  specifications?: Record<string, any>
  supplierData?: any[]
  choices?: Array<{
    category: string
    productId: string
  }>
}

export interface CatalogueFormData {
  id?: string
  name: string
  brand: string
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
      format: 'KIT' | 'INDIVIDUAL_COMPONENT'
      topCategory: string
      componentType?: string
      includedComponents: string[]
    }
  }
  priceLevel: string
  images: ProductImage[]
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  specifications: Record<string, any>
  supplierData: any[]
  choices: Array<{
    category: string
    productId: string
  }>
} 
import { ProductBase } from './index'

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
  categorization: Record<string, string | string[]>
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
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
} 
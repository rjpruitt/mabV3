import { DESIGN_TOOL_CATEGORIES } from '@/lib/types/product-categories'
import { DesignToolProductData } from '@/lib/types/product-types'

export interface ImportFormData {
  name: string
  description: {
    supplier: string
    internal: string
  }
  brand: string
  categories: {
    style: string[]
    type: string[]
  }
  images: {
    url: string
    source: 'supplier' | 'custom'
    primary: boolean
  }[]
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  specifications: {
    name: string
    value: string
  }[]
  variants: any[] // TODO: Type this properly
  metadata: {
    supplier: string
    externalId: string
    importedAt: Date
  }
  // Add design tool data
  designTool?: DesignToolProductData
} 
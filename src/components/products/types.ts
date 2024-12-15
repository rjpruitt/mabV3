import { ProductImage } from '@/types/products'

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
  images: ProductImage[]
  visibility: {
    showToCustomer: boolean
    showToSalesRep: boolean
  }
  specifications: {
    name: string
    value: string
  }[]
  variants: {
    id: string
    finish: string
    price: number
    images: ProductImage[]
  }[]
  metadata: {
    supplier: 'homedepot' | 'lowes'
    externalId: string
    importedAt: Date
  }
} 
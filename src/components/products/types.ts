import { Prisma } from '@prisma/client'

// Use Prisma's type utilities
type ProductWithSuppliers = Prisma.Args<typeof prisma.product, 'findUnique'> & {
  include: { productSuppliers: true }
}

export interface Product {
  id: string
  name: string
  description?: string | null
  // ... add other fields you need
}

import { DesignToolData } from '@/lib/types/product-types'

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
  variants: any[] // TODO: Define variant type
  metadata: {
    supplier: string
    externalId: string
    importedAt: Date
  }
  designTool: DesignToolData
  priceLevel: 'SMART_SOLUTIONS' | 'PREMIUM_UPGRADES' | 'LUXURY'
} 
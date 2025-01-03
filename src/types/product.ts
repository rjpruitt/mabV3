import { JsonValue } from '@prisma/client/runtime/library'

interface Image {
  id: string
  url: string
  source: 'supplier' | 'internal'
  isPrimary: boolean
  productId: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  brand: string
  description: JsonValue
  images: Image[]
  visibility: JsonValue
  metadata: JsonValue | null
  createdAt: Date
  updatedAt: Date
  supplierId: string
  sourceData: JsonValue | null
} 
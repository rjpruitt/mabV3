import type { Decimal } from '@prisma/client/runtime/library'

export type Supplier = {
  id: string
  name: string
  externalId?: string | null
  price?: Decimal | null
  url?: string | null
  isImported: boolean
  createdAt: Date
  updatedAt: Date
}

export type CreateSupplierInput = Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateSupplierInput = Partial<CreateSupplierInput>

export type SupplierResponse = {
  data?: Supplier[]
  error?: string
  status: 'success' | 'error'
} 
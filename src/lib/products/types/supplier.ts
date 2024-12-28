export interface Supplier {
  id: string
  name: string
  code: string // Short identifier/code
  contact?: {
    name?: string
    email?: string
    phone?: string
  }
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateSupplierData {
  name: string
  code: string
  contact?: {
    name?: string
    email?: string
    phone?: string
  }
} 
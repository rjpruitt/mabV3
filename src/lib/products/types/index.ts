// Core product types that are shared across systems
export interface ProductBase {
  name: string
  internalName: string
  brand: string
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
} 
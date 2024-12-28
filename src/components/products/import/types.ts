// UI Types for the Import Wizard
export interface OptionGroup {
  label: string
  options: readonly string[] | string[]
}

export interface CategoryStep {
  id: string
  label: string
  options: string[] | ((selections: Record<string, string | string[]>) => string[])
  descriptions?: Record<string, string>
  dependsOn?: {
    step: string
    values: string[]
    conditions?: (selections: Record<string, string | string[]>) => boolean
  }
  multiSelect?: boolean
  groupedOptions?: Record<string, OptionGroup>
}

// Categorization Types
export type ShowerType = 'WALK_IN' | 'TUB_SHOWER_COMBO'

export type ComponentType = 
  | 'BASE' 
  | 'WALL_PANEL' 
  | 'WALL_SET' 
  | 'WALL_ACCENTS' 
  | 'DOOR' 
  | 'CURTAIN_ROD' 
  | 'FIXTURES' 
  | 'ACCESSORIES'

// Prisma-aligned Types for Import Data
export interface ImportProduct {
  name: string
  brand: string
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  categories: {
    type: 'style' | 'product_type'
    name: string
  }[]
  images: {
    url: string
    source: 'supplier' | 'internal'
    isPrimary: boolean
  }[]
  specifications: {
    name: string
    value: string
  }[]
  visibility: {
    customer: boolean
    team: boolean
  }
  metadata: {
    supplier: string
    externalId: string
    importedAt: Date
  }
  supplierId: string
  sourceData: any
}

// Form Data Type for the Import Wizard
export interface ImportFormData {
  name: string
  internalName: string
  brand: string
  description: {
    supplier: string
    marketing: string
    internal: string
  }
  categorization: Record<string, string | string[]>
  specifications: {
    name: string
    value: string
    source: 'supplier' | 'custom'
    visibility: {
      customer: boolean
      team: boolean
    }
  }[]
  images: {
    id: string
    url: string
    alt: string
    isPrimary?: boolean
    source: 'supplier' | 'custom'
    visibility: {
      customer: boolean
      team: boolean
    }
  }[]
}
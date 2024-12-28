// New types for dynamic categorization
export interface OptionGroup {
  label: string
  options: string[]
}

export interface CategoryStep {
  id: string
  label: string
  options: string[] | ((selections: Record<string, string | string[]>) => string[])
  descriptions?: Record<string, string>
  dependsOn?: {
    step: string | ((selections: Record<string, string | string[]>) => string)
    values: string[]
    conditions?: (selections: Record<string, string | string[]>) => boolean
  }
  multiSelect?: boolean
  groupedOptions?: Record<string, OptionGroup>
}

export interface Specification {
  name: string
  value: string
  source: 'supplier' | 'custom'
  visibility: {
    customer: boolean
    team: boolean
  }
  originalId?: string  // Reference to supplier specification if this is a customized version
}

export interface DynamicImportFormData {
  name: string            // Original supplier name
  internalName: string    // Our custom name
  brand: string
  description: {
    supplier: string     // Original supplier description
    marketing: string    // Customer-facing description
    internal: string     // Team-facing notes
  }
  categorization: Record<string, string | string[]>
  specifications: Specification[]
  images: Array<{
    id: string
    url: string
    alt: string
    isPrimary?: boolean
    source?: 'supplier' | 'custom'
    visibility?: {
      customer: boolean
      team: boolean
    }
  }>
} 
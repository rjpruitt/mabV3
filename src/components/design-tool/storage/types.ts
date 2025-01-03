export type DesignChoice = {
  category: string
  productId: string
  selectedOptions?: Record<string, string | boolean>
}

export type DesignState = {
  id?: string
  projectType?: 'tub-to-shower' | 'shower-replacement' | 'tub-shower-combo'
  choices?: {
    category: string
    productId: string
  }[]
  path: 'designer-package' | 'custom'
  lastUpdated: string
  isComplete: boolean
}

export type StorageKeys = {
  CURRENT_DESIGN: 'mab_current_design'
  SAVED_DESIGNS: 'mab_saved_designs'
} 
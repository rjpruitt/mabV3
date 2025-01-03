// UI Types for the Category Steps
export type CategoryOption = string | {
  id: string
  label: string
}

export interface CategoryStep {
  id: string
  label?: string
  title?: string
  description?: string
  type?: 'single' | 'multiple'
  options: CategoryOption[] | ((selections: Record<string, string | string[]>) => CategoryOption[])
  multiSelect?: boolean
  groupedOptions?: Record<string, { label: string; options: string[] }>
  dependsOn?: {
    step: string
    values: string[]
    conditions?: (selections: Record<string, string | string[]>) => boolean
  }
  showWhen?: (selections: Record<string, string | string[]>) => boolean
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
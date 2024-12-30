// UI Types for the Category Steps
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
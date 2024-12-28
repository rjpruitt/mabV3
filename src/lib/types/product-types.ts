import { DESIGN_TOOL_CATEGORIES } from './product-categories'

export type ShowerType = 'WALK_IN' | 'TUB_SHOWER_COMBO'

export type ShowerShape = {
  type: 'ALCOVE' | 'CORNER'
  style: 'SQUARE' | 'RECTANGULAR' | 'NEO_ANGLE' | 'ROUND'
}

export type ProductFormat = 'INDIVIDUAL_COMPONENT' | 'KIT'

export type ComponentType = 
  | 'BASE' 
  | 'WALL_PANEL' 
  | 'WALL_SET' 
  | 'WALL_ACCENTS' 
  | 'DOOR' 
  | 'CURTAIN_ROD' 
  | 'FIXTURES' 
  | 'ACCESSORIES'

export type SubType = 
  | 'CORNER_SHELF' 
  | 'NICHE' 
  | 'FAUCET_HEAD_COMBO' 
  | 'VALVE'
  | undefined

export type WallPanelType = 'BACK' | 'LEFT' | 'RIGHT';

export interface WallConfiguration {
  isCompleteSet: boolean;
  includedPanels?: WallPanelType[];  // Required if isCompleteSet is true
  panelType?: WallPanelType;         // Required if isCompleteSet is false
}

export interface DesignToolData {
  classification: {
    topCategory: 'SHOWERS'
    format: ProductFormat
    componentType?: ComponentType  // Required for INDIVIDUAL_COMPONENT
    includedComponents?: ComponentType[]  // Required for KIT
    showerType: ShowerType[]
    showerShape?: ShowerShape
    subType?: SubType
    wallConfig?: WallConfiguration    // Only used when componentType is WALL_PANEL or WALL_SET
  }
  compatibility: {
    showerTypes: ShowerType[]
    showerShapes: ShowerShape[]
    dimensions: {
      minWidth?: number
      maxWidth?: number
      minDepth?: number
      maxDepth?: number
      height?: number
    }
  }
  installation: {
    difficulty: 'easy' | 'moderate' | 'complex'
    requirements: string[]
    notes?: string
  }
} 
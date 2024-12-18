import { DESIGN_TOOL_CATEGORIES } from './product-categories'

export interface DesignToolProductData {
  category: keyof typeof DESIGN_TOOL_CATEGORIES | undefined
  subcategory: string | undefined
  dimensions: {
    width: number
    height: number
    depth?: number
    squareFeet?: number
  }
  installation: {
    type: string
    requirements: string[]
    difficulty: 'easy' | 'moderate' | 'complex'
  }
  compatibility: {
    requiredProducts: string[]
    incompatibleWith: string[]
  }
} 
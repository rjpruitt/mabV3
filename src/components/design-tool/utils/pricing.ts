import { DesignState } from '../storage/types'

type PriceRange = 'Smart Solutions' | 'Premium' | 'Luxury'

// Add specific types for each fixture configuration
type ShowerHeadConfig = {
  standard: number
  rain: number
  premium: number
}

type HandShowerConfig = {
  standard: number
  premium: number
}

type ControlConfig = {
  standard: number
  digital: number
}

type PriceConfig = {
  base: {
    [key in PriceRange]: number
  }
  multipliers: {
    'tub-to-shower': number
    'shower-replacement': number
    size: {
      small: number
      standard: number
      large: number
    }
  }
  materials: {
    walls: {
      'acrylic': number
      'solid-surface': number
      'tile': number
    }
    base: {
      'acrylic': number
      'solid-surface': number
      'tile-ready': number
    }
  }
  fixtures: {
    'shower-head': ShowerHeadConfig
    'hand-shower': HandShowerConfig
    'control': ControlConfig
  }
  accessories: {
    'grab-bar': number
    'corner-shelf': number
    'recessed-niche': number
    'fold-down-seat': number
  }
}

export const PRICE_CONFIG: PriceConfig = {
  base: {
    'Smart Solutions': 8000,
    'Premium': 10000,
    'Luxury': 12000
  },
  multipliers: {
    'tub-to-shower': 1.2,
    'shower-replacement': 1,
    size: {
      small: 0.9,
      standard: 1,
      large: 1.2
    }
  },
  materials: {
    walls: {
      'acrylic': 1,
      'solid-surface': 1.4,
      'tile': 1.6
    },
    base: {
      'acrylic': 1,
      'solid-surface': 1.3,
      'tile-ready': 1.5
    }
  },
  fixtures: {
    'shower-head': {
      standard: 200,
      rain: 400,
      premium: 600
    },
    'hand-shower': {
      standard: 150,
      premium: 300
    },
    'control': {
      standard: 300,
      digital: 800
    }
  },
  accessories: {
    'grab-bar': 150,
    'corner-shelf': 100,
    'recessed-niche': 400,
    'fold-down-seat': 500
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export function calculatePriceRange(design: DesignState): { min: number; max: number } {
  let basePrice = PRICE_CONFIG.base['Smart Solutions']
  let maxPrice = PRICE_CONFIG.base['Luxury']

  // Apply project type multiplier
  const projectMultiplier = design.projectType 
    ? PRICE_CONFIG.multipliers[design.projectType]
    : 1

  // Get size multiplier from shape selection
  const shapeChoice = design.choices.find(c => c.category === 'shape')
  let sizeMultiplier = PRICE_CONFIG.multipliers.size.standard
  if (shapeChoice?.productId?.includes('small')) {
    sizeMultiplier = PRICE_CONFIG.multipliers.size.small
  } else if (shapeChoice?.productId?.includes('large')) {
    sizeMultiplier = PRICE_CONFIG.multipliers.size.large
  }

  // Apply material multipliers
  const wallChoice = design.choices.find(c => c.category === 'walls')
  const baseChoice = design.choices.find(c => c.category === 'base')
  
  let materialMultiplier = 1
  if (wallChoice?.productId?.includes('acrylic')) {
    materialMultiplier *= PRICE_CONFIG.materials.walls.acrylic
  } else if (wallChoice?.productId?.includes('solid')) {
    materialMultiplier *= PRICE_CONFIG.materials.walls['solid-surface']
  } else if (wallChoice?.productId?.includes('tile')) {
    materialMultiplier *= PRICE_CONFIG.materials.walls.tile
  }

  if (baseChoice?.productId?.includes('acrylic')) {
    materialMultiplier *= PRICE_CONFIG.materials.base.acrylic
  } else if (baseChoice?.productId?.includes('solid')) {
    materialMultiplier *= PRICE_CONFIG.materials.base['solid-surface']
  } else if (baseChoice?.productId?.includes('tile')) {
    materialMultiplier *= PRICE_CONFIG.materials.base['tile-ready']
  }

  // Add fixture costs
  const fixtureChoice = design.choices.find(c => c.category === 'fixtures')
  let fixtureCost = 0
  if (fixtureChoice?.selectedOptions) {
    Object.entries(fixtureChoice.selectedOptions).forEach(([category, id]) => {
      if (typeof id === 'string') {
        switch (category) {
          case 'shower-head': {
            const config = PRICE_CONFIG.fixtures['shower-head']
            if (id.includes('standard')) {
              fixtureCost += config.standard
            } else if (id.includes('rain')) {
              fixtureCost += config.rain
            } else if (id.includes('premium')) {
              fixtureCost += config.premium
            }
            break
          }
          case 'hand-shower': {
            const config = PRICE_CONFIG.fixtures['hand-shower']
            if (id.includes('standard')) {
              fixtureCost += config.standard
            } else if (id.includes('premium')) {
              fixtureCost += config.premium
            }
            break
          }
          case 'control': {
            const config = PRICE_CONFIG.fixtures['control']
            if (id.includes('standard')) {
              fixtureCost += config.standard
            } else if (id.includes('digital')) {
              fixtureCost += config.digital
            }
            break
          }
        }
      }
    })
  }

  // Add accessory costs
  const accessoryChoice = design.choices.find(c => c.category === 'accessories')
  let accessoryCost = 0
  if (accessoryChoice?.selectedOptions) {
    Object.entries(accessoryChoice.selectedOptions).forEach(([id, selected]) => {
      if (selected === true) {
        Object.entries(PRICE_CONFIG.accessories).forEach(([type, cost]) => {
          if (id.includes(type)) {
            accessoryCost += cost
          }
        })
      }
    })
  }

  // Calculate final range
  const min = Math.round((basePrice * projectMultiplier * sizeMultiplier * materialMultiplier) + fixtureCost + accessoryCost)
  const max = Math.round((maxPrice * projectMultiplier * sizeMultiplier * materialMultiplier) + fixtureCost + accessoryCost)

  return { min, max }
} 
'use client'

import { DesignState } from '../storage/types'
import { PRICE_CONFIG, calculatePriceRange, formatPrice } from '../utils/pricing'

type PriceBreakdownItem = {
  label: string
  amount: number
  details?: string[]
}

type PriceBreakdownProps = {
  design: DesignState
  className?: string
}

export function PriceBreakdown({ design, className = '' }: PriceBreakdownProps) {
  const getBasePrice = () => {
    const basePrice = PRICE_CONFIG.base['Smart Solutions']
    const projectMultiplier = design.projectType 
      ? PRICE_CONFIG.multipliers[design.projectType]
      : 1

    const shapeChoice = design.choices.find(c => c.category === 'shape')
    let sizeMultiplier = PRICE_CONFIG.multipliers.size.standard
    if (shapeChoice?.productId?.includes('small')) {
      sizeMultiplier = PRICE_CONFIG.multipliers.size.small
    } else if (shapeChoice?.productId?.includes('large')) {
      sizeMultiplier = PRICE_CONFIG.multipliers.size.large
    }

    return Math.round(basePrice * projectMultiplier * sizeMultiplier)
  }

  const getMaterialCosts = () => {
    const wallChoice = design.choices.find(c => c.category === 'walls')
    const baseChoice = design.choices.find(c => c.category === 'base')
    const basePrice = getBasePrice()
    let totalMaterialCost = 0

    if (wallChoice?.productId) {
      let wallMultiplier = PRICE_CONFIG.materials.walls.acrylic
      if (wallChoice.productId.includes('solid')) {
        wallMultiplier = PRICE_CONFIG.materials.walls['solid-surface']
      } else if (wallChoice.productId.includes('tile')) {
        wallMultiplier = PRICE_CONFIG.materials.walls.tile
      }
      totalMaterialCost += basePrice * (wallMultiplier - 1)
    }

    if (baseChoice?.productId) {
      let baseMultiplier = PRICE_CONFIG.materials.base.acrylic
      if (baseChoice.productId.includes('solid')) {
        baseMultiplier = PRICE_CONFIG.materials.base['solid-surface']
      } else if (baseChoice.productId.includes('tile')) {
        baseMultiplier = PRICE_CONFIG.materials.base['tile-ready']
      }
      totalMaterialCost += basePrice * (baseMultiplier - 1)
    }

    return Math.round(totalMaterialCost)
  }

  const getFixtureCosts = () => {
    const fixtureChoice = design.choices.find(c => c.category === 'fixtures')
    let total = 0
    const details: string[] = []

    if (fixtureChoice?.selectedOptions) {
      Object.entries(fixtureChoice.selectedOptions).forEach(([category, id]) => {
        if (typeof id === 'string') {
          let cost = 0
          switch (category) {
            case 'shower-head': {
              const config = PRICE_CONFIG.fixtures['shower-head']
              if (id.includes('standard')) {
                cost = config.standard
              } else if (id.includes('rain')) {
                cost = config.rain
              } else if (id.includes('premium')) {
                cost = config.premium
              }
              break
            }
            case 'hand-shower': {
              const config = PRICE_CONFIG.fixtures['hand-shower']
              if (id.includes('standard')) {
                cost = config.standard
              } else if (id.includes('premium')) {
                cost = config.premium
              }
              break
            }
            case 'control': {
              const config = PRICE_CONFIG.fixtures['control']
              if (id.includes('standard')) {
                cost = config.standard
              } else if (id.includes('digital')) {
                cost = config.digital
              }
              break
            }
          }
          total += cost
          if (cost > 0) {
            details.push(`${category}: ${formatPrice(cost)}`)
          }
        }
      })
    }

    return { amount: total, details }
  }

  const getAccessoryCosts = () => {
    const accessoryChoice = design.choices.find(c => c.category === 'accessories')
    let total = 0
    const details: string[] = []

    if (accessoryChoice?.selectedOptions) {
      Object.entries(accessoryChoice.selectedOptions).forEach(([id, selected]) => {
        if (selected === true) {
          const accessoryEntries = Object.entries(PRICE_CONFIG.accessories) as [keyof typeof PRICE_CONFIG.accessories, number][]
          accessoryEntries.forEach(([type, cost]) => {
            if (id.includes(type)) {
              total += cost
              details.push(`${type}: ${formatPrice(cost)}`)
            }
          })
        }
      })
    }

    return { amount: total, details }
  }

  const breakdown: PriceBreakdownItem[] = [
    {
      label: 'Base Installation',
      amount: getBasePrice()
    },
    {
      label: 'Material Upgrades',
      amount: getMaterialCosts()
    },
    {
      label: 'Fixtures & Controls',
      amount: getFixtureCosts().amount,
      details: getFixtureCosts().details
    },
    {
      label: 'Accessories',
      amount: getAccessoryCosts().amount,
      details: getAccessoryCosts().details
    }
  ]

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className={className}>
      <div className="space-y-4">
        {breakdown.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <span className="font-medium">{item.label}</span>
              <span className="font-semibold">{formatPrice(item.amount)}</span>
            </div>
            {item.details && item.details.length > 0 && (
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                {item.details.map((detail, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{detail.split(': ')[0]}</span>
                    <span>{detail.split(': ')[1]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="pt-4 flex justify-between items-center text-lg font-semibold">
          <span>Estimated Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
} 
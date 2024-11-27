type BudgetTier = 'economy' | 'premium' | 'luxury'

export function getBudgetBadgeStyles(budget: BudgetTier) {
  switch (budget) {
    case 'economy':
      return {
        background: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200'
      }
    case 'premium':
      return {
        background: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200'
      }
    case 'luxury':
      return {
        background: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200'
      }
    default:
      return {
        background: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-200'
      }
  }
} 
'use client'

import Image from 'next/image'
import { useDesignStorage } from '../storage/useDesignStorage'
import { StepId } from '../steps/types'

type SummaryItem = {
  category: StepId
  title: string
  details?: string
  image?: string
}

export function SelectionSummary() {
  const { currentDesign } = useDesignStorage()

  const getSummaryItems = (): SummaryItem[] => {
    const items: SummaryItem[] = []

    if (currentDesign?.projectType) {
      items.push({
        category: 'project-type',
        title: currentDesign.projectType === 'tub-to-shower' 
          ? 'Tub to Shower Conversion'
          : 'Shower Replacement',
        image: `/images/design-tool/steps/${currentDesign.projectType}.jpg`
      })
    }

    currentDesign?.choices.forEach(choice => {
      // In the future, we'll fetch product details from the database
      // For now, just show the basic info we have
      items.push({
        category: choice.category as StepId,
        title: `Selected ${choice.category}`,
        details: choice.productId,
        image: `/images/design-tool/steps/${choice.category}/${choice.productId}.jpg`
      })
    })

    return items
  }

  if (!currentDesign) return null

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Your Selections</h3>
      
      <div className="space-y-4">
        {getSummaryItems().map((item, index) => (
          <div 
            key={item.category}
            className="bg-white p-3 rounded-md shadow-sm"
          >
            <div className="flex items-start gap-3">
              {item.image && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                {item.details && (
                  <p className="text-sm text-gray-600">{item.details}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {getSummaryItems().length === 0 && (
        <p className="text-gray-500 text-center py-4">
          Make selections to see your choices here
        </p>
      )}
    </div>
  )
} 
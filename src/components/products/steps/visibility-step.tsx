'use client'

import { ImportFormData } from '../types'

interface VisibilityStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

export function VisibilityStep({ data, onChange }: VisibilityStepProps) {
  const handleVisibilityChange = (key: keyof ImportFormData['visibility'], value: boolean) => {
    onChange({
      ...data,
      visibility: {
        ...data.visibility,
        [key]: value
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Visibility</h3>
        <p className="text-sm text-gray-500 mb-4">
          Control who can see this product in the catalog
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={data.visibility.showToCustomer}
            onChange={(e) => handleVisibilityChange('showToCustomer', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <div>
            <span className="font-medium text-gray-900">Show to Customers</span>
            <p className="text-sm text-gray-500">
              Product will be visible on the customer-facing website
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={data.visibility.showToSalesRep}
            onChange={(e) => handleVisibilityChange('showToSalesRep', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <div>
            <span className="font-medium text-gray-900">Show to Sales Representatives</span>
            <p className="text-sm text-gray-500">
              Product will be available in the sales rep tools
            </p>
          </div>
        </label>
      </div>
    </div>
  )
} 
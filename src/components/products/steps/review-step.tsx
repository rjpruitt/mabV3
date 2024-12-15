'use client'

import { ImportFormData } from '../types'

interface ReviewStepProps {
  data: ImportFormData
}

export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Product Details</h3>
        <p className="text-sm text-gray-500 mb-4">
          Review the product information before importing
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-700">Basic Information</h4>
          <dl className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">{data.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Brand</dt>
              <dd className="text-sm text-gray-900">{data.brand}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Categories</h4>
          <dl className="mt-2">
            <dt className="text-sm text-gray-500">Styles</dt>
            <dd className="text-sm text-gray-900">
              {data.categories.style.join(', ') || 'None selected'}
            </dd>
            <dt className="text-sm text-gray-500 mt-2">Types</dt>
            <dd className="text-sm text-gray-900">
              {data.categories.type.join(', ') || 'None selected'}
            </dd>
          </dl>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">Visibility</h4>
          <dl className="mt-2">
            <dt className="text-sm text-gray-500">Customer Visible</dt>
            <dd className="text-sm text-gray-900">
              {data.visibility.showToCustomer ? 'Yes' : 'No'}
            </dd>
            <dt className="text-sm text-gray-500 mt-2">Sales Rep Visible</dt>
            <dd className="text-sm text-gray-900">
              {data.visibility.showToSalesRep ? 'Yes' : 'No'}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
} 
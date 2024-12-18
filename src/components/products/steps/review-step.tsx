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

        {data.designTool && (
          <div>
            <h4 className="font-medium text-gray-700">Design Tool Settings</h4>
            <dl className="mt-2">
              <dt className="text-sm text-gray-500">Category</dt>
              <dd className="text-sm text-gray-900">
                {data.designTool.category || 'Not set'}
              </dd>
              
              <dt className="text-sm text-gray-500 mt-2">Subcategory</dt>
              <dd className="text-sm text-gray-900">
                {data.designTool.subcategory || 'Not set'}
              </dd>

              <dt className="text-sm text-gray-500 mt-2">Dimensions</dt>
              <dd className="text-sm text-gray-900">
                {`${data.designTool.dimensions.width}" × ${data.designTool.dimensions.height}"`}
                {data.designTool.dimensions.depth && ` × ${data.designTool.dimensions.depth}"`}
              </dd>

              <dt className="text-sm text-gray-500 mt-2">Installation Type</dt>
              <dd className="text-sm text-gray-900">
                {data.designTool.installation.type || 'Not set'}
              </dd>

              <dt className="text-sm text-gray-500 mt-2">Installation Requirements</dt>
              <dd className="text-sm text-gray-900">
                {data.designTool.installation.requirements.length > 0 
                  ? data.designTool.installation.requirements.join(', ')
                  : 'None specified'
                }
              </dd>

              <dt className="text-sm text-gray-500 mt-2">Installation Difficulty</dt>
              <dd className="text-sm text-gray-900 capitalize">
                {data.designTool.installation.difficulty}
              </dd>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
} 
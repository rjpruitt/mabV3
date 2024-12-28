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
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Design Tool Configuration</h4>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Top Category:</span>{' '}
                {data.designTool.classification.topCategory}
              </p>
              
              <p className="text-sm">
                <span className="font-medium">Format:</span>{' '}
                {data.designTool.classification.format === 'KIT' ? 'Kit/Package' : 'Individual Component'}
              </p>
              
              {data.designTool.classification.componentType && (
                <p className="text-sm">
                  <span className="font-medium">Component Type:</span>{' '}
                  {data.designTool.classification.componentType.replace('_', ' ')}
                </p>
              )}

              {/* Wall Configuration */}
              {(data.designTool.classification.componentType === 'WALL_PANEL' || 
                data.designTool.classification.componentType === 'WALL_SET') && 
                data.designTool.classification.wallConfig && (
                <div className="ml-4 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Wall Type:</span>{' '}
                    {data.designTool.classification.wallConfig.isCompleteSet ? 'Complete Set' : 'Individual Panel'}
                  </p>
                  {data.designTool.classification.wallConfig.isCompleteSet ? (
                    <p className="text-sm">
                      <span className="font-medium">Included Panels:</span>{' '}
                      {data.designTool.classification.wallConfig.includedPanels?.join(', ')}
                    </p>
                  ) : (
                    <p className="text-sm">
                      <span className="font-medium">Panel Type:</span>{' '}
                      {data.designTool.classification.wallConfig.panelType}
                    </p>
                  )}
                </div>
              )}

              {data.designTool.classification.includedComponents && (
                <p className="text-sm">
                  <span className="font-medium">Included Components:</span>{' '}
                  {data.designTool.classification.includedComponents.map(c => c.replace('_', ' ')).join(', ')}
                </p>
              )}

              <p className="text-sm">
                <span className="font-medium">Shower Types:</span>{' '}
                {data.designTool.compatibility.showerTypes.join(', ') || 'None selected'}
              </p>

              {data.designTool.classification.showerShape && (
                <p className="text-sm">
                  <span className="font-medium">Shape:</span>{' '}
                  {`${data.designTool.classification.showerShape.type} - ${data.designTool.classification.showerShape.style}`}
                </p>
              )}

              <p className="text-sm">
                <span className="font-medium">Dimensions:</span>{' '}
                {data.designTool.compatibility.dimensions.minWidth && 
                 `Width: ${data.designTool.compatibility.dimensions.minWidth}" - ${data.designTool.compatibility.dimensions.maxWidth}"`}
                {data.designTool.compatibility.dimensions.height && 
                 ` Height: ${data.designTool.compatibility.dimensions.height}"`}
              </p>

              <p className="text-sm">
                <span className="font-medium">Installation:</span>{' '}
                {data.designTool.installation.difficulty}
                {data.designTool.installation.notes && ` - ${data.designTool.installation.notes}`}
              </p>

              <p className="text-sm">
                <span className="font-medium">Price Level:</span>{' '}
                {data.priceLevel}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
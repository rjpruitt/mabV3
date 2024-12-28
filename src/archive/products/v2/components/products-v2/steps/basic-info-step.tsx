// @ts-nocheck
'use client'

import { DynamicImportFormData, Specification } from '../types'

interface BasicInfoStepProps {
  data: DynamicImportFormData
  onChange: (data: Partial<DynamicImportFormData>) => void
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      [field]: value
    })
  }

  const handleDescriptionChange = (type: 'supplier' | 'internal' | 'marketing', value: string) => {
    onChange({
      description: {
        ...data.description,
        [type]: value
      }
    })
  }

  const handleSpecificationChange = (index: number, updates: Partial<Specification>) => {
    const newSpecs = [...data.specifications]
    newSpecs[index] = { ...newSpecs[index], ...updates }
    onChange({ specifications: newSpecs })
  }

  const addCustomSpecification = () => {
    onChange({
      specifications: [
        ...data.specifications,
        {
          name: '',
          value: '',
          source: 'custom',
          visibility: { customer: true, team: true }
        }
      ]
    })
  }

  return (
    <div className="space-y-6">
      {/* Product Names */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier Product Name
          </label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">{data.name}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Internal Product Name
          </label>
          <input
            type="text"
            value={data.internalName}
            onChange={(e) => handleChange('internalName', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="Enter name for internal/customer use"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier Description
        </label>
        <div className="mt-1 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">{data.description.supplier}</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Marketing Description
        </label>
        <textarea
          value={data.description.marketing}
          onChange={(e) => handleDescriptionChange('marketing', e.target.value)}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
          placeholder="Description shown to customers"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Internal Notes
        </label>
        <textarea
          value={data.description.internal}
          onChange={(e) => handleDescriptionChange('internal', e.target.value)}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
          placeholder="Notes for internal use"
        />
        <p className="mt-1 text-sm text-gray-500">
          This description will be used internally and won't be shown to customers
        </p>
      </div>

      {/* Specifications */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Supplier Specifications</h3>
          <div className="space-y-4">
            {data.specifications
              .filter(spec => spec.source === 'supplier')
              .map((spec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{spec.name}</span>
                    <span className="text-sm text-gray-700">{spec.value}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={spec.visibility.customer}
                        onChange={(e) => handleSpecificationChange(index, {
                          visibility: { ...spec.visibility, customer: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show to Customers</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={spec.visibility.team}
                        onChange={(e) => handleSpecificationChange(index, {
                          visibility: { ...spec.visibility, team: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show to Team</span>
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Custom Specifications</h3>
            <button
              type="button"
              onClick={addCustomSpecification}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Custom Specification
            </button>
          </div>
          <div className="space-y-4">
            {data.specifications
              .filter(spec => spec.source === 'custom')
              .map((spec, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-md">
                  <div className="flex gap-4 mb-2">
                    <input
                      type="text"
                      value={spec.name}
                      onChange={(e) => handleSpecificationChange(index, { name: e.target.value })}
                      placeholder="Name"
                      className="w-1/3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, { value: e.target.value })}
                      placeholder="Value"
                      className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={spec.visibility.customer}
                        onChange={(e) => handleSpecificationChange(index, {
                          visibility: { ...spec.visibility, customer: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show to Customers</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={spec.visibility.team}
                        onChange={(e) => handleSpecificationChange(index, {
                          visibility: { ...spec.visibility, team: e.target.checked }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show to Team</span>
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
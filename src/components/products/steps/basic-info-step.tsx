'use client'

import { ImportFormData } from '../types'

interface Specification {
  name: string
  value: string
}

interface BasicInfoStepProps {
  data: ImportFormData
  onChange: (data: ImportFormData) => void
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  const handleDescriptionChange = (type: 'supplier' | 'internal', value: string) => {
    onChange({
      ...data,
      description: {
        ...data.description,
        [type]: value
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <input
          type="text"
          value={data.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier Description
        </label>
        <textarea
          value={data.description.supplier}
          onChange={(e) => handleDescriptionChange('supplier', e.target.value)}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Internal Description
        </label>
        <textarea
          value={data.description.internal}
          onChange={(e) => handleDescriptionChange('internal', e.target.value)}
          rows={3}
          placeholder="Add your own description for internal use"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
        />
        <p className="mt-1 text-sm text-gray-500">
          This description will be used internally and won't be shown to customers
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Specifications
        </label>
        <div className="space-y-2">
          {data.specifications.map((spec: Specification, index: number) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={spec.name}
                onChange={(e) => {
                  const newSpecs = [...data.specifications]
                  newSpecs[index] = { ...spec, name: e.target.value }
                  onChange({ ...data, specifications: newSpecs })
                }}
                placeholder="Name"
                className="w-1/3 mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => {
                  const newSpecs = [...data.specifications]
                  newSpecs[index] = { ...spec, value: e.target.value }
                  onChange({ ...data, specifications: newSpecs })
                }}
                placeholder="Value"
                className="flex-1 mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              />
              <button
                onClick={() => {
                  const newSpecs = data.specifications.filter((_: Specification, i: number) => i !== index)
                  onChange({ ...data, specifications: newSpecs })
                }}
                className="px-3 py-2 text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              onChange({
                ...data,
                specifications: [...data.specifications, { name: '', value: '' }]
              })
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add Specification
          </button>
        </div>
      </div>
    </div>
  )
} 
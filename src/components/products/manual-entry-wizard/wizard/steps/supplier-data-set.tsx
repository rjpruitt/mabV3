'use client'

import { toast } from 'sonner'

interface SupplierFormData {
  name: string
  code?: string
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
}

const handleAddSupplier = async (data: SupplierFormData) => {
  try {
    // Generate a unique code if not provided, using timestamp and random string
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 7)
    const supplierCode = data.code || `SUP-${timestamp}-${random}`

    const response = await fetch('/api/suppliers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        code: supplierCode
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create supplier')
    }

    const result = await response.json()
    toast.success('Supplier added successfully')
    return result
  } catch (error) {
    console.error('Error creating supplier:', error)
    toast.error(`Failed to create supplier: ${error instanceof Error ? error.message : 'Unknown error'}`)
    throw error
  }
}

interface SupplierDataSetProps {
  data: SupplierFormData
  onChange: (data: SupplierFormData) => void
  onNext?: () => void
  onBack?: () => void
}

export function SupplierDataSet({ data, onChange, onNext, onBack }: SupplierDataSetProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!data.name?.trim()) {
      toast.error('Supplier name is required')
      return
    }

    try {
      console.log('Submitting supplier data:', data)
      await handleAddSupplier(data)
      onNext?.()
    } catch (error) {
      console.error('Submit error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-medium text-gray-900">Add New Supplier</h3>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the supplier details. Fields marked with * are required.
        </p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Supplier Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={data.name || ''}
          onChange={(e) => onChange({ ...data, name: e.target.value.trim() })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Enter supplier name"
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Supplier Code
          <span className="text-gray-400 text-xs ml-2">(Auto-generated if empty)</span>
        </label>
        <input
          type="text"
          id="code"
          value={data.code || ''}
          onChange={(e) => onChange({ ...data, code: e.target.value.trim() })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., SUP-001"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Information
        </label>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={data.contact?.email || ''}
            onChange={(e) => onChange({
              ...data,
              contact: { ...data.contact, email: e.target.value.trim() }
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={data.contact?.phone || ''}
            onChange={(e) => onChange({
              ...data,
              contact: { ...data.contact, phone: e.target.value.trim() }
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <textarea
            placeholder="Address"
            value={data.contact?.address || ''}
            onChange={(e) => onChange({
              ...data,
              contact: { ...data.contact, address: e.target.value.trim() }
            })}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Add Supplier & Continue
        </button>
      </div>
    </form>
  )
} 
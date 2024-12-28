'use client'

import { useState } from 'react'
import type { CreateSupplierInput } from '@/lib/types/supplier'
import { Decimal } from '@prisma/client/runtime/library'

interface AddSupplierModalProps {
  onClose: () => void
  onAdd: (supplier: CreateSupplierInput) => Promise<void>
}

export function AddSupplierModal({ onClose, onAdd }: AddSupplierModalProps) {
  const [formData, setFormData] = useState<CreateSupplierInput>({
    name: '',
    isImported: false,
    externalId: null,
    price: null,
    url: null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Add Supplier</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price ? formData.price.toString() : ''}
              onChange={e => setFormData({ 
                ...formData, 
                price: e.target.value ? new Decimal(e.target.value) : null
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product URL
            </label>
            <input
              type="url"
              value={formData.url || ''}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isImported}
              onChange={e => setFormData({ ...formData, isImported: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Import from this supplier
            </label>
          </div>

          {formData.isImported && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                External ID
              </label>
              <input
                type="text"
                value={formData.externalId || ''}
                onChange={e => setFormData({ ...formData, externalId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
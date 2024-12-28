'use client'

import { useState } from 'react'
import { CreateSupplierData } from '@/lib/products/types/supplier'

interface SupplierModalProps {
  onClose: () => void
  onSave: (data: CreateSupplierData) => Promise<void>
}

export function SupplierModal({ onClose, onSave }: SupplierModalProps) {
  const [formData, setFormData] = useState<CreateSupplierData>({
    name: '',
    code: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Supplier</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.contact?.name || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, name: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contact?.email || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.contact?.phone || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Supplier
          </button>
        </div>
      </div>
    </div>
  )
} 
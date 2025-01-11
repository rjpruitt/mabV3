import { useState } from 'react'
import { SupplierData } from '@/lib/products/types/catalogue'
import type { Supplier } from '@prisma/client'
import { formStyles } from '@/lib/styles/forms'
import { SupplierModal } from '@/components/products/supplier-management/supplier-modal'

export interface CreateSupplierData {
  name: string
  code: string
  website?: string
  notes?: string
}

interface SupplierDataSetProps {
  data: SupplierData
  onChange: (data: SupplierData) => void
  onRemove: () => void
  suppliers: Supplier[]
  onAddSupplier: (supplier: Supplier) => void
  onCreateSupplier: (data: CreateSupplierData) => Promise<Supplier>
}

export function SupplierDataSet({
  data,
  onChange,
  onRemove,
  suppliers,
  onAddSupplier,
  onCreateSupplier
}: SupplierDataSetProps) {
  const [showSupplierModal, setShowSupplierModal] = useState(false)

  const handleSupplierCreate = async (supplierData: CreateSupplierData) => {
    try {
      const newSupplier = await onCreateSupplier(supplierData)
      onAddSupplier(newSupplier)
      setShowSupplierModal(false)
      // Update the current supplier data with the new supplier
      onChange({
        ...data,
        supplierId: newSupplier.id,
        supplierName: newSupplier.name
      })
    } catch (error) {
      console.error('Failed to create supplier:', error)
      throw error
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier
              </label>
              <div className="flex space-x-2">
                <select
                  value={data.supplierId}
                  onChange={(e) => {
                    const supplier = suppliers.find(s => s.id === e.target.value)
                    onChange({
                      ...data,
                      supplierId: e.target.value,
                      supplierName: supplier?.name || ''
                    })
                  }}
                  className={formStyles.select}
                >
                  <option value="" key="empty">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowSupplierModal(true)}
                  className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  + Add Supplier
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name (from supplier)
            </label>
            <input
              type="text"
              value={data.productName}
              onChange={(e) => onChange({ ...data, productName: e.target.value })}
              className={formStyles.input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              value={data.productDescription}
              onChange={(e) => onChange({ ...data, productDescription: e.target.value })}
              className={formStyles.textarea}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internet Number
              </label>
              <input
                type="text"
                value={data.internetNumber}
                onChange={(e) => onChange({ ...data, internetNumber: e.target.value })}
                className={formStyles.input}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Number
              </label>
              <input
                type="text"
                value={data.itemNumber}
                onChange={(e) => onChange({ ...data, itemNumber: e.target.value })}
                className={formStyles.input}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model Number
              </label>
              <input
                type="text"
                value={data.modelNumber}
                onChange={(e) => onChange({ ...data, modelNumber: e.target.value })}
                className={formStyles.input}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              List Price
            </label>
            <input
              type="text"
              value={data.listPrice}
              onChange={(e) => onChange({ ...data, listPrice: e.target.value })}
              className={formStyles.input}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-700 ml-4"
        >
          <span className="sr-only">Remove supplier data</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showSupplierModal && (
        <SupplierModal
          onClose={() => setShowSupplierModal(false)}
          onSave={handleSupplierCreate}
        />
      )}
    </div>
  )
} 
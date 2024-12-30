import { SupplierData } from '@/lib/products/types/catalogue'
import { useState } from 'react'
import { SupplierModal } from '@/components/products/supplier-management/supplier-modal'
import { createSupplier } from '@/lib/server/actions/supplier-actions'
import type { Supplier, Prisma } from '@prisma/client'
import { formStyles } from '@/lib/styles/forms'

interface SupplierDataSetProps {
  data: SupplierData
  onChange: (data: SupplierData) => void
  onRemove: () => void
  suppliers: Array<{ id: string, name: string }>
  onAddSupplier: (supplier: Supplier) => void
}

export function SupplierDataSet({ 
  data, 
  onChange, 
  onRemove,
  suppliers,
  onAddSupplier 
}: SupplierDataSetProps) {
  const [showSupplierModal, setShowSupplierModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleAddSupplier = async (supplierData: Prisma.SupplierCreateInput) => {
    setIsCreating(true)
    try {
      const newSupplier = await createSupplier(supplierData)
      onAddSupplier(newSupplier)
      setShowSupplierModal(false)
    } catch (error) {
      console.error('Failed to create supplier:', error)
      alert('Failed to create supplier. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex gap-2">
          <select
            value={data.supplierId}
            onChange={(e) => onChange({ ...data, supplierId: e.target.value })}
            className={formStyles.selectWithWidth('w-64')}
          >
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowSupplierModal(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            + Add New Supplier
          </button>
        </div>
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supplier Product Name
          </label>
          <input
            type="text"
            value={data.productName}
            onChange={(e) => onChange({ ...data, productName: e.target.value })}
            className={formStyles.input}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supplier Product Description
          </label>
          <textarea
            value={data.productDescription}
            onChange={(e) => onChange({ ...data, productDescription: e.target.value })}
            rows={3}
            className={formStyles.textarea}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Internet Number
              <span className="ml-1 text-gray-400 text-xs">(Supplier's online product ID)</span>
            </label>
            <input
              type="text"
              value={data.internetNumber}
              onChange={(e) => onChange({ ...data, internetNumber: e.target.value })}
              className={formStyles.input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Number / SKU
              <span className="ml-1 text-gray-400 text-xs">(Supplier's internal reference)</span>
            </label>
            <input
              type="text"
              value={data.itemNumber}
              onChange={(e) => onChange({ ...data, itemNumber: e.target.value })}
              className={formStyles.input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Number
              <span className="ml-1 text-gray-400 text-xs">(Manufacturer's reference)</span>
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
          <label className="block text-sm font-medium text-gray-700">
            List Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              value={data.listPrice}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d.]/g, '')
                if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                  onChange({ ...data, listPrice: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (!isNaN(value)) {
                  onChange({ ...data, listPrice: value.toFixed(2) })
                }
              }}
              className={`pl-7 ${formStyles.input}`}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {showSupplierModal && (
        <SupplierModal
          onClose={() => setShowSupplierModal(false)}
          onSave={handleAddSupplier}
          isLoading={isCreating}
        />
      )}
    </div>
  )
} 
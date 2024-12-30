'use client'

import { useState, useEffect } from 'react'
import { CatalogueFormData, SupplierData } from '@/lib/products/types/catalogue'
import { SupplierDataSet } from './components/supplier-data-set'
import { getSuppliers } from '@/lib/server/actions/supplier-actions'
import type { Supplier } from '@prisma/client'
import { formStyles } from '@/lib/styles/forms'

interface BasicInfoStepProps {
  data: CatalogueFormData
  onChange: (data: CatalogueFormData) => void
  initialData?: Partial<CatalogueFormData>
}

export function BasicInfoStep({ data, onChange, initialData }: BasicInfoStepProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSuppliers() {
      try {
        const data = await getSuppliers()
        setSuppliers(data)
      } catch (err) {
        console.error('Failed to load suppliers:', err)
        setError('Failed to load suppliers')
      } finally {
        setIsLoading(false)
      }
    }

    loadSuppliers()
  }, [])

  const handleSupplierChange = (index: number, supplierData: SupplierData) => {
    const newSupplierData = [...data.supplierData]
    newSupplierData[index] = supplierData
    onChange({ ...data, supplierData: newSupplierData })
  }

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers(prev => [...prev, newSupplier])
  }

  const addSupplierData = () => {
    onChange({
      ...data,
      supplierData: [
        ...data.supplierData,
        {
          supplierId: '',
          supplierName: '',
          productName: '',
          productDescription: '',
          internetNumber: '',
          itemNumber: '',
          modelNumber: '',
          listPrice: ''
        }
      ]
    })
  }

  const removeSupplierData = (index: number) => {
    const newSupplierData = data.supplierData.filter((_, i) => i !== index)
    onChange({ ...data, supplierData: newSupplierData })
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-gray-500 text-center py-4">
          Loading suppliers...
        </div>
      )}

      {initialData && (  // Only show if this is a cloned product
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                Creating from existing product
              </h3>
              <div className="mt-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!data.variant}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange({
                          ...data,
                          variant: {
                            parentId: initialData.id,
                            type: null,
                            value: ''
                          }
                        })
                      } else {
                        const newData = { ...data }
                        delete newData.variant
                        onChange(newData)
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-blue-800">
                    This is a variant (color/finish) of the original product
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {data.variant && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Variant Type
            </label>
            <select
              value={data.variant.type || ''}
              onChange={(e) => onChange({
                ...data,
                variant: {
                  ...data.variant,
                  type: (e.target.value as 'color' | 'finish' | 'size' | '') || null,
                  value: data.variant?.value || ''
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
            >
              <option value="" key="empty">Select Type</option>
              <option value="color" key="color">Color</option>
              <option value="finish" key="finish">Finish</option>
              <option value="size" key="size">Size</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Variant Value
            </label>
            <input
              type="text"
              value={data.variant?.value || ''}
              onChange={(e) => onChange({
                ...data,
                variant: {
                  ...data.variant,
                  type: data.variant?.type || null,
                  value: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 text-gray-800"
              placeholder="e.g., Brushed Nickel, Matte Black"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Internal Product Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className={formStyles.input}
          placeholder="Enter the internal name used to identify this product"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <input
          type="text"
          value={data.brand}
          onChange={(e) => onChange({ ...data, brand: e.target.value })}
          className={formStyles.input}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Supplier Data</h3>
        </div>
        
        {(data.supplierData || []).map((supplierData, index) => (
          <SupplierDataSet
            key={index}
            data={supplierData}
            onChange={(newData) => handleSupplierChange(index, newData)}
            onRemove={() => removeSupplierData(index)}
            suppliers={suppliers}
            onAddSupplier={handleAddSupplier}
          />
        ))}

        <button
          type="button"
          onClick={addSupplierData}
          className="mt-2 text-blue-600 hover:text-blue-700"
        >
          + Add Supplier Data
        </button>
      </div>
    </div>
  )
} 
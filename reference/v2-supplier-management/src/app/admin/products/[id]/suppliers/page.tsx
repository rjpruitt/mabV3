'use client'

import { useState, useEffect } from 'react'
import { AddSupplierModal } from './add-supplier-modal'
import { toast } from 'sonner'
import type { Supplier, SupplierResponse, CreateSupplierInput } from '@/lib/types/supplier'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function ProductSuppliersPage({ params }: { params: { id: string } }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddingSupplier, setIsAddingSupplier] = useState(false)

  useEffect(() => {
    fetchSuppliers()
  }, [params.id])

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}/suppliers`)
      if (!response.ok) throw new Error('Failed to fetch suppliers')
      const data = await response.json()
      setSuppliers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to load suppliers')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSupplier = async (supplier: CreateSupplierInput) => {
    try {
      const response = await fetch(`/api/products/${params.id}/suppliers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplier)
      })
      if (!response.ok) throw new Error('Failed to add supplier')
      const newSupplier = await response.json()
      setSuppliers([...suppliers, newSupplier])
      toast.success('Supplier added successfully')
    } catch (err) {
      toast.error('Failed to add supplier')
    }
  }

  const handleRemoveSupplier = async (supplierId: string | undefined) => {
    if (!supplierId) return
    try {
      const response = await fetch(
        `/api/products/${params.id}/suppliers?supplierId=${supplierId}`,
        { method: 'DELETE' }
      )
      if (!response.ok) throw new Error('Failed to remove supplier')
      setSuppliers(suppliers.filter(s => s.id && s.id !== supplierId))
      toast.success('Supplier removed successfully')
    } catch (err) {
      toast.error('Failed to remove supplier')
    }
  }

  if (isLoading) {
    return <div className="p-4">Loading suppliers...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Product Suppliers</h2>
        <button
          onClick={() => setIsAddingSupplier(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Supplier
        </button>
      </div>

      <div className="grid gap-4">
        {suppliers.map((supplier: Supplier, index: number) => (
          <div key={supplier.id || index} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{supplier.name}</h3>
                {supplier.price && (
                  <p className="text-sm text-gray-600">
                    Price: ${supplier.price.toString()}
                  </p>
                )}
              </div>
              <div className="space-x-2">
                {supplier.url && (
                  <a
                    href={supplier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Product
                  </a>
                )}
                <button
                  onClick={() => handleRemoveSupplier(supplier.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddingSupplier && (
        <AddSupplierModal
          onClose={() => setIsAddingSupplier(false)}
          onAdd={handleAddSupplier}
        />
      )}
    </div>
  )
} 
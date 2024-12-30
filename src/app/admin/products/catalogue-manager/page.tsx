'use client'

import { useState } from 'react'
import { ManualEntryWizard } from '@/components/products/manual-entry-wizard/wizard/ManualEntryWizard'
import { CatalogueFormData } from '@/lib/products/types/catalogue'
import { toast } from 'sonner'

export default function CatalogueManagerPage() {
  const [showWizard, setShowWizard] = useState(false)
  const [initialData, setInitialData] = useState<Partial<CatalogueFormData>>()

  const handleComplete = async (data: CatalogueFormData) => {
    try {
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (result.success && result.productId) {
        toast.success('Product created successfully')
        setShowWizard(false)
      } else {
        toast.error(result.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    }
  }

  return (
    <div className="container mx-auto p-4 pt-[250px]">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Catalogue Manager</h1>
      
      <div className="mb-8">
        <button
          onClick={() => setShowWizard(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Product
        </button>
      </div>

      {showWizard && (
        <ManualEntryWizard 
          onComplete={handleComplete}
          onCancel={() => setShowWizard(false)}
          initialData={initialData}
        />
      )}
    </div>
  )
}

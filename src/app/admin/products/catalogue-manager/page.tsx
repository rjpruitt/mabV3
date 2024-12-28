'use client'

import { useState } from 'react'
import { ManualEntryWizard } from '@/components/products/manual-entry-wizard/wizard/ManualEntryWizard'
import { CatalogueFormData } from '@/lib/products/types/catalogue'

export default function CatalogueManagerPage() {
  const [showWizard, setShowWizard] = useState(false)
  const [initialData, setInitialData] = useState<Partial<CatalogueFormData>>()

  async function cloneProduct(product: CatalogueFormData) {
    const clonedData = {
      ...product,
      name: `${product.name} - New Variant`,
      // Clear unique identifiers but keep reference to original
      id: undefined,
      // Keep supplier data but might need to update item numbers
    }
    setShowWizard(true)
    setInitialData(clonedData)
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
          onComplete={(data) => {
            console.log('Wizard completed:', data)
            setShowWizard(false)
          }}
          onCancel={() => setShowWizard(false)}
          initialData={initialData}
        />
      )}
    </div>
  )
}

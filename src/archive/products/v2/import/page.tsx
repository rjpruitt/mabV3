// @ts-nocheck
'use client'

import { DynamicImportWizard } from '../components/products-v2/dynamic-import-wizard'
import { useState } from 'react'
import { DynamicImportFormData } from '@/archive/products/v2/components/products-v2/types'

export default function DynamicImportTestPage() {
  const [showWizard, setShowWizard] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleImport = async (data: DynamicImportFormData) => {
    console.log('Import data:', data)
    // TODO: Implement actual import
    setShowWizard(false)
  }

  // Test product data
  const testProduct = {
    name: 'Test Shower Base',
    brand: 'Test Brand',
    description: 'A test product description',
    specifications: [
      { name: 'Width', value: '60 inches' },
      { name: 'Depth', value: '32 inches' },
      { name: 'Height', value: '4 inches' }
    ]
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Import Wizard Test</h1>
      
      <button
        onClick={() => {
          setSelectedProduct(testProduct)
          setShowWizard(true)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Import
      </button>

      {showWizard && selectedProduct && (
        <DynamicImportWizard
          productData={selectedProduct}
          onClose={() => setShowWizard(false)}
          onImport={handleImport}
        />
      )}
    </div>
  )
} 
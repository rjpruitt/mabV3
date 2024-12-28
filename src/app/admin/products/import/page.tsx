'use client'

import { DynamicImportWizard } from '@/components/products/import/wizard/dynamic-import-wizard'
import { useState } from 'react'
import { ImportFormData } from '@/components/products/import/types'

export default function ProductImportPage() {
  const [showWizard, setShowWizard] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Test product data
  const testProduct = {
    id: 'test-1',
    name: 'Test Shower Base',
    brand: 'Test Brand',
    description: 'A test product description',
    specifications: [
      { name: 'Width', value: '60 inches' },
      { name: 'Depth', value: '32 inches' },
      { name: 'Height', value: '4 inches' }
    ],
    images: [
      {
        id: '1',
        url: 'https://example.com/image1.jpg',
        alt: 'Test Image 1'
      }
    ]
  }

  const handleImport = async (data: ImportFormData) => {
    console.log('Import data:', data)
    // TODO: Implement actual import
    setShowWizard(false)
  }

  return (
    <div className="container mx-auto p-4 pt-[200px]">
      <h1 className="text-2xl font-bold mb-4">Product Import Test</h1>
      
      <button
        onClick={() => {
          setSelectedProduct(testProduct)
          setShowWizard(true)
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Import Wizard
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
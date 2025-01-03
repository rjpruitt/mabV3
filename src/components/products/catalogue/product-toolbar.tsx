'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ManualEntryWizard } from '@/components/products/manual-entry-wizard/wizard/ManualEntryWizard'

export function ProductToolbar() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Product Catalogue</h1>
      <div className="flex gap-2">
        <Button 
          onClick={() => setShowWizard(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Product
        </Button>
      </div>

      {showWizard && (
        <ManualEntryWizard
          onComplete={() => setShowWizard(false)}
          onCancel={() => setShowWizard(false)}
        />
      )}
    </div>
  )
} 
'use client'

import { useState } from 'react'

export default function ClearProductsPage() {
  const [status, setStatus] = useState<string>('')

  const handleClear = async () => {
    try {
      const response = await fetch('/api/products/clear', {
        method: 'POST'
      })
      const data = await response.json()
      setStatus(data.message || 'Products cleared')
    } catch (error) {
      setStatus('Error clearing products')
      console.error(error)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Clear Products</h1>
      <button
        onClick={handleClear}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear All Products
      </button>
      {status && (
        <p className="mt-4 text-gray-600">{status}</p>
      )}
    </div>
  )
} 
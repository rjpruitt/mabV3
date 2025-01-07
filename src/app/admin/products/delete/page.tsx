'use client'

import { useState } from 'react'

export default function DeleteProducts() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [result, setResult] = useState<{ success?: string; error?: string }>({})

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete ALL products? This cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    setResult({})

    try {
      const res = await fetch('/api/products/delete-all', { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete products')
      }
      
      setResult({ success: 'All products have been deleted successfully' })
    } catch (error) {
      setResult({ 
        error: error instanceof Error ? error.message : 'Failed to delete products' 
      })
      console.error('Delete error:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Delete All Products</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h2 className="text-yellow-800 font-medium mb-2">⚠️ Warning</h2>
        <p className="text-yellow-700">
          This action will permanently delete all products and their associated images. 
          This cannot be undone.
        </p>
      </div>

      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className={`
          px-4 py-2 rounded-lg font-medium
          ${isDeleting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700'
          }
          text-white transition-colors
        `}
      >
        {isDeleting ? 'Deleting...' : 'Delete All Products'}
      </button>

      {result.success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {result.success}
        </div>
      )}

      {result.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {result.error}
        </div>
      )}
    </div>
  )
} 
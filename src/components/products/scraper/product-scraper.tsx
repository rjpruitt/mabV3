'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { PlusCircle } from 'lucide-react'

interface Supplier {
  id: string
  code: string
  name: string
}

export function ProductScraper() {
  const [url, setUrl] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showSupplierForm, setShowSupplierForm] = useState(false)
  const [newSupplier, setNewSupplier] = useState({ code: '', name: '' })

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers')
      const data = await response.json()
      setSuppliers(data)
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    }
  }

  const handleAddSupplier = async () => {
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
      })
      
      if (!response.ok) {
        throw new Error('Failed to add supplier')
      }

      await fetchSuppliers()
      setNewSupplier({ code: '', name: '' })
      setShowSupplierForm(false)
    } catch (error) {
      console.error('Error adding supplier:', error)
    }
  }

  const handleScrape = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/products/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, supplierId })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Supplier</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSupplierForm(!showSupplierForm)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>

        {showSupplierForm && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <Input
              placeholder="Supplier Code"
              value={newSupplier.code}
              onChange={e => setNewSupplier(prev => ({ ...prev, code: e.target.value }))}
            />
            <Input
              placeholder="Supplier Name"
              value={newSupplier.name}
              onChange={e => setNewSupplier(prev => ({ ...prev, name: e.target.value }))}
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowSupplierForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSupplier}>
                Add Supplier
              </Button>
            </div>
          </div>
        )}

        <Select
          value={supplierId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSupplierId(e.target.value)}
        >
          <option value="">Select Supplier</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name} ({supplier.code})
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Product URL</h2>
        <Input
          placeholder="Product URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>

      <Button 
        onClick={handleScrape}
        disabled={isLoading || !url || !supplierId}
        className="w-full"
      >
        {isLoading ? 'Scraping...' : 'Scrape Product'}
      </Button>

      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
} 
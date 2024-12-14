'use client'

import { useState } from 'react'
import { Collection } from '@/types/products'
import { collectionService } from '@/lib/services/service-provider'

interface EditCollectionProps {
  collection: Collection
  onUpdate: (updated: Collection) => void
  canEdit: boolean
}

export function EditCollection({ collection, onUpdate, canEdit }: EditCollectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(collection.name)
  const [description, setDescription] = useState(collection.description || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  if (!canEdit) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
        {collection.description && (
          <p className="text-gray-600">{collection.description}</p>
        )}
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(undefined)

    try {
      const updated = await collectionService.updateCollection(collection.id, {
        name,
        description: description || undefined
      })
      onUpdate(updated)
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update collection')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isEditing) {
    return (
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
            {collection.description && (
              <p className="text-gray-600">{collection.description}</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            Edit
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Collection Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false)
            setName(collection.name)
            setDescription(collection.description || '')
          }}
          className="border px-4 py-2 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
} 
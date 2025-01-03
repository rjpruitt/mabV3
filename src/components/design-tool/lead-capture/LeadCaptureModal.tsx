'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { LeadCaptureProps, LeadInfo } from './types'

const TIMEFRAME_OPTIONS = [
  { value: 'immediate', label: 'As soon as possible' },
  { value: '1-3 months', label: '1-3 months' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6+ months', label: '6+ months or more' }
]

export function LeadCaptureModal({ isOpen, onClose, onSubmit, trigger }: LeadCaptureProps) {
  const [formData, setFormData] = useState<LeadInfo>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    projectTimeframe: 'immediate'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'get-price':
        return 'Get Your Price Estimate'
      case 'save-design':
        return 'Save Your Design'
      case 'share-design':
        return 'Share Your Design'
      case 'consultation':
        return 'Schedule Your Consultation'
      default:
        return 'Continue'
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {getTriggerMessage()}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full rounded border p-2"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full rounded border p-2"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                required
                className="w-full rounded border p-2"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                type="text"
                required
                className="w-full rounded border p-2"
                value={formData.zipCode}
                onChange={e => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Project Timeframe</label>
              <select
                className="w-full rounded border p-2"
                value={formData.projectTimeframe}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  projectTimeframe: e.target.value as LeadInfo['projectTimeframe']
                }))}
              >
                {TIMEFRAME_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 
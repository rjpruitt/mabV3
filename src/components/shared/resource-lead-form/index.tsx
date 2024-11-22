'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ValidationMessage } from '@/components/ui/validation-message'
import { SuccessMessage } from '@/components/ui/success-message'
import { maskPhoneNumber } from '@/lib/input-mask'
import { isValidEmail, isValidPhone } from '@/lib/validation'
import { resources } from '@/config/resources'
import { ResourceType } from '@/types/resources'

interface ResourceLeadFormProps {
  resourceId: ResourceType
  isOpen: boolean
  onClose: () => void
}

export function ResourceLeadForm({ resourceId, isOpen, onClose }: ResourceLeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    metadata: {} as Record<string, string>
  })

  const resource = resources[resourceId]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      setError('Please enter a valid phone number')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/submit-resource-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          resourceType: resourceId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setShowSuccess(true)
      onClose()
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {showSuccess && (
        <SuccessMessage 
          title="Thank you!"
          message={resource.thankYouMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Get Your Free {resource.title}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-900">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-900">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-900">
                Phone (optional)
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  phone: maskPhoneNumber(e.target.value)
                })}
                placeholder="(XXX) XXX-XXXX"
              />
            </div>

            {resource.formFields?.map(field => (
              <div key={field.id}>
                <Label htmlFor={field.id} className="text-gray-900">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    value={formData.metadata[field.id] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: {
                        ...formData.metadata,
                        [field.id]: e.target.value
                      }
                    })}
                    className="w-full rounded-sm border border-input bg-white p-2 text-gray-900"
                    required={field.required}
                  >
                    <option value="" className="text-gray-500">Select an option</option>
                    {field.options?.map(option => (
                      <option key={option} value={option} className="text-gray-900">{option}</option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.id}
                    value={formData.metadata[field.id] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: {
                        ...formData.metadata,
                        [field.id]: e.target.value
                      }
                    })}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            {error && <ValidationMessage message={error} type="error" />}

            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-white h-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner /> : 'Get Your Free Guide'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
} 
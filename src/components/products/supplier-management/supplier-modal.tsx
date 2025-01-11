'use client'

import { useState, useEffect, useCallback } from 'react'
import { formStyles } from '@/lib/styles/forms'
import type { Prisma } from '@prisma/client'
import { toast } from 'sonner'
import { debounce } from 'lodash'

// Available contact role types
const CONTACT_ROLES = [
  'SALES',
  'TECHNICAL_SUPPORT',
  'INSTALLATION_SUPPORT'
] as const

type ContactRole = typeof CONTACT_ROLES[number]

interface Contact {
  name: string
  email: string
  phone: string
  roles: {
    type: ContactRole
    isPrimary: boolean
    notes?: string
  }[]
}

interface FormErrors {
  name?: string
  code?: string
  contacts?: string[]
}

interface SupplierModalProps {
  onClose: () => void
  onSave: (data: Prisma.SupplierCreateInput) => Promise<void>
  isLoading?: boolean
}

export function SupplierModal({ onClose, onSave, isLoading = false }: SupplierModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    contacts: [] as Contact[]
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingCode, setIsCheckingCode] = useState(false)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Supplier name is required'
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Supplier code is required'
    } else if (!/^[A-Z0-9-_]+$/i.test(formData.code)) {
      newErrors.code = 'Code must contain only letters, numbers, hyphens, and underscores'
    }

    // Contact validation
    const contactErrors: string[] = []
    formData.contacts.forEach((contact, index) => {
      if (!contact.name.trim()) {
        contactErrors[index] = 'Contact name is required'
      }
      if (contact.email && !/\S+@\S+\.\S+/.test(contact.email)) {
        contactErrors[index] = 'Invalid email address'
      }
    })
    if (contactErrors.length) {
      newErrors.contacts = contactErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const cleanFormData = (data: typeof formData) => {
    return {
      ...data,
      name: data.name.trim(),
      code: data.code.trim().toUpperCase(),
      contacts: data.contacts
        .filter(contact => contact.name.trim() || contact.email || contact.phone || contact.roles.length > 0)
        .map(contact => ({
          ...contact,
          name: contact.name.trim(),
          email: contact.email.trim() || null,
          phone: contact.phone.trim() || null,
          roles: contact.roles.map(role => ({
            ...role,
            notes: role.notes?.trim() || null
          }))
        }))
    }
  }

  const addContact = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts, {
        name: '',
        email: '',
        phone: '',
        roles: []
      }]
    }))
  }

  const updateContact = (index: number, contact: Partial<Contact>) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((c, i) => 
        i === index ? { ...c, ...contact } : c
      )
    }))
  }

  const removeContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index)
    }))
  }

  const addRole = (contactIndex: number, role: ContactRole) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => {
        if (i !== contactIndex) return contact
        
        // Don't add if role already exists
        if (contact.roles.some(r => r.type === role)) return contact

        return {
          ...contact,
          roles: [...contact.roles, {
            type: role,
            isPrimary: false,
            notes: ''
          }]
        }
      })
    }))
  }

  const updateRole = (contactIndex: number, roleType: ContactRole, updates: Partial<{ isPrimary: boolean, notes: string }>) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => {
        if (i !== contactIndex) return contact

        // If making this role primary, ensure other contacts' same role type is not primary
        if (updates.isPrimary) {
          prev.contacts.forEach((otherContact, otherIndex) => {
            if (otherIndex !== contactIndex) {
              otherContact.roles.forEach(role => {
                if (role.type === roleType) {
                  role.isPrimary = false
                }
              })
            }
          })
        }

        return {
          ...contact,
          roles: contact.roles.map(role => 
            role.type === roleType 
              ? { ...role, ...updates }
              : role
          )
        }
      })
    }))
  }

  const removeRole = (contactIndex: number, roleType: ContactRole) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => 
        i === contactIndex
          ? {
              ...contact,
              roles: contact.roles.filter(role => role.type !== roleType)
            }
          : contact
      )
    }))
  }

  // Debounced function to check code availability
  const checkCodeAvailability = useCallback(
    debounce(async (code: string) => {
      if (!code) return
      
      setIsCheckingCode(true)
      try {
        const response = await fetch(`/api/suppliers/validate-code?code=${encodeURIComponent(code)}`)
        const data = await response.json()
        
        if (!data.isAvailable) {
          setErrors(prev => ({ 
            ...prev, 
            code: 'This code is already in use' 
          }))
        }
      } catch (error) {
        console.error('Error checking code:', error)
      } finally {
        setIsCheckingCode(false)
      }
    }, 500),
    []
  )

  // Update the code input handler
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value.trim().toUpperCase()
    setFormData(prev => ({ ...prev, code: newCode }))
    
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: undefined }))
    }

    if (newCode) {
      checkCodeAvailability(newCode)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    try {
      setIsSubmitting(true)

      if (!validateForm()) {
        toast.error('Please fix the form errors')
        return
      }

      const cleanedData = cleanFormData(formData)
      
      const prismaInput: Prisma.SupplierCreateInput = {
        name: cleanedData.name,
        code: cleanedData.code,
        active: true,
        contacts: {
          create: cleanedData.contacts.map(contact => ({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            roles: {
              create: contact.roles.map(role => ({
                type: role.type,
                isPrimary: role.isPrimary,
                notes: role.notes
              }))
            }
          }))
        }
      }

      await onSave(prismaInput)
      toast.success('Supplier created successfully')
      onClose()
    } catch (error) {
      console.error('Error creating supplier:', error)
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        toast.error('A supplier with this code already exists')
        setErrors(prev => ({ ...prev, code: 'This code is already in use' }))
      } else {
        toast.error('Failed to create supplier')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Supplier</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Supplier Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: undefined }))
                  }
                }}
                className={`${formStyles.input} ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter supplier name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Code * <span className="text-sm text-gray-500">(letters, numbers, hyphens, underscores)</span>
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={handleCodeChange}
                className={`${formStyles.input} ${errors.code ? 'border-red-500' : ''}`}
                placeholder="Enter unique supplier code"
              />
              {isCheckingCode && (
                <span className="mt-1 text-sm text-gray-500">
                  Checking availability...
                </span>
              )}
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code}</p>
              )}
            </div>
          </div>

          {/* Contacts Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Contacts</h3>
              <button
                type="button"
                onClick={addContact}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add Contact
              </button>
            </div>

            {formData.contacts.map((contact, contactIndex) => (
              <div key={contactIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Contact {contactIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeContact(contactIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact.name}
                      onChange={(e) => updateContact(contactIndex, { name: e.target.value })}
                      className={`${formStyles.input} ${errors.contacts?.[contactIndex] ? 'border-red-500' : ''}`}
                    />
                    {errors.contacts?.[contactIndex] && (
                      <p className="mt-1 text-sm text-red-600">{errors.contacts[contactIndex]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateContact(contactIndex, { email: e.target.value })}
                      className={`${formStyles.input} ${errors.contacts?.[contactIndex] ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateContact(contactIndex, { phone: e.target.value })}
                      className={formStyles.input}
                    />
                  </div>
                </div>

                {/* Roles Section */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Roles
                    </label>
                    <select
                      className={`${formStyles.select} w-auto`}
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          addRole(contactIndex, e.target.value as ContactRole)
                          e.target.value = ''
                        }
                      }}
                    >
                      <option value="">Add Role</option>
                      {CONTACT_ROLES.filter(role => 
                        !contact.roles.some(r => r.type === role)
                      ).map(role => (
                        <option key={role} value={role}>
                          {role.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    {contact.roles.map(role => (
                      <div key={role.type} className="flex items-start space-x-4 p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {role.type.replace(/_/g, ' ')}
                            </span>
                            <label className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                checked={role.isPrimary}
                                onChange={(e) => updateRole(
                                  contactIndex,
                                  role.type,
                                  { isPrimary: e.target.checked }
                                )}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm text-gray-600">Primary</span>
                            </label>
                          </div>
                          <input
                            type="text"
                            value={role.notes || ''}
                            onChange={(e) => updateRole(
                              contactIndex,
                              role.type,
                              { notes: e.target.value }
                            )}
                            placeholder="Add notes..."
                            className={`${formStyles.input} mt-1`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeRole(contactIndex, role.type)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
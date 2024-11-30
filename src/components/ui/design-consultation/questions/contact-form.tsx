'use client'

import React, { useState } from 'react'
import { BaseQuestionProps } from './types'

interface ContactFormData {
  name: string
  email: string
  phone: string
  preferredContact: 'email' | 'phone' | 'text'
  notes?: string
}

interface ValidationState {
  name: boolean
  email: boolean
  phone: boolean
}

const formatPhoneNumber = (value: string) => {
  // Remove all non-digits
  const numbers = value.replace(/\D/g, '')
  
  // Apply mask based on length
  if (numbers.length <= 3) {
    return numbers
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
  } else {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }
}

export function ContactForm({ value = {}, onChange, step }: BaseQuestionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: value.name || '',
    email: value.email || '',
    phone: value.phone || '',
    preferredContact: value.preferredContact || 'phone',
    notes: value.notes || ''
  })
  const [touched, setTouched] = useState<ValidationState>({
    name: false,
    email: false,
    phone: false
  })

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)
  }

  const isValid = {
    name: formData.name.length >= 2,
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    preferredContact: formData.preferredContact !== ''
  }

  const isFormValid = isValid.name && isValid.email && isValid.phone

  const handleChange = (field: keyof ContactFormData, value: string) => {
    const newData = {
      ...formData,
      [field]: value,
      isValid: isFormValid
    }
    setFormData(newData)
    onChange(newData)
  }

  const handleBlur = (field: keyof ValidationState) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    handleChange('phone', formatted)
  }

  return (
    <div className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2F2F2F]">
          Your Name
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          placeholder="Full Name"
          onBlur={() => handleBlur('name')}
        />
        {!isValid.name && touched.name && (
          <p className="text-sm text-red-500">
            Name must be at least 2 characters long.
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2F2F2F]">
          Email Address
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          placeholder="email@example.com"
          onBlur={() => handleBlur('email')}
        />
        {!isValid.email && touched.email && (
          <p className="text-sm text-red-500">
            Invalid email format.
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2F2F2F]">
          Phone Number
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={handlePhoneChange}
          maxLength={14}
          className="w-full p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          placeholder="(123) 456-7890"
          onBlur={() => handleBlur('phone')}
        />
        {!isValid.phone && touched.phone && (
          <p className="text-sm text-red-500">
            Please enter a valid phone number.
          </p>
        )}
      </div>

      {/* Contact Preference */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#2F2F2F]">
          Preferred Contact Method
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['phone', 'text', 'email'].map((method) => (
            <button
              key={method}
              onClick={() => handleChange('preferredContact', method)}
              className={`
                p-3 border rounded-sm text-center transition-all
                ${formData.preferredContact === method
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/50'
                }
              `}
            >
              <span className="text-[#2F2F2F] font-medium capitalize">
                {method}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Requirements */}
      <div className="text-sm text-gray-500">
        <span className="text-red-500">*</span> Required fields
      </div>

      {/* Validation Messages */}
      {!isFormValid && touched.name && touched.email && touched.phone && (
        <p className="text-sm text-red-500">
          Please complete all required fields
        </p>
      )}

      {/* Additional Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2F2F2F]">
          Anything else we should know?
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full h-24 p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
          placeholder="Optional: Add any additional notes or questions"
        />
      </div>

      {/* Privacy Note */}
      <p className="text-sm text-gray-500">
        We respect your privacy and will only use your information to schedule and 
        confirm your consultation.
      </p>
    </div>
  )
} 
'use client'

import React, { useState, useEffect } from 'react'
import { BaseQuestionProps, ContactFormValue } from '../types'

interface ContactFormProps extends Omit<BaseQuestionProps, 'value' | 'onChange'> {
  value?: ContactFormValue
  onChange: (value: ContactFormValue) => void
}

interface ValidationState {
  name: boolean
  email: boolean
  phone: boolean
}

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
}

export function ContactForm({ 
  value = {
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    isValid: false
  }, 
  onChange, 
  step 
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormValue>(value)
  const [touched, setTouched] = useState<ValidationState>({
    name: false,
    email: false,
    phone: false
  })
  const [selectedMethods, setSelectedMethods] = useState<string[]>([value.preferredContact])

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)
  }

  const isValid = {
    name: formData.name.length >= 2,
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone)
  }

  const isFormValid = isValid.name && isValid.email && isValid.phone

  const handleChange = (field: keyof ContactFormValue, value: string) => {
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

  const toggleContactMethod = (method: string) => {
    const newMethods = selectedMethods.includes(method)
      ? selectedMethods.filter(m => m !== method)
      : [...selectedMethods, method]
    
    setSelectedMethods(newMethods)
    handleChange('preferredContact', newMethods.join(','))
  }

  useEffect(() => {
    const isValid = Boolean(
      value.name && 
      value.email && 
      value.phone && 
      value.preferredContact
    )
    onChange({
      ...value,
      isValid
    })
  }, [value.name, value.email, value.phone])

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
          className="w-full p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          placeholder="(555) 555-5555"
          onBlur={() => handleBlur('phone')}
        />
        {!isValid.phone && touched.phone && (
          <p className="text-sm text-red-500">
            Please enter a valid phone number.
          </p>
        )}
        <p className="text-sm text-gray-600 mt-2">
          We respect your privacy and will only use your information to schedule and confirm your consultation. No salespeople or telemarketers will contact you.
        </p>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#2F2F2F]">
          Preferred Contact Method
          <span className="text-red-500 ml-1">*</span>
        </label>
        <p className="text-sm text-gray-600">Select all that apply</p>
        <div className="grid grid-cols-3 gap-3">
          {['phone', 'text', 'email'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => toggleContactMethod(method)}
              className={`
                p-3 border rounded-sm transition-all text-center
                ${selectedMethods.includes(method)
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-gray-200 text-gray-600 hover:border-accent/50'
                }
              `}
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
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
    </div>
  )
} 
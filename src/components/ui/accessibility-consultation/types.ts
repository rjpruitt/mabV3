export type AccessibilityQuestionType = 
  | 'ownership'
  | 'medicare'
  | 'multiselect'
  | 'single-select'
  | 'contact'

export type AccessibilityStepId = 
  | 'relationship-ownership'
  | 'medicare-status'
  | 'mobility-needs'
  | 'safety-concerns'
  | 'timeline'
  | 'contact-info'

export interface Option {
  id: string
  text: string
  description?: string
}

export interface BaseQuestionProps {
  value?: any
  onChange: (value: any) => void
  step: AccessibilityStep
}

interface BaseAccessibilityResponse {
  isValid: boolean
  showError?: boolean
}

export interface AccessibilityResponse {
  'relationship-ownership'?: {
    relationship: string
    ownership?: string
    isValid: boolean
    showError?: boolean
  }
  'medicare-status'?: {
    status: string
    isValid: boolean
    showError?: boolean
  }
  'mobility-needs'?: {
    selections: string[]
    otherText?: string
    isValid: boolean
    showError?: boolean
  }
  'safety-concerns'?: {
    selections: string[]
    otherText?: string
    isValid: boolean
    showError?: boolean
  }
  'timeline'?: {
    selection: string
    isValid: boolean
    showError?: boolean
  }
  'contact-info'?: {
    name: string
    email: string
    phone: string
    preferredContact: 'phone' | 'email' | 'text'
    notes?: string
    isValid: boolean
    showError?: boolean
  }
}

export interface AccessibilityStep {
  id: AccessibilityStepId
  question: string
  subtext?: string
  type: AccessibilityQuestionType
  required?: boolean
  options?: Option[]
} 
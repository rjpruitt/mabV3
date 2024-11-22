export type ResourceType = 'safety-checklist' | 'care-guide' | 'planning-guide' | 'medicare-guide'

export interface ResourceLead {
  name: string
  email: string
  phone?: string
  resourceType: ResourceType
  metadata?: Record<string, any>
  timestamp?: string
}

export interface ResourceConfig {
  id: string
  title: string
  description: string
  pdfPath: string
  thumbnailPath: string
  emailTemplate: string
  formFields: ResourceFormField[]
  thankYouMessage: string
}

export interface ResourceFormField {
  id: string
  label: string
  type: 'text' | 'select' | 'radio'
  options?: string[]
  required?: boolean
} 
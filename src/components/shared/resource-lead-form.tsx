interface ResourceLeadFormProps {
  resourceType: 'safety-checklist' | 'caregiver-guide' | 'planning-guide'
  // Additional resource-specific fields
  additionalFields?: {
    id: string
    label: string
    type: 'text' | 'select' | 'radio'
    options?: string[]
    required?: boolean
  }[]
} 
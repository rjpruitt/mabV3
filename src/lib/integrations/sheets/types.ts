export interface Sheet {
  properties?: {
    title?: string
    sheetId?: number
  }
}

export interface SheetConfig {
  [key: string]: string[]
}

export type SheetLead = {
  name: string
  email: string
  phone: string
  preferredContact: string
  notes?: string
  timestamp: string
  resourceType: string
  metadata?: string
} 
export interface Sheet {
  properties?: {
    title?: string
    sheetId?: number
  }
}

export interface SheetConfig {
  [key: string]: string[]
} 
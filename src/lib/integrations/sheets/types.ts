export interface SheetLead {
  timestamp: string
  name: string
  email: string
  phone?: string
  resourceType: string
  metadata?: string
}

export interface SheetResponse {
  spreadsheetId: string
  tableRange: string
  updates: {
    spreadsheetId: string
    updatedRange: string
    updatedRows: number
    updatedColumns: number
    updatedCells: number
  }
} 
import { google } from 'googleapis'
import { SheetLead } from './types'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const sheets = google.sheets({ version: 'v4', auth })

export async function appendLeadToSheet(lead: SheetLead) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:Z', // Will append to the first empty row
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          lead.timestamp,
          lead.name,
          lead.email,
          lead.resourceType,
          lead.metadata || ''
        ]]
      }
    })

    return response.data
  } catch (error) {
    console.error('Google Sheets Error:', error)
    throw error
  }
} 
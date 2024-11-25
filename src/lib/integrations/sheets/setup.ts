import { google } from 'googleapis'
import { sheets_v4 } from 'googleapis/build/src/apis/sheets/v4'
import { Sheet, SheetConfig } from './types'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const sheets = google.sheets({ version: 'v4', auth })

const headerConfigs: SheetConfig = {
  [process.env.GOOGLE_SHEETS_MAIN_SHEET!]: [
    'Timestamp', 'Lead ID', 'Name', 'Email', 'Phone', 'Lead Type', 'Source'
  ],
  [process.env.GOOGLE_SHEETS_RESOURCE_SHEET!]: [
    'Lead ID', 'Resource Category', 'Resource Name', 'Additional Fields'
  ],
  [process.env.GOOGLE_SHEETS_CONSULTATION_SHEET!]: [
    'Lead ID', 'Preferred Time', 'Project Type', 'Timeline', 'Budget Range'
  ],
  [process.env.GOOGLE_SHEETS_ASSESSMENT_SHEET!]: [
    'Lead ID', 'Property Type', 'Mobility Needs', 'Urgency'
  ]
}

export async function setupSheetHeaders() {
  try {
    console.log('Starting sheet headers setup...')
    
    for (const [sheetName, headers] of Object.entries(headerConfigs)) {
      console.log(`Setting up headers for ${sheetName}...`)
      
      const sheetId = await getSheetId(sheetName)
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${sheetName}!A1:Z1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      })
      
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
        requestBody: {
          requests: [{
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
                  textFormat: { bold: true }
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)'
            }
          }]
        }
      })
      
      console.log(`Headers set for ${sheetName}`)
    }
    
    console.log('All headers setup complete!')
    return true
  } catch (error) {
    console.error('Error setting up sheet headers:', error)
    throw error
  }
}

async function getSheetId(sheetName: string): Promise<number> {
  const response = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  })
  
  const sheet = response.data.sheets?.find((s: sheets_v4.Schema$Sheet) => 
    s.properties?.title === sheetName
  )
  
  if (!sheet?.properties?.sheetId) {
    throw new Error(`Sheet ${sheetName} not found`)
  }
  
  return sheet.properties.sheetId
}

module.exports = {
  setupSheetHeaders
} 
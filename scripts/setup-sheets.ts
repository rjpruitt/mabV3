import { setupSheetHeaders } from '../src/lib/integrations/sheets/setup'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function main() {
  try {
    console.log('Starting Google Sheets setup...')
    await setupSheetHeaders()
    console.log('Setup completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  }
}

main() 
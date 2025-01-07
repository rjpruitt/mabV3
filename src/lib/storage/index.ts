import fs from 'fs/promises'
import path from 'path'

export type StorageProvider = 'local' | 's3' | 'supabase'

export class StorageService {
  private provider: StorageProvider
  
  constructor(provider: StorageProvider = 'local') {
    this.provider = provider
  }

  async uploadImage(localPath: string): Promise<string> {
    if (this.provider === 'local') {
      // For local development, just copy to public/uploads
      const filename = path.basename(localPath)
      const publicPath = path.join(process.cwd(), 'public', 'uploads', filename)
      
      await fs.mkdir(path.dirname(publicPath), { recursive: true })
      await fs.copyFile(localPath, publicPath)
      
      return `/uploads/${filename}`
    }
    
    // We'll add cloud storage implementations later
    throw new Error('Cloud storage not implemented yet')
  }
} 
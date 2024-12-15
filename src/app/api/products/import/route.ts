import { NextResponse } from 'next/server'
import { productsService } from '@/lib/services/service-provider'
import { ImportFormData } from '@/components/products/types'

export async function POST(request: Request) {
  try {
    const data: ImportFormData = await request.json()
    const product = await productsService.importProduct(data)
    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Product import failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Import failed' 
      },
      { status: 500 }
    )
  }
} 
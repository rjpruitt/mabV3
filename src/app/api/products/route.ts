import { protectedApi } from '@/lib/auth/protected-api'
import { productService } from '@/lib/services/service-provider'
import { NextResponse } from 'next/server'

export const GET = protectedApi(async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const isActive = searchParams.get('isActive')
  const brand = searchParams.get('brand')

  const products = await productService.listProducts({
    category: category as any,
    status: isActive === 'true' ? 'active' : undefined
  })

  return NextResponse.json(products)
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 
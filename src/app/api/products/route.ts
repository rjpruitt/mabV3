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

export const POST = protectedApi(async (request: Request) => {
  const { supplierId, externalId } = await request.json()
  
  if (!supplierId || !externalId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const product = await productService.importProducts('homedepot', [{
    supplierId,
    externalId
  }])
  
  return NextResponse.json(product)
}, {
  requiredRoles: ['admin', 'catalogue_manager']
}) 
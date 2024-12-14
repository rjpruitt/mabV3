import { protectedApi } from '@/lib/auth/protected-api'
import { productService } from '@/lib/services/service-provider'
import { NextResponse } from 'next/server'

export const GET = protectedApi(async (request: Request, { params }) => {
  try {
    const [product] = await productService.listProducts({ externalId: params.id })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
})

export const PUT = protectedApi(async (request: Request, { params }) => {
  try {
    const updates = await request.json()
    const product = await productService.updateProductStatus(params.id, updates.status)
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}, {
  requiredRoles: ['admin', 'catalogue_manager']
}) 
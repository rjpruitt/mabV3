import { protectedApi } from '@/lib/auth/protected-api'
import { collectionService } from '@/lib/services/service-provider'
import { NextResponse } from 'next/server'

export const POST = protectedApi(async (request: Request, { params }) => {
  try {
    const { productId, quantity = 1 } = await request.json()
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const collection = await collectionService.updateCollection(params.id, {
      products: [{
        productId,
        quantity
      }]
    })

    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
})

export const DELETE = protectedApi(async (request: Request, { params }) => {
  try {
    const { productId } = await request.json()
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const collection = await collectionService.updateCollection(params.id, {
      products: []  // Remove all products matching productId
    })

    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove product' },
      { status: 500 }
    )
  }
}) 
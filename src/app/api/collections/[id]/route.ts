import { protectedApi } from '@/lib/auth/protected-api'
import { collectionService } from '@/lib/services/service-provider'
import { NextResponse } from 'next/server'

export const GET = protectedApi(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const collection = await collectionService.getCollectionById(params.id)
  
  if (!collection) {
    return NextResponse.json(
      { error: 'Collection not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(collection)
})

export const PATCH = protectedApi(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const updates = await request.json()
  const collection = await collectionService.updateCollection(params.id, updates)
  return NextResponse.json(collection)
})

export const DELETE = protectedApi(async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await collectionService.deleteCollection(params.id)
  return new NextResponse(null, { status: 204 })
}) 
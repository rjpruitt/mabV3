import { protectedApi } from '@/lib/auth/protected-api'
import { collectionService } from '@/lib/services/service-provider'
import { NextResponse } from 'next/server'
import { SupabaseClient } from '@supabase/supabase-js'

export const GET = protectedApi(async (request: Request, context: { supabase: SupabaseClient }) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const { data: { user } } = await context.supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const collections = await collectionService.listCollections(
      userId || user.id,
      'customer'
    )

    return NextResponse.json(collections)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list collections' }, { status: 500 })
  }
})

export const POST = protectedApi(async (request: Request, context: { supabase: SupabaseClient }) => {
  try {
    const data = await request.json()
    const { data: { user } } = await context.supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const collection = await collectionService.createCollection({
      ...data,
      createdBy: {
        id: user.id,
        type: 'customer'
      }
    })

    return NextResponse.json(collection)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 })
  }
}) 
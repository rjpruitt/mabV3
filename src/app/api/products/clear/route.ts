import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await prisma.product.deleteMany({})
    return NextResponse.json({ success: true, message: 'All products deleted' })
  } catch (error) {
    console.error('Error deleting products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete products' },
      { status: 500 }
    )
  }
} 
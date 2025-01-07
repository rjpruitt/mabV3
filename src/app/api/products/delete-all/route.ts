import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    // Delete in the correct order to handle foreign key constraints
    await prisma.$transaction([
      // First delete all product images
      prisma.image.deleteMany({}),
      prisma.category.deleteMany({}),
      prisma.specification.deleteMany({}),
      
      // Then delete all products
      prisma.product.deleteMany({})
    ])

    return NextResponse.json({ 
      success: true,
      message: 'All products and related data deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting products:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete products and related data' 
      },
      { status: 500 }
    )
  }
} 
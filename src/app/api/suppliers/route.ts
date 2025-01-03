import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating supplier with data:', body)

    // Check if supplier with code already exists
    const existingSupplier = await prisma.supplier.findUnique({
      where: {
        code: body.code
      }
    })

    if (existingSupplier) {
      console.log('Supplier code already exists:', body.code)
      return NextResponse.json(
        { error: `Supplier code '${body.code}' already exists` },
        { status: 400 }
      )
    }

    console.log('Creating new supplier with code:', body.code)
    const supplier = await prisma.supplier.create({
      data: {
        code: body.code,
        name: body.name,
        contact: body.contact || {},
        active: true
      }
    })

    console.log('Successfully created supplier:', supplier)
    return NextResponse.json({
      success: true,
      supplier
    })
  } catch (error) {
    console.error('Error creating supplier:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create supplier' },
      { status: 500 }
    )
  }
} 
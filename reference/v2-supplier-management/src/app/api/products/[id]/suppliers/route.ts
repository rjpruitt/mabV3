import { NextResponse } from 'next/server'
import { prisma } from '@/lib/server/prisma'
import { Decimal } from '@prisma/client/runtime/library'
import type { Supplier, CreateSupplierInput, SupplierResponse } from '@/lib/types/supplier'

const SCHEMA_VERSION = '1.0'

// GET: Fetch suppliers for a product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<SupplierResponse>> {
  try {
    if (process.env.PRISMA_SCHEMA_VERSION !== SCHEMA_VERSION) {
      console.warn('Schema version mismatch')
    }

    const suppliers = await prisma.productSupplier.findMany({
      where: { productId: params.id }
    })
    
    return NextResponse.json({
      data: suppliers,
      status: 'success'
    })
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    return NextResponse.json({
      error: 'Failed to fetch suppliers',
      status: 'error'
    }, { status: 500 })
  }
}

// POST: Add new supplier
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: CreateSupplierInput = await request.json()
    const supplier = await prisma.productSupplier.create({
      data: {
        ...data,
        productId: params.id
      }
    })
    return NextResponse.json(supplier)
  } catch (error) {
    console.error('Error creating supplier:', error)
    return NextResponse.json(
      { error: 'Failed to create supplier' },
      { status: 500 }
    )
  }
}

// DELETE: Remove supplier
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    await prisma.productSupplier.delete({
      where: {
        id: data.id
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting supplier:', error)
    return NextResponse.json(
      { error: 'Failed to delete supplier' },
      { status: 500 }
    )
  }
}
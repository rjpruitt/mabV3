/**
 * Suppliers API Route
 * Handles supplier-related API requests
 * GET: Returns list of suppliers ordered by name
 * POST: Creates a new supplier with contacts and roles
 */

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { CreateSupplierData } from '@/lib/products/types/supplier'

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(suppliers)
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suppliers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data: CreateSupplierData = await request.json()

    // Check for existing code one more time
    const existing = await prisma.supplier.findUnique({
      where: { code: data.code }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A supplier with this code already exists' },
        { status: 409 }
      )
    }

    const supplier = await prisma.supplier.create({
      data: {
        name: data.name,
        code: data.code,
        active: true
      }
    })

    return NextResponse.json(supplier)
  } catch (error) {
    console.error('Failed to create supplier:', error)
    return NextResponse.json(
      { error: 'Failed to create supplier' },
      { status: 500 }
    )
  }
} 
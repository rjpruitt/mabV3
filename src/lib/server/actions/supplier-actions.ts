'use server'

import { prisma } from '@/lib/prisma'
import type { Supplier, Prisma } from '@prisma/client'

export async function getSuppliers(): Promise<Supplier[]> {
  return prisma.supplier.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

export async function createSupplier(data: Prisma.SupplierCreateInput): Promise<Supplier> {
  return prisma.supplier.create({
    data
  })
} 
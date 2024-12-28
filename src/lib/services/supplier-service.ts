import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { Supplier as PrismaSupplier } from '@prisma/client'

// Define our own Supplier type based on the schema
export type Supplier = PrismaSupplier

export type CreateSupplierData = {
  name: string
  code: string
  contact?: Prisma.InputJsonValue | null
  active?: boolean
}

export async function getSuppliers() {
  return prisma.supplier.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

export async function createSupplier(supplier: CreateSupplierData): Promise<Supplier> {
  const data: Prisma.SupplierCreateInput = {
    name: supplier.name,
    code: supplier.code,
    contact: supplier.contact === null ? Prisma.JsonNull : supplier.contact,
    active: supplier.active ?? true
  }

  return prisma.supplier.create({ data })
}

export async function updateSupplier(id: string, updates: Partial<CreateSupplierData>): Promise<Supplier> {
  const data: Prisma.SupplierUpdateInput = {
    name: updates.name,
    code: updates.code,
    contact: updates.contact === null ? Prisma.JsonNull : updates.contact,
    active: updates.active
  }

  return prisma.supplier.update({
    where: { id },
    data
  })
}

export async function deleteSupplier(id: string) {
  return prisma.supplier.delete({
    where: { id }
  })
} 
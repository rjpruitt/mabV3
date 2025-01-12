/**
 * Supplier Service
 * 
 * Handles all supplier-related database operations using Prisma.
 * This service is used for managing suppliers in the product catalogue system.
 * 
 * Key functionality:
 * - Get all suppliers (ordered by name)
 * - Create new suppliers with contact info
 * - Update existing supplier details
 * - Delete suppliers
 * 
 * Used by:
 * - API routes (/api/suppliers/*)
 * - Product import wizards
 * - Supplier management UI
 * 
 * @module services/supplier-service
 */

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { Supplier as PrismaSupplier, SupplierContact } from '@prisma/client'

// Define our own Supplier type based on the schema
export type Supplier = PrismaSupplier

export type ContactData = {
  name: string
  email?: string | null
  phone?: string | null
  roles: Array<{
    type: string
    isPrimary: boolean
    notes?: string | null
  }>
}

export type CreateSupplierData = {
  name: string
  code: string
  contacts?: ContactData[]
  active?: boolean
}

export async function getSuppliers() {
  return prisma.supplier.findMany({
    orderBy: {
      name: 'asc'
    },
    include: {
      contacts: {
        include: {
          roles: true
        }
      }
    }
  })
}

export async function createSupplier(supplier: CreateSupplierData): Promise<Supplier> {
  const data: Prisma.SupplierCreateInput = {
    name: supplier.name,
    code: supplier.code,
    active: supplier.active ?? true,
    contacts: supplier.contacts ? {
      create: supplier.contacts.map(contact => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        roles: {
          create: contact.roles
        }
      }))
    } : undefined
  }

  return prisma.supplier.create({ 
    data,
    include: {
      contacts: {
        include: {
          roles: true
        }
      }
    }
  })
}

export async function updateSupplier(id: string, updates: Partial<CreateSupplierData>): Promise<Supplier> {
  const data: Prisma.SupplierUpdateInput = {
    name: updates.name,
    code: updates.code,
    active: updates.active,
    contacts: updates.contacts ? {
      deleteMany: {}, // Remove existing contacts
      create: updates.contacts.map(contact => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        roles: {
          create: contact.roles
        }
      }))
    } : undefined
  }

  return prisma.supplier.update({
    where: { id },
    data,
    include: {
      contacts: {
        include: {
          roles: true
        }
      }
    }
  })
}

export async function deleteSupplier(id: string) {
  return prisma.supplier.delete({
    where: { id }
  })
} 
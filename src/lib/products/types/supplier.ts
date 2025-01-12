/**
 * Supplier Types
 * Type definitions for supplier data management
 * 
 * Core Types:
 * - CreateSupplierData: Input type for supplier creation
 * - SupplierResponse: API response type for supplier data
 * 
 * Features:
 * - Contact management with roles
 * - Primary contact designation
 * - Multiple contact methods (email, phone)
 * - Role-based notes
 * - Supplier activation status
 * 
 * Role Types:
 * - Sales
 * - Technical Support
 * - Installation Support
 * 
 * Note: Integrates with Prisma schema definitions
 */

import type { Prisma } from '@prisma/client'

export type CreateSupplierData = {
  name: string
  code: string
  contacts: {
    name: string
    email?: string | null
    phone?: string | null
    roles: {
      type: string
      isPrimary: boolean
      notes?: string | null
    }[]
  }[]
}

export type SupplierResponse = {
  id: string
  name: string
  code: string
  active: boolean
  contacts: Array<{
    id: string
    name: string
    email: string | null
    phone: string | null
    roles: Array<{
      type: string
      isPrimary: boolean
      notes: string | null
    }>
  }>
} 
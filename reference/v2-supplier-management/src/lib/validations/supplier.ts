import { z } from 'zod'
import { Decimal } from '@prisma/client/runtime/library'

// Custom Decimal validation
const decimalSchema = z.custom<Decimal>((val: unknown) => {
  return val instanceof Decimal || val === null
}, "Must be a Decimal or null")

export const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  price: decimalSchema.nullable(),
  url: z.string().url().nullable(),
  isImported: z.boolean(),
  externalId: z.string().nullable()
})

export type SupplierSchemaType = z.infer<typeof supplierSchema> 
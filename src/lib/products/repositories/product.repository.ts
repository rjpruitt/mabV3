/**
 * Product Repository
 * Handles database operations for products using Prisma
 * 
 * Features:
 * - CRUD operations with relationships
 * - Advanced filtering capabilities
 * - Batch import support
 * - Type-safe query building
 * - Consistent relationship loading
 * 
 * Included Relations:
 * - Product images
 * - Visibility settings
 * - Supplier information
 * 
 * Note: All find operations include related data by default
 */

import { PrismaClient, type Product, type Prisma, type ProductImage, type ProductVisibility } from '@prisma/client'

export type ProductWithRelations = Product & {
  images: ProductImage[]
  visibility: ProductVisibility | null
  supplier: {
    id: string
    name: string
  } | null
}

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<ProductWithRelations | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        supplier: true,
        images: true,
        visibility: true
      }
    }) as Promise<ProductWithRelations | null>
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data,
      include: {
        images: true,
        supplier: true,
        visibility: true
      }
    })
  }

  async findBySupplier(supplierId: string): Promise<ProductWithRelations[]> {
    return this.prisma.product.findMany({
      where: {
        supplierId
      },
      include: {
        supplier: true,
        images: true,
        visibility: true
      }
    }) as Promise<ProductWithRelations[]>
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<ProductWithRelations> {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        supplier: true,
        images: true,
        visibility: true
      }
    }) as Promise<ProductWithRelations>
  }

  async delete(id: string): Promise<ProductWithRelations> {
    return this.prisma.product.delete({
      where: { id },
      include: {
        supplier: true,
        images: true,
        visibility: true
      }
    }) as Promise<ProductWithRelations>
  }

  async findWithFilters(filters: {
    supplier?: string
    category?: string
    status?: string
    visibility?: string
  }): Promise<ProductWithRelations[]> {
    return this.prisma.product.findMany({
      where: {
        ...(filters.supplier && {
          supplier: { id: filters.supplier }
        }),
        ...(filters.category && {
          categorization: {
            path: ['type', '0'],
            equals: filters.category
          }
        }),
        ...(filters.visibility && {
          visibility: {
            roles: {
              has: filters.visibility
            }
          }
        })
      },
      include: {
        supplier: true,
        images: true,
        visibility: true
      }
    }) as Promise<ProductWithRelations[]>
  }

  async importProducts(products: Prisma.ProductCreateInput[]) {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ product: Prisma.ProductCreateInput, error: Error }>
    }

    for (const product of products) {
      try {
        await this.prisma.product.create({
          data: product
        })
        results.success++
      } catch (error) {
        results.failed++
        results.errors.push({ product, error: error as Error })
      }
    }

    return results
  }

  async findMany(args: Prisma.ProductFindManyArgs = {}): Promise<Product[]> {
    return this.prisma.product.findMany(args)
  }
} 
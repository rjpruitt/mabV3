import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

// Query parameters schema
const QuerySchema = z.object({
  page: z.string().optional().transform(Number).default('1'),
  limit: z.string().optional().transform(Number).default('20'),
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  orderBy: z.enum(['createdAt', 'name', 'brand']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Validate and parse query parameters
    const query = QuerySchema.parse(Object.fromEntries(searchParams))
    
    // Calculate pagination
    const skip = (query.page - 1) * query.limit
    
    // Build where clause
    const where: Prisma.ProductWhereInput = {
      ...(query.search && {
        OR: [
          { 
            name: { 
              contains: query.search, 
              mode: 'insensitive' as Prisma.QueryMode 
            } 
          },
          { 
            brand: { 
              contains: query.search, 
              mode: 'insensitive' as Prisma.QueryMode 
            } 
          },
        ],
      }),
      ...(query.category && {
        categories: {
          some: {
            name: query.category
          }
        }
      }),
      ...(query.brand && {
        brand: query.brand
      }),
    }

    // Fetch products with count
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: true,
          categories: true,
        },
        orderBy: {
          [query.orderBy]: query.order,
        },
        skip,
        take: query.limit,
      }),
      prisma.product.count({ where })
    ])

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / query.limit)
    const hasMore = query.page < totalPages

    return NextResponse.json({
      data: products,
      metadata: {
        total,
        page: query.page,
        totalPages,
        hasMore,
      }
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid query parameters',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// Helper type for JSON fields
type JsonValue = string | number | boolean | { [key: string]: JsonValue } | JsonValue[]

// Product creation schema
const ProductCreateSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.record(z.string()).transform(obj => obj as Prisma.InputJsonValue),
  visibility: z.record(z.boolean()).transform(obj => obj as Prisma.InputJsonValue),
  metadata: z.record(z.unknown()).optional(),
  supplierId: z.string(),
  sourceData: z.record(z.unknown()).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = ProductCreateSchema.parse(body)

    const productData: Prisma.ProductCreateInput = {
      name: validatedData.name,
      brand: validatedData.brand,
      description: validatedData.description,
      visibility: validatedData.visibility,
      metadata: validatedData.metadata as Prisma.InputJsonValue ?? Prisma.JsonNull,
      sourceData: validatedData.sourceData as Prisma.InputJsonValue ?? Prisma.JsonNull,
      supplierId: validatedData.supplierId,
    }

    const product = await prisma.product.create({
      data: productData,
      include: {
        images: true,
        categories: true,
      }
    })

    return NextResponse.json({
      data: product,
      message: 'Product created successfully'
    })

  } catch (error) {
    console.error('Error creating product:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid product data',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 
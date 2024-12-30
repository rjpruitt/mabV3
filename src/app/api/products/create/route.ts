import { prisma } from '@/lib/prisma'
import { CatalogueFormData } from '@/lib/products/types/catalogue'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log('=== Starting POST request ===')
    const formData = await request.json() as CatalogueFormData
    console.log('Received data:', {
      name: formData.name,
      brand: formData.brand,
      supplierId: formData.supplierData?.[0]?.supplierId,
      imageCount: formData.images?.length
    })

    if (!formData?.name || !formData?.brand || !formData.supplierData?.[0]?.supplierId) {
      return NextResponse.json(
        { success: false, error: 'Name, brand, and supplier are required' },
        { status: 400 }
      )
    }

    // Check if product already exists to prevent duplicates
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: formData.name,
        brand: formData.brand,
        supplierId: formData.supplierData[0].supplierId,
      }
    })

    if (existingProduct) {
      console.log('Product already exists:', existingProduct.id)
      return NextResponse.json({ 
        success: true, 
        productId: existingProduct.id,
        duplicate: true
      })
    }

    // Create the base product first
    const product = await prisma.product.create({
      data: {
        name: formData.name,
        brand: formData.brand,
        supplierId: formData.supplierData[0].supplierId,
        description: JSON.stringify({
          supplier: formData.description?.supplier || '',
          marketing: formData.description?.marketing || '',
          internal: formData.description?.internal || ''
        }),
        visibility: JSON.stringify({
          showToCustomer: formData.visibility?.showToCustomer || false,
          showToSalesRep: formData.visibility?.showToSalesRep || false
        }),
        metadata: JSON.stringify({
          categorization: formData.categorization || {},
          classification: formData.classification || {},
          designTool: formData.designTool || {},
          priceLevel: formData.priceLevel || 'SMART_SOLUTIONS'
        }),
        sourceData: JSON.stringify({
          supplierData: formData.supplierData || []
        })
      }
    })

    console.log('Created product:', product.id)

    // Handle images separately to avoid blob URL issues
    if (formData.images?.length) {
      const createdImages = await Promise.all(formData.images.map(img => 
        prisma.image.create({
          data: {
            url: img.url.startsWith('blob:') ? 'placeholder-url' : img.url,
            source: img.source || 'custom',
            isPrimary: img.isPrimary || false,
            productId: product.id
          }
        })
      ))
      console.log('Created images count:', createdImages.length)
    }

    return NextResponse.json({ 
      success: true, 
      productId: product.id 
    })
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 
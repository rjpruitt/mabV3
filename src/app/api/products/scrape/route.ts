import { NextResponse } from 'next/server'
import { AmericanStandardScraper } from '@/lib/services/scraper/suppliers/american-standard'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { url, supplierId } = await request.json()
    
    // Get supplier to determine which scraper to use
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId }
    })

    if (!supplier) {
      return NextResponse.json(
        { error: 'Supplier not found' },
        { status: 404 }
      )
    }

    // Select appropriate scraper based on supplier
    let scraper
    switch (supplier.code.toLowerCase()) {
      case 'as':
        scraper = new AmericanStandardScraper()
        break
      default:
        return NextResponse.json(
          { error: 'No scraper available for this supplier' },
          { status: 400 }
        )
    }

    const scrapedProduct = await scraper.scrapeProduct(url)
    const product = await scraper.importProduct(scrapedProduct, supplierId)

    return NextResponse.json({
      success: true,
      product
    })
  } catch (error) {
    console.error('Error scraping product:', error)
    return NextResponse.json(
      { error: 'Failed to scrape product' },
      { status: 500 }
    )
  }
} 
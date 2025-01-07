'use client'

import { ProductScraper } from '@/components/products/scraper/product-scraper'

export default function ScrapePage() {
  return (
    <div className="p-8 pt-[250px] max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Scrape Product</h1>
      <ProductScraper />
    </div>
  )
} 
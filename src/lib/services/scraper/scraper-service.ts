/**
 * Product Scraper Service Interface
 * Defines core types and interfaces for product scraping functionality
 * Includes types for scraped products, images, patterns, and specifications
 */

import { type Page } from 'playwright'

export interface ScraperService {
  scrapeProducts(): Promise<ScrapedProduct[]>
  cleanup(): Promise<void>
}

export interface ScrapedImage {
  url: string
  alt?: string
  localPath: string
  view: string
  isPrimary: boolean
}

export interface PatternVariation {
  id: string
  name: string
  thumbnail: {
    url: string
    localPath: string
  }
  images: ScrapedImage[]
  order: number
}

export interface ProductSpec {
  name: string
  value: string
}

export interface ScrapedProduct {
  url: string
  name: string
  brand: string
  description: {
    marketing: string
    internal: string
    supplier: string
  }
  categorization: {
    style: string[]
    type: string[]
  }
  specifications: {
    dimensions: {
      width: number
      depth: number
      height: number
    }
    features: string[]
    technicalSpecs: Array<{
      name: string
      value: string
    }>
    material?: string
    drainLocation?: string
    weight?: string
    certifications?: string[]
  }
  metadata: {
    dimensions: {
      width: number
      depth: number
      height: number
    }
    productType: string
    scrapedAt: string
  }
  patterns: Array<{
    id: string
    name: string
    thumbnail: {
      url: string
      localPath: string
    }
    images: Array<{
      url: string
      alt: string
      view: string
      localPath: string
      isPrimary: boolean
    }>
    order: number
  }>
}

export interface CategoryInfo {
  name: string
  url: string
  expectedCount?: number
} 
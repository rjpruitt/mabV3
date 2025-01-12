/**
 * Castico Product Transformer
 * Transforms scraped Castico product data into standardized format
 * 
 * Features:
 * - Extracts technical specifications
 * - Normalizes material information
 * - Parses drain location data
 * - Converts weight specifications
 * - Splits certification listings
 * 
 * Input: Raw scraped product data
 * Output: Normalized product data with:
 * - Structured specifications
 * - Parsed certification arrays
 * - Standardized field names
 */

import type { ScrapedProduct } from '../scraper-service'

export function transformCasticoProduct(product: ScrapedProduct): ScrapedProduct {
  const specs = product.specifications.technicalSpecs.reduce((acc, spec) => {
    acc[spec.name] = spec.value
    return acc
  }, {} as Record<string, string>)

  return {
    ...product,
    specifications: {
      ...product.specifications,
      material: specs['Material'],
      drainLocation: specs['Shower Pan Base Drain Location'],
      weight: specs['Base Product Weight (lb - kg)'],
      certifications: specs['Certifications & Listings']?.split(',').map(s => s.trim()) || []
    }
  }
} 
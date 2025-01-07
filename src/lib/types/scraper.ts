export interface ScrapedImage {
  filename: string
  url: string
  alt?: string
}

export interface ScrapedProduct {
  name: string
  description: Record<string, string>
  categories: string[]
  specifications: Record<string, string | number>
  images: ScrapedImage[]
} 
import { Metadata } from 'next'

interface GenerateMetadataProps {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function generateMetadata({
  title,
  description,
  path,
  keywords = []
}: GenerateMetadataProps): Metadata {
  const baseUrl = 'https://midamericabathworks.com'
  const fullTitle = `${title} | Mid America Bathworks`
  
  return {
    title: fullTitle,
    description,
    keywords: [
      'bathroom remodeling',
      'bathroom renovation',
      'bathroom contractors',
      ...keywords
    ].join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'Mid America Bathworks',
      images: ['/path-to-og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: `${baseUrl}${path}`
    }
  }
} 
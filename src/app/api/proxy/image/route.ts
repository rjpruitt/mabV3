import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return new NextResponse('Missing URL parameter', { status: 400 })
    }

    // Allow both Lowes and Home Depot domains
    const allowedDomains = ['thdstatic.com', 'mobileimages.lowes.com', 'images.lowes.com']
    const isAllowedDomain = allowedDomains.some(domain => imageUrl.includes(domain))
    
    if (!isAllowedDomain) {
      return new NextResponse('Invalid image domain', { status: 400 })
    }

    // Try fetching the image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      console.error(`Failed to fetch image: ${imageUrl}`, response.status)
      return new NextResponse('Failed to fetch image', { status: response.status })
    }

    const blob = await response.blob()
    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 
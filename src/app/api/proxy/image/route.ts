import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 })
  }

  // Validate URL is from trusted domains
  if (!imageUrl.includes('thdstatic.com')) {
    return new NextResponse('Invalid image domain', { status: 400 })
  }

  try {
    const response = await fetch(imageUrl, {
      next: { revalidate: 86400 } // Cache for 24 hours
    })

    if (!response.ok) throw new Error('Failed to fetch image')

    const blob = await response.blob()

    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return new NextResponse('Failed to fetch image', { status: 500 })
  }
} 
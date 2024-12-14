import { NextResponse } from 'next/server'

const UNWRANGLE_API_KEY = '5be3d004a8c7f7fb3ce3bc61e384e4296b16c042'
const BASE_URL = 'https://data.unwrangle.com/api/getter'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const page = searchParams.get('page') || '1'
  const platform = searchParams.get('platform') || 'homedepot_search'

  try {
    const url = new URL(BASE_URL)
    url.searchParams.append('platform', platform)
    url.searchParams.append('search', search)
    url.searchParams.append('page', page)
    url.searchParams.append('api_key', UNWRANGLE_API_KEY)

    const response = await fetch(url.toString())
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unwrangle API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
} 
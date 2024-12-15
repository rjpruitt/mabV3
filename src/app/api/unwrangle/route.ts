import { NextResponse } from 'next/server'

const UNWRANGLE_API_KEY = process.env.UNWRANGLE_API_KEY
const BASE_URL = 'https://data.unwrangle.com/api/getter'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get('platform') || 'homedepot_search'
  
  try {
    const url = new URL(BASE_URL)
    url.searchParams.append('platform', platform)
    url.searchParams.append('api_key', UNWRANGLE_API_KEY!)

    // Copy all other search params
    searchParams.forEach((value, key) => {
      if (key !== 'platform') {
        url.searchParams.append(key, value)
      }
    })

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
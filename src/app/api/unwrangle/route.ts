import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Copy all search params to our params object
  const params = new URLSearchParams()
  searchParams.forEach((value, key) => {
    params.append(key, value)
  })
  params.append('api_key', process.env.UNWRANGLE_API_KEY || '')

  // Log full request details
  console.log('Unwrangle API Request:', {
    url: `https://data.unwrangle.com/api/getter/?${params.toString().replace(process.env.UNWRANGLE_API_KEY || '', 'HIDDEN')}`,
    platform: params.get('platform'),
    search: params.get('search'),
    productUrl: params.get('url'),
    store_no: params.get('store_no'),
    zipcode: params.get('zipcode'),
    zip_state: params.get('zip_state')
  })

  try {
    const response = await fetch(`https://data.unwrangle.com/api/getter/?${params.toString()}`)
    const data = await response.json()
    
    // Log full response
    console.log('Unwrangle API Response:', {
      success: data.success,
      error: data.error,
      resultCount: data.result_count,
      results: data.results ? data.results.length : 0,
      firstResult: data.results?.[0],
      detail: data.detail ? 'Present' : 'Missing'
    })
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Unwrangle API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch data' 
    }, { status: 500 })
  }
} 
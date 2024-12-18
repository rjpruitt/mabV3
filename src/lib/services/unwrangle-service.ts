import { ProductSource } from '@/types/products'

interface UnwrangleSearchParams {
  search?: string
  page?: number
  store_no?: string
  zipcode?: string
}

interface UnwrangleProductParams {
  url?: string
  platform?: 'homedepot' | 'lowes'
}

interface LowesSearchResponse {
  success: boolean
  search: string
  page: number
  total_results: number
  no_of_pages: number
  result_count: number
  results: Array<{
    id: string
    url: string
    name: string
    brand: string
    model_no: string
    price: string
    rating: number | null
    total_ratings: number | null
  }>
  meta_data: Record<string, any>
  remaining_credits: number
}

interface LowesProductDetail {
  name: string
  brand: string
  images: string[]
  rating: number
  total_reviews: number
  description: string
  categories: string[]
  specifications: Array<{
    name: string
    value: string
  }>
  highlights: string[]
  model_no: string
  sku_id: string
  in_stock: boolean
}

interface LowesSearchResult {
  id: string
  url: string
  name: string
  brand: string
  model_no: string
  price: string
  rating: number | null
  total_ratings: number | null
  image_url?: string
  sku_id: string
  primary_image?: string
  thumbnail_url?: string
  images: string[]
}

export class UnwrangleService {
  private baseUrl = '/api/unwrangle'
  private apiKey = process.env.NEXT_PUBLIC_UNWRANGLE_API_KEY

  async searchHomeDepot({ 
    search = '', 
    page = 1,
    store_no = '',
    zipcode = ''
  }: UnwrangleSearchParams = {}) {
    try {
      const url = new URL(this.baseUrl, window.location.origin)
      url.searchParams.append('platform', 'homedepot_search')
      url.searchParams.append('search', search)
      url.searchParams.append('page', page.toString())
      if (store_no) url.searchParams.append('store_no', store_no)
      if (zipcode) url.searchParams.append('zipcode', zipcode)

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`Unwrangle API error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Home Depot raw product data:', data.results[0])
      return data
    } catch (error) {
      console.error('Unwrangle search error:', error)
      throw error
    }
  }

  async searchLowes({ search = '', page = 1, store_no, zipcode }: UnwrangleSearchParams): Promise<LowesSearchResponse> {
    try {
      const params = new URLSearchParams({
        platform: 'lowes_search',
        search: search.replace(/\s+/g, '+'),
        page: page.toString(),
        api_key: this.apiKey || ''
      })

      if (store_no) params.append('store_no', store_no)
      if (zipcode) params.append('zipcode', zipcode)

      const url = `${this.baseUrl}?${params.toString()}`
      console.log('Lowes search URL:', url)
      console.log('Search params:', {
        search,
        encodedSearch: search.replace(/\s+/g, '+'),
        page,
        store_no,
        zipcode
      })

      const response = await fetch(url)
      const data = await response.json()

      console.log('Lowes API full response:', data)

      if (!data.success) {
        throw new Error(data.error || 'Failed to search Lowes products')
      }

      console.log('Lowes raw product data:', data.results[0])

      const results = data.results.map((product: LowesSearchResult) => ({
        ...product,
        source: 'lowes' as const,
        thumbnails: product.images ? [product.images[0]] : []
      }))

      return {
        ...data,
        results
      }
    } catch (error) {
      console.error('Lowes search error:', error)
      throw error
    }
  }

  async getLowesProductDetails({ 
    url, 
    zipcode = '99504',
    store_no = '2955',
    zip_state = 'AK'
  }: { 
    url: string
    zipcode?: string
    store_no?: string
    zip_state?: string 
  }) {
    try {
      const params = new URLSearchParams({
        platform: 'lowes_detail',
        url: encodeURIComponent(url),
        api_key: this.apiKey || '',
        zipcode,
        store_no,
        zip_state
      })

      const response = await fetch(`${this.baseUrl}?${params.toString()}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to get product details')
      }

      const detail = data.detail
      return {
        // Basic info
        name: detail.name,
        brand: detail.brand,
        url: detail.url,
        model_no: detail.model_no,
        sku_id: detail.sku_id,
        barcode: detail.barcode,

        // Pricing
        price: detail.price,
        list_price: detail.list_price,
        currency: detail.currency,

        // Reviews
        rating: detail.rating,
        total_reviews: detail.total_reviews,

        // Content
        description: detail.description,
        categories: detail.categories,
        specifications: detail.specifications,
        highlights: detail.highlights,
        images: detail.images,
        videos: detail.videos,

        // Availability
        in_stock: detail.in_stock,
        lowes_exclusive: detail.lowes_exclusive,
        inventory_quantity: detail.inventory_quantity,
        est_delivery_date: detail.est_delivery_date,

        // Additional details
        measurements: detail.measurements,
        warranty: detail.warranty,
        guides: detail.guides,
        store: detail.store
      }
    } catch (error) {
      console.error('Product details error:', error)
      throw error
    }
  }

  async getHomeDepotProductDetails({ url }: { url: string }) {
    try {
      const params = new URLSearchParams({
        platform: 'homedepot_detail',
        url: encodeURIComponent(url),
        api_key: this.apiKey || ''
      })

      const response = await fetch(`${this.baseUrl}?${params.toString()}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to get product details')
      }

      return data.detail
    } catch (error) {
      console.error('Product details error:', error)
      throw error
    }
  }

  async getProductDetails({ url, platform = 'homedepot' }: UnwrangleProductParams) {
    if (!url) {
      throw new Error('Product URL is required')
    }

    try {
      const details = platform === 'homedepot' 
        ? await this.getHomeDepotProductDetails({ url })
        : await this.getLowesProductDetails({ 
            url,
            zipcode: '99504',
            store_no: '2955',
            zip_state: 'AK'
          })

      return {
        ...details,
        source: platform,
        url
      }
    } catch (error) {
      console.error('Product details error:', error)
      throw error
    }
  }

  // Helper method to map Unwrangle data to our product schema
  private mapUnwrangleData(data: any, source: ProductSource) {
    // TODO: Implement mapping logic
    return data
  }
} 
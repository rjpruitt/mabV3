import { ProductSource } from '@/types/products'

interface UnwrangleSearchParams {
  search?: string
  page?: number
  store_no?: string
  zipcode?: string
}

interface UnwrangleProductParams {
  url?: string
  item_id?: string
}

export class UnwrangleService {
  private baseUrl = '/api/unwrangle'

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
      return data
    } catch (error) {
      console.error('Unwrangle search error:', error)
      throw error
    }
  }

  async searchLowes({ search = '', page = 1 }: UnwrangleSearchParams = {}) {
    try {
      const url = new URL(this.baseUrl, window.location.origin)
      url.searchParams.append('platform', 'lowes_search')
      url.searchParams.append('search', search)
      url.searchParams.append('page', page.toString())

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`Unwrangle API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Unwrangle search error:', error)
      throw error
    }
  }

  async getProductDetails({ url, item_id }: UnwrangleProductParams) {
    try {
      const apiUrl = new URL(this.baseUrl, window.location.origin)
      apiUrl.searchParams.append('platform', 'homedepot_detail')
      if (url) apiUrl.searchParams.append('url', url)
      if (item_id) apiUrl.searchParams.append('item_id', item_id)

      const response = await fetch(apiUrl.toString())
      if (!response.ok) {
        throw new Error(`Unwrangle API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.detail || {}
    } catch (error) {
      console.error('Unwrangle product data error:', error)
      throw error
    }
  }

  // Helper method to map Unwrangle data to our product schema
  private mapUnwrangleData(data: any, source: ProductSource) {
    // TODO: Implement mapping logic
    return data
  }
} 
import { ProductSource } from '@/types/products'

interface UnwrangleSearchParams {
  search?: string
  page?: number
}

export class UnwrangleService {
  private baseUrl = '/api/unwrangle'

  async searchHomeDepot({ search = '', page = 1 }: UnwrangleSearchParams = {}) {
    try {
      const url = new URL(this.baseUrl, window.location.origin)
      url.searchParams.append('platform', 'homedepot_search')
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

  // Helper method to map Unwrangle data to our product schema
  private mapUnwrangleData(data: any, source: ProductSource) {
    // TODO: Implement mapping logic
    return data
  }
} 
import { supabase } from '@/lib/supabase'
import { Product, ProductSource, ProductStatus, ProductImport } from '@/types/products'

interface ProductFilters {
  source?: ProductSource
  status?: ProductStatus
  category?: string
  externalId?: string
}

export class ProductService {
  async importProducts(source: ProductSource, data: any[]): Promise<ProductImport> {
    try {
      // Process and store incoming product data
      const importRecord: ProductImport = {
        source,
        sourceData: data,
        processedAt: new Date(),
        status: 'pending'
      }

      // TODO: Implement import logic
      return importRecord
    } catch (error) {
      console.error('Import error:', error)
      throw error
    }
  }

  async listProducts(filters: ProductFilters = {}): Promise<Product[]> {
    try {
      let query = supabase.from('products').select('*')

      if (filters?.source) {
        query = query.eq('source', filters.source)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.category) {
        query = query.eq('category', filters.category)
      }
      if (filters?.externalId) {
        query = query.eq('externalId', filters.externalId)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Product[]
    } catch (error) {
      console.error('List products error:', error)
      throw error
    }
  }

  async updateProductStatus(id: string, status: ProductStatus): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ status, lastUpdated: new Date() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Product
    } catch (error) {
      console.error('Update product status error:', error)
      throw error
    }
  }

  async updateProductPrice(id: string, markup: number): Promise<Product> {
    try {
      // Get current product
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select()
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Calculate new price
      const retail = product.price.retail
      const calculated = retail * (1 + markup/100)

      const newPrice = {
        ...product.price,
        markup,
        calculated,
        lastUpdated: new Date()
      }

      // Update product
      const { data, error } = await supabase
        .from('products')
        .update({ 
          price: newPrice,
          lastUpdated: new Date()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Product
    } catch (error) {
      console.error('Update product price error:', error)
      throw error
    }
  }
} 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          supplier_id: string
          external_id: string
          name: string
          brand: string
          description: string | null
          model_number: string | null
          category: 'faucets' | 'showers' | 'bathtubs' | 'toilets' | 'vanities' | 'lighting' | 'accessories' | 'hardware' | 'wall_panels' | 'glass_doors'
          specifications: Json
          images: Json
          price: Json
          inventory: Json
          is_active: boolean
          last_updated: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          supplier_id: string
          external_id: string
          name: string
          brand: string
          description?: string | null
          model_number?: string | null
          category: 'faucets' | 'showers' | 'bathtubs' | 'toilets' | 'vanities' | 'lighting' | 'accessories' | 'hardware' | 'wall_panels' | 'glass_doors'
          specifications?: Json
          images?: Json
          price: Json
          inventory: Json
          is_active?: boolean
          last_updated?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          supplier_id?: string
          external_id?: string
          name?: string
          brand?: string
          description?: string | null
          model_number?: string | null
          category?: 'faucets' | 'showers' | 'bathtubs' | 'toilets' | 'vanities' | 'lighting' | 'accessories' | 'hardware' | 'wall_panels' | 'glass_doors'
          specifications?: Json
          images?: Json
          price?: Json
          inventory?: Json
          is_active?: boolean
          last_updated?: string
          metadata?: Json | null
        }
      }
      collections: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: Json
          products: Json[]
          status: 'draft' | 'shared' | 'archived'
          is_public: boolean
          theme: string | null
          style: string | null
          total_estimate: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_by: Json
          products?: Json[]
          status?: 'draft' | 'shared' | 'archived'
          is_public?: boolean
          theme?: string | null
          style?: string | null
          total_estimate?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_by?: Json
          products?: Json[]
          status?: 'draft' | 'shared' | 'archived'
          is_public?: boolean
          theme?: string | null
          style?: string | null
          total_estimate?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      bathroom_category: 'faucets' | 'showers' | 'bathtubs' | 'toilets' | 'vanities' | 'lighting' | 'accessories' | 'hardware' | 'wall_panels' | 'glass_doors'
      collection_status: 'draft' | 'shared' | 'archived'
      user_role: 'admin' | 'catalogue_manager' | 'design_consultant' | 'customer'
    }
  }
} 
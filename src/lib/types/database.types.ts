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
      Product: {
        Row: {
          id: string
          name: string
          brand: string
          description: Json
          visibility: Json
          metadata: Json | null
          createdAt: Date
          updatedAt: Date
          supplierId: string
          sourceData: Json | null
        }
        Insert: {
          id?: string
          name: string
          brand: string
          description: Json
          visibility: Json
          metadata?: Json | null
          createdAt?: Date
          updatedAt?: Date
          supplierId: string
          sourceData?: Json | null
        }
        Update: {
          id?: string
          name?: string
          brand?: string
          description?: Json
          visibility?: Json
          metadata?: Json | null
          createdAt?: Date
          updatedAt?: Date
          supplierId?: string
          sourceData?: Json | null
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

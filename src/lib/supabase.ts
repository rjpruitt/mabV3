import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
    storage: {
      getItem: (key) => {
        if (typeof window === 'undefined') return null
        return window.sessionStorage.getItem(key)
      },
      setItem: (key, value) => {
        if (typeof window === 'undefined') return
        window.sessionStorage.setItem(key, value)
      },
      removeItem: (key) => {
        if (typeof window === 'undefined') return
        window.sessionStorage.removeItem(key)
      }
    }
  }
})

// Only create admin client on the server
export const createAdminClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
} 
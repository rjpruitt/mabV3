export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  UNWRANGLE_API_KEY: process.env.UNWRANGLE_API_KEY!,
  UNWRANGLE_API_URL: process.env.UNWRANGLE_API_URL!,
  STORE_ID: process.env.STORE_ID,
  ZIP_CODE: process.env.ZIP_CODE
} as const

// Type check to ensure required env vars are present
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    }
  }
} 
import { User } from '@supabase/supabase-js'

export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false
  
  // Check app_metadata for roles
  const roles = user.app_metadata?.roles || []
  return roles.includes(role)
} 
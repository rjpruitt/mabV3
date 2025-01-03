import { cookies } from 'next/headers'

export async function getCookies() {
  const cookieStore = cookies()
  return {
    get: async (name: string) => cookieStore.get(name)?.value,
    getAll: async () => cookieStore.getAll()
  }
} 
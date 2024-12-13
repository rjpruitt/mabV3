type CacheEntry = {
  value: any
  timestamp: number
}

export class CacheService {
  private cache: Map<string, CacheEntry> = new Map()
  private readonly TTL: number = 1000 * 60 * 60 // 1 hour

  set(key: string, value: any) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }

  get(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }

    return entry.value
  }

  clear() {
    this.cache.clear()
  }
}

export const imageCache = new CacheService() 
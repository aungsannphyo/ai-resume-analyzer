// Simple in-memory cache for development
// In production, consider using Redis or a proper caching solution

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry>();

export const generateCacheKey = (input: any): string => {
  // Create a simple hash from the input object
  const sortedKeys = Object.keys(input).sort();
  const keyString = sortedKeys.map(key => `${key}:${JSON.stringify(input[key])}`).join('|');
  return btoa(keyString).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
};

export const getCache = (key: string): any | null => {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
};

export const setCache = (key: string, data: any, ttlMs: number = 3600000): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMs,
  });
};

export const clearCache = (): void => {
  cache.clear();
};

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key);
    }
  }
}, 60000); // Clean up every minute

const rateLimitMap = new Map();

interface RateLimitResult {
  success: boolean;
  remaining?: number;
  resetTime?: number;
}

export const rateLimit = async (request: Request): Promise<RateLimitResult> => {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // 10 requests per minute

  const key = `${ip}:${Math.floor(now / windowMs)}`;
  const current = rateLimitMap.get(key) || 0;

  if (current >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: now + windowMs,
    };
  }

  rateLimitMap.set(key, current + 1);

  // Clean up old entries
  setTimeout(() => {
    rateLimitMap.delete(key);
  }, windowMs);

  return {
    success: true,
    remaining: maxRequests - current - 1,
    resetTime: now + windowMs,
  };
};

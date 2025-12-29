
import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export class RateLimit {
  private tokenCache: LRUCache<string, number[]>;

  constructor(options?: RateLimitOptions) {
    this.tokenCache = new LRUCache({
      max: options?.uniqueTokenPerInterval || 500,
      ttl: options?.interval || 60000,
    });
  }

  check(limit: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const tokenCount = this.tokenCache.get(token) || [0];
      if (tokenCount[0] === 0) {
        this.tokenCache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage > limit;
      
      if (isRateLimited) {
        reject(new Error("Rate limit exceeded"));
      } else {
         // Update the count in cache (LRU update)
         this.tokenCache.set(token, tokenCount);
         resolve();
      }
    });
  }
}

// Global instance for the application
// Limit: 10 requests per hour (3600000 ms) per IP
export const rateLimiter = new RateLimit({
  uniqueTokenPerInterval: 500, // Max 500 users tracked at once
  interval: 3600000 // 1 hour
});

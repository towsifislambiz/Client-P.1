// server/security/redisService.js
// Production-Ready Redis / Upstash Client with In-Memory Resilient Fallback
// Guarantees zero downtime even if Redis is not configured or temporarily down

import Redis from "ioredis";

class MemoryStore {
  constructor() {
    this.store = new Map();
    this.ttls = new Map();
  }

  get(key) {
    if (this._isExpired(key)) return null;
    return this.store.get(key) ?? null;
  }

  set(key, value, mode, duration) {
    this.store.set(key, value);
    if (mode === "EX" && typeof duration === "number") {
      this.ttls.set(key, Date.now() + duration * 1000);
    } else if (mode === "PX" && typeof duration === "number") {
      this.ttls.set(key, Date.now() + duration);
    } else {
      this.ttls.delete(key);
    }
    return "OK";
  }

  incr(key) {
    if (this._isExpired(key)) {
      this.store.set(key, "1");
      return 1;
    }
    const cur = parseInt(this.store.get(key) || "0", 10);
    const next = cur + 1;
    this.store.set(key, String(next));
    return next;
  }

  expire(key, seconds) {
    if (!this.store.has(key)) return 0;
    this.ttls.set(key, Date.now() + seconds * 1000);
    return 1;
  }

  ttl(key) {
    if (!this.store.has(key) || this._isExpired(key)) return -2;
    const expiry = this.ttls.get(key);
    if (!expiry) return -1;
    return Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
  }

  del(...keys) {
    let count = 0;
    for (const key of keys) {
      if (this.store.delete(key)) {
        this.ttls.delete(key);
        count++;
      }
    }
    return count;
  }

  keys(pattern) {
    const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
    const result = [];
    for (const [key] of this.store.entries()) {
      if (!this._isExpired(key) && regex.test(key)) {
        result.push(key);
      }
    }
    return result;
  }

  _isExpired(key) {
    if (!this.ttls.has(key)) return false;
    if (Date.now() > this.ttls.get(key)) {
      this.store.delete(key);
      this.ttls.delete(key);
      return true;
    }
    return false;
  }
}

class RedisService {
  constructor() {
    this.client = null;
    this.isRedisConnected = false;
    this.memoryStore = new MemoryStore();
    this.connectionType = "memory";
    this.init();
  }

  init() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.log("[RedisService] No REDIS_URL configured. Running with resilient In-Memory Security Engine.");
      this.connectionType = "memory";
      return;
    }

    try {
      this.client = new Redis(redisUrl, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 100, 3000);
          return delay;
        },
        maxRetriesPerRequest: 2,
        enableOfflineQueue: false,
        connectTimeout: 5000,
      });

      this.client.on("connect", () => {
        this.isRedisConnected = true;
        this.connectionType = "redis";
        console.log("[RedisService] Connected to Distributed Redis / Upstash Security Node.");
      });

      this.client.on("error", (err) => {
        if (this.isRedisConnected) {
          console.warn("[RedisService] Redis connection lost, failing safe to In-Memory fallback:", err.message);
        }
        this.isRedisConnected = false;
        this.connectionType = "memory";
      });
    } catch (err) {
      console.warn("[RedisService] Initialization failed, using In-Memory store:", err.message);
      this.isRedisConnected = false;
      this.connectionType = "memory";
    }
  }

  // Get string
  async get(key) {
    if (this.isRedisConnected && this.client) {
      try {
        return await this.client.get(key);
      } catch {
        return this.memoryStore.get(key);
      }
    }
    return this.memoryStore.get(key);
  }

  // Set with optional expiry (mode = 'EX', seconds)
  async set(key, value, mode, duration) {
    if (this.isRedisConnected && this.client) {
      try {
        if (mode && duration) {
          return await this.client.set(key, value, mode, duration);
        }
        return await this.client.set(key, value);
      } catch {
        return this.memoryStore.set(key, value, mode, duration);
      }
    }
    return this.memoryStore.set(key, value, mode, duration);
  }

  // Atomic Increment
  async incr(key) {
    if (this.isRedisConnected && this.client) {
      try {
        return await this.client.incr(key);
      } catch {
        return this.memoryStore.incr(key);
      }
    }
    return this.memoryStore.incr(key);
  }

  // Set TTL (seconds)
  async expire(key, seconds) {
    if (this.isRedisConnected && this.client) {
      try {
        return await this.client.expire(key, seconds);
      } catch {
        return this.memoryStore.expire(key, seconds);
      }
    }
    return this.memoryStore.expire(key, seconds);
  }

  // Get Remaining TTL
  async ttl(key) {
    if (this.isRedisConnected && this.client) {
      try {
        return await this.client.ttl(key);
      } catch {
        return this.memoryStore.ttl(key);
      }
    }
    return this.memoryStore.ttl(key);
  }

  // Delete key(s)
  async del(...keys) {
    if (this.isRedisConnected && this.client) {
      try {
        return await this.client.del(...keys);
      } catch {
        return this.memoryStore.del(...keys);
      }
    }
    return this.memoryStore.del(...keys);
  }

  // Keys pattern
  async keys(pattern) {
    if (this.isRedisConnected && this.client) {
      try {
        return await this.client.keys(pattern);
      } catch {
        return this.memoryStore.keys(pattern);
      }
    }
    return this.memoryStore.keys(pattern);
  }

  // Diagnostics status
  getStatus() {
    return {
      connected: this.isRedisConnected,
      engine: this.isRedisConnected ? "Distributed Redis / Upstash" : "In-Memory Resilient Engine (Active)",
      hasConfiguredUrl: Boolean(process.env.REDIS_URL),
    };
  }
}

const redisService = new RedisService();
export default redisService;

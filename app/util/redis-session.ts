import { redis } from './redis'
import config from '../config'

const { secret, ...options } = config.SESSION

/**
 * 将 session 存储在 redis，get/set/destroy 由 koa-session 要求
 */
let store = {
  async get(key: string): Promise<string | null> {
    const value = await redis.get(`${options.key}:${key}`)
    if (!value) {
      return value
    }
    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  },
  async set(key: string, sess) {
    await redis.set(`${options.key}:${key}`, JSON.stringify(sess))
    await redis.expire(key, options.maxAge / 1000) // redis 过期时间单位是秒
  },
  async destroy(key: string) {
    await redis.del(`${options.key}:${key}`)
  }
}

export default store

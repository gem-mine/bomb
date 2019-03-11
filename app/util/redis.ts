import * as Redis from 'ioredis'
import config from '../config'
import { fatal } from './logger'

export const redis = new Redis({
  retryStrategy(times: number) {
    return Math.min(times * 50, 10000)
  },
  maxRetriesPerRequest: 1,
  ...config.REDIS
}).on('error', function(e) {
  const label = 'redis error'
  console.error(`${label}: ${e.message}`)
  fatal.error(label, { data: e })
})

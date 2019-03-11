import { redis } from '../../util/redis'

afterAll(async () => {
  redis.quit()
})

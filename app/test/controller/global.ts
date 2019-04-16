import { redis } from '../../util/redis'
import { database } from '../../util/database'

afterAll(async () => {
  redis.quit()
  database.close()
})

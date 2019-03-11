import { Config } from '../@types/config'
import { ROOT, APP, env } from './foundation'
import { DATABASE } from './addition/database'
import PROXY from './addition/proxy'
import LOGGER from './addition/logger'
import { REDIS } from './addition/redis'
import SESSION from './addition/session'
import ENV from './constant/env'

const config: Config = {
  ENV: env,
  ROOT,
  APP,
  LIMIT: 20,
  PORT: 8080,
  CROSS_ORIGIN: true,
  IS_LOCAL: env === ENV.local,

  SESSION,
  DATABASE,
  REDIS,
  PROXY,
  LOGGER
}
export default config

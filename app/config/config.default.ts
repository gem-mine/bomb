import { Config } from '../@types/config'
import { ROOT, APP, env } from './foundation'
import { DB } from './partial/db'
import PROXY from './partial/proxy'
import LOGGER from './partial/logger'

const config: Config = {
  ENV: env,
  ROOT,
  APP,
  LIMIT: 20,
  PORT: 8080,
  CROSS_ORIGIN: true,

  DB,
  PROXY,
  LOGGER
}
export default config


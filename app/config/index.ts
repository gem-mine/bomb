import fs = require('fs')
import defaultConfig from './config.default'

const { ENV } = defaultConfig

const config = { ...defaultConfig }
if (ENV) {
  const p = `${__dirname}/config.${ENV}.ts`
  if (fs.existsSync(p)) {
    const { default: envConfig } = require(p)
    Object.assign(config, envConfig)
  }
}

export default config

import { createLogger, format } from 'winston'
const { combine, timestamp, printf } = format
import * as DailyRotateFile from 'winston-daily-rotate-file'
import config from '../config'

export const fatal = createLogger({
  format: combine(
    timestamp(),
    printf(({ timestamp, data }) => {
      return `${timestamp} ${JSON.stringify(data)}`
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: '%DATE%.fatal.log',
      level: 'error',
      ...config.LOGGER
    })
  ]
})

export const error = createLogger({
  format: combine(
    timestamp(),
    printf(({ timestamp, detail }) => {
      const { url, method } = detail
      return `${timestamp} ${method} ${url}: ${JSON.stringify(detail)}`
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: '%DATE%.error.log',
      level: 'error',
      ...config.LOGGER
    })
  ]
})

export const info = createLogger({
  format: combine(
    timestamp(),
    printf(({ timestamp, data }) => {
      return `${timestamp} ${JSON.stringify(data)}`
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: '%DATE%.log',
      ...config.LOGGER
    })
  ]
})

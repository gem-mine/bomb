import exception from '@gem-mine/exception'
import config from '../config'
import ENV from '../config/constant/env'
import { error as logger } from '../util/logger'

// 异常处理中间件
// 更多配置请查看：https://github.com/gem-mine/exception
export default exception({
  debug: config.ENV === ENV.local,
  // 将异常写入日志
  logger(data, ctx) {
    logger.error(data.message, {
      detail: data,
      requestId: ctx.id
    })
  },
  notFoundPage: '404.html'
})

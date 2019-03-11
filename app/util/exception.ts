import { ExceptionWithStatus } from '../@types/exception'
import app from '../app'

/**
 * @param error 异常，通常定义在 app/config/constant/exception.ts
 * @param data 附加数据
 */
function raise(error: ExceptionWithStatus | string, data?: any): never {
  if (typeof error === 'string') {
    return app.context.throw(500, error, data)
  }
  const { code = 500, message } = error
  return app.context.throw(code, message, data)
}

export default raise

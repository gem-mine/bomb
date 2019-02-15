import { ExceptionWithStatus } from '../@types/exception'
import app from '../app'

function raise(error: ExceptionWithStatus | string, data?: any): never {
  if (typeof error === 'string') {
    return app.context.throw(500, error, data)
  }
  const { code, message } = error
  return app.context.throw(code, message, data)
}

export default raise

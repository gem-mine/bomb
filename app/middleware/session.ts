import Koa = require('koa')
import session = require('koa-session')
import store from '../util/redis-session'
import config from '../config'

const { secret, ...options } = config.SESSION

// session 中间件
// 更多配置请查看：https://github.com/koajs/session
export default function(app: Koa) {
  app.keys = [secret]
  return session({ store, ...options }, app)
}

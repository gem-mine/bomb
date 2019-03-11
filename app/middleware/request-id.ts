import Koa = require('koa')
const xRequestId = require('koa-x-request-id')

// request-id 中间件
// 更多配置查看：https://github.com/koa-modules/x-request-id
export default function(app: Koa) {
  return xRequestId({
    inject: true
  }, app)
}

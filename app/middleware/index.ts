import Koa = require('koa')
import view from './view'
import proxy from './proxy'
import controller from './controller'
import favicon from './favicon'
import serve from './static'
import cors from './cors'
import error from './exception'
import logger from './logger'

/**
 * 为避免中间件顺序问题，由开发者来控制
 */
export default function(app: Koa) {
  app.use(favicon) // favicon
  app.use(logger) // 请求日志记录
  app.use(error) // 异常处理
  app.use(proxy) // 代理请求需要在路由之前，否则 post 请求会 hold
  app.use(view) // 视图需要放在路由之前，路由内部调用了视图的 render
  app.use(serve) // 静态文件
  app.use(cors) // cors
  controller(app) // 路由，非标准写法的中间件，其内部已经自行处理
}

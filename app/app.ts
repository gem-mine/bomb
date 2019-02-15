import Koa = require('koa')
import registerMiddleware from './middleware'

const app = new Koa()
registerMiddleware(app) // 注册中间件

export default app

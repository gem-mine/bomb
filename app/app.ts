import './util/patch' // 语言、环境补丁
import Koa = require('koa')
import bootstrap from './bootstrap'
import registerMiddleware from './middleware'

const app = new Koa()
bootstrap(app)
registerMiddleware(app) // 注册中间件

export default app

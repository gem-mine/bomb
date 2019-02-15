import Koa = require('koa')
import { useKoaServer } from '@gem-mine/routing-controllers'
import config from '../config'

// 路由中间件
// 更多配置查看：https://github.com/typestack/routing-controllers
export default function(app: Koa) {
  useKoaServer(app, {
    // 不要转换，在 jest 中存在 bug 会影响原生对象的判断
    // https://github.com/facebook/jest/issues/2549
    classTransformer: false,
    // 关闭异常捕获，由 koa 中间件进行处理
    defaultErrorHandler: false,
    controllers: [`${config.APP}/controller/**/*.ts`]
  })
}

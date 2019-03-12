import Koa = require('koa')
import { useKoaServer, Action } from '@gem-mine/routing-controllers'
import config from '../config'
import raise from '../util/exception'
import EXCEPTION from '../config/constant/exception'

// 路由中间件
// 更多配置查看：https://github.com/typestack/routing-controllers
export default function(app: Koa) {
  useKoaServer(app, {
    // 不要转换，在 jest 中存在 bug 会影响原生对象的判断
    // https://github.com/facebook/jest/issues/2549
    classTransformer: false,
    // 关闭异常捕获，由 koa 中间件进行处理
    defaultErrorHandler: false,
    controllers: [`${config.APP}/controller/**/*.ts`],
    // 权限验证
    authorizationChecker: async (action: Action, roles: string[]) => {
      const token = action.request.headers['authorization']
      // 一般这个 token 存放在 redis 或者 mysql 之类的持久化存储中
      if (token === 'it_is_a_mock_token') {
        // 往上下文插入数据，这样整个请求周期内就可以直接使用此数据，这里是 ctx.user
        action.context.user = {
          id: 1000,
          name: 'jerry'
        }
        return true
      }
      return raise(EXCEPTION.UNAUTHORIZED)
    }
  })
}

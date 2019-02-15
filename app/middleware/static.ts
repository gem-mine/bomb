import serve = require('koa-static')
import config from '../config'

// 静态文件中间件
// 更多配置请查看：https://github.com/koajs/static
export default serve(`${config.APP}/public`, {})

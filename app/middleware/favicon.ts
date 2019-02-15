import favicon = require('koa-favicon')
import config from '../config'

// favicon 中间件
// 更多配置请查看：https://github.com/koajs/favicon
export default favicon(`${config.APP}/public/favicon.ico`)

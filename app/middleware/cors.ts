import cors from '@gem-mine/cors'
import config from '../config'
const { CROSS_ORIGIN } = config

// 跨域处理中间件
// 更多配置请查看：https://github.com/gem-mine/cors
export default cors({
  origins: CROSS_ORIGIN
})

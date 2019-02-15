import views from '@gem-mine/nunjucks'
import config from '../config'
import ENV from '../config/constant/env'

// 视图中间件
// 更多配置请查看：https://github.com/gem-mine/nunjucks
export default views({
  path: `${config.APP}/public`,
  watch: config.ENV === ENV.local,
  noCache: config.ENV !== ENV.production,
  filters: {
    static(src: string) {
      return `/${src}`
    }
  }
})

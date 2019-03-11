// 请求代理配置
// 中间件所在位置：app/middleware/proxy.ts
// 更多配置请查看：https://github.com/chimurai/http-proxy-middleware
// 路由匹配规则请查看：https://github.com/pillarjs/path-to-regexp
const PROXY = {
  '/weather': {
    target: 'http://t.weather.sojson.com',
    changeOrigin: true,
    pathRewrite: {
      '^/weather/city': '/api/weather/city'
    }
  },
  '/api': {
    target: 'http://0.0.0.0:5103',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/v1.0'
    }
  }
}

export default PROXY

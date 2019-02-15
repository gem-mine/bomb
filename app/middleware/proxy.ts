import { Context } from 'koa'
import proxy = require('http-proxy-middleware')
import k2c = require('koa2-connect')
import pathToRegexp = require('path-to-regexp')
import config from '../config'

const { PROXY } = config

// 代理请求中间件
// 配置文件在 app/config/config.default.ts 或对应的 config.{env}.ts
export default async function(ctx: Context, next: () => Promise<any>) {
  const { path } = ctx
  const routes = Object.keys(PROXY)
  for (const route of routes) {
    if (path.startsWith(route) || pathToRegexp(route).test(path)) {
      await k2c(proxy(PROXY[route]))(ctx, next)
      break
    }
  }
  await next()
}

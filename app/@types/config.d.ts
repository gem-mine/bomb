import { CROSS_ORIGIN } from '@gem-mine/cors'

export declare type Config = {
  /** 环境变量 */
  ENV: string | undefined
  /** 根目录 */
  ROOT: string
  /** app 目录 */
  APP: string
  /** 每页分页数量 */
  LIMIT: number
  /** 应用启动端口 */
  PORT: number
  /**
   * CORS 跨域请求支持，配置可以是：
   * boolean: true 表示支持任意域的请求；
   * array: 支持多域白名单配置，其中元素可以是 域名字符串、正则表达式。
   * 中间件所在位置：app/middleware/cors.ts
   */
  CROSS_ORIGIN: CROSS_ORIGIN

  [name: string]: any
}

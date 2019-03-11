const pkg = require('../../../package.json')

// session 配置
// 更多配置请参见：https://github.com/koajs/session
const SESSION = {
  /** 用于加密 cookie 的短语，作用于 app.keys */
  secret: `${pkg.name}-cookie-secret`,
  /** session 前缀 */
  key: 'sn',
  /** 存活期，单位毫秒 */
  maxAge: 30 * 86400 * 1000,
  /** 关联的 cookie 采用 httpOnly */
  httpOnly: true, 
  /** 给 cookie 添加签名 */
  signed: true,
  /** 有效期已经过了一半则更新session */
  renew: true
}

export default SESSION

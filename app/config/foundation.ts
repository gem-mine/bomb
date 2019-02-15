import path = require('path')

const _env = process.env
/** 当前运行期的环境变量 */
export const env = _env.SERVER_ENV || _env.NODE_ENV

/** 项目的根目录绝对路径 */
export const ROOT = path.resolve(__dirname, '../../')
/** 项目的 app 目录绝对路径 */
export const APP = path.resolve(ROOT, 'app')

import { ROOT } from '../foundation'

// 日志配置
const LOGGER = {
  /** 日志目录，按日生成日志文件两份，一份是所有日志（YYYY-MM-DD.log），一份是异常日志（YYYY-MM-DD.error.log） */
  dirname: `${ROOT}/log`,
  /** 日志文件最大大小，超过后会自动切分 */
  maxSize: '30m',
  /** 日志文件保留最多天数，超过后会自动删除 */
  maxFiles: '100d'
}

export default LOGGER

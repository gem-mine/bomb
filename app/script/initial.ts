/**
 * 系统初始化脚本
 * 运行 npm run initial 进行
 */

import { database } from '../util/database'

database.sync({ force: true })

import { Sequelize } from 'sequelize-typescript'
import { ROOT, APP } from '../foundation'
import ENV from '../constant/env'

// 数据库配置
// 更多配置请查看：https://github.com/RobinBuschmann/sequelize-typescript#configuration
export const DB = new Sequelize({
  dialect: 'sqlite',
  name: 'example',
  username: 'root',
  password: '',
  logging: process.env.NODE_ENV === ENV.local,
  storage: `${ROOT}/db.sqlite`,
  modelPaths: [`${APP}/model/**/*.ts`]
})

// DB.sync({ force: true })  // 重置数据库，会重建表，慎重启用

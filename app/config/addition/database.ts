import { ROOT, APP } from '../foundation'
import ENV from '../constant/env'

// 数据库配置
// 更多配置请查看：https://github.com/RobinBuschmann/sequelize-typescript#configuration
export const DATABASE = {
  dialect: 'sqlite',
  // dialect: 'mysql',
  name: 'example',
  // host: '10.211.55.6',
  storage: `${ROOT}/db.sqlite`,
  username: 'root',
  password: '123456',
  logging: function(s) {
    if (process.env.NODE_ENV === ENV.local) {
      console.log(s)
    }
  },
  modelPaths: [`${APP}/model/**/*.ts`]
}

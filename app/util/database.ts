import { Sequelize } from 'sequelize-typescript'
import { createNamespace } from 'cls-hooked'
import config from '../config'

// 事务支持
const namespace = createNamespace('sequelize-cls-namespace')
// @ts-ignore
Sequelize.__proto__.useCLS(namespace)


export const database = new Sequelize(config.DATABASE)

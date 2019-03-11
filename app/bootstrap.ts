

import Console from '@gem-mine/console'
import Koa = require('koa')
import fs = require('fs')
import './util/database'
import { fatal } from './util/logger'
import { redis } from './util/redis'
import { ErrnoException } from './@types/exception'
import config from './config'

if (config.IS_LOCAL) {
  const pid = process.pid
  const file = `${config.ROOT}/.pid`
  if (fs.existsSync(file)) {
    const prevPid = parseInt(fs.readFileSync(file).toString(), 10)
    try {
      process.kill(prevPid)
      console.log(`kill non exit process: ${prevPid}`)
    } catch (e) {
      console.log(`kill process failed: ${prevPid}`)
    }
  }
  fs.writeFileSync(file, pid)

  process.on('exit', function() {
    console.log(`process exit: ${pid}`)
    fs.unlinkSync(file)
  })
}

process.on('uncaughtException', function(e: ErrnoException) {
  fatal.error(e)
  redis.quit() // 关闭 redis 连接
  process.exit(0)
})

// 将 debug 环境下 在终端打印更有好的日志，非 debug 环境下不打印
Console.config({
  debug: config.IS_LOCAL
})

export default async function(app: Koa) {}

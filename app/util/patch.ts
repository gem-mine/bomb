// 处理异常错误行数问题
// see: https://github.com/whitecolor/ts-node-dev/issues/44
import sourceMapSupport = require('source-map-support')
sourceMapSupport.install({
  hookRequire: true
})

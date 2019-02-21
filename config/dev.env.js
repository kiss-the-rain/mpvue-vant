var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASE_URL: '"http://192.168.0.104:9013"'
  // API_BASE_URL: '"http://47.75.139.194:9006"',
  // API_BASE_URL: '"http://lxy.ngrok.xiaomiqiu.cn"'
  API_BASE_URL: '"http://127.0.0.1:3000"',
  OSS_BASE_URL: '""'

})

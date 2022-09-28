/**
 * description:
 * date: 2022/09/28/18:06:00
 * author: xinyu
 * version: 1.0
 **/
const config = require("./config")
const Redis = require('ioredis')

// 2. 创建 Redis 客户端实例, 连接指定的 Redis 服务器
const redis = new Redis({
    port: config.REDIS_PORT, // redis服务器默认端口号
    host: config.REDIS_HOST, // redis服务器的IP地址
    password:config.REDIS_PASSWORD,
    db:config.REDIS_DB,
})
console.log("redis连接成功")
module.exports = redis

/**
 * description: config <br>
 * date: 2022/3/6 下午6:13 <br>
 * author: xinyu <br>
 * version: 1.0 <br>
 */
// 可加载根目录下的.env文件，将里面的直接加载到 环境变量里面
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env;

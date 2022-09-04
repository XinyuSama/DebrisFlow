/**
 * description: database <br>
 * date: 2022/3/6 下午6:13 <br>
 * author: xinyu <br>
 * version: 1.0 <br>
 */
const mysql = require('mysql2');

const config = require('./config');

// 创建连接池，与数据库进行连接
const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
});

// 测试
connections.getConnection((err, conn) => {
    // err为空即为成功
    conn.connect((err) => {
        if (err) {
            console.log("数据库连接失败", err)
        } else {
            console.log("数据库连接成功")
        }
    })
});

// 通过promise操作数据库
module.exports = connections.promise();
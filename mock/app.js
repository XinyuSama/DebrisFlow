/**
 * description: 模拟硬件发送数据 每一分钟给mysql添加一条mock数据
 * date: 2022/09/26/12:21:00
 * author: xinyu
 * version: 1.0
 **/
const Koa = require("koa");
const router = require("@koa/router")()
const cors = require("@koa/cors")
const dotenv = require("dotenv")
// const mysql = require("mysql") 不兼容 mysql 8.0 操作很麻烦
const mysql = require("mysql2")
const Mock = require("mockjs")
const app = new Koa();
const times = require("./utils/times")
const axios = require('axios')

//读取环境变量
dotenv.config()
// console.log(process.env)
app.use(cors())
//连接数据库
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
})
console.log("mysql连接成功")

//新增mock数据
// console.log(Boolean( ctx.request.query.name && ctx.request.query.address && ctx.request.query.phone))
let addMessage = async ()=>{
    let MockObj = Mock.mock({
        'waterLevel|70-90.1-10': 1,
        'TiltAngle|50-90': 1,
        'police|0-1': 1,
    })
    console.log(MockObj)
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/addData',
        data: {
            waterLevel: MockObj.waterLevel,
            police: MockObj.police,
            TiltAngle: MockObj.TiltAngle,
        }
    });
    // if(MockObj.waterLevel && MockObj.TiltAngle){
    //     //fix linux系统时差 -> 东八区时间戳
    //     let nowTimeTamp = times().utcOffset(8).valueOf()
    //
    //     // console.log(times(nowTimeTamp).format('YYYY-MM-DD HH:mm:ss'));
    //     // console.log(nowTimeTamp)
    //     let querySql="INSERT INTO datas (waterLevel,TiltAngle,police,sendTime) VALUES(?,?,?,?)"
    //     let querySqlParameter = [`${MockObj.waterLevel}`,`${MockObj.TiltAngle}`,`${MockObj.police}`,`${nowTimeTamp}`]
    //     let searchSql = (querySql) => {
    //         return new Promise((resolve, reject) => {
    //             connection.query(querySql,querySqlParameter, (err, result)=>{
    //                 if(err){
    //                     reject(0)
    //                     console.log(err+'err')
    //                 }
    //                 resolve(result)
    //             })
    //         })
    //     }
    //     let res= await searchSql(querySql)
    //     console.log(res)
    // }
}

// setInterval(addMessage,60000)
setInterval(addMessage,1000)



app.use(router.routes())
app.listen(process.env.APP_PORT);
console.log(`服务启动 port---${process.env.APP_PORT}`);

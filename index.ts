/**
 * description: test <br>
 * date: 2022/3/5 下午11:54 <br>
 * author: xinyu <br>
 * version: 1.0 <br>
 */

const Koa = require("koa")
const cors = require('koa2-cors');
const useRoutes = require('./src/router/router');
const views = require("koa-views")
const bodyParser = require('koa-bodyparser')
const webSocket = require('ws');

// 引用Server类:
// const WebSocketServer = webSocket.Server;
//
// // 实例化:
// const wss = new WebSocketServer({
//   port: 3000
// });


// const errorHandler = require('./configs/error-handle')
const app  = new Koa()

app.use(bodyParser())
const path = require("path")
const { koaSwagger } = require('koa2-swagger-ui');
const config = require("./configs/config.js")
const statics = require("koa-static")
app.use(cors());
app.use(views(path.join(__dirname,"views/"),{extension:'html'}))

//配置静态web服务的中间件
app.use(statics(__dirname+'/static')); // __dirname是当前文件夹
//配置Swagger api文档
app.use(
    koaSwagger({
        routePrefix: '/swagger/index.html', // 这里配置swagger的访问路径
        swaggerOptions: {
            url: '/swagger/swagger.json', // 这里配置swagger的文档配置URL，也就是说，我们展示的API都是通过这个接口生成的。
        },
    }),
);
app.use(useRoutes.routes())
console.log("服务开启");
if(!module.parent){
    app.listen(config.APP_PORT,function(){
        console.log(`koa dao running at port ${config.APP_PORT}`);
    })
}
module.exports = app;

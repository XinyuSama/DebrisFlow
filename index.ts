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
// const errorHandler = require('./configs/error-handle')
const app = module.exports = new Koa()
app.use(bodyParser())
const path = require("path")
const { koaSwagger } = require('koa2-swagger-ui');


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
    app.listen(3000,function(){
        console.log("koa dao running at port 3000");
    })
}
module.exports = app;

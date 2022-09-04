/**
 * description: test <br>
 * date: 2022/3/5 下午11:54 <br>
 * author: xinyu <br>
 * version: 1.0 <br>
 */
var Koa = require("koa");
var cors = require('koa2-cors');
var useRoutes = require('./src/router/router');
var views = require("koa-views");
var bodyParser = require('koa-bodyparser');
// const errorHandler = require('./configs/error-handle')
var app = module.exports = new Koa();
app.use(bodyParser());
var path = require("path");
var statics = require("koa-static");
app.use(cors());
app.use(views(path.join(__dirname, "views/"), { extension: 'html' }));
//配置静态web服务的中间件
app.use(statics(__dirname + '/static')); // __dirname是当前文件夹
app.use(useRoutes.routes());
console.log("服务开启");
if (!module.parent) {
    app.listen(3000, function () {
        console.log("koa server running at port 3000");
    });
}
module.exports = app;

/**
 * description: error-handle <br>
 * date: 2022/3/6 下午6:14 <br>
 * author: xinyu <br>
 * version: 1.0 <br>
 */
const errorType = require('../constants/error-types');

const errorHandler = (error, ctx) => {
    let status, message;
    //打印出报错信息但是不会停止程序
    console.log(error,111111111)
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400; // Bad Request
            message = "用户名或者密码不能为空！";
            break;
        case errorType.USER_ALREADY_EXISTS:
            status = 409; //  Conflict 冲突
            message = "用户名已存在！";
            break;
        case errorType.USER_DOES_NOT_EXISTS:
            status = 400; // 参数错误
            message = "用户名不存在！";
            break;
        case errorType.PASSWORD_IS_INCORRENT:
            status = 400; // 参数错误
            message = "密码错误！";
            break;
        case errorType.UNAUTHORIZATION:
            status = 401; // 参数错误
            message = "无效的token！";
            break;
        case errorType.UNPERMISSION:
            status = 401; // 参数错误
            message = "你不具备操作权限！";
            break;
        default:
            status = 404;
            message = "NOT FOUND";
    }

    ctx.status = status;
    ctx.body = message
}

module.exports = errorHandler;
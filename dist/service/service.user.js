"use strict";
const dao = require('../dao/dao.user');
class UserService {
    async getDatas(ctx) {
        const { res } = await dao.getDatas();
        ctx.body = {
            code: 200,
            data: res,
        };
    }
    async addUser(ctx) {
        try {
            const { userName, account, password } = ctx.request.body;
            const res = await dao.addUser(userName, account, password);
            ctx.body = {
                code: 200,
                data: res
            };
        }
        catch (e) {
            ctx.body = {
                code: 500,
                data: "参数错误" + e
            };
        }
    }
}
module.exports = new UserService();
//# sourceMappingURL=service.user.js.map
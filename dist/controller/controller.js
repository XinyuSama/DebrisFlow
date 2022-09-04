"use strict";
const services = require('../server/service');
class Controller {
    async getMessage(ctx, next) {
        // 1.获取数据(offset/size)
        // const {
        //     offset,
        //     size
        // } = ctx.query;
        //
        // // 2.查询列表
        // const {
        //     result,
        //     count
        // } = await departmentService.getDepartmentList(offset, size);
        const { res } = await services.getMessage();
        ctx.body = {
            code: 200,
            data: res,
        };
    }
}
module.exports = new Controller();
//# sourceMappingURL=router.user.ts.map

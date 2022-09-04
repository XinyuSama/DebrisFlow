"use strict";
/**
 * description: department.router.content
 * date: 2022/3/11 10:12
 * author: 123
 * version: 1.0
 */
const Connection = require('../../configs/database');
class service {
    async getMessage() {
        const sql = 'select * from leave_message';
        const [res] = await Connection.execute(sql);
        return {
            res
        };
    }
}
module.exports = new service();
//# sourceMappingURL=dao.user.ts.map

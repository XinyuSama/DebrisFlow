"use strict";
/**
 * description: department.daoUser.content
 * date: 2022/3/11 10:12
 * author: 123
 * version: 1.0
 */
const UserConnection = require('../../configs/mysql-config');
class daoUser {
    async getDatas() {
        const sql = 'select * from datas';
        const [res] = await UserConnection.execute(sql);
        return {
            res
        };
    }
    async addUser(userName, account, password) {
        const sql = 'INSERT INTO user_list(name,account,password) VALUES (?,?,?);';
        const [res] = await UserConnection.execute(sql, [userName, account, password]);
        return res;
    }
}
module.exports = new daoUser();
//# sourceMappingURL=dao.user.js.map

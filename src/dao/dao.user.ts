/**
 * description: department.daoUser.content
 * date: 2022/3/11 10:12
 * author: 123
 * version: 1.0
 */

const UserConnection = require('../../configs/database');


class daoUser {
    async getDatas() {     //获取所有数据
        const sql = 'select * from datas'
        const [res] = await UserConnection.execute(sql);
        console.log(res);
        return {
            res
        };
    }
    async addUser(userName:string,account:string,password:string) {
        const sql = 'INSERT INTO user_list(name,account,password) VALUES (?,?,?);'
        const [res] = await UserConnection.execute(sql, [userName, account, password]);
        return res
    }
    async delData(sendTime:Date){
        const sql = 'delete from datas where sendTime = ?;'
        const [res] = await UserConnection.execute(sql,[sendTime])
        console.log(res);
        return res
    }
}

module.exports = new daoUser();

const dao = require('../dao/dao.user')
class UserService{

    async getDatas(ctx:any) {
        const {res} =  await dao.getDatas()
        ctx.body = {
            code: 200,
            data: res,
        };

    }
    async addUser(ctx:any){
        try {
            const {userName, account, password} = ctx.request.body
            const res = await dao.addUser(userName, account, password)
            ctx.body = {
                code: 200,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 500,
                data: "参数错误"+e
            }
        }
    }
    async delData(ctx:any) {
        const sendTime = new Date(ctx.request.body.data)
        await dao.delData(sendTime)
        ctx.body = {
            code: 200,
            value: "删除成功"
        }
    }

}

module.exports = new UserService();

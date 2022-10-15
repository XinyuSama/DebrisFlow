
/**
 * description: department.daoDatas.content
 * date: 2022/3/11 10:12
 * author: 123
 * version: 1.0
 */


const MysqlConnection = require('../../configs/mysql-config');
const RedisConnection = require('../../configs/redis-config');
const times = require("../../utils/times")


class DatasDao {
    async addData(waterLevel:string,TiltAngle:string,police:number) {
        try {
            let nowTimeTamp = times().utcOffset(8).valueOf()
            // let redisID = uuid.v1(4).toString()
            // redis存储 设置数据存储时长60s
            let redisValue = {
                sendTime:nowTimeTamp,
                waterLevel:waterLevel,
                TiltAngle:TiltAngle,
                police:police
            }
            // 对象转字符串:
            await RedisConnection.set(nowTimeTamp, JSON.stringify(redisValue), (err:any) => {
                // 为key 设定一个时长 单位为S
                RedisConnection.expire(nowTimeTamp, 60*10)
                if (err) return err
            })
            return {}
        }catch (e){
            return e
        }
    }
    async getAllData(){
        try {
            const sql = 'select id,waterLevel,TiltAngle,police,sendTime from datas'
            const [res] = await MysqlConnection.execute(sql);
            console.log(res);
            return {
                res
            };
        }catch (e){
            return e
        }
    }
    //拿到redis全部数据
    async getAllDataByRedis(){
        try {
            let Redis_Res:any=[]
            await RedisConnection.select(1)
            let res__ = await RedisConnection.keys('*')
            let pp = RedisConnection.pipeline()//采用管道操作
                for (let i=0 ;i<res__.length;i++) {
                    pp.get(res__[i])
                }
                let ress = await pp.exec()
            for (let ressKey of ress) {
                Redis_Res.push(JSON.parse(ressKey[1]))
            }
            return  Redis_Res
        }catch (e) {
            return e
        }
    }
    async getPageData(startId:number,pagesDataLength:number){    //获取最新的数据
        try {
            // console.log(startId,pagesDataLength,9999)
            // const sql = "select id,waterLevel,TiltAngle,police,sendTime from datas order by id desc limit 5"
            //这样写 比直接limit 性能更高 毕竟数据量较大
            const sql = `select id,waterLevel,TiltAngle,police,sendTime from datas where id >= (select id from datas order by id limit ${startId}, 1) limit ${pagesDataLength};`
            const [res] = await MysqlConnection.execute(sql)
            return {
                res
            }
        }catch (e){
            console.log(e);
        }
    }
    async getLatestOneData(){
        try {
            await RedisConnection.select(1)
            let res__ = await RedisConnection.keys('*')
            let res = await RedisConnection.get( Math.max(...res__))
            res =  JSON.parse(res)
            return  res

        }catch (e){
            console.log(e);
        }
    }
    async getDataByTime(startTime:string,endTime:string){
        try {
            const sql = "select * from datas WHERE sendTime between ? and ? "
            const [res] = await MysqlConnection.execute(sql,[startTime,endTime]);
            return {
                res
            };
        }catch (e){
            return e
        }
    }




    async getDataById(id:number){
        try {
            const sql = "select * from datas WHERE id=? "
            const [res] = await MysqlConnection.execute(sql,[id]);
            return {
                res
            };
        }catch (e){
            return e
        }
    }
    async getDataByWaterLevel(StartWaterLevel:number,EndWaterLevel:number){
        try {
            const sql = "select * from datas WHERE waterLevel between ? and ?"
            const [res] = await MysqlConnection.execute(sql,[StartWaterLevel,EndWaterLevel]);
            return {
                res
            };
        }catch (e){
            return e
        }
    }
    async getDataByTiltAngle(StartTiltAngle:number,EndTiltAngle:number){
        try {
            const sql = "select * from datas WHERE TiltAngle between ? and ?"
            const [res] = await MysqlConnection.execute(sql,[StartTiltAngle,EndTiltAngle]);
            return {
                res
            };
        }catch (e){
            return e
        }
    }
    async getDataByPolice(police:boolean){
        try {
            const sql = "select * from datas WHERE police=?"
            const [res] = await MysqlConnection.execute(sql,[police]);
            return {
                res
            };
        }catch (e){
            return e
        }
    }
    async delDataById(Id:number){
        try {
            const sql = "DELETE from datas WHERE id=?"
            const [res] = await MysqlConnection.execute(sql,[Id]);
            return {
                res
            };
        }catch (e){
            return e
        }
    }


}

module.exports = new DatasDao();

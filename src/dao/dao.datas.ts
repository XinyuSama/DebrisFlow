/**
 * description: department.daoDatas.content
 * date: 2022/3/11 10:12
 * author: 123
 * version: 1.0
 */


const MysqlConnection = require('../../configs/mysql-config');
const RedisConnection = require('../../configs/redis-config');
const times = require("../../utils/times")
const uuid = require('node-uuid');



class DatasDao {
    async addData(waterLevel:string,TiltAngle:string,police:string) {
        try {
            let nowTimeTamp = times().utcOffset(8).valueOf()
            let redisID = uuid.v1().toString()
            // redis存储 设置数据存储时长60s
            let redisValue = {
                sendTime:nowTimeTamp,
                waterLevel:waterLevel,
                TiltAngle:TiltAngle,
                police:police
            }
            // 对象转字符串:
            await RedisConnection.set(redisID, JSON.stringify(redisValue), (err:any) => {
                // 为key 设定一个时长 单位为S
                RedisConnection.expire(redisID, 60*60)
                if (err) return err
            })
            const sql = 'INSERT INTO datas (sendTime,waterLevel,TiltAngle,police,redisId) VALUES (?,?,?,?,?)'
            //异步队列
            let addToMysql = async (sql:string)=>{
              let [res] = await MysqlConnection.execute(sql,[nowTimeTamp,waterLevel,TiltAngle,police,redisID]);
              return res
            }
            //如果存入mysql失败 再次尝试
            try{
                let res =  await addToMysql(sql)
                if (res.affectedRows!=1){
                    addToMysql(sql)
                    console.log(res)
                }else {
                    return res
                }
            }catch (e) {
                return "mysql异常"+e
            }


        }catch (e){
            return e
        }
    }
    async getAllData(){
        try {
            const sql = 'select * from datas'
            const [res] = await MysqlConnection.execute(sql);
            console.log(res);
            return {
                res
            };
        }catch (e){
            return e
        }
    }
    //从redis拿数据 只能拿一小时以内的数据
    async getAllDataByRedis(){
        try {
            let Redis_Res:any=[]
            await RedisConnection.select(1).then((res:any)=>{
                RedisConnection.keys('*').then(async (res_:any )=>{
                    for (let redisId=0;redisId<res_.length;redisId++) {
                            const result = await RedisConnection.get(res_[redisId])
                        console.log(result)
                            if(result === null){
                                console.log('result:','<'+result+'>', 'This key cannot be find...')
                            }else {
                                console.log('Result:','<'+result+'>','Get key success!...');
                                Redis_Res.push(result)
                            }
                    }
                });
            })
            return Redis_Res
        }catch (e) {
            return e
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
    async getLatestData(){    //获取最新的数据
        try {
            const sql = "select waterLevel,TiltAngle,police,sendTime from datas order by id desc limit 1"
            const [res] = await MysqlConnection.execute(sql)
            return {
                res
            }
        }catch (e){
            console.log(e);
        }
    }
}

module.exports = new DatasDao();

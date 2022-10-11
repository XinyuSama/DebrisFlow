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
            await RedisConnection.sadd(redisID,[nowTimeTamp,waterLevel,TiltAngle,police])
            const sql = 'INSERT INTO datas (sendTime,waterLevel,TiltAngle,police,redisId) VALUES (?,?,?,?,?)'
            const [res] = await MysqlConnection.execute(sql,[nowTimeTamp,waterLevel,TiltAngle,police,redisID]);
            return res
        }catch (e){
            console.log(e)
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
            console.log(e)
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
            console.log(e)
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
            console.log(e)
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
            console.log(e)
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
            console.log(e)
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
            console.log(e)
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
            console.log(e)
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

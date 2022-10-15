import {json} from "stream/consumers";
const DatasDao_ = require('../dao/dao.datas')
const timeTampChange = require("../../utils/times")
const axios = require('axios')
class DatasService{
    async addData(ctx:any){
        try {
            const {waterLevel,TiltAngle,police} = ctx.request.body
            const res = await DatasDao_.addData(waterLevel, TiltAngle, police)
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getAllData(ctx:any){
            try {
                const res = await DatasDao_.getAllData()
                ctx.body = {
                    code: 1,
                    data: res
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    data: "参数错误"+e
                }
            }
    }
    async getAllDataByRedis(ctx:any){
        try {
            const res = await DatasDao_.getAllDataByRedis()
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getDataByTime(ctx:any){
        try {
            let {startTime,endTime} = ctx.request.body
            const res = await DatasDao_.getDataByTime(startTime,endTime)
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getDataById(ctx:any){
        try {
            let {Id} = ctx.request.body
            const res = await DatasDao_.getDataById(Id)
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getDataByWaterLevel(ctx:any){
        try {
            let {StartWaterLevel,EndWaterLevel} = ctx.request.body
            const res = await DatasDao_.getDataByWaterLevel(StartWaterLevel,EndWaterLevel)
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getDataByTiltAngle(ctx:any){
        try {
            let {StartTiltAngle,EndTiltAngle} = ctx.request.body
            const res = await DatasDao_.getDataByTiltAngle(StartTiltAngle,EndTiltAngle)
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getDataByPolice(ctx:any){
        try {
            let {police} = ctx.request.body
            const res = await DatasDao_.getDataByPolice(police)
            ctx.body = {
                code: 1,
                data: res
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async delDataById(ctx:any) {
        try {
            let {Id} = ctx.request.body
            const res = await DatasDao_.delDataById(Id)
            console.log()
            if (res.res.affectedRows==0){
                ctx.body = {
                    code: 0,
                    data: "此id数据不存在或已被删除"
                }
            }else {
                ctx.body = {
                    code: 1,
                    data: "删除成功"
                }
            }

        } catch (e) {
            ctx.body = {
                code: 0,
                data: "参数错误"+e
            }
        }
    }
    async getPageData(ctx:any) {
        try {
            // 从第几条开始 查多少条
            let {startId,pagesDataLength}  = ctx.request.body
            const res = await DatasDao_.getPageData(startId,pagesDataLength)
            ctx.body = {
                code : 1,
                data: res
            }
        }
        catch (e) {
            ctx.body = {
                code: 0,
                data: e
            }
        }
    }
    async getLatestOneData(ctx:any) {
        try {
            const res = await DatasDao_.getLatestOneData()


            ctx.body = {
                code : 1,
                data: res
            }
        }
        catch (e) {
            ctx.body = {
                code: 0,
                data: e
            }
        }
    }
    async unity(ctx:any) {
        try {
            let getLatestOneData =async ()=>{
                let res = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/api/getLatestOneData',
                });
                return res
            }

            let t = setInterval(async function() {
                let res = await getLatestOneData()
                // console.log(res.data.data)
                let sendWs = `${res.data.data.waterLevel},${res.data.data.TiltAngle},${Boolean(res.data.data.police)}`
                ctx.websocket.send(sendWs)
            }, 500)

        }
        catch (e) {
            ctx.body = {
                code: 0,
                data: e
            }
        }
    }
}

module.exports = new DatasService();

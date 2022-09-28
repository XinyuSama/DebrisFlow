import {json} from "stream/consumers";

const DatasDao_ = require('../dao/dao.datas')
const timeTampChange = require("../../utils/times")
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


}

module.exports = new DatasService();

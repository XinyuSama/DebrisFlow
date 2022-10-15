/**
 * description: 每十分钟取redis全部数据的平均值进mysql 在主程序调用
 * date: 2022/10/15/16:07:00
 * author: xinyu
 * version: 1.0
 **/
const MysqlConnection = require('../../configs/mysql-config');
const RedisConnection = require('../../configs/redis-config');
const times = require("../../utils/times")
export let  getAveByRedisIntoMysql = async ()=>{
    try {
        await RedisConnection.select(1)
        let res__ = await RedisConnection.keys('*')
        let pp = RedisConnection.pipeline()//采用管道操作
        for (let i=0 ;i<res__.length;i++) {
            pp.get(res__[i])
        }
        let ress = await pp.exec()
        //求平均
        function getAve(arr:any) {
            var sum=0,ave=0,i=0;
            for(i=0;i<arr.length;i++) {
                sum+=arr[i];
            }
            ave=sum/arr.length;
            return ave;
        }
                // 预警次数大于一半就取1
        function getEleNums(data:any) {
            let map:any = {}
            for (let i = 0; i < data.length; i++) {
                let key = data[i]
                if (map[key]) {
                    map[key] += 1
                } else {
                    map[key] = 1
                }
            }
            return map
        }
        let waterLevelArray =[];
        let TiltAngleArray = [];
        let policeArray = [];

        for (let ressKey of ress) {
            waterLevelArray.push(parseInt(JSON.parse(ressKey[1]).waterLevel))
            TiltAngleArray.push(parseInt(JSON.parse(ressKey[1]).TiltAngle))
            policeArray.push(parseInt(JSON.parse(ressKey[1]).police))
        }
        let PoliceNums = getEleNums(policeArray)
        let waterLevelAve = getAve(waterLevelArray).toFixed(2)
        let TiltAngleAve = getAve(TiltAngleArray).toFixed(2)
        let police = PoliceNums[1]>PoliceNums[0]?1:0
        let NowTime = times().utcOffset(8).valueOf()
        const sql = 'INSERT INTO datas (sendTime,waterLevel,TiltAngle,police) VALUES (?,?,?,?)'
        await MysqlConnection.execute(sql,[NowTime,waterLevelAve,TiltAngleAve,police]);
        // return  Redis_Res
    }catch (e) {
        // return e
        console.log(e)
    }
}

<template>
  <div>
    <div class="tips">
      <h5> 平均数据</h5>
    </div>
    <div style="display: flex;justify-content: space-around">
      <el-button type="primary" style="width: 30%" @click="changeChart1(1)">水位</el-button>
      <el-button type="primary" style="width: 30%" @click="changeChart1(2)">倾斜角</el-button>
    </div>
    <echarts :id="id" :option="options" maxWidth='1' :key="componentKey1" ref="echarts_1" ></echarts>
    <div class="tips">
      <h5>实时数据</h5>
      <h6>当前时间:{{nowTime}}</h6>
    </div>
    <div style="display: flex">
      <echarts :id="id2" :option="option2" maxWidth='2' :key="componentKey2" ref="echarts_2" ></echarts>
      <echarts :id="id3" :option="option3" maxWidth='3' :key="componentKey3" ref="echarts_3" ></echarts>
    </div>


  </div>
</template>

<script>
import echarts from '../components/Echarts'
import {error} from "@/utils/message";
import moment from "moment";
import {getLatestOneData,getAllData} from "@/utils/http/network";

export default {
  name: "echartsTable",
  data(){
    return{
      nowTime:'',
      TiltAngle:[],
      waterLevel:[],
      id:'test',
      id2:'test2',
      id3:'test3',
      componentKey1:0,
      componentKey2:1,
      componentKey3:2,
      options:{
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: 'Large Ara Chart'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: []
          }
        ]
      },
      option2 : {
        //提示框
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        title: [
          {
            text: '实时水位'
          },
        ],
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      },
      option3 : {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        title: [
          {
            text: '实时倾斜角'
          },
        ],
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      },
    }
  },

  methods:{
    async InitializeDealChart(){
      let alldata =  await this.getAllData_()
      for (const alldatum of alldata) {
        this.TiltAngle.push([parseInt(alldatum.sendTime),parseInt(alldatum.TiltAngle)])
        this.waterLevel.push([parseInt(alldatum.sendTime),parseInt(alldatum.waterLevel)])
      }
      this.options.series[0].data = this.waterLevel
      this.options.series[0].name = "十分钟内的平均值"
      this.options.title.text = "水位平均数据"
    },
    changeChart1(args){
      if (args==1){
        this.options.series[0].data = this.waterLevel
        this.options.series[0].name = "十分钟内的平均值"
        this.options.title.text = "水位平均数据"
      }else {
        this.options.series[0].data = this.TiltAngle
        this.options.series[0].name = "十分钟内的平均值"
        this.options.title.text = "倾斜角平均数据"
      }
    },
    async getAllData_(){
      if (this.$store.state.AllData.length==0){
        try {
          let alldata = await getAllData()
          if (alldata.code == 1){
            return alldata.data.res
          }
        }catch (e) {
          error(e)
        }
      }else {
        return this.$store.state.AllData
      }
    },
    //往里push最新数据
    async getLatestOneData_(){
      try {
        let LatestOneData = await getLatestOneData()
        if (LatestOneData.code == 1 ){
         let sendTime =  moment(parseInt(LatestOneData.data.sendTime)).format('YYYY/MM/DD HH:mm:ss')
          let waterLevel =  parseInt(LatestOneData.data.waterLevel)
          this.option2.xAxis.data.push(sendTime)
          this.option2.series[0].data.push(waterLevel)
          this.option3.xAxis.data.push(sendTime)
          this.option3.series[0].data.push(LatestOneData.data.TiltAngle)
        }else{
          error("请求出错！")
        }
      }catch (e){
        error("请求出错！")
      }

    }
  },
  components:{
    echarts
  },

   mounted() {
     this.InitializeDealChart()
     setInterval(()=>{
       this.getLatestOneData_()
       this.nowTime = moment().format('YYYY/MM/DD HH:mm:ss')
     },1000)
  }
}
</script>

<style scoped>
.tips{
  display: flex;
  flex-direction: column;
  margin: 40px 0px 40px 0px;
  font-size: 30px;
  align-items: center;
}
</style>

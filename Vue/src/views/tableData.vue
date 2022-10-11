<template >
  <div class="theOuterStyle">
    <echarts :id="id" :option="option"></echarts>
    <button @click="ImportExcel">将数据导入到excel</button>
    <button @click="ImportPdf">图标生成为pdf</button>
  </div>
</template>
<script>
import {axios} from "@/utils/http/network"
import echarts from "../components/Echarts"
import moment from "moment"
import ExportJsonExcel from "js-export-excel"
import htmlToPdf from "@/utils/pdf"
export default {
  name: "tableData",
  components:{
    echarts
  },
  data(){
    return{
      id: "river",
      option:{},
      waterLevel :[],  //水位
      sendTime : [],  //时间
      slantAngle : [] , //倾斜角
      res:""  //获取所有数据
    }
  },
  // moment(parseInt(value.endTime)).format('YYYY/MM/DD hh:mm:ss');
  methods: {
   getAllData(){
     axios("/getAllData","get").then((res) =>{
        this.res = res.data.res
       for(let i=0; i<res.data.res.length; i++){
         this.waterLevel.push(Number(res.data.res[i].waterLevel))
         let time =moment(parseInt(res.data.res[i].sendTime)).format('YYYY/MM/DD hh:mm:ss')
         this.sendTime.push(time)
         this.slantAngle.push(res.data.res[i].TiltAngle)
       }
       this.processingData()
     })
   },
    processingData(){
     let da = []   //da是最终数据，渲染到表
      for(let i=0; i<this.slantAngle.length; i++){
        da.push([this.sendTime[i],this.waterLevel[i],"水位"])
      }
      console.log(da,124);
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(0,0,0,0.2)',
              width: 1,
              type: 'solid'
            }
          }
        },
        legend: {
          data: ['水位']
        },
        singleAxis: {
          top: 50,
          bottom: 50,
          axisTick: {},
          axisLabel: {},
          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          }
        },
        series: [
          {
            type: 'themeRiver',
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            data: da,
          }
        ]
      }
      // console.log(this.option,2333);
    },
    ImportExcel(){
      const dataList = this.res
      let option = {};    //代表excel文件
      let dataTbale = []   //excel文件中的数据内容
      if(dataList){
        for(let i in dataList){
          let obj = {
            id: dataList[i].id,    //id
            水位: dataList[i].waterLevel,
            倾斜角度: dataList[i].TiltAngle,
            时间: moment(parseInt(dataList[i].sendTime)).format('YYYY/MM/DD hh:mm:ss')

          }
          dataTbale.push(obj)
        }

      }
      option.filename = "水位数据表"    //excel文件名
      option.datas = [
        {
          sheetData: dataTbale,     //excel文件的数据源
          sheetName: "sheet",      //excel文件sheet的表名
          sheetHeader: ["id","水位","倾斜角度","时间"], //excel文件sheet的表头名
          sheetFilter: ["id","水位","倾斜角度","时间"]    //文件列名
        }
      ]
      let toExcel = new ExportJsonExcel(option)
      toExcel.saveExcel()
    },
    ImportPdf(){     //“图表”为生成的pdf文件的名称
      htmlToPdf.downloadPDF(document.querySelector("#river"),"图表")
    }
  },
  mounted() {
    this.getAllData()
  }

}
</script>

<style scoped>
.theOuterStyle{
  width:100%;
  height: 100%
}
</style>



<template>
  <el-main>
<!--      <div>数据统计</div>-->
    <div class="card-container">
      <el-card class="box-card">
        <div  class="text item">
          <Echarts :id="'sss'" :option="options"  v-if="loadSurvey" />
        </div>
      </el-card>

    </div>

  </el-main>
</template>

<script>
import {getdata} from "@/utils/http/network";
import Echarts from "@/components/Echarts";
export default {
  name: "MyMain",
  //检测前端路由变化 ， 后端接口和前端路由相同，所以直接当做参数传入请求
  watch:{
    $route(to, from) {
      this.Vue_getData("/get"+to.path.split('/')[1],to.path)
    }
  },
  data(){
    return{
      datas:[],
      options:{},
      //重新渲染子组件
      loadSurvey:true
    }
  },
 async mounted() {

  },
  components:{
    Echarts
  },
  methods:{
    async Vue_getData(url,op){
      //根据路由来判断显示哪一个图
      switch (op){
        case '/FiveDaysData':
          console.log(url)
          //  必须加 await 否则会异步执行下一个case，取决于网速，
          let FiveDaysData = await this.GetData(url)
            console.log(FiveDaysData)
          this.options={
            title: {
              text: FiveDaysData.text
            },
            tooltip: {
              trigger: 'axis'
            },
            //区分 需要在series每类数据中添加name以区分
            legend: {
              data: ['新增', '流失']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            //右上角报告
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: FiveDaysData.data.data.map(i=>{
                return i.date
              })
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '新增',
                type: 'line',
                // stack: 'Total',
                data: FiveDaysData.data.data.map(i=>{
                  return i.addNum
                })
              },
              {
                name: '流失',
                type: 'line',
                // stack: 'Total',
                data: FiveDaysData.data.data.map(i=>{
                  return i.loseNum
                })
              },
            ]
          }
          break;
        case "/UserGroup":
          //  必须加 await 否则会异步执行下一个case，取决于网速，
          let UserGroupData = await this.GetData(url)

          let k = ['GeneralAccount','LossAccount','LoyalAccount','PotentialAccount']
          //  外层map用于构造数组
          let UserGroupData_ = UserGroupData.data.data.map((i,index)=>{
            let array = []
            //内层 for of用于构造data数组
            //data取每一个对象的第1,或2或3（index）个值
            for (const j of UserGroupData.data.data) {
              if (k.length>index){
                //五类 每类四数据
                array.push(j[k[index]])
              }else {
                break
              }
            }
            let obj={
              name: i.feature,
              type: 'bar',
              emphasis: {
                focus: 'series'
              },
              data:array
            }
            //如果最后一个是空 即客单价 就为空
            return obj.data.length==0?"":obj
          })
          this.options={
            title: {
              text: UserGroupData.text
            },
            //右上角报告
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: UserGroupData.data.data.map(i=>{
                  return i.feature
                })
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: UserGroupData_
          }
          break;
        case "/UserBuyCount":
          let UserBuyCountData = await this.GetData(url)
          this.options={
            title: {
              text: UserBuyCountData.text
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            //区分 需要在series每类数据中添加name以区分
            legend: {
              data: ['柱状', '折线']
            },
            xAxis: [
              {
                type: 'category',
                data: UserBuyCountData.data.data.map(i=>{
                  return i.goodsName
                }),
                axisPointer: {
                  type: 'shadow'
                },
                axisLabel: {
                  rotate: 45,
                },
              },

            ],
            yAxis: [
              {
                type: 'value',
                // name: 'Precipitation',
                // min: 0,
                // max: 250,
                // interval: 50,
                // axisLabel: {
                //   formatter: '{value} ml'
                // }
              },
              {
                type: 'value',
                // name: 'Temperature',
                // min: 0,
                // max: 25,
                // interval: 5,
                // axisLabel: {
                //   formatter: '{value} °C'
                // }
              }
            ],
            series: [
              {
                name: '柱状',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 瓶/袋';
                  }
                },
                data: UserBuyCountData.data.data.map(i=>{
                  return i.goodsNum
                }),
              },
              {
                name: '折线',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + '瓶/袋';
                  }
                },
                data: UserBuyCountData.data.data.map(i=>{
                  return i.goodsNum
                }),
              }
            ]
          }
          break;
        case "/UserTypeAccountedFor":
          let UserTypeAccountedForData = await this.GetData(url)
          this.options={
            title: {
              text: UserTypeAccountedForData.text,
              //副标题
              // subtext: 'Fake Data',
              left: 'center'
            },
            //右上角报告
            toolbox: {
              feature: {
                //查看数据
                dataView: { show: true, readOnly: false },
                //变化图像
                // magicType: { show: true, type: ['line', 'bar'] },
                //重置
                // restore: { show: true },
                //保存图像
                saveAsImage: { show: true }
              }
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: '用户类型',
                type: 'pie',
                radius: '50%',
                data: UserTypeAccountedForData.data.data.map(i=>{
                  return{
                    value:i.AccountNum,
                    name:i.AccountType
                  }
                }),
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          break;
        case "/UserExpensePlace":
          let UserExpensePlaceData = await this.GetData(url)
          this.options={

            title: {
              text: UserExpensePlaceData.text,
            },
            //右上角报告
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: UserExpensePlaceData.data.data.map(i=>{
                return i.expensePlace
              })
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data:UserExpensePlaceData.data.data.map(i=>{
          return i.accountNum
        }),
                type: 'bar',
                itemStyle: {
                  normal: {
                    //这里是重点
                    color: function(params) {
                      //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                      var colorList = ['#c23800','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                      return colorList[params.dataIndex]
                    }
                  }
                }
              }
            ]
          }
          break;
        case "/UserExpenseTimes":
          let UserExpenseTimesData = await this.GetData(url)
          this.options={
            title: {
              text: UserExpenseTimesData.text
            },
            //右上角报告
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            xAxis: {
              type: 'category',
              data: UserExpenseTimesData.data.data.map(i=>{
                return i.expenseTimes
              })
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: UserExpenseTimesData.data.data.map(i=>{
                  return i.accountNum
                }),
                type: 'bar',
                itemStyle: {
                  normal: {
                    //这里是重点
                    color: function(params) {
                      //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                      var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                      return colorList[params.dataIndex]
                    }
                  }
                }
              }
            ]
          }
          break;
        case "/UserExpenseTimesAndPlace" :
          let UserExpensePlace = await this.GetData("/getUserExpensePlace")
          let UserExpenseTimes = await this.GetData("/getUserExpenseTimes")
          this.options = {
            //右上角报告
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            //区分 需要在series每类数据中添加name以区分
            legend: {
              top: 10,
              data: ['时段', '地点'],
              textStyle: {
                fontSize: 16
              }
            },
            //x轴
            xAxis: {
              data: UserExpenseTimes.data.data.map(i=>{
                return i.expenseTimes
              })
            },
            yAxis: {},
            series: [

              {
                symbolSize: 20,
                name:'时段',
                type: 'scatter',       //type: scatter表示散点图
                data: UserExpenseTimes.data.data.map(i=>{
                  return i.accountNum
                })
              },
              {
                symbolSize: 20,
                name:'地点',
                type: 'scatter',       //type: scatter表示散点图
                data: UserExpensePlace.data.data.map(i=>{
                  return i.accountNum
                })
              }
            ]

          };

      }
    },
    //视图刷新
    reloadEchart(){
      this.loadSurvey = false
      this.$nextTick(()=>{
        this.loadSurvey = true
      })
    },
    async GetData(url){
      let {data} = await getdata(url)
      this.datas=data
      this.reloadEchart()
      return data
    }
  }
}
</script>

<style scoped>
.card-container{
  display: flex;
  flex-wrap:wrap ;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin: 50px;
  height: 100%;
}
</style>

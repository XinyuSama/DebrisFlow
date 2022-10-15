<template>
  <div :id="id" :class="[maxWidth=='1'?'main_container_maxWidth':'main_container_minWidth']" :option="option" :maxWidth="maxWidth"></div>
</template>

<script>
import * as echarts from "echarts"
export default {
  name: "Echarts",
  mounted() {
    this.initCharts()
  },
  props: {
    option: { // 接收父组件传入值
      type: Object,
    },
    id:{
      type:String
    },
    maxWidth:{
      type:String
    },
  },
  //监听父组件传入的props数据改变，就改变data里的数据，更新数据从而更新试图
  watch:{
    option:{
      handler(new_value,old_value){
        // this.options = new_value
        //刷新chart视图
        this.myChart.setOption(new_value)
      },
      deep: true
    }

  },
  data(){
    return{
      options:this.option,
      maxWidths: this.maxWidth,
      myChart:{}
    }
  },
  methods: {

    initCharts() {
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id))
      this.myChart = myChart
      this.chartShowLoading(myChart)
      myChart.setOption(this.options)
      this.chartCloseLoading(myChart)
    },
    // 加载loading
    chartShowLoading(Chart){
      Chart.showLoading({
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0,
      });
    },
    // 关闭loading
    chartCloseLoading(Chart){
      // setOption前隐藏loading事件
      Chart.hideLoading();
    }
  }
}
</script>

<style scoped>
.main_container_maxWidth {
  width: 100%;
  height: 500px;
  /*消除margin*/
  /*overflow: hidden;*/
}
.main_container_minWidth {
  width: 50%;
  height: 500px;
  /*消除margin*/
  /*overflow: hidden;*/
}
</style>

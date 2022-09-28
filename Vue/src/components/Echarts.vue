<template>
  <div :id="this.id" class="main_container"></div>
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
    }
  },
  data(){
    return{
      options:this.option
    }
  },
  methods:{
    initCharts() {
      // 初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption(this.options)
    }
  }
}
</script>

<style scoped>
.main_container {
  width: 100%;
  height: 800px;
  /*消除margin*/
  overflow: hidden;
}
</style>

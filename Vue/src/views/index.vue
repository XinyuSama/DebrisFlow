<template>
  <el-container>
    <el-header  width="auto">
      <el-menu class="el-menu-demo" mode="horizontal"  background-color="#EBEEF5"
               :default-active="$route.path" router>
        <el-menu-item v-for="route in routes"
                      :key="route.path"
                      :index="route.path" :class="$route.path===route.path?'is-active':''">
          <i :class="route.icon"></i>
          <span slot="title">{{ route.title }}</span>
        </el-menu-item>
      </el-menu>
      </el-header>
    <el-container>
      <el-main>  <router-view/> </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      routes: [
        {path: "/tableData", title: "表格数据",icon:'el-icon-tickets'},
        {path: "/echartsTable", title: "图表",icon:'el-icon-pie-chart'},
        {path: "/unityModel", title: "3D模型",icon:'el-icon-view'},
        {path: "/twoDModel", title: "2D模型",icon:'el-icon-monitor'},
        {path: "/intro", title: "简介",icon:'el-icon-info'},
      ]

    };
  },
  methods:{
    collapseStatus(){
      this.isCollapse = ! this.isCollapse
    }
  }
}
</script>

<style scoped>

.el-menu-demo{
  display: flex;
  justify-content: space-around;
}


body > .el-container {
  margin-bottom: 40px;
  height: 100vh;

}
.el-main{
  padding: 0;
  overflow: hidden;
}
</style>

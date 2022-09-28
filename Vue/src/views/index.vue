<template>
  <el-container>
    <el-header style="font-size: 25px">泥石流</el-header>
    <el-container>
      <my-aside/>
      <MyMain/>

    </el-container>
    <el-footer>~~~~</el-footer>
  </el-container>
</template>

<script>
import MyAside from "@/views/MyAside";
import MyMain from "@/views/MyMain";
export default {
  name: "index",
  components:{
    MyAside,MyMain
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: rgb(217,236,255);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color:  rgb(217,236,255);
  color: #333;
  /*左对齐*/
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: rgb(236, 245, 255);
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100vh;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

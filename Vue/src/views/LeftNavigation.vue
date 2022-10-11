<template>
  <el-aside width="200px">
    <el-menu default-active="tableData" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
      <el-menu-item index="tableData">
        <i class="el-icon-data-line"></i>
        <span slot="title">表格数据</span>
      </el-menu-item>
      <el-menu-item index="unityModel">
        <i class="el-icon-user"></i>
        <span slot="title">unity</span>
      </el-menu-item>
      <el-menu-item index="twoDModel">
        <i class="el-icon-goods"></i>
        <span slot="title">2D模型</span>
      </el-menu-item>
      <el-menu-item index="intro">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">简介</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "LeftNavigation",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /*width: 200px;*/
  min-height: 400px;
  height: 100%;
}
.el-menu-item{
  height: 60px;
  font-size: 15px;
}
</style>

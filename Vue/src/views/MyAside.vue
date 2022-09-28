<template>
  <el-aside width="200px">
    <el-menu default-active="FiveDaysData" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
      <el-menu-item index="FiveDaysData">
        <i class="el-icon-data-line"></i>
        <span slot="title">近5天新增和流失用户</span>
      </el-menu-item>
      <el-menu-item index="UserGroup">
        <i class="el-icon-user"></i>
        <span slot="title">用户分群</span>
      </el-menu-item>
      <el-menu-item index="UserBuyCount">
        <i class="el-icon-goods"></i>
        <span slot="title">用户购买商品数量</span>
      </el-menu-item>
      <el-menu-item index="UserTypeAccountedFor">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">用户类型占比</span>
      </el-menu-item>
      <el-menu-item index="UserExpensePlace">
        <i class="el-icon-position"></i>
        <span slot="title">用户消费地点</span>
      </el-menu-item>
      <el-menu-item index="UserExpenseTimes">
        <i class="el-icon-timer"></i>
        <span slot="title">用户消费时段</span>
      </el-menu-item>
      <el-menu-item index="UserExpenseTimesAndPlace">
        <i class="el-icon-more"></i>
        <span slot="title">消费时段与地点关系</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "MyAside",
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

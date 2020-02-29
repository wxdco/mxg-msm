<template>
    <div class="aside">
        <!--:router="true" 开启路由 path即为路由路径  -->
         <el-menu
      :router="true"
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/staff/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>

      <el-menu-item index="/attence/">
        <i class="el-icon-s-check"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>

      <el-menu-item index="/salary/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">薪资管理</span>
      </el-menu-item>

      <el-menu-item index="/performance/">
        <i class="el-icon-s-claim"></i>
        <span slot="title">绩效管理</span>
      </el-menu-item>

      <el-menu-item index="/log/">
        <i class="el-icon-document"></i>
        <span slot="title">日志</span>
      </el-menu-item>
    
    </el-menu>
    </div>
</template>

<style scoped>
    .el-menu {
        border-right: none;
    }
</style>
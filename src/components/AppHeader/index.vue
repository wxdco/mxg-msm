<template>
    <div class="header">
        <a href="#/">
            <img class="logo" src="@/assets/logo.png"  width="25px">
            <span class="name">人力资源管理系统</span>
        </a>
        <el-dropdown  trigger="click"  @command="handleCommand">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  }
</script>

<style scoped>
    .logo{
        vertical-align: middle;
        padding: 0 10px 0 40px
    }
    .name{
        position: absolute;
        color: white;
    }
    .el-dropdown{
        float: right;
        margin-right: 40px;
    }
    .el-dropdown-link {
        color: white;
        cursor: pointer;
    }
</style>
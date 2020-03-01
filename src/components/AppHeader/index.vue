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

import {logout} from '@/api/login/login.js'

  export default {
    methods: {
      handleCommand(command) {
          switch(command){
              case 'a' : 
                this.$message('修改密码');
                break;
              case 'b' : 
                logout(localStorage.getItem('hrm-token')).then(response => {
                    const resp = response.data;
                    console.log(response)
                    if(resp.flag){
                        //退出成功
                        //清除本地缓存
                        localStorage.removeItem('hrm-token');
                        localStorage.removeItem('hrm-user');
                        this.$router.push('/login')
                    } else {
                        this.$message({
                            message: '退出失败',
                            type: 'warning'
                        });
                    }
                })
                break;
          }
        
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
<template>
    <div class="login_container">
        <el-form class="login_form" ref="form" :model="form" label-width="80px">
            <h2 class="login_title">管理系统</h2>
            <el-form-item class="item" label="账号">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item class="item" label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item class="item">
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
    .login_form{
        width: 500px;
        margin: 240px auto;
        padding: 10px;
        border-radius: 10px;
        background: rgb(225,225,225,0.8)
    }
    .login_container{
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/login.jpg')
    }
    .login_title{
        text-align: center;
        color: #313033
    }
</style>
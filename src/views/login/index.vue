<template>
    <div class="login_container">
        <el-form class="login_form" ref="form" :rules="rules" :model="form" label-width="80px">
            <h2 class="login_title">管理系统</h2>
            <el-form-item class="item" label="账号" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item class="item" label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item class="item">
                <el-button type="primary" @click="onSubmit('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import {login,getUser} from '@/api/login/login'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
         rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 9, message: '用户名长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, message: '密码长度最少三个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            //
            login(this.form.username,this.form.password).then(response => {
                  const resp = response.data;
                  const flag = response.data.flag;
                  if(flag){
                    getUser(resp.data.token).then(response => {
                      localStorage.setItem('hrm-user', JSON.stringify(response.data.data));
                      localStorage.setItem('hrm-token', resp.data.token)
                      this.$router.push('/')
                    })
                  } else {
                    this.$message({
                      message: '用户名或密码不正确',
                      type: 'warning'
                    });
                  }
            });
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
    .login_form{
        width: 400px;
        margin: 150px auto;
        padding: 50px;
        border-radius: 10px;
        background: rgb(225,225,225,0.8)
    }
    .login_container{
        position: absolute;
        width: 100%;
        height: 100%;
        /* background-image: url('../../assets/login.jpg') */
        background-color: #303641;
    }
    .login_title{
        text-align: center;
        color: #313033
    }
</style>
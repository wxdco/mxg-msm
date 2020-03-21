<template>
    <div class="login_container">
        <el-form class="login_form" ref="form" :rules="rules" :model="form" label-width="80px">
            <h2 class="login_title">人力资源管理系统</h2>
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

        <el-button class="register" type="success" @click="dialogFormVisible = true">注册</el-button>
        <el-dialog title="注册" 
          :visible.sync="dialogFormVisible"
          width="50%" v-if='dialogFormVisible' 
          :close-on-click-modal="false">
            <el-form :model="registerForm" ref="registerForm" :rules="registerRules">
              <el-form-item class="item" label="账号" prop="username">
                  <el-input v-model="registerForm.username" placeholder="请输入账号名" ></el-input>
              </el-form-item>
              <el-form-item class="item" label="密码" prop="password">
                  <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item class="item" label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="registerForm.checkPass" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item class="item" label="姓名" prop="nickname">
                  <el-input v-model="registerForm.nickname" placeholder="请输入您的真实姓名"></el-input>
              </el-form-item>
              <el-form-item class="item" label="邮箱" prop="email">
                  <el-input v-model="registerForm.email" placeholder="请输入您的电子邮箱"></el-input>
                  <el-button icon="el-icon-s-promotion" class="sendMail" @click="sendEmailCode" style="width: 14%" type="success" :disabled="disabled=!show" >  
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show" class="count">{{count}} s</span>
                </el-button>
              </el-form-item>
              <el-form-item class="item" label="验证码" prop="verificationCode">
                <el-input v-model="registerForm.verificationCode"  placeholder="请输入验证码" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="registerFormSubmit">注册</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import {login,checkUser,getEmailCode,registerUser,checkEmailCode} from '@/api/login/login'
  import md5 from 'md5'
  const TIME_COUNT = 60; //更改倒计时时间
  export default {
    data() {
      let isEmail = (rule, value, callback) => {
        let patter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!patter.test(value)) {
          return callback(new Error('请输入正确的电子邮件地址！'))
        } else {
          callback()
        }
      };
      let validUsername=(rule,value,callback)=>{
          let reg=/^[0-9a-zA-Z]*$/g
          if(!reg.test(value)){
            return callback(new Error('账号必须是字母或数字或其组合'))
          }else{
              callback()
          }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateUsername = (rule, value, callback) => {
        checkUser(value).then(response => {
          const resp = response.data;
          if(resp.code === 200){
            callback();
          } else {
            callback(new Error('用户名已存在!'));
          }
        })
      };
      return {
        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 16, message: '用户名长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, message: '密码长度最少三个字符', trigger: 'blur' }
          ]
        },
        registerForm: {
          username: '',
          password: '',
          checkPass: '',
          nickname: '',
          email: ''
        },
        registerRules: {
          username: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { min: 3, max: 16, message: '账户长度在 3 到 16 个字符', trigger: 'blur' },
            { validator: validateUsername, trigger: 'blur' },
            { validator: validUsername, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度最少六个字符', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur',required:true }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: isEmail, trigger: 'blur' }
          ],
          verificationCode :[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
        },
        dialogFormVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
         this.$refs[formName].validate((valid) => {
          if (valid) {
            //
            login(this.form.username,md5(this.form.password)).then(response => {
                  const resp = response.data;
                  const code = resp.code;
                  if(code === 200){
                    localStorage.setItem('hrm-token', resp.data)
                    this.$router.push('/')
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
      },
      registerFormSubmit(){
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            checkEmailCode(this.registerForm.email,this.registerForm.verificationCode).then(response => {
              const resp = response.data;
              if(resp.code === 200){
                let user = {}
                user.loginName = this.registerForm.username
                user.password = md5(this.registerForm.password)
                user.nickname = this.registerForm.nickname
                user.email = this.registerForm.email
                registerUser(user).then(response1 => {
                  const resp = response1.data;
                  if(resp.code === 200){
                    this.dialogFormVisible = false;
                    this.$message({
                      message: '注册成功！',
                      type: 'success'
                    });
                  } else {
                    this.dialogFormVisible = false;
                    this.$message({
                      message: '网络异常注册失败！',
                      type: 'warning'
                    });  
                  }
                }).catch(err => {
                  console.log(err)
                })
              } else {
                this.$message({
                      message: '邮箱验证码不正确,请重新获取',
                      type: 'warning'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      sendEmailCode(){
        this.$refs['registerForm'].validateField('email',emailError => {
          if(!emailError) {
            if (!this.timer) {
                      this.count = TIME_COUNT;
                      this.show = false;
                      this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                          this.count--;
                        } else {
                          this.show = true;
                          clearInterval(this.timer);  // 清除定时器
                          this.timer = null;
                        }
                      }, 1000)
              }
              getEmailCode(this.registerForm.email).then(response => {
                const resp = response.data;
                if(resp.code === 200){
                  this.$message({
                    message: '请查看' + this.registerForm.email + '收件箱,获取验证码。',
                    type: 'success'
                  });
                  
                } else {
                  this.$message({
                    message: '发送失败',
                    type: 'warning'
                  });
                }
              })
          }
        });
        
      }, 
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
    .register{
      position: absolute;
      right: 0;
      top: 0;
      margin: 10px;
    }
    .sendMail{
      margin-top: 10px;
    }
    .dialog-footer{
      text-align: left;
    }
</style>
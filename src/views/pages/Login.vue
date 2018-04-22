<template>
  <el-container class="login">  
    <el-main >
        <div class="center" >
          <span style="font-size:60px; color:#5d626b">Pet Hospitial</span><br>
          <span style="font-size:15px; color:#959faf">Welcome to pet hospital online learning system | Powered by G13</span>
        </div>
        <div class="center-in-center">
          <el-row>
            <el-col :span="24" >
              <br>
              <el-form class="login-form" :inline="true" :model="loginForm" :rules="loginRules" ref="loginForm" type="flex" justify="center">
                <el-form-item  prop="username">
                  <el-input v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" size="30"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                  <el-input :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" size="40"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin"><i class="el-icon-arrow-right"></i></el-button>
                  </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
    </el-main>
  </el-container>
</template>

<style>
html, body {
    width: 100%;
    height: 100%;
}
.login{
    /* background-image: linear-gradient(45deg, #7A88FF, #7AFFAF); */
    /* background-image: radial-gradient(circle,#99CCCC, #7171B7); */
    /* background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%); */
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    /* background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%); */
    /* background-image: linear-gradient(to right, #243949 0%, #517fa4 100%); */
}
</style>
<script>
export default {
  name: 'Login',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post('http://112.74.48.64:80/user/login', {name: this.loginForm.username, password: this.loginForm.password}).then(response => {
            if (response.body.status === 'success') {
              this.loading = false
              // console.log(response.body.data.role)
              // this.$router.go('/Dashboard')
              this.$router.replace({path: '/dashboard', query: {index: response.body.data.role}})
            }
            if (response.body.status === 'failed') {
              this.loading = false
              this.$message.error(response.body.message)
              this.loginForm.password = ''
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
  .center-in-center{   
      position: absolute;   
      top: 70%;   
      left: 50%;   
      -webkit-transform: translate(-50%, -50%);   
      -moz-transform: translate(-50%, -50%);   
      -ms-transform: translate(-50%, -50%);   
      -o-transform: translate(-50%, -50%);   
      transform: translate(-50%, -50%);   
  }

  .center{
    text-align:center;
    position: absolute;   
    top: 50%;   
    left: 50%;   
    -webkit-transform: translate(-50%, -50%);   
    -moz-transform: translate(-50%, -50%);   
    -ms-transform: translate(-50%, -50%);   
    -o-transform: translate(-50%, -50%);   
    transform: translate(-50%, -50%);   
  }
</style>

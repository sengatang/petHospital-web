<template>
  <el-container>
    <el-main>
      <el-card class="login-card">
        <el-row>
          <el-col :span="12">
            <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
              <el-form-item>
                <h3>Welcome PetHospital</h3>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登陆</el-button>
                <el-button>忘记密码</el-button>
                </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

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
              console.log(response.body.data.role)
              this.$router.push({ name: 'Dashboard', params: {user_type: response.body.data.role} })
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
<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <el-row>
          <el-col :span="12">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item>
                <h1>Login</h1>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button  type="primary" @click="onSubmit">登陆</el-button>
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
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
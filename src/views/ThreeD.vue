<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>3D</span>
      </div>
     <p>Welcome To 3D</p>
     <el-button @click="dialogVisible = true">test</el-button>
     <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <iframe width="600" height="400" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642187/7bafd4e5322607ea.jpg"></iframe>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'threeD',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style>
.el-card {
  height:860px;
}
</style>
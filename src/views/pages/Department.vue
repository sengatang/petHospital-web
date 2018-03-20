<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>科室管理</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'department',
  data: () => {
    return {
    }
  },
  mounted: function () {
    this.searchDepartment()
  },
  methods: {
    searchDepartment () {
      // this.$http.jsonp('http://112.74.48.64:80/department/4', {}, {
      //   headers: {},
      //   emulateJSON: true }).then((response) => {
      //   console.log(response)
      // })
      this.$http.get('http://112.74.48.64:80/department/4').then(response => {
        console.log(response)
      })
    }
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
</style>
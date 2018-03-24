<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
      <el-table
      :data="userList"
      stripe
      max-height="560"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户姓名"
        width="180">
      </el-table-column>
        <el-table-column
        label="角色">
        <template slot-scope="scope">
          <el-tag style="margin-left: 10px">{{changeRole(scope.row.role)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="department.name"
        label="所属科室">
      </el-table-column>
      <el-table-column
        prop="department.description"
        label="主要职责">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="departDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button  size="mini" plain type="primary" >编辑</el-button>
        </template>
      </el-table-column>
     </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'userManagement',
  data: () => {
    return {
      userList: []
    }
  },
  mounted: function () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      this.$http.get('http://112.74.48.64:80/user/list').then(response => {
        if (response.body.status === 'success') {
          this.userList = response.body.data
        }
      })
    },
    changeRole (item) {
      console.log(item)
      if (item === 1) {
        return '前台'
      } else if (item === 2) {
        return '执业兽医师'
      } else if (item === 3) {
        return '助理'
      }
    }
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
</style>
<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>


      <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
        <el-form-item label="">
          <el-input v-model="userSearchInput" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userSearch" >查询</el-button>
          <el-button  @click="getUserList" >清空</el-button>
        </el-form-item>
        <el-button plain style="float:right" @click="addUserVis=true" class="addButton">添加</el-button>
      </el-form>

      <el-dialog title="新增用户" :visible.sync="addUserVis">
        <el-form :model="userAddInput">
          <el-form-item label="用户名称">
            <el-input v-model="userAddInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="userAddInput.password" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-select v-model="userAddInput.selectRole" placeholder="请选择" style="width:50%">
              <el-option
                v-for="item in userAddInput.role"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-input v-model="userAddInput.status" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
             <el-select v-model="userAddInput.selectDepart" placeholder="请选择" style="width:50%">
              <el-option
                v-for="item in userAddInput.department"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="userAdd">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改用户" :visible.sync="editUserVis">
        <el-form :model="userEditInput">
          <el-form-item label="用户名称">
            <el-input v-model="userEditInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="userEditInput.password" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-select v-model="userEditInput.selectRole" placeholder="请选择" style="width:50%">
              <el-option
                v-for="item in userEditInput.role"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态">
            <el-input v-model="userEditInput.status" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
             <el-select v-model="userEditInput.selectDepart" placeholder="请选择" style="width:50%">
              <el-option
                v-for="item in userEditInput.department"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserVis = false">取 消</el-button>
          <el-button type="primary" @click="userEditConfirm">确 定</el-button>
        </div>
      </el-dialog>

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
          <el-button @click="userDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button  @click="userEdit(scope.row)"  size="mini" plain type="primary" class="editButton">编辑</el-button>
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
      userList: [],
      userSearchInput: '',
      addUserVis: false,
      editUserVis: false,
      userAddInput: {
        name: '',
        role: [
          {
            value: 1,
            label: '前台'
          },
          {
            value: 2,
            label: '执业兽医师'
          },
          {
            value: 3,
            label: '助理'
          },
          {
            value: 0,
            label: '管理员'
          }
        ],
        selectRole: '',
        password: '',
        status: 0,
        selectDepart: '',
        department: [
          {
            value: 1,
            label: '部门A'
          },
          {
            value: 2,
            label: '部门B'
          },
          {
            value: 3,
            label: '部门C'
          }
        ]
      },
      userEditInput: {
        name: '',
        role: [
          {
            value: 1,
            label: '前台'
          },
          {
            value: 2,
            label: '执业兽医师'
          },
          {
            value: 3,
            label: '助理'
          },
          {
            value: 0,
            label: '管理员'
          }
        ],
        selectRole: '',
        password: '',
        status: 0,
        selectDepart: '',
        department: [
          {
            value: 1,
            label: '部门A'
          },
          {
            value: 2,
            label: '部门B'
          },
          {
            value: 3,
            label: '部门C'
          }
        ]
      }
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
      if (item === 1) {
        return '前台'
      } else if (item === 2) {
        return '执业兽医师'
      } else if (item === 3) {
        return '助理'
      } else if (item === 0) {
        return '管理员'
      }
    },
    userSearch () {
      this.$http.post('http://112.74.48.64:80/user/search', {name: this.userSearchInput}).then(response => {
        if (response.body.status === 'success') {
          this.userList = []
          this.userList = response.body.data
        }
      })
    },
    userDelete (item) {
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/user/delete/' + item.id).then(response => {
          this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    userAdd () {
      console.log(this.userAddInput)
      this.$http.post('http://112.74.48.64:80/user/add', {name: this.userAddInput.name, password: this.userAddInput.password, role: this.userAddInput.selectRole, status: parseInt(this.userAddInput.status), department: {id: this.userAddInput.selectDepart}}).then(response => {
        if (response.body.status === 'success') {
          this.addUserVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getUserList()
        }
      })
    },
    userEdit (item) {
      // console.log('item', item)
      this.editUserVis = true
      this.userEditInput.name = item.name
      this.userEditInput.id = item.id
      this.userEditInput.selectRole = item.role
      this.userEditInput.status = item.status
      this.userEditInput.selectDepart = item.department.id
      // console.log('this', this.userEditInput)
    },
    userEditConfirm () {
      this.$http.put('http://112.74.48.64:80/user/edit', {id: this.userEditInput.id, password: this.userEditInput.password, name: this.userEditInput.name, role: this.userEditInput.selectRole, department: {id: this.userEditInput.selectDepart}, status: parseInt(this.userEditInput.status)}).then(response => {
        if (response.body.status === 'success') {
          this.editUserVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getUserList()
        }
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
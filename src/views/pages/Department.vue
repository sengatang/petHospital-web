<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>科室管理</span>
      </div>


      <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
        <el-form-item label="">
          <el-input v-model="departSearchInput" placeholder="请输入科室编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="departSearch" class="searchButton">查询</el-button>
          <el-button  @click="getDepartmentList" >清空</el-button>
        </el-form-item>
        <el-button plain style="float:right" @click="addDepartVis=true" class="addButton">添加</el-button>
      </el-form>

      <el-dialog title="新增科室" :visible.sync="addDepartVis">
        <el-form :model="departAddInput">
          <el-form-item label="科室名称">
            <el-input v-model="departAddInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="科室描述">
            <el-input v-model="departAddInput.description" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDepartVis = false">取 消</el-button>
          <el-button type="primary" @click="departAdd">确 定</el-button>
        </div>
      </el-dialog>
      
      <el-dialog title="编辑科室" :visible.sync="editDepartVis">
        <el-form :model="departEditInput">
          <el-form-item label="科室名称">
            <el-input v-model="departEditInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="科室描述">
            <el-input v-model="departEditInput.description" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDepartVis = false">取 消</el-button>
          <el-button type="primary" @click="departEditConfirm">确 定</el-button>
        </div>
      </el-dialog>

     <el-table
      :data="departList"
      stripe
      max-height="560"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="科室编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="科室名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="科室描述">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope" >
          <el-button @click="departDelete(scope.row)"  size="mini" type="danger" plain class="deleteButton">删除</el-button>
          <el-button @click="departEdit(scope.row)"  size="mini" plain type="primary" class="editButton">编辑</el-button>
        </template>
      </el-table-column>
     </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'department',
  data: () => {
    return {
      departList: [],
      departSearchInput: '',
      addDepartVis: false,
      formLabelWidth: '120px',
      departAddInput: {
        name: '',
        description: ''
      },
      editDepartVis: false,
      departEditInput: {
        name: '',
        description: '',
        id: 0
      }
    }
  },
  mounted: function () {
    this.getDepartmentList()
  },
  methods: {
    getDepartmentList () {
      this.departSearchInput = ''
      this.$http.get('http://112.74.48.64:80/department/list').then(response => {
        if (response.body.status === 'success') {
          this.departList = response.body.data
        }
      })
    },
    departDelete (item) {
      this.$confirm('此操作将永久删除该科室信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/department/delete/' + item.id).then(response => {
          this.getDepartmentList()
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
    departSearch () {
      this.$http.get('http://112.74.48.64:80/department/' + this.departSearchInput).then(response => {
        if (response.body.status === 'success') {
          this.departList = []
          this.departList.push(response.body.data)
        }
      })
    },
    departAdd () {
      this.$http.post('http://112.74.48.64:80/department/add', {name: this.departAddInput.name, description: this.departAddInput.description}).then(response => {
        if (response.body.status === 'success') {
          this.addDepartVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getDepartmentList()
        }
      })
    },
    departEdit (item) {
      this.editDepartVis = true
      this.departEditInput.name = item.name
      this.departEditInput.description = item.description
      this.departEditInput.id = item.id
      // console.log('this', this.departEditInput)
    },
    departEditConfirm () {
      // console.log(this.departEditInput)
      this.$http.put('http://112.74.48.64:80/department/edit', {id: this.departEditInput.id, name: this.departEditInput.name, description: this.departEditInput.description}).then(response => {
        if (response.body.status === 'success') {
          this.editDepartVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getDepartmentList()
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
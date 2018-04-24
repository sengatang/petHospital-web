<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>病种管理</span>
      </div>

      <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
        <el-form-item label="">
          <el-input v-model="categorySearchInput" placeholder="请输入病种编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="categorySearch" class="searchButton">查询</el-button>
          <el-button  @click="getCategorymentList" >清空</el-button>
        </el-form-item>
        <el-button plain style="float:right" @click="addCategoryVis=true" class="addButton">添加</el-button>
      </el-form>

      <el-dialog title="新增病种" :visible.sync="addCategoryVis">
        <el-form :model="categoryAddInput">
          <el-form-item label="病种名称">
            <el-input v-model="categoryAddInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
           <el-form-item label="病例">
          <el-select v-model="selectedCases" placeholder="请选择" multiple>
            <el-option
              v-for="item in casesList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCategoryVis = false">取 消</el-button>
          <el-button type="primary" @click="categoryAdd">确 定</el-button>
        </div>
      </el-dialog>
      
      <el-dialog title="修改病种" :visible.sync="editCategoryVis">
        <el-form :model="categoryEditInput">
          <el-form-item label="病种名称">
            <el-input v-model="categoryEditInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
           <el-form-item label="病例">
          <el-select v-model="selectedCases" placeholder="请选择" multiple>
            <el-option
              v-for="item in casesList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editCategoryVis = false">取 消</el-button>
          <el-button type="primary" @click="categoryEditConfirm">确 定</el-button>
        </div>
      </el-dialog>

    <el-table
      :data="categoryList"
      stripe
      max-height="560"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="病种编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="病种名称">
      </el-table-column>
      <el-table-column
        label="该病种下的病例">
        <template slot-scope="scope">
          <span v-for="item in scope.row.illnesses">
            <el-tooltip><div slot="content">{{item.diseaseDescription}}</div>
              <el-tag style="margin-left: 10px">{{ item.name }}</el-tag>
            </el-tooltip>
          </span>
          <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
            <el-button>上左</el-button>
          </el-tooltip>
          <el-tag style="margin-left: 10px" v-for="item in scope.row.illnesses">{{ item.name }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope" >
          <el-button @click="categoryDelete(scope.row)"  size="mini" type="danger" plain class="deleteButton">删除</el-button>
          <el-button @click="categoryEdit(scope.row)"  size="mini" plain type="primary" class="editButton">编辑</el-button>
        </template>
      </el-table-column>
     </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'diseaseManagement',
  data: () => {
    return {
      categoryList: [],
      categorySearchInput: '',
      addCategoryVis: false,
      categoryAddInput: {
        name: ''
      },
      selectedCases: [],
      casesList: [],
      editCategoryVis: false,
      categoryEditInput: {
        name: ''
      }
    }
  },
  mounted: function () {
    this.getCategorymentList()
    this.getCaseList()
  },
  methods: {
    getCategorymentList () {
      this.categorySearchInput = ''
      this.$http.get('http://112.74.48.64:80/category/list').then(response => {
        if (response.body.status === 'success') {
          this.categoryList = response.body.data
        }
      })
    },
    getCaseList () {
      this.$http.get('http://112.74.48.64:80/illness/list').then(response => {
        if (response.body.status === 'success') {
          this.casesList = response.body.data
        }
      })
    },
    categoryAdd () {
      let finalSelectedCases = []
      for (let i = 0; i < this.selectedCases.length; i++) {
        finalSelectedCases.push({'id': this.selectedCases[i]})
      }
      this.$http.post('http://112.74.48.64:80/category/add', {name: this.categoryAddInput.name, illnesses: finalSelectedCases}).then(response => {
        if (response.body.status === 'success') {
          this.addCategoryVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getCategorymentList()
        }
      })
    },
    categoryEdit (item) {
      this.editCategoryVis = true
      this.categoryEditInput.name = item.name
      this.categoryEditInput.id = item.id
      // this.selectedCases = item.illnesses
      // console.log(this.selectedCases)
      // console.log(item.illnesses)
    },
    categoryEditConfirm () {
      let finalSelectedCases = []
      for (let i = 0; i < this.selectedCases.length; i++) {
        finalSelectedCases.push({'id': this.selectedCases[i]})
      }
      this.$http.put('http://112.74.48.64:80/category/edit', {id: this.categoryEditInput.id, name: this.categoryEditInput.name, illnesses: finalSelectedCases}).then(response => {
        console.log(response)
        if (response.body.status === 'success') {
          this.editCategoryVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getCategorymentList()
        }
      })
    },
    categorySearch () {
      this.$http.post('http://112.74.48.64:80/category/search', {name: this.categorySearchInput}).then(response => {
        if (response.body.status === 'success') {
          this.categoryList = response.body.data
        }
      })
    },
    categoryDelete (item) {
      this.$confirm('此操作将永久删除该病例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/category/delete/' + item.id).then(response => {
          this.getCategorymentList()
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
    }
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
</style>
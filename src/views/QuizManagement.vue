<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>试题管理</span>
      </div>
     <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
      <el-form-item label="">
        <el-input v-model="quizSearchInput" placeholder="请输入试题ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="quizSearch" >查询</el-button>
        <el-button  @click="getQuizList" >清空</el-button>
      </el-form-item>
      <el-button plain style="float:right" @click="addQuizVis=true" class="addButton">添加</el-button>
    </el-form>

      <el-dialog title="新增试题" :visible.sync="addQuizVis">
        <el-form :model="quizAddInput">
          <el-form-item label="题目">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input type="textarea" v-model="quizAddInput.askDescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="A选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizAddInput.adescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="B选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizAddInput.bdescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="C选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizAddInput.cdescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="D选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizAddInput.ddescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="答案">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizAddInput.answer" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
           <el-form-item label="所属病种">
          <el-select v-model="selectedCategory" placeholder="请选择">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addQuizVis = false">取 消</el-button>
          <el-button type="primary" @click="quizAdd">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改试题" :visible.sync="editQuizVis">
        <el-form :model="quizEditInput">
          <el-form-item label="题目">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input  type="textarea" v-model="quizEditInput.askDescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="A选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizEditInput.adescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="B选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizEditInput.bdescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="C选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizEditInput.cdescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="D选项">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizEditInput.ddescription" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="答案">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input v-model="quizEditInput.answer" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
         <el-form-item label="所属病种">
          <el-select v-model="selectedCategory" placeholder="请选择">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editQuizVis = false">取 消</el-button>
          <el-button type="primary" @click="quizEditConfirm">确 定</el-button>
        </div>
      </el-dialog>

    <el-table
      :data="quizList"
      stripe
      max-height="560"
      style="width: 100%">
      <el-table-column
        prop="askDescription"
        label="题目"
        width="">
      </el-table-column>
      <el-table-column
        prop="adescription"
        label="选项A"
        width="">
      </el-table-column>
      <el-table-column
        prop="bdescription"
        label="选项B"
        width="">
      </el-table-column>
      <el-table-column
        prop="cdescription"
        label="选项C"
        width="">
      </el-table-column>
      <el-table-column
        prop="ddescription"
        label="选项D"
        width="">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="答案"
        width="">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="类型">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="quizDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button   @click="quizEdit(scope.row)" size="mini" plain type="primary" class="editButton">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'quizManagement',
  data: () => {
    return {
      quizList: [],
      quizSearchInput: '',
      quizAddInput: {
        askDescription: '',
        adescription: '',
        bdescription: '',
        cdescription: '',
        ddescription: '',
        answer: '',
        questionType: 0,
        userType: 1,
        category: 2
      },
      quizEditInput: {
        askDescription: '',
        adescription: '',
        bdescription: '',
        cdescription: '',
        ddescription: '',
        answer: '',
        questionType: 0,
        userType: 1,
        category: 2,
        id: 0
      },
      addQuizVis: false,
      editQuizVis: false,
      categoryList: [],
      selectedCategory: []
    }
  },
  mounted: function () {
    this.getQuizList()
    this.getCategoryList()
  },
  methods: {
    getQuizList () {
      this.quizSearchInput = ''
      this.$http.get('http://112.74.48.64:80/question/list').then(response => {
        if (response.body.status === 'success') {
          this.quizList = response.body.data
        }
      })
    },
    getCategoryList () {
      this.$http.get('http://112.74.48.64:80/category/list').then(response => {
        if (response.body.status === 'success') {
          this.categoryList = response.body.data
        }
      })
    },
    quizSearch () {
      this.$http.post('http://112.74.48.64:80/question/search', {askDescription: this.quizSearchInput}).then(response => {
        console.log(response)
        if (response.body.status === 'success') {
          this.quizList = response.body.data
        }
      })
    },
    quizDelete (item) {
      this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/question/delete/' + item.id).then(response => {
          this.getQuizList()
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
    quizAdd () {
      this.$http.post('http://112.74.48.64:80/question/add', {askDescription: this.quizAddInput.askDescription, adescription: this.quizAddInput.adescription, bdescription: this.quizAddInput.bdescription, cdescription: this.quizAddInput.cdescription, ddescription: this.quizAddInput.ddescription, answer: this.quizAddInput.answer, userType: this.quizAddInput.userType, questionType: this.quizAddInput.questionType, category: {id: this.selectedCategory}}).then(response => {
        if (response.body.status === 'success') {
          this.addQuizVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getQuizList()
        }
      })
    },
    quizEdit (item) {
      console.log('item', item)
      this.editQuizVis = true
      this.quizEditInput.askDescription = item.askDescription
      this.quizEditInput.adescription = item.adescription
      this.quizEditInput.bdescription = item.bdescription
      this.quizEditInput.cdescription = item.cdescription
      this.quizEditInput.ddescription = item.ddescription
      this.quizEditInput.answer = item.answer
      this.quizEditInput.userType = item.userType
      this.quizEditInput.questionType = item.questionType
      this.quizEditInput.category = item.category.id
      this.quizEditInput.id = item.id
    },
    quizEditConfirm () {
      this.$http.put('http://112.74.48.64:80/question/edit', {id: this.quizEditInput.id, askDescription: this.quizEditInput.askDescription, adescription: this.quizEditInput.adescription, bdescription: this.quizEditInput.bdescription, cdescription: this.quizEditInput.cdescription, ddescription: this.quizEditInput.ddescription, answer: this.quizEditInput.answer, userType: this.quizEditInput.userType, questionType: this.quizEditInput.questionType, category: {id: this.selectedCategory}}).then(response => {
        console.log(response)
        if (response.body.status === 'success') {
          this.editQuizVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getQuizList()
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
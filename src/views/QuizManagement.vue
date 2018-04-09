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
      <el-button plain style="float:right" @click="addQuizVis=true">添加</el-button>
    </el-form>

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
        prop="questionType"
        label="题目类型"
        width="">
      </el-table-column>
      <el-table-column
        prop="userType"
        label="用户角色">
      </el-table-column>
      <el-table-column
        prop="category"
        label="类型">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="quizDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button  size="mini" plain type="primary" >编辑</el-button>
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
      quizSearchInput: ''
    }
  },
  mounted: function () {
    this.getQuizList()
  },
  methods: {
    getQuizList () {
      this.quizSearchInput = ''
      this.$http.get('http://112.74.48.64:80/question/list').then(response => {
        if (response.body.status === 'success') {
          this.quizList = response.body.data
          console.log(this.quizList)
        }
      })
    },
    quizSearch () {
      this.$http.get('http://112.74.48.64:80/quiz/' + this.quizSearchInput).then(response => {
        if (response.body.status === 'success') {
          this.quizList = []
          this.quizList.push(response.body.data)
        }
      })
    },
    quizDelete (item) {
      this.$confirm('此操作将永久删除该疫苗信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/quiz/delete/' + item.id).then(response => {
          this.getVaccineList()
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
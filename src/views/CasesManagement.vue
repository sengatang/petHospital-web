<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>病例管理</span>
      </div>

     <el-table
      :data="caseList"
      stripe
      max-height="560"
      style="width: 100%"
      @current-change="caseTableClick">
      <el-table-column
        prop="id"
        label="病例编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="病情"
        width="180">
      </el-table-column>
      <el-table-column
        prop="diseaseDescription"
        label="详情">
      </el-table-column>
      <el-table-column
        prop="process"
        label="检查过程">
      </el-table-column>
      <el-table-column
        prop="result"
        label="治疗结果">
      </el-table-column>
      <el-table-column
        prop="treatment"
        label="用药">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="departDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button @click="departEdit(scope.row)"  size="mini" plain type="primary" class="editButton">编辑</el-button>
        </template>
      </el-table-column>
     </el-table>

    <el-dialog
      title="病例详情"
      :visible.sync="caseDetailVis"
      width="50%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="caseDetailVis = false">取 消</el-button>
        <el-button type="primary" @click="caseDetailVis = false">确 定</el-button>
      </span>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'casesManagement',
  data: () => {
    return {
      caseList: [],
      caseDetailVis: false
    }
  },
  mounted: function () {
    this.getCaseList()
  },
  methods: {
    getCaseList () {
      this.$http.get('http://112.74.48.64:80/illness/list').then(response => {
        if (response.body.status === 'success') {
          this.caseList = response.body.data
        }
      })
    },
    caseTableClick (val) {
      console.log(val)
      this.caseDetailVis = true
    }
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
</style>
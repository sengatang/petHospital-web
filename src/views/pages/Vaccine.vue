<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>疫苗管理</span>
      </div>

    <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
      <el-form-item label="">
        <el-input v-model="vaccineSearchInput" placeholder="请输入疫苗ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="vaccineSearch" >查询</el-button>
        <el-button  @click="getVaccineList" >清空</el-button>
      </el-form-item>
      <el-button plain style="float:right" @click="addUserVis=true">添加</el-button>
    </el-form>

    <el-table
      :data="vaccineList"
      stripe
      max-height="560"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="疫苗名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productionDate"
        label="生产日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="expirationDate"
        label="有效日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格／支">
      </el-table-column>
      <el-table-column
        prop="description"
        label="适用范围">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="vaccineDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button  size="mini" plain type="primary" >编辑</el-button>
        </template>
      </el-table-column>
     </el-table>


    </el-card>
  </div>
</template>

<script>
export default {
  name: 'vaccine',
  data: () => {
    return {
      vaccineList: [],
      vaccineSearchInput: ''
    }
  },
  mounted: function () {
    this.getVaccineList()
  },
  methods: {
    getVaccineList () {
      this.$http.get('http://112.74.48.64:80/vaccine/list').then(response => {
        if (response.body.status === 'success') {
          this.vaccineList = response.body.data
          console.log(this.vaccineList)
        }
      })
    },
    vaccineSearch () {
      this.$http.get('http://112.74.48.64:80/vaccine/' + this.vaccineSearchInput).then(response => {
        if (response.body.status === 'success') {
          this.vaccineList = []
          this.vaccineList.push(response.body.data)
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
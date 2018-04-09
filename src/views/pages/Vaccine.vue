<template>
  <div>
    <el-card class="vaccine">
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
      <el-button plain style="float:right" @click="addVaccineVis=true">添加</el-button>
    </el-form>

      <el-dialog title="新增疫苗" :visible.sync="addVaccineVis">
        <el-form :model="vaccineAddInput">
          <el-form-item label="疫苗名称">
            <el-input v-model="vaccineAddInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="疫苗描述">
            <el-input v-model="vaccineAddInput.description" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="可用范围">
            <el-input v-model="vaccineAddInput.illness" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="有效期限">
            <el-date-picker
              v-model="vaccineAddInput.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="疫苗价格">
            <el-input-number v-model="vaccineAddInput.price" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVaccineVis = false">取 消</el-button>
          <el-button type="primary" @click="vaccineAdd">确 定</el-button>
        </div>
      </el-dialog>


       <el-dialog title="修改疫苗信息" :visible.sync="editVaccineVis">
        <el-form :model="vaccineEditInput">
          <el-form-item label="疫苗名称">
            <el-input v-model="vaccineEditInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="疫苗描述">
            <el-input v-model="vaccineEditInput.description" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="可用范围">
            <el-input v-model="vaccineEditInput.illness" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="有效期限">
            <el-date-picker
              v-model="vaccineEditInput.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="疫苗价格">
            <el-input-number v-model="vaccineEditInput.price" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVaccineVis = false">取 消</el-button>
          <el-button type="primary" @click="vaccineEditConfirm">确 定</el-button>
        </div>
      </el-dialog>
  
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
          <el-button  @click="vaccineEdit(scope.row)" size="mini" plain type="primary" >编辑</el-button>
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
      vaccineSearchInput: '',
      addVaccineVis: false,
      vaccineAddInput: {
        name: '',
        description: '',
        price: 0,
        productionDate: '',
        date: [],
        expirationDate: ''
      },
      editVaccineVis: false,
      vaccineEditInput: {
        name: '',
        description: '',
        price: 0,
        productionDate: '',
        date: [],
        expirationDate: ''
      }
    }
  },
  mounted: function () {
    this.getVaccineList()
  },
  methods: {
    getVaccineList () {
      this.vaccineSearchInput = ''
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
    },
    vaccineDelete (item) {
      this.$confirm('此操作将永久删除该疫苗信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/vaccine/delete/' + item.id).then(response => {
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
    },
    vaccineAdd () {
      this.vaccineAddInput.productionDate = this.vaccineAddInput.date[0]
      this.vaccineAddInput.expirationDate = this.vaccineAddInput.date[1]
      console.log(this.vaccineAddInput)
      this.$http.post('http://112.74.48.64:80/vaccine/add', {name: this.vaccineAddInput.name, description: this.vaccineAddInput.description, price: this.vaccineAddInput.price, productionDate: this.vaccineAddInput.productionDate, expirationDate: this.vaccineAddInput.expirationDate}).then(response => {
        if (response.body.status === 'success') {
          this.addVaccineVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getVaccineList()
        }
      })
    },
    vaccineEdit (item) {
      this.editVaccineVis = true
      this.vaccineEditInput.name = item.name
      this.vaccineEditInput.id = item.id
      this.vaccineEditInput.price = item.price
      this.vaccineEditInput.description = item.description
      this.vaccineEditInput.illness = item.illness
      this.vaccineEditInput.date[0] = item.productionDate
      this.vaccineEditInput.date[1] = item.expirationDate
      this.vaccineEditInput.productionDate = item.productionDate
      this.vaccineEditInput.expirationDate = item.expirationDate
    },
    vaccineEditConfirm () {
      this.$http.put('http://112.74.48.64:80/vaccine/edit', {id: this.vaccineEditInput.id, name: this.vaccineEditInput.name, description: this.vaccineEditInput.description, price: this.vaccineEditInput.price, productionDate: this.vaccineEditInput.date[0], expirationDate: this.vaccineEditInput.date[1]}).then(response => {
        if (response.body.status === 'success') {
          this.editVaccineVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getVaccineList()
        }
        // console.log(this.vaccineEditInput)
        // console.log(response)
      })
    }
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
.vaccine .el-range-editor.el-input__inner{
  width: 50%;
}
</style>
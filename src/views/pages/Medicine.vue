<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>药品管理</span>
      </div>
      <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
        <el-form-item label="">
          <el-input v-model="medicineSearchInput" placeholder="请输入药品ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="medicineSearch" >查询</el-button>
          <el-button  @click="getMedicineList" >清空</el-button>
        </el-form-item>
        <el-button plain style="float:right" @click="addMedicineVis=true">添加</el-button>
      </el-form>

      <el-dialog title="新增药品" :visible.sync="addMedicineVis">
        <el-form :model="medicineAddInput">
          <el-form-item label="药品名称">
            <el-input v-model="medicineAddInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="药品描述">
            <el-input v-model="medicineAddInput.description" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="可用范围">
            <el-input v-model="medicineAddInput.illness" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="有效期限">
            <el-date-picker
              v-model="medicineAddInput.date"
              type="daterange"
              range-separator="至"
              start-placeholder="生产日期"
              end-placeholder="有效日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="药品价格">
            <el-input-number v-model="medicineAddInput.price" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVaccineVis = false">取 消</el-button>
          <el-button type="primary" @click="medicineAdd">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="新增药品" :visible.sync="editMedicineVis">
        <el-form :model="medicineEditInput">
          <el-form-item label="药品名称">
            <el-input v-model="medicineEditInput.name" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="药品描述">
            <el-input v-model="medicineEditInput.description" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="可用范围">
            <el-input v-model="medicineEditInput.illness" auto-complete="off" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="有效期限">
            <el-date-picker
              v-model="medicineEditInput.date"
              type="daterange"
              range-separator="至"
              start-placeholder="生产日期"
              end-placeholder="有效日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="药品价格">
            <el-input-number v-model="medicineEditInput.price" label="描述文字"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editMedicineVis = false">取 消</el-button>
          <el-button type="primary" @click="medicineEditConfirm">确 定</el-button>
        </div>
      </el-dialog>

     <el-table
      :data="medicineList"
      stripe
      max-height="560"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="药品名称"
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
        label="使用范围">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="medicineDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button   @click="medicineEdit(scope.row)" size="mini" plain type="primary" >编辑</el-button>
        </template>
      </el-table-column>
     </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Medicine',
  data: () => {
    return {
      medicineList: [],
      medicineSearchInput: '',
      addMedicineVis: false,
      medicineAddInput: {
        name: '',
        description: '',
        price: 0,
        productionDate: '',
        date: [],
        expirationDate: ''
      },
      medicineEditInput: {
        name: '',
        description: '',
        price: 0,
        productionDate: '',
        date: [],
        expirationDate: ''
      },
      editMedicineVis: false
    }
  },
  mounted: function () {
    this.getMedicineList()
  },
  methods: {
    getMedicineList () {
      this.$http.get('http://112.74.48.64:80/medicine/list').then(response => {
        if (response.body.status === 'success') {
          this.medicineList = response.body.data
          // console.log(this.medicineList)
        }
      })
    },
    medicineSearch () {
      this.$http.get('http://112.74.48.64:80/medicine/' + this.medicineSearchInput).then(response => {
        if (response.body.status === 'success') {
          this.medicineList = []
          this.medicineList.push(response.body.data)
        }
      })
    },
    medicineDelete (item) {
      this.$confirm('此操作将永久删除该药品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/medicine/delete/' + item.id).then(response => {
          this.getMedicineList()
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
    medicineAdd () {
      this.medicineAddInput.productionDate = this.medicineAddInput.date[0]
      this.medicineAddInput.expirationDate = this.medicineAddInput.date[1]
      this.$http.post('http://112.74.48.64:80/medicine/add', {name: this.medicineAddInput.name, description: this.medicineAddInput.description, price: this.medicineAddInput.price, productionDate: this.medicineAddInput.productionDate, expirationDate: this.medicineAddInput.expirationDate}).then(response => {
        if (response.body.status === 'success') {
          this.addMedicineVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getMedicineList()
        }
      })
    },
    medicineEdit (item) {
      this.editMedicineVis = true
      this.medicineEditInput.name = item.name
      this.medicineEditInput.id = item.id
      this.medicineEditInput.price = item.price
      this.medicineEditInput.description = item.description
      this.medicineEditInput.illness = item.illness
      this.medicineEditInput.date[0] = item.productionDate
      this.medicineEditInput.date[1] = item.expirationDate
      this.medicineEditInput.productionDate = item.productionDate
      this.medicineEditInput.expirationDate = item.expirationDate
    },
    medicineEditConfirm () {
      this.$http.put('http://112.74.48.64:80/medicine/edit', {id: this.medicineEditInput.id, name: this.medicineEditInput.name, description: this.medicineEditInput.description, price: this.medicineEditInput.price, productionDate: this.medicineEditInput.date[0], expirationDate: this.medicineEditInput.date[1]}).then(response => {
        if (response.body.status === 'success') {
          this.editMedicineVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getMedicineList()
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
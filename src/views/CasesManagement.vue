<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>病例管理</span>
      </div>

    <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0">
      <el-form-item label="">
        <el-input v-model="caseSearchInput" placeholder="请输入病例ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="caseSearch" >查询</el-button>
        <el-button  @click="getCaseList" >清空</el-button>
      </el-form-item>
      <el-button plain style="float:right" @click="addCaseVis=true" class="addButton">添加</el-button>
    </el-form>
    

    <el-dialog title="新增" :visible.sync="addCaseVis">
      <!-- <fileupload target="http://112.74.48.64:80/multimedia/uploader" action="POST" v-on:progress="progress" v-on:start="startUpload" v-on:finish="finishUpload"></fileupload> -->
       <!-- <div id="uploader-demo">
        <div id="fileList" class="uploader-list"></div>
        <div id="upInfo" ></div>
        <div id="filePicker">select files</div>
        <input type="button" id="btn" value="upload">
      </div> -->
      <el-form :model="caseAddInput">
        <el-form-item label="病例描述">
          <el-input v-model="caseAddInput.name" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="病情详情">
          <el-input v-model="caseAddInput.diseaseDescription" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="治疗过程">
          <el-input v-model="caseAddInput.process" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="治疗方法">
          <el-input v-model="caseAddInput.treatment" auto-complete="off" style="width:50%"></el-input>
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
        <el-form-item label="使用药品">
            <el-select v-model="selectedMedicine" multiple placeholder="请选择">
            <el-option
              v-for="item in medicineList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用疫苗">
          <el-select v-model="selectedVaccine" multiple placeholder="请选择">
            <el-option
              v-for="item in vaccineList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCasetVis = false">取 消</el-button>
        <el-button type="primary" @click="caseAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="editCaseVis">
      <!-- <fileupload target="http://112.74.48.64:80/multimedia/uploader" action="POST" v-on:progress="progress" v-on:start="startUpload" v-on:finish="finishUpload"></fileupload> -->
       <!-- <div id="uploader-demo">
        <div id="fileList" class="uploader-list"></div>
        <div id="upInfo" ></div>
        <div id="filePicker">select files</div>
        <input type="button" id="btn" value="upload">
      </div> -->
      <el-form :model="caseEditInput">
        <el-form-item label="病例描述">
          <el-input v-model="caseEditInput.name" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="病情详情">
          <el-input v-model="caseEditInput.diseaseDescription" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="治疗过程">
          <el-input v-model="caseEditInput.process" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="治疗方法">
          <el-input v-model="caseEditInput.treatment" auto-complete="off" style="width:50%"></el-input>
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
        <el-form-item label="使用药品">
            <el-select v-model="selectedMedicine" multiple placeholder="请选择">
            <el-option
              v-for="item in medicineList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用疫苗">
          <el-select v-model="selectedVaccine" multiple placeholder="请选择">
            <el-option
              v-for="item in vaccineList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCasetVis = false">取 消</el-button>
        <el-button type="primary" @click="caseEditConfirm">确 定</el-button>
      </div>
    </el-dialog>

     <el-table
      :data="caseList"
      stripe
      max-height="560"
      style="width: 100%">
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
          <el-button @click="caseDelete(scope.row)"  size="mini" type="danger" plain>删除</el-button>
          <el-button @click="caseEdit(scope.row)"  size="mini" plain type="primary" class="editButton">编辑</el-button>
          <el-button @click="caseTableClick(scope.row)"  size="mini" plain  class="editButton">详情</el-button>
        </template>
      </el-table-column>
     </el-table>
  
    <el-dialog
      id='detail'
      title="病例详情"
      :visible.sync="caseDetailVis"
      width="50%"
      center
      style="height: 500px">
      <div v-for="(value, key, index) in selectedRowMapping">
        <div class="caseDetailEach" style="width: 33%">
          <span class="caseDetailTitle">{{key}}</span>
          <span class="caseDetailContent">{{selectedRow[value]}}</span>
        </div>
      </div>
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
      caseDetailVis: false,
      selectedRow: {},
      selectedRowMapping: {
        '病例编号': 'id',
        '病情描述': 'name',
        '病情详情': 'diseaseDescription',
        '所属类别': 'category',
        '治疗过程': 'process',
        '诊断结果': 'result',
        '治疗方法': 'treatment'
        // '疫苗情况': 'vaccines'
      },
      caseSearchInput: '',
      addCaseVis: false,
      editCaseVis: false,
      caseAddInput: {
        name: '',
        diseaseDescription: '',
        process: '',
        category: 1,
        treatment: '',
        medicines: 1,
        vaccines: 1
      },
      caseEditInput: {
        name: '',
        diseaseDescription: '',
        process: '',
        category: 1,
        treatment: '',
        medicines: 1,
        vaccines: 1
      },
      medicineList: [],
      selectedMedicine: [],
      vaccineList: [],
      selectedVaccine: [],
      categoryList: [],
      selectedCategory: []
    }
  },
  mounted: function () {
    this.getCaseList()
    this.getMedicineList()
    this.getVaccineList()
    this.getCategoryList()
  },
  methods: {
    getCaseList () {
      this.$http.get('http://112.74.48.64:80/illness/list').then(response => {
        if (response.body.status === 'success') {
          this.caseList = response.body.data
        }
      })
    },
    getMedicineList () {
      this.$http.get('http://112.74.48.64:80/medicine/list').then(response => {
        if (response.body.status === 'success') {
          this.medicineList = response.body.data
          // console.log(this.medicineList)
        }
      })
    },
    getVaccineList () {
      this.$http.get('http://112.74.48.64:80/vaccine/list').then(response => {
        if (response.body.status === 'success') {
          this.vaccineList = response.body.data
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
    caseTableClick (val) {
      console.log(val)
      this.selectedRow = val
      this.caseDetailVis = true
    },
    caseAdd () {
      let finalSelectedMedicine = []
      let finalSelectedVaccine = []
      for (let i = 0; i < this.selectedMedicine.length; i++) {
        finalSelectedMedicine.push({'id': this.selectedMedicine[i]})
      }
      for (let i = 0; i < this.selectedVaccine.length; i++) {
        finalSelectedVaccine.push({'id': this.selectedVaccine[i]})
      }
      // console.log(finalSelectedMedicine)
      // console.log(finalSelectedVaccine)
      // console.log(finalSelectedCategory)
      this.$http.post('http://112.74.48.64:80/illness/add', {name: this.caseAddInput.name, diseaseDescription: this.caseAddInput.diseaseDescription, process: this.caseAddInput.process, treatment: this.caseAddInput.treatment, category: {id: this.selectedCategory}, medicines: finalSelectedMedicine, vaccines: finalSelectedVaccine}).then(response => {
        console.log(response)
        if (response.body.status === 'success') {
          this.addCaseVis = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getCaseList()
        }
      })
    },
    caseSearch () {
      this.$http.get('http://112.74.48.64:80/illness/' + this.caseSearchInput).then(response => {
        if (response.body.status === 'success') {
          this.caseList = []
          this.caseList.push(response.body.data)
        }
      })
    },
    caseDelete (item) {
      this.$confirm('此操作将永久删除该病例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://112.74.48.64:80/illness/delete/' + item.id).then(response => {
          this.getCaseList()
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
    caseEdit (item) {
      // console.log(item)
      this.editCaseVis = true
      this.caseEditInput.name = item.name
      this.caseEditInput.diseaseDescription = item.diseaseDescription
      this.caseEditInput.id = item.id
      this.caseEditInput.process = item.process
      this.caseEditInput.treatment = item.treatment
      // this.selectedCategory = item.category
      // this.selectedMedicine = item.medicine
      console.log('teset', this.caseEditInput.id)
    },
    caseEditConfirm () {
      let finalSelectedMedicine = []
      let finalSelectedVaccine = []
      for (let i = 0; i < this.selectedMedicine.length; i++) {
        finalSelectedMedicine.push({'id': this.selectedMedicine[i]})
      }
      for (let i = 0; i < this.selectedVaccine.length; i++) {
        finalSelectedVaccine.push({'id': this.selectedVaccine[i]})
      }
      this.$http.put('http://112.74.48.64:80/illness/edit', {id: this.caseEditInput.id, name: this.caseEditInput.name, diseaseDescription: this.caseEditInput.diseaseDescription, process: this.caseEditInput.process, treatment: this.caseEditInput.treatment, category: {id: this.selectedCategory}, medicines: finalSelectedMedicine, vaccines: finalSelectedVaccine}).then(response => {
        console.log(response)
        if (response.body.status === 'success') {
          this.editCaseVis = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getCaseList()
        }
      })
    },
    startUpload (e) {
      // file upload start event
      console.log(e)
    },
    finishUpload (e) {
      // file upload finish event
      console.log(e)
    },
    progress (e) {
      // file upload progress
      // returns false if progress is not computable
      console.log(e)
    }
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
</style>
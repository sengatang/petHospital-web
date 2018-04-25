<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>病例学习</span>
      </div>
      
      <el-table
      :data="caseList"
      stripe
      max-height="560"
      style="width: 100%">
      <!-- :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" -->
      <el-table-column
      prop="category.name"
      label="病种"
      width="100"
      :filters=getFiters()
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type=getType(scope.row.category.name)
          close-transition>{{scope.row.category.name}}</el-tag>
      </template>
    </el-table-column>
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
          <el-button @click="caseTableClick(scope.row)"  size="mini" plain  class="editButton">详情</el-button>
        </template>
      </el-table-column>
     </el-table>

     <el-dialog
      id='detail'
      title="病例详情"
      :visible.sync="caseDetailVis"
      width="50%"
      center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div v-for="(value, key, index) in selectedRowMapping">
            <div class="caseDetailEach" style="width: 33%">
              <span class="caseDetailTitle">{{key}}</span>
              <span class="caseDetailContent">{{selectedRow[value]}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图片展示" name="second">
         
          <div class="block">
            <el-carousel trigger="click" height="300px" type="card">
              <el-carousel-item v-for="item in selectedRow.multimedias" :key="item.id">
                  <img :src="'http://112.74.48.64'+item.url" v-show="showImage(item)"><img>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频展示" name="third">
          <div  v-for="item in selectedRow.multimedias" :key="item.id" v-show="!showImage(item)">
            <div> 
              <h3>{{item.name}}</h3>
              <video :src="'http://112.74.48.64'+item.url"  controls="controls"></video>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'cases',
  mounted: function () {
    this.getCaseList()
    this.getCategoryList()
  },
  data () {
    return {
      activeName: 'first',
      active: 0,
      typeList: [],
      selectType: [],
      filters: [],
      categoryList: [],
      caseList: [],
      caseDetailVis: false,
      selectedRow: {},
      selectedRowMapping: {
        '病例编号': 'id',
        '病情描述': 'name',
        '病情详情': 'diseaseDescription',
        '所属类别': 'category.name',
        '治疗过程': 'process',
        '诊断结果': 'result',
        '治疗方法': 'treatment'
        // '疫苗情况': 'vaccines'
      }
    }
  },
  methods: {
    showImage (item) {
      if (item.type === 0) {
        return true
      } else {
        // console.log('src', this.playerOptions.sources.src)
        // this.playerOptions.sources.src = 'http://112.74.48.64' + item.url
        return false
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getCategoryList () { // 先再mounted的时候调用用这个来获取列表
      this.$http.get('http://112.74.48.64:80/category/list').then(response => {
        if (response.body.status === 'success') {
          var templist = []
          for (var i = 0; i < response.body.data.length; i++) {
            console.log(response.body.data[i].name)
            templist.push(response.body.data[i].name)
          }
          this.typeList = response.body.data
          this.categoryList = templist
        }
      })
    },
    fnSelectType (val) { // 选择学生 记录为aSelectStudent
      this.selectType = []
      this.selectType.push(val)
      console.log(val)
    },
    getFilters () {
      return this.filters
    },
    getCaseList () {
      this.$http.get('http://112.74.48.64:80/illness/list').then(response => {
        if (response.body.status === 'success') {
          this.caseList = response.body.data
          console.log(this.caseList)
        }
      })
    },
    caseTableClick (val) {
      this.selectedRow = val
      this.caseDetailVis = true
    },
    getFiters () {
      var filters = []
      for (var i = 0; i < this.categoryList.length; i++) {
        filters.push(
          {
            'text': this.categoryList[i],
            'value': this.categoryList[i]
          }
        )
      }
      console.log(filters)
      return filters
    },
    getType (name) {
      var TYPE = ['primary', 'success', 'info', 'warning', 'danger']
      for (var i = 0; i < this.categoryList.length; i++) {
        if (name === this.categoryList[i]) {
          return TYPE[i % 5]
        }
      }
    },
    filterTag (value, row) {
      return row.category.name === value
    }
  }
}
</script>

<style>
.el-card{
  height: 860px;
}
</style>

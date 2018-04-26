<template>
  <div class='3d'>
    <el-card>
      <div slot="header" class="clearfix">
      <span>全景导览</span>
      </div>
     <p>点击科室    查看导览</p>
     <!-- <el-button @click="dialogVisible2 = true">前台</el-button>
     <el-button @click="dialogVisible = true">影像学检查室</el-button>
     <el-button @click="dialogVisible1 = true">住院部</el-button>
     <el-button @click="dialogVisible3 = true">病理解剖室</el-button>
     <el-button @click="dialogVisible4 = true">手术室</el-button>
     <el-button @click="dialogVisible5 = true">手术准备室</el-button>
     <el-button @click="dialogVisible6 = true">档案室</el-button>
     <el-button @click="dialogVisible7 = true">化验室</el-button>    
     <el-button @click="dialogVisible8 = true">免疫室</el-button> -->
    <div>
       <img src='../../static/img/3d.png' useMap='#Map'/>
       <map name="Map" id="Map">
        <area shape="rect" coords="500,37,590,88" @click="dialogVisible2=true" />
                <!-- <area shape="rect" coords="500,37,590,88" @click="dialogVisible2=true" /> -->
        <area shape="rect" coords="750,500,800,550" @click="dialogVisible5 = true"> 
        <area shape="rect" coords="720,400,750,450" @click="dialogVisible = true"> 
        <area shape="rect" coords="870,630,950,680" @click="dialogVisible7 = true">  
        <area shape="rect" coords="680,150,740,200" @click="dialogVisible6 = true">   
        <area shape="rect" coords="990,550,950,650" @click="dialogVisible1 = true">
        <area shape="rect" coords="800,700,850,750" @click="dialogVisible8 = true">
        <area shape="rect" coords="650,500,950,650" @click="dialogVisible4 = true">
        <area shape="rect" coords="600,500,950,550" @click="dialogVisible3 = true">
       </map>
     </div>
     
     <el-dialog
        title="影像学检查室"
        :visible.sync="dialogVisible"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642187/7bafd4e5322607ea.jpg"></iframe>
      </el-dialog>

       <el-dialog
        title="住院部"
        :visible.sync="dialogVisible1"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642194/8e29fa099f3cc2de.jpg"></iframe>
      </el-dialog>

        <el-dialog
        title="免疫室"
        :visible.sync="dialogVisible8"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i2.bvimg.com/642194/d5c07b8d933447fd.png"></iframe>
      </el-dialog>

      <el-dialog
        title="前台"
        :visible.sync="dialogVisible2"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642194/997125b88dae1057.jpg"></iframe>
      </el-dialog>

      <el-dialog
        title="病理解剖室"
        :visible.sync="dialogVisible3"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i2.bvimg.com/642194/9aada2074f49e385.png"></iframe>
      </el-dialog>

      <el-dialog
        title="手术室"
        :visible.sync="dialogVisible4"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642194/462badbd920e3e76.jpg"></iframe>
      </el-dialog>

      <el-dialog
        title="手术准备室"
        :visible.sync="dialogVisible5"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642194/34933d891e34c7d9.jpg"></iframe>
      </el-dialog>

      <el-dialog
        title="档案室"
        :visible.sync="dialogVisible6"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642194/eee0fffbe925bac9.jpg"></iframe>
      </el-dialog>

      <el-dialog
        title="化验室"
        :visible.sync="dialogVisible7"
        >
        <iframe width="700" height="420" allowfullscreen style="border-style:none;" src="http://cdn.pannellum.org/2.4/pannellum.htm#panorama=http%3A//i1.bvimg.com/642194/311b9d5402f3d955.jpg"></iframe>
      </el-dialog>

      

     
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'threeD',
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      dialogVisible6: false,
      dialogVisible7: false,
      dialogVisible8: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style>
.el-card {
  height:1000px;
  overflow: scroll;
}
</style>
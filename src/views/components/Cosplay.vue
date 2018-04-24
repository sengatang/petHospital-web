<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
      <span>职能学习</span>
      </div>

     <template>
       <el-tabs v-model="activeName" type="border-card" @tab-click="handClick">
         <el-tab-pane label="前台" name="first"></el-tab-pane>
         <el-tab-pane label="医助" name="second">
    
             <el-tabs v-model="activeName2" @tab-click="handClick">
               <el-tab-pane label="注射" >
                 <template>
                   <el-table :data="Data1" style="width:50%">
                     <el-table-column label="注射分类" prop="name" style="width:30%"></el-table-column>
                     <el-table-column label="操作流程" >
                       <template slot-scope="scope">
                         <el-button type="primary" @click="data1Check=true">查看教学视频</el-button>
                       </template>
                     </el-table-column>
                   </el-table>
                 </template>
               </el-tab-pane>
               <el-tab-pane label="常见问题" >
                 <div>
                   <my-video :sources="video2.sources" :options="video2.options"></my-video>
                 </div>
               </el-tab-pane>
               <el-tab-pane label="器材使用" >
                 <template>
                   <el-table :data="Data2" style="width:50%">
                     <el-table-column label="器材分类" prop="name" style="width:30%"></el-table-column>
                     <el-table-column label="使用方法" >
                       <template slot-scope="scope">
                         <el-button type="primary" @click="data3Check=true">查看教学视频</el-button>
                       </template>
                     </el-table-column>
                   </el-table>
                 </template>
               </el-tab-pane>
               <el-tab-pane label="消毒流程" >
                 <div>
                   <my-video :sources="video4.sources" :options="video4.options"></my-video>
                 </div>
               </el-tab-pane>
               <el-tab-pane label="术前准备" >
                 <template>
                   <el-table :data="tableData" style="width:50%">
                     <el-table-column type="expand">
                       <template slot-scope="props">
                         <span>{{props.row.sname}}</span>
                       </template>
                     </el-table-column>
                     <el-table-column label="操作名称" prop="name"></el-table-column>
                     <el-table-column label="操作方法" >
                       <template slot-scope="scope">
                         <el-button type="primary" @click="data5Check=true">查看教学视频</el-button>
                       </template>
                     </el-table-column>
                   </el-table>
                 </template>
               </el-tab-pane>
             </el-tabs> 
         </el-tab-pane>
         <el-tab-pane label="兽医" name="third">
           <el-tabs v-model="activeName3" @tab-click="handClick">
               <el-tab-pane label="手术无菌要求" >
                 <div>
                   <my-video :sources="video6.sources" :options="video6.options"></my-video>
                 </div>
               </el-tab-pane>
               <el-tab-pane label="手术操作规范" >
                 <div>
                   <my-video :sources="video7.sources" :options="video7.options"></my-video>
                 </div>
               </el-tab-pane>             
           </el-tabs>
         </el-tab-pane>
       </el-tabs>
     </template>

     <el-dialog title="操作流程教学视频" :visible.sync="data1Check">
       <div>
         <!-- <video src="https://v.qq.com/x/page/x0528hxwzdm.html" controls="controls"></video> -->
         <my-video :sources="video1.sources" :options="video1.options"></my-video>
       </div>
     </el-dialog>
     <el-dialog title="器材使用方法教学视频" :visible.sync="data3Check">
       <div>
         <my-video :sources="video3.sources" :options="video3.options"></my-video>         
       </div>
     </el-dialog>
     <el-dialog title="术前准备操作流程教学视频" :visible.sync="data5Check">
       <div>
         <my-video :sources="video5.sources" :options="video5.options"></my-video>         
       </div>
     </el-dialog>
     

    </el-card>
  </div>
</template>

<script>
import myVideo from 'vue-video'
export default {
  name: 'cosplay',
  data: () => {
    return {
      activeName: 'second',
      activeName2: '',
      activeName3: '',
      tabPosition: 'left',
      data1Check: false,
      data3Check: false,
      data5Check: false,
      Data1: [
        {
          name: '静脉注射'
        },
        {
          name: '皮下注射'
        },
        {
          name: '肌肉注射'
        },
        {
          name: '局部封闭注射'
        }
      ],
      Data2: [
        {
          name: '输液泵'
        },
        {
          name: '加热垫'
        }
      ],
      tableData: [
        {
          name: '术前麻醉',
          sname: '麻醉给药、吸入麻醉、注射麻醉'
        },
        {
          name: '动物术前消毒',
          sname: '保定、剃毛、消毒'
        },
        {
          name: '手术器械',
          sname: '器械介绍、器械包准备、灭菌流程'
        },
        {
          name: '人员术前消毒',
          sname: '手术人员消毒、穿戴手术衣流程'
        }
      ],
      video1: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/1-1.jpeg'
        }
      },
      video2: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/2.jpeg'
        }
      },
      video3: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/3-1.jpeg'
        }
      },
      video4: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/4.jpeg'
        }
      },
      video5: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/5-1.jpeg'
        }
      },
      video6: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/6.jpeg'
        }
      },
      video7: {
        sources: [{
          src: '../static/video/1.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: '../static/img/7.jpeg'
        }
      }
    }
  },
  methods: {
    handClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    myVideo
  }
}
</script>
<style>
.el-card{
  height: 860px;
}
</style>
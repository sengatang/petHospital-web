<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class='quiz'>
    <el-card>
      <div slot="header" class="clearfix">
        <span>考试</span>
      </div>
<span style="border-left:3px solid #409EFF;padding-left:5px;">您的考试考试时间为:<em>02:00:00</em></span>
      <el-form :inline="true"  class="demo-form-inline" style="padding:0 10% 0 0;margin-top: 30px;">
        <!-- <el-form-item label="考试时间">
          <el-input v-model="quizTimeInput" placeholder="请输入考试时间：eg.02:00:00"></el-input>
        </el-form-item> -->
        
        <el-form-item label="考试病种">
        <el-select v-model="quizTypeInput" placeholder="请选择考试病种">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="quizSearch" >确定</el-button>
        </el-form-item>
      </el-form>

      <el-form :inline="true" class="demo-form-inline" style="padding:0 10% 0 0">
        <el-form-item v-for="(item,index) in quizList"
                      style="width: 100%; padding: 0 auto"
                      :key="item.id">
          <p>{{index+1+"."+"  "}}{{ item.askDescription}}</p>
          <input type="radio" :name="item.id" :data-ask="item.askDescription" :data-answer="item.answer" :value="item.adescription" id="item1" @change="changeResult(item.askDescription,item.adescription,item.answer)" style="width: 15px; height: 15px;"><label for="item1" style="padding-right:20px">{{ item.adescription}}</label>
          <input type="radio" :name="item.id" :data-ask="item.askDescription" :data-answer="item.answer" :value="item.bdescription" id="item2" @change="changeResult(item.askDescription,item.bdescription,item.answer)" style="width: 15px; height: 15px;"><label for="item2" style="padding-right:20px">{{ item.bdescription}}</label>
          <input type="radio" :name="item.id" :data-ask="item.askDescription" :data-answer="item.answer" :value="item.cdescription" id="item3" @change="changeResult(item.askDescription,item.cdescription,item.answer)" style="width: 15px; height: 15px;"><label for="item3" style="padding-right:20px"> {{ item.cdescription}}</label>
          <input type="radio" :name="item.id" :data-ask="item.askDescription" :data-answer="item.answer" :value="item.ddescription" id="item4" @change="changeResult(item.askDescription,item.ddescription,item.answer)" style="width: 15px; height: 15px;"><label for="item4" style="padding-right:20px">{{ item.ddescription}}</label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="quizCheck=true">提交</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="成绩" :visible.sync="quizCheck">
        <span>考试成绩为：{{resultscore}}</span>
        <el-table
          :data="result"
          stripe
          max-height="560"
          style="width: 100%">
          <template>
            <span>考试成绩为：{{resultscore}}</span>
          </template>
          <span>考试成绩为：{{resultscore}}</span>
          <el-table-column
            prop="rask"
            label="错误题目"
            width="400">
          </el-table-column>
          <el-table-column
            prop="ranswer"
            label="正确答案"
            width="200">
          </el-table-column>
        </el-table>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'quiz',
    data: () => {
      return {
        quizList: [],
        quizTimeInput: '',
        quizTypeInput: '',
        item: '',
        radio1: '',
        resultscore: 0,
        result: [{rask: '', ranswer: ''}],
        quizCheck: false,
        options: []
      }
    },
    mounted: function () {
      this.getTypeList()
    },
    methods: {
      quizCheck: function () {
        console.log(this.resultscore)
      },
      changeResult: function (ask, description, answer) {
        var task = ask
        var tdescription = description
        var tanswer = answer
        var ttanswer = tdescription.substr(0, 1)
        var temp
        if (tanswer === ttanswer) {
          this.resultscore = this.resultscore + 10
        }
        if (tanswer !== ttanswer) {
          temp = {rask: task, ranswer: tanswer}
          console.log(temp)
          this.result.push(temp)
        }
        console.log(this.resultscore)
      },
      getTypeList () {
        this.$http.get('http://112.74.48.64:80/category/list').then(response => {
          if (response.body.status === 'success') {
            this.options = response.body.data
            console.log(response)
            console.log(this.options)
          }
        })
      },
      quizSearch () {
        this.$http.post('http://112.74.48.64:80/exam/add', {time: this.quizTimeInput, category: {id: this.quizTypeInput}}).then(response => {
          if (response.body.status === 'success') {
            this.quizList = response.body.data.questions
            console.log(response)
            console.log(this.quizList)
          }
        })
      }
    }
  }
</script>
<style>
.quiz .el-card{
    height: 5000px;
  }
</style>

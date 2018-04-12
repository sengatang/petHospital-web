import Vue from 'vue'
import UserManagement from '@/views/UserManagement'
import { mount } from 'vue-test-utils';

describe('UserManagement.vue', () => {

    it('点击添加科室按钮触发事件', () => {
      //获取组件实例
      const Constructor = Vue.extend(UserManagement);
      //挂载组件
      const vm = new Constructor().$mount();
      //获取button
      const button = vm.$el.querySelector('.addButton');
      //新建点击事件
      const clickEvent = new window.Event('click');  
      //触发点击事件
      button.dispatchEvent(clickEvent);
      //监听点击事件
      vm._watcher.run();
      // 弹出框
      expect(vm.addUserVis).to.equal(true);
    //   expect(vm.$el.querySelector('el-dialog[title]')).to.equal('新建科室');
    })

    it('点击编辑按钮', () => {
        const Constructor = Vue.extend(UserManagement)
        const vm = new Constructor().$mount()
        window.setTimeout(() => {
          const button = vm.$el.querySelector('.editButton')
          const clickEvent = new window.Event('click')
          button.dispatchEvent(clickEvent)
          vm._watcher.run()
          window.setTimeout(() => {
            expect(vm.editUserVis).to.equal(true)
          }, 1000)
        }, 1000)
    })
  })
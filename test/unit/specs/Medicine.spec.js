import Vue from 'vue'
import Medicine from '@/views/pages/Medicine'

describe('Medicine.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Medicine)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.clearfix span').textContent)
      .to.equal('药品管理')
  })
})

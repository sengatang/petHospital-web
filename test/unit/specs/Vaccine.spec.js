import Vue from 'vue'
import Vaccine from '@/views/pages/Vaccine'

describe('Vaccine.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Vaccine)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.clearfix span').textContent)
      .to.equal('疫苗管理')
  })
})

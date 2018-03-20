// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.prototype.GLOBAL = {API_URL_PREFIX: 'http://112.74.48.64:80'}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: {
    App
  }
})

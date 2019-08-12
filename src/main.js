// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 用来引进ES6新特性，如promise等等
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import vueAxios from 'vue-axios'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'

Vue.use(vueAxios, axios)
Vue.use(MintUI)
Vue.filter('numFormat', function (number) {
  if (number <= 10000) {
    return number
  } else {
    return (number / 10000).toFixed(1) + '万'
  }
})
Vue.config.productionTip = false
// 解决苹果点击300秒的延迟
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

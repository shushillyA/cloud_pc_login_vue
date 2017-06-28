// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// console.log(router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,     // 指向router/index.js
  template: '<App/>',    // id为app的div需要有个东西替代他 这个东西就是主组件App
  components: { App }    // 引入主组件App,但是没有使用
})

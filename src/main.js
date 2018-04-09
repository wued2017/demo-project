import Vue from 'vue'
import App from './App'
import router from './router'

// 按需引入组件
import { Button, Select, Message } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.prototype.$message = Message

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

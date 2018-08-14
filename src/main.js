import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import './styles/index.scss'
import VueRouter from "vue-router"
import Login from "@/views/Login.vue"

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

var router=new VueRouter({
  routes:[
    {path:'/login',component: Login}
  ]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import './styles/index.scss'
import VueRouter from "vue-router"
import Login from "@/views/Login.vue"
import Home from "@/views/home"

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

var router=new VueRouter({
  routes:[
    {path:'/login',component: Login},
    {path:'/',component:Home}
  ]
})
router.beforeEach((to, from, next) => {
  let token=localStorage.getItem('myToken')
  if(token){
    next()
  }else{
    if(to.path !=='/login'){
      next({path:'login'})
    }else{
      next()
    }

  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

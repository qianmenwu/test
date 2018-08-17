import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/icon.scss'

import App from './App.vue'
import './styles/index.scss'
import router from './router'
import store from './store.js'

Vue.config.productionTip = false


Vue.use(ElementUI)
  //全局守卫
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
  store,
  render: h => h(App)
}).$mount('#app')

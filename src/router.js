import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "@/views/Login.vue"
import Home from "@/views/home"
import welcome from "./views/main/welcome.vue"

Vue.use(VueRouter)

var router=new VueRouter({
    routes:[
      {path:'/login',component: Login},
      {path:'/',component:Home,
      redirect:{path:'welcome'},
      children:[
          {path:'welcome',component:welcome}
      ]
    }
    ]
  })
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
  export default router
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
      redirect:{path:'welcome'},//重定向
      children:[
          {path:'welcome',component:welcome}
      ]
    }
    ]
  })

  export default router
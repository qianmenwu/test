import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "@/views/Login.vue"
import Home from "@/views/home"
import welcome from "./views/main/welcome.vue"
import user from "./views/user/user.vue"
import Role from "./views/rights/roles.vue"
import Right from "./views/rights/rights.vue"


Vue.use(VueRouter)

var router=new VueRouter({
    routes:[
      {path:'/login',component: Login},
      {path:'/',component:Home,
      redirect:{path:'welcome'},//重定向
      children:[
          {path:'welcome',component:welcome},
          {path:'user',component:user},
          {path:'roles',component:Role},
          {path:'rights',component:Right},
      ]
    }
    ]
  })

  export default router
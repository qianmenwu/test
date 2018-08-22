<template>
    <div class="home">
        <el-container>
            <el-aside width="auto'">
              <div class="logo" ></div>
                 <el-menu
                    class="el-menu-admin"
                    :router='true'
                    :unique-opened='true'
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                     :collapse="isCollapse">
                    <el-submenu :index="item.path" v-for="item in menusList" :key='item.id'>
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                        </template>
                          <el-menu-item :index="tag.path" v-for="tag in item.children" :key='tag.id' >
                          <i class="el-icon-menu"></i>{{tag.authName}}
                      </el-menu-item>                                    
                    </el-submenu>
                     <!-- <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                          <span>权限管理</span>
                        </template>
                          <el-menu-item index="/rights">
                           <i class="el-icon-menu"></i>权限列表
                         </el-menu-item>   
                          <el-menu-item index="/roles">
                           <i class="el-icon-menu"></i>角色列表
                         </el-menu-item>                                  
                    </el-submenu>      -->
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                  <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
                  <div class='system-title'>电商管理系统</div>
                  <div>
                    <span class="welcome">你好,{{$store.state.username}}</span>
                   <el-button type="text" @click='exit'>退出</el-button>
                  </div>
                  
                </el-header>
                <el-main >
                  <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {getMenus} from '../api/index.js'
export default {
    data() {
      return {
        isCollapse:false,
        menusList:[]
      };
    },
    mounted () {
      getMenus().then(res=>{
        console.log(res)
        this.menusList=res.data
      })
    },
  methods: {
    handleOpen() {
      // console.log(key, keyPath);
    },
    handleClose() {
      // console.log(key, keyPath);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    exit(){
      localStorage.removeItem('myToken');
      this.$router.push('./login')
    }
  }
};
</script>
<style lang="scss" scoped>
.home { 
  height: 100%;
  background-color: #e5e5e5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #009688;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>


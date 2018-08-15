<template>
    <div class="home">
        <el-container>
            <el-aside width="200px">
              <div class="logo"></div>
                 <el-menu
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                          <span>导航一</span>
                        </template>
                          <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i>选项2
                         </el-menu-item>                                    
                    </el-submenu>
                     <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                          <span>导航二</span>
                        </template>
                          <el-menu-item index="2-2">
                           <i class="el-icon-menu"></i>选项2
                         </el-menu-item>                                    
                    </el-submenu>                   
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                  
                </el-header>
                <el-main >欢迎回来</el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
 methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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


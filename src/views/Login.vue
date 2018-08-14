<template>
    <div class="login">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="form">
           <el-form-item >
                <img src="../assets/avatar.jpg" class="login-img">
            </el-form-item>
           <el-form-item>
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="el-icon-loading"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-button type="primary" class="btn">登录</el-button>
       </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules:{}
    };
  }
};
</script>


<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2f4050;
  position: fixed;
  .form {
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: #fff;
    .login-img {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>

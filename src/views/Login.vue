<template>
    <div class="login">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="form">
           <el-form-item >
                <img src="../assets/avatar.jpg" class="login-img">
            </el-form-item >
           <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="el-icon-loading"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-button type="primary" class="btn" @click="submitForm('ruleForm')">登录</el-button>
       </el-form>
    </div>
</template>

<script>
import { LoginPost } from "../api/index.js";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // console.log(valid)
          LoginPost(this.ruleForm).then(res => {
            if (res.meta.status === 200) {
              // console.log(res.meta.msg);
              this.$router.push("/");
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });
            }else{
              this.$message({
                message: "登录失败",
                type: "warning"
              });
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
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

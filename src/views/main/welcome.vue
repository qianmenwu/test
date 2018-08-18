<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="el-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索级添加用户部分 -->
        <div class="user">
            <div style="margin-top: 15px; margin-bottom: 15px">
                <el-input placeholder="请输入内容" v-model="searchList" class="search-input" @keyup.native="searchBtn">
                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
               </el-input>
              <el-button type="success" @click="addDialogFormVisible =true">添加用户</el-button>
            </div>
            <!-- 添加用户弹框 -->
            <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
                <el-form :model="addForm" :rules="rules" ref="addUserName">
                    <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitUser('addUserName')">确 定</el-button>
                </div>
            </el-dialog>
        <!-- 用户列表部分 -->
            <el-table
                :data="userList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="50">
                    </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                   >
                </el-table-column>
                    <el-table-column
                    prop="mobile"
                    label="电话"
                   >
                </el-table-column>
                    <el-table-column
                    prop="email"
                    label="邮件"
                    >
                </el-table-column>
                <el-table-column label="用户状态">
                    <template slot-scope="scope">
                         <el-switch v-model="scope.row.mg_state" @change="changeUserStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="editUserHandle(scope.row)"
                        icon="el-icon-edit">
                    </el-button>
                  <el-button
                        type="danger"
                        size="mini"
                        @click="handleDel(scope.$index, scope.row)"
                        icon="el-icon-delete">
                    </el-button><el-button
                        type="warning"
                        size="mini"
                        @click="handlePower(scope.$index, scope.row)"
                        icon="el-icon-check">
                    </el-button>
                    </template>
                </el-table-column>
            </el-table>

             <!-- 编辑弹出框 -->
            <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
                <el-form :model="editForm" :rules="rules" ref="editUserName">
                    <el-form-item label="用户名" prop="username" :label-width="formLabelWidth" :disabled="true">
                    <el-input v-model="editForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitEditUser('editUserName')">确 定</el-button>
                </div>
            </el-dialog>
        <!--分页部分--> 
            <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
  userList,
  addUser,
  changeStatus,
  getUserById,
  editUser
} from "../../api/index.js";
export default {
  data() {
    return {
      searchList: "",
      userList: [],
      currentPage: 3,
      userstatus: true,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id: 0
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            rigger: "blur,change"
          }
        ],
        mobile: [{ required: true, message: "电话不能为空" }]
      },
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },

  mounted() {
    this.getDataList();
  },
  methods: {
    handleSizeChange() {
      //   console.log(`每页 ${val} 条`);
    },
    handleCurrentChange() {
      //   console.log(`当前页: ${val}`);
    },
    getDataList() {
      userList({ params: { query: "", pagenum: 1, pagesize: 5 } }).then(
        res =>
          // console.log(res),
          (this.userList = res.data.users)
      );
    },
    searchBtn() {
      userList({
        params: { query: this.searchList, pagenum: 1, pagesize: 5 }
      }).then(res => {
        // console.log(this.searchList)
        if (!this.searchList) {
          this.getDataList();
          return;
        }
        this.userList = res.data.users;
      });
    },
    submitUser(formName) {
      //   console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUser(this.addForm).then(res => {
            //   console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.addDialogFormVisible = false;
              this.getDataList();
            } else {
              this.$message({
                type: "error",
                message: "添加失败"
              });
            }
          });
        }
      });
    },
    changeUserStatus(row) {
      // console.log(row)
      changeStatus({ uid: row.id, type: row.mg_state }).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: "success",
            message: "用户状态修改成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "用户状态修改失败"
          });
        }
      });
    },
    editUserHandle(row) {
      console.log(row.id);
      this.editDialogFormVisible = true;
      getUserById(row.id).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.editForm.username = row.username;
          this.editForm.email = row.email;
          this.editForm.mobile = row.mobile;
          this.editForm.id = row.id;
        }
        // console.log(this.editForm)
      });
    },
    submitEditUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.editForm);
          editUser(this.editForm).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "用户编辑成功"
              });
              this.getDataList()
              this.editDialogFormVisible = false;
            } else {
              this.$message({
                type: "error",
                message: "用户编辑失败"
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #d3dce6;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
.user {
  .search-input {
    width: 300px;
  }
  .page {
    margin-top: 15px;
    padding: 5px 0;
    background-color: #d3dce6;
  }
}
</style>

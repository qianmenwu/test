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
                <el-form :model="addForm" :rules="rules">
                    <el-form-item label="活动名称" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
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
                    <el-button type="primary" @click="addUser">确 定</el-button>
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
                    prop="emile"
                    label="邮件"
                    >
                </el-table-column>
                <el-table-column label="用户状态">
                    <template slot-scope="scope">
                         <el-switch v-model="userstatus"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        icon="el-icon-edit">
                    </el-button>
                  <el-button
                        type="danger"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        icon="el-icon-delete">
                    </el-button><el-button
                        type="warning"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        icon="el-icon-check">
                    </el-button>
                    </template>
                </el-table-column>

            </el-table>
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
import { userList } from "../../api/index.js";
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
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {type: "email",message: "请输入正确的邮箱地址",rigger: "blur,change" }
           ],
        mobile: [{ required: true, message: "电话不能为空" }]
      },
      addDialogFormVisible: false,
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
    addUser(){
        
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

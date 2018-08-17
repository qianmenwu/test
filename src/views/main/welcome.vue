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
                <el-input placeholder="请输入内容" v-model="searchList" class="search-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
               </el-input>
              <el-button type="success">添加用户</el-button>
            </div>
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
      userstatus: true
    };
  },
  mounted() {
    this.getDataList();
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    getDataList() {
      userList({ params: { query: "", pagenum: 1, pagesize: 2 } }).then(res =>
        // console.log(res),
        this.userList= res.data.users
      );
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

<template>
    <div>
          <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="el-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 角色列表部分 -->
        <el-table
            :data="rightsList"
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
                </el-table-column>
            <el-table-column
                prop="authName"
                label="权限名称"
            >
            </el-table-column>
                <el-table-column
                prop="path"
                label="路径"
            >
            </el-table-column>
                <el-table-column label="层级">
                    <template slot-scope="scope">
                        <span>{{scope.row.pid | filterPid}}</span>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {getRightsList} from "../../api/index.js"
export default {
    data(){
        return {
            rightsList:[]
        }
    },
    mounted(){
        this.renderRightList()
    },
    methods:{
        renderRightList(){
            getRightsList({type:'list'}).then(res=>{
                console.log(res)
                if(res.meta.status===200){
                    console.log(111)
                    this.rightsList=res.data
                }
            })
        }
    },
    filters:{
        filterPid(pid){
            if(pid===0){
                return '一级'
            }else if(pid===1){
                return '二级'
            }else{
                return '三级'
            }
        }
    }
}
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
</style>

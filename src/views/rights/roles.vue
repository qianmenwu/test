<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="el-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加角色 -->
         <el-button plain>添加角色</el-button>
        <el-table
            :data="roleList"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="scope">
                <!-- <el-form label-position="left" inline class="demo-table-expand"> -->
                    <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
                        <el-col :span="4">
                            <el-tag closable @close="delRights(scope.row,firstChildren.id)" >{{firstChildren.authName}}</el-tag>
                            <i class="el-icon-arrow-right" v-if="firstChildren.children.length!==0"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id" >
                            <el-col :span="4"  >
                                <el-tag closable type="success" @close="delRights(scope.row,secondChildren.id)" >{{secondChildren.authName}}</el-tag>
                                <i class="el-icon-arrow-right" v-if="firstChildren.children.length!==0"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-tag closable  @close="delRights(scope.row,thirdChildren.id)" type="warning" v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id">{{thirdChildren.authName}}</el-tag>
                            </el-col>
                            </el-row>
                        </el-col>
                        
                    </el-row>
                    
                <!-- </el-form> -->
            </template>
            </el-table-column>
            <el-table-column
                type="index"
                width="50">
                </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称"
                >
            </el-table-column>
                <el-table-column
                prop="roleDesc"
                label="描述"
                >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button
                    type="primary"
                    size="mini"
                    @click="editRoleHandle(scope.row)"
                    icon="el-icon-edit">
                </el-button>
                <el-button
                    type="danger"
                    size="mini"
                    @click="delRoleHandle(scope.row)"
                    icon="el-icon-delete">
                </el-button><el-button
                    type="warning"
                    size="mini"
                    @click="showRoleHandle(scope.row)"
                    icon="el-icon-check">
                </el-button>
                </template>
            </el-table-column>
        </el-table>
           <!-- 添加权限弹框 -->
            <el-dialog title="添加权限" :visible.sync="rightsDialogFormVisible">
                <div class="tree-container">
                 <el-tree
                    :data="roleData"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expand-all='true'
                    :default-checked-keys="selectedRight"
                    :props="defaultProps">
                    </el-tree>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="rightsDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitRightList()">确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
import {getRoleList, delRightRole, accredit, getRightsList} from "../../api/index.js"
export default {
    data(){
        return {
            roleList:[],
            rightsDialogFormVisible:false,
            roleData: [],
            defaultProps: {
                children: 'children',
                label: 'authName'
                },
            selectedRight:[],
            currentRole:[]
        }
    },
    mounted(){
        this.renderRoleList()
    },
    methods: {
        renderRoleList(){
           getRoleList().then(res=>{
            //    console.log(res)
            if(res.meta.status===200){
                this.roleList=res.data
            }
           }) 
        },
        delRights(row,rightId){
            console.log(row.id,rightId)
            delRightRole({roleId:row.id,rightId:rightId}).then(res=>{
                if(res.meta.status===200){
                    row.children=res.data //将请求回来的数据重新渲染到scope.row.children中实现局部刷新,避免页面刷新，提升用户体验
                }else{
                    this.$message({
                        type:'error',
                        message:res.meta.msg
                    })
                }
            })
        },
        showRoleHandle(row){
            this.rightsDialogFormVisible=true
            this.currentRole=row
            getRightsList({type:'tree'}).then(res=>{
                // console.log(res)
                if(res.meta.status===200){
                    this.roleData=res.data
                }else{
                    this.$message({
                        type:'error',
                        message:res.meta.msg
                    })
                }
            })
            this.selectedRight.length=0
            row.children.forEach(firstChildren=>{
                if(firstChildren.children && firstChildren.children.length !==0){
                    firstChildren.children.forEach(secondChildren=>{
                        if(secondChildren.children && secondChildren.children.length !==0){
                           secondChildren.children.forEach(thirdChildren=>{
                            this.selectedRight.push(thirdChildren.id)
                           })
                        }
                    })
                }
            })
        },
        submitRightList(){
            var rids=this.$refs.tree.getCheckedKeys().join(',')
            console.log(rids)
            accredit(this.currentRole.id,{rids:rids}).then(res=>{
            console.log(res)
                if(res.meta.status===200){
                    this.$message({
                        type:'success',
                        message:res.meta.msg,
                    })
                  this.rightsDialogFormVisible=false
                  this.renderRoleList()
                }else{
                     this.$message({
                        type:'error',
                        message:res.meta.msg
                    })
                }
            })
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
.el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
}
 .tree-container {
    height: 300px;
    overflow: auto;
  }
</style>

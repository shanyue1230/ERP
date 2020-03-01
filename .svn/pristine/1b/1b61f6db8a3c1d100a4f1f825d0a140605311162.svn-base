<template>
  <div class="role">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="员工角色分配" name="first" class="employeeRole" >
        <!-- 搜索表单 -->
        <el-form style="padding-left: 16px;" :inline="true" ref="searchForm" :model="searchForm" class="demo-form-inline" label-position="left" label-width="120px">
          <el-row>
             <el-col :span="4">
              <!-- 工号 -->
              <el-form-item label="所属单位:" prop="companyId">
                 <!-- <el-input v-model="searchForm.companyId" placeholder="请输入项目编号">
                 </el-input> -->
                <el-select width="200px" v-model="searchForm.companyId" @change="changeDeptIdList">
                  <el-option
                    v-for="item in companyIdOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                 </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <!-- 所属部门 -->
              <el-form-item label="所属部门:" prop="deptId">
                <el-select width="200px" v-model="searchForm.deptId" placeholder="请选择所属部门">
                  <el-option
                    v-for="item in deptIdOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                 </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="4">
              <!-- 手机号 -->
              <el-form-item label="手机号:" prop="phoneNumber">
                 <el-input v-model="searchForm.phoneNumber" placeholder="请输入手机号">
                 </el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
              <!-- 工号 -->
              <el-form-item label="姓名:" prop="name">
                 <el-input v-model="searchForm.name" placeholder="请输入姓名">
                 </el-input>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <!-- 操作 -->
              <el-form-item style="padding-top: 40px; box-sizing: border-box; width:auto;margin: 0; margin-left:16px">
                <el-button type="primary" @click="searchUserList">确定</el-button>
                <el-button @click="resetSearchForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" @click="initialPassword">初始密码</el-button>
          <el-button type="primary" @click="forbiddenLogin">禁止登陆</el-button>
        </el-form>

       <!-- 表格 -->
        <el-table
            ref="multipleTable"
            :data="roleTableData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            >
            <el-table-column
              type="selection"
              >
            </el-table-column>
            <el-table-column
              label="No."
              type="index"
              >
              <!-- {{++No}} -->
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              prop="userNo"
              label="手机号(登陆账号)"
              >
            </el-table-column>
            <el-table-column
              prop="workersNumber"
              label="工号"
              >
            </el-table-column>
            <el-table-column
              prop="departmentName"
              label="所属部门"
              >
            </el-table-column>
            <el-table-column
              prop="statusDesc"
              label="状态"
              >
               <template v-slot="{row}">
                <span v-if="row.statusDesc==='离职'" style="color:#C0C4CC">{{row.statusDesc}}</span>
                <span v-else-if="row.statusDesc==='外借'" style="color:#F56C6C">{{row.statusDesc}}</span>
                <span v-else style="color:#67C23A">{{row.statusDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              width="200px"
              >
              <template v-slot="{row}">
                <span class="span" @click="showUserAssignment(row.companyId,row.id)">权限分配</span>
              </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
        style="margin-top: 15px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane label="角色权限设置" name="second" style="height: 100%;">
         <div class="container">
          <!-- 左侧套餐列表 -->
          <div class="packageList">
            <div style="padding: 15px 15px 0 15px">
            <div class="title">
              <span style="font-weight: 500">全部角色</span>
              <!-- <span class="addicon" @click="showAddPackage">+</span> -->
            </div>
            </div>
            <!-- 套餐列表 -->
            <div class="list">
              <div>

                <!-- 管理角色 -->
                <div :class="{'item1':true}">
                  <i style="display: inline-block;line-height:46px; border-bottom: 2px solid #BFBFBF">管理角色</i>
                  <span class="addicon" style="font-size: 22px; color:#237BFF;" @click="showAddRole(roleType=1)">+</span>
                </div>
                <div v-for="(item,index) in manageRoles" :key="item.id" :class="{'item':true, 'light': islight === item.id}" @mouseover="showIcon(item.id)" @mouseleave="hideIcon" @click="showLight(index,item.id,item.name)">
                  {{item.name}}
                  <span :class="{'el-icon-delete': item.id === current}" @click="delPackage(item.id)"></span>
                </div>

                <!-- 行政角色 -->
                 <div :class="{'item1':true}">
                  <i style="display: inline-block;line-height:46px; border-bottom: 2px solid #BFBFBF">行政角色</i>
                  <span class="addicon" style="font-size: 22px; color:#237BFF;" @click="showAddRole(roleType=2)">+</span>
                </div>
                <div v-for="(item,index) in administrativeRoles" :key="item.id" :class="{'item':true, 'light': islight === item.id}" @mouseover="showIcon(item.id)" @mouseleave="hideIcon" @click="showLight(index,item.id,item.name)">
                  {{item.name}}
                  <span :class="{'el-icon-delete': item.id === current}" @click="delPackage(item.id)"></span>
                </div>

                <!-- 业务角色 -->
                <div :class="{'item1':true}">
                  <i style="display: inline-block;line-height:46px; border-bottom: 2px solid #BFBFBF">业务角色</i>
                  <span class="addicon" style="font-size: 22px; color:#237BFF;" @click="showAddRole(roleType=3)">+</span>
                </div>
                <div v-for="(item,index) in businessRoles" :key="item.id" :class="{'item':true, 'light': islight === item.id}" @mouseover="showIcon(item.id)" @mouseleave="hideIcon" @click="showLight(index,item.id,item.name)">
                  {{item.name}}
                  <span :class="{'el-icon-delete': item.id === current}" @click="delPackage(item.id)"></span>
                </div>

                <!-- 后勤角色 -->
                <div :class="{'item1':true}">
                  <i style="display: inline-block;line-height:46px; border-bottom: 2px solid #BFBFBF">后勤角色</i>
                  <span class="addicon" style="font-size: 22px; color:#237BFF;" @click="showAddRole(roleType=4)">+</span>
                </div>
                <div v-for="(item,index) in logisticsRoles" :key="item.id" :class="{'item':true, 'light': islight === item.id}" @mouseover="showIcon(item.id)" @mouseleave="hideIcon" @click="showLight(index,item.id,item.name)">
                  {{item.name}}
                  <span :class="{'el-icon-delete': item.id === current}" @click="delPackage(item.id)"></span>
                </div>

              </div>
            </div>
          </div>
          <div class="box">
            <div class="top-operate">
              <div class="package-con">
                <!-- 套餐名称 -->
                <div style="width:200px">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="packageName">
                  <el-input
                    size="mini"
                    suffix-icon="el-icon-edit"
                    v-model="ruleForm.packageName">
                  </el-input>
                </el-form-item>
              </el-form>
                </div>
                <p>预设所有对象的操作功能权限</p>
                <el-menu :default-active="activeIndex[0]" class="el-menu-demo" mode="horizontal">
                  <el-menu-item v-for="(item,index) in moduleList" :key="index" :index="item.id+''" @click="getMenusList(item.id)">{{item.caption}}</el-menu-item>
                </el-menu>
                <div style="margin-top: 16px; margin-bottom: 20px;">
                  <el-button type="primary" @click="selectAll">全选</el-button>
                  <el-button type="primary" @click="delAll">全取消</el-button>
                </div>
              </div>
              </div>
              <!-- 菜单表格 -->
              <div class="menusTable">
              <el-table
                :data="tableData"
                style="width: 100%;"
                :show-header="false"
                :tree-props="{children: 'menus', hasChildren: 'hasChildren'}"
                row-key="id">
                <el-table-column
                          prop="name"
                          label="菜单"
                          sortable
                          width="300">
                      <template slot-scope="scope">
                          <el-checkbox v-model="scope.row.selected" :label="scope.row.caption" :key="scope.row.id" @change="checkAllfunction(scope.row.id,scope.row.selected,scope.row.parentIds)"></el-checkbox>
                          <!-- <span>{{scope.row.name}}</span> -->
                      </template>
                  </el-table-column>
                  <el-table-column
                          prop="id"
                          label="功能">
                      <template v-slot="scope">
                          <el-checkbox-group v-model="scope.row.selectedPrivileges" @change="handleCheckedFunctionsChange(scope.row.selectedPrivileges,scope.row.privileges,scope.row.selected,scope.row.id)">
                            <el-checkbox v-for="(city,index) in scope.row.privileges" :label="city.id" :key="index">{{city.name}}</el-checkbox>
                          </el-checkbox-group>
                      </template>
                  </el-table-column>
              </el-table>
              </div>
              <div style="text-align: center;" class="bottom-btn">
                <el-button type="info" @click="cancelOperate" :disabled="disabled">取消</el-button>
                <el-button type="primary" @click="addPackage" :disabled="isHasEdit">确定</el-button>
              </div>
          </div>
        </div>
      </el-tab-pane>
   </el-tabs>

      <!-- 权限分配抽屉  -->
      <el-drawer
          title="权限分配"
          :modal="true"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose"
           >

          <el-collapse v-model="activeNames" style="margin-top: 32px;">
            <el-collapse-item title="管理角色" name="1">
                <el-checkbox-group v-if="manageRoles.length>0" v-model="roles.checkList">
                  <el-checkbox v-for="(item,index) in manageRoles" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div v-else class="noRoles">
                  暂无任何角色
                </div>
             </el-collapse-item>
            <el-collapse-item title="行政角色" name="2">
               <el-checkbox-group v-if="administrativeRoles.length>0" v-model="roles.checkList">
                  <el-checkbox v-for="(item,index) in administrativeRoles" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div v-else class="noRoles">
                  暂无任何角色
                </div>
             </el-collapse-item>
            <el-collapse-item title="业务角色" name="3">
              <el-checkbox-group v-if="businessRoles.length>0" v-model="roles.checkList">
                  <el-checkbox v-for="(item,index) in businessRoles" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div v-else class="noRoles">
                  暂无任何角色
                </div>
             </el-collapse-item>
             <el-collapse-item title="后勤角色" name="4">
               <el-checkbox-group v-if="logisticsRoles.length>0" v-model="roles.checkList">
                  <el-checkbox v-for="(item,index) in logisticsRoles" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div v-else class="noRoles">
                  暂无任何角色
                </div>
             </el-collapse-item>
          </el-collapse>
              <el-button style="margin: 15px 32px 0 15px;float: right;" @click="cancelUserAssignment">取消</el-button>
              <el-button type="primary" style="margin: 15px 15px 0 15px;float: right;" @click="userAssignment">确认</el-button>
      </el-drawer>
  </div>
</template>

<script>
// addRole
import { roleView, userList, initializePassword, forbiddenLogin, departmentSelectionList, roleList, userView, userAssignment, getMenus, listByCompanyId, addRole, deleteRole, editRole, getDataFilter, childCompanyList } from '../../api/getData.js'
export default {
  data () {
    return {
      // 当前公司id
      No: 0,
      companyId: '',
      // 当前用户id
      userId: -1,
      // 当前角色类型
      roleType: -1,
      currentPage: 1,
      total: 0,
      pagesize: 20,
      activeName: 'first',
      drawer: false,
      direction: 'rtl',
      activeNames: ['1', '2', '3', '4'],
      // 管理角色
      manageRoles: [],
      // 行政角色
      administrativeRoles: [],
      // 业务角色
      businessRoles: [],
      // 后勤角色
      logisticsRoles: [],
      // 搜索表单
      searchForm: {
        companyId: '',
        deptId: '',
        phoneNumber: '',
        name: ''
      },
      // 所属部门下拉
      deptIdOptions: [],
      // 员工角色分配表格
      roleTableData: [
        {
          no: '',
          name: '',
          userNo: '',
          workersNumber: '',
          departmentName: '',
          statusDesc: '',
          operate: ''
        },
        {
          no: '',
          name: '',
          userNo: '',
          workersNumber: '',
          departmentName: '',
          statusDesc: '',
          operate: ''
        }
      ],
      // 员工id
      employeeId: [],
      roles: {
        checkList: []
      },
      currentRoleList: [],
      // 操作权限数据
      isVisible: true,
      institution: '',
      current: -1,
      // 套餐列表
      itemList: [],
      ruleForm: {
        packageName: ''
      },
      // 所属单位
      companyIdOptions: [],
      activeIndex: ['1'],
      islight: -1,
      moduleList: [],
      // 菜单表格
      tableData: [],
      // 套餐拥有菜单id
      menuIds: [1, 2, 3, 4],
      // 套餐拥有权限id
      privilegeIds: [],
      currentModuleId: '',
      // 套餐id
      packageId: '',
      disabled: false,
      isHasEdit: false,
      rules: {
        packageName: [
          { required: true, message: '请输入套餐名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
    this.getDepartmentList()
    this.getRoleList()
    this.getAllMenus()
    this.getMenusList(1)
    this.getDataFilter()
    this.getCompanyList()
  },
  computed: {
    // isHasEdit: function () {
    //   return
    // }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // 清空选中角色
          this.roles.checkList = []
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserList()
    },
    handleSelectionChange (val) {
      console.log(val);
      if (val.length === 0) {
        this.employeeId = []
      } else {
        val.forEach(ele => {
          if (this.employeeId.indexOf(ele.id) === -1) {
            this.employeeId.push(ele.id)
          }
        })
      }
      console.log(this.employeeId);
    },

    // 获取所属单位列表
    getCompanyList () {
      const data3 = {
        id: JSON.parse(localStorage.getItem('login')).companyId
      }
      childCompanyList(data3).then(res => {
        this.companyIdOptions = res.data.data
        this.searchForm.companyId = data3.id
      })
    },

    // 改变所属部门列表
    changeDeptIdList () {
      this.getDepartmentList()
    },

    // 获取当前菜单下的权限
    getDataFilter () {
      const data = {
        menuCode: localStorage.getItem('code')
      }
      getDataFilter(data).then(res => {
        console.log(res);
      })
    },
    // 获取部门列表
    getDepartmentList () {
      const data = {
        companyId: this.searchForm.companyId || 1
        // isTree: false
      }
      departmentSelectionList(data).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.deptIdOptions = res.data.data
        }
      })
    },
    // 获取用户列表
    getUserList () {
      // 获取当前用户所属公司的id
      this.companyId = JSON.parse(localStorage.getItem('login')).companyId
      console.log(this.companyId)
      const data = {
        page: this.currentPage,
        limit: this.pagesize,
        companyId: this.companyId,
        phoneNumber: this.searchForm.phoneNumber,
        deptId: this.searchForm.deptId,
        name: this.searchForm.name
      }
      userList(data).then(res => {
        console.log(res.data.data)
        const result = res.data.data
        if (res.data.code === 200) {
          this.total = result.total
          this.roleTableData = result.records
        }
      })
    },

    // 查询用户列表
    searchUserList () {
      const data = {
        page: this.currentPage,
        limit: this.pagesize,
        companyId: this.searchForm.companyId || 1,
        phoneNumber: this.searchForm.phoneNumber,
        deptId: this.searchForm.deptId,
        name: this.searchForm.name
      }
      userList(data).then(res => {
        console.log(res.data.data)
        const result = res.data.data
        if (res.data.code === 200) {
          this.total = result.total
          this.roleTableData = result.records
        }
      })
    },

    // 重置查询表单
    resetSearchForm () {
      this.$refs.searchForm.resetFields()
      this.searchForm.companyId = JSON.parse(localStorage.getItem('login')).companyId
    },

    // 点击权限分配
    showUserAssignment (companyId, id) {
      this.userId = id
      console.log(companyId)
      this.drawer = true
      const data = {
        companyId
      }
      // 回显账号所拥有的角色
      userView(id).then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.roles.checkList = res.data.data.roleIds
          this.currentRoleList = res.data.data.roleIds
        }
      })
      // 获取角色列表
      roleList(data).then(res => {
        if (res.data.code === 200) {
          let result = res.data.data
          this.manageRoles = result.manageRoles
          this.administrativeRoles = result.administrativeRoles
          this.businessRoles = result.businessRoles
          this.logisticsRoles = result.logisticsRoles
        }
      })
    },

    // 获取角色列表
    getRoleList () {
      const data = {
        companyId: this.companyId
      }
      roleList(data).then(res => {
        if (res.data.code === 200) {
          let result = res.data.data
          this.manageRoles = result.manageRoles
          this.administrativeRoles = result.administrativeRoles
          this.businessRoles = result.businessRoles
          this.logisticsRoles = result.logisticsRoles
        }
      })
    },

    // 权限分配
    userAssignment () {
      const data = {
        id: this.userId,
        roleIds: this.roles.checkList
      }
      userAssignment(data).then(res => {
        if (res.data.code === 200) {
          this.$message.success('权限分配成功')
        }
      })
    },
    // 取消权限分配
    cancelUserAssignment () {
      this.roles.checkList = this.currentRoleList
    },
    // 初始密码
    initialPassword () {
      const data = this.employeeId
      initializePassword(data).then(res => {
        if (res.data.code === 200) {
          this.$message.success('初始密码成功')
        }
      })
    },

    // 禁止登陆
    forbiddenLogin () {
      const data = this.employeeId
      forbiddenLogin(data).then(res => {
        if (res.data.code === 200) {
          this.$message.success('该用户已禁止登陆')
          this.getUserList()
        }
      })
    },

    // 角色权限设置事件
    // 显示新增套餐表格
    showAddPackage () {
      this.disabled = false
      this.getMenusList(1)
      this.privilegeIds = []
      this.menuIds = [1, 2, 3, 4]
      this.ruleForm.packageName = ''
      this.islight = -1
      this.packageId = ''
    },

    // 显示新增角色
    showAddRole (roleType) {
      console.log(roleType)
      this.roleType = roleType
      this.disabled = false
      this.getMenusList(1)
      this.privilegeIds = []
      this.menuIds = [1, 2, 3, 4]
      this.ruleForm.packageName = ''
      this.islight = -1
      this.packageId = ''
    },

    // 角色新增  +  角色编辑
    addPackage () {
      console.log('新增成功');
      // console.log(this.privilegeIds, this.menuIds);
      for (let i = 2; i <= 4; i++) {
        if (this.menuIds.indexOf(i) === -1) {
          this.menuIds.push(i)
        }
      }
      const data = {
        id: this.packageId,
        roleType: this.roleType,
        name: this.ruleForm.packageName,
        menuIds: this.menuIds,
        privilegeIds: this.privilegeIds
      }
      if (this.ruleForm.packageName === '') {
        this.$message.warning('请输入套餐名称')
      } else {
        // 角色新增
        if (this.packageId === '') {
          addRole(data).then(res => {
            console.log(res)
            if (res.data.code === 200) {
              // 重新渲染角色列表
              this.getRoleList()
              this.$message.success('新增角色成功')
              // 清空套餐明细
              this.delAll()
              this.ruleForm.packageName = ''
            }
          })
          // addRole(data).then(res => {
          //   console.log(res);
          //   if (res.data.code === 200) {
          //     this.$message.success('添加套餐成功')
          //     // 重新渲染套餐列表
          //     this.getPackageList()
          //     // 清空套餐明细
          //     this.delAll()
          //     this.ruleForm.packageName = ''
          //   } else {
          //     this.$message.error('内容加载失败，请重试')
          //   }
          // })
        } else {
          // 角色编辑
          editRole(data).then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.getPackageList()
              this.getRoleList()
              this.$message.success('角色修改成功')
            } else {
              this.$message.error('内容加载失败，请重试')
            }
          })
        }
      }
    },
    // 删除角色
    delPackage (id) {
      deleteRole(id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('删除套餐成功')
          this.getMenusList()
        } else {
          // this.$message.error('内容加载失败，请重试')
        }
      })
    },
    // 查询套餐
    searchPackage () {
      // let name = this.institution
      // packageList({ packageName: name }).then(res => {
      //   console.log(res)
      //   if (res.data.code === 200) {
      //     this.itemList = res.data.data
      //   } else {
      //     this.$message.error('内容加载失败，请重试')
      //   }
      // })
    },
    // 取消操作
    cancelOperate () {
      if (this.packageId === '') {
        this.delAll()
      }
    },
    // 获取子系统套餐列表
    getPackageList () {
      // packageList({}).then(res => {
      //   if (res.data.code === 200) {
      //     let arr = []
      //     for (var i = 0; i < res.data.data.length; i++) {
      //       arr.push(res.data.data[i].menus)
      //     }
      //     this.itemList = res.data.data
      //     console.log(this.itemList)
      //   } else {
      //     // this.$message.error('内容加载失败，请重试')
      //   }
      // })
    },
    // 获取菜单列表
    getMenusList (index) {
      console.log(index)
      let companyId = this.companyId
      listByCompanyId(companyId).then(res => {
        this.tableData = res.data.data[index - 1].menus
        let data = res.data.data
        this.fn7(data)
      })
    },
    // 获取所有子模块
    getAllMenus () {
      const data = {
        parentId: 0,
        isChild: true,
        isTree: true,
        isPermission: false
      }
      getMenus(data).then(res => {
        if (res.data.code === 200) {
          this.moduleList = res.data.data
        } else {
          // this.$message.error('内容加载失败，请重试')
        }
      })
    },
    showIcon (index) {
      this.current = index
    },
    hideIcon () {
      this.current = -1
    },
    // 角色点击事件
    showLight (index, id, name) {
      console.log();
      if (JSON.parse(localStorage.getItem('login')).privilegeCodes.indexOf('basic:role:edit') === -1) {
        this.isHasEdit = true
      } else {
        this.isHasEdit = false
      }
      //  === -1
      this.disabled = true
      this.islight = id
      this.packageId = id
      this.ruleForm.packageName = name
      // 清空套餐明细
      this.menuIds = [1, 2, 3, 4]
      this.privilegeIds = []
      roleView(id).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.delAll()
          this.roleType = res.data.data.roleType
          this.menuIds = res.data.data.menuIds
          this.privilegeIds = res.data.data.privilegeIds
          let data = this.tableData
          this.fn7(data)
        }
      })
      // 套餐明细回显
      // packageView(id).then(res => {
      //   if (res.data.code === 200) {
      //     this.delAll()
      //     this.menuIds = res.data.data.menuIds
      //     this.privilegeIds = res.data.data.privilegeIds
      //     let data = this.tableData
      //     console.log(this.menuIds, this.privilegeIds)

      //     this.fn7(data)
      //   } else {
      //     this.$message.error('内容加载失败，请重试')
      //   }
      // })
    },
    // 全选
    selectAll () {
      console.log('全选')
      let data = this.tableData
      this.privilegeIds = []
      this.fn5(data)
    },
    // 全取消
    delAll () {
      let data = this.tableData
      this.fn6(data)
    },
    checkAllfunction (id, checked, parentId) {
      console.log(id)
      let data = this.tableData
      if (checked === true) {
        console.log('全选单行')
        this.menuIds.push(id)
        console.log(this.menuIds);

        let parentIds = parentId.split(',')
        // 单排全选
        this.fn3(data, id, parentIds)
        // }
      } else {
        console.log('取消单行')
        this.menuIds = this.menuIds.filter(item => item !== id)
        this.fn4(data, id)
      }
    },
    handleCheckedFunctionsChange (checkedCities, cities, checked, id) {
      // console.log(checkedCities)
      for (var i = 0; i < checkedCities.length; i++) {
        if (this.privilegeIds.indexOf(checkedCities[i]) === -1) {
          this.privilegeIds.push(checkedCities[i])
        }
      }
      // } else {
      for (var j = 0; j < cities.length; j++) {
        if (checkedCities.indexOf(cities[j].id) === -1) {
          this.privilegeIds = this.privilegeIds.filter(res => res !== cities[j].id)
        }
      }
      // console.log(this.privilegeIds)
      let data = this.tableData
      if (checkedCities.length === cities.length) {
        this.fn(data, id)
      } else {
        // this.fn2(data, id)
      }
    },
    // 递归遍历树形数据
    fn (data, id) {
      for (var i in data) {
        if (data[i].menus && data[i].menus.length) {
          this.fn(data[i].menus, id)
        } else {
          if (data[i].id === id) {
            console.log(data[i].id)
            data[i].selected = true
            // return false
          } else {
            // data[i].checked = false
          }
        }
      }
    },
    // 全选递归
    fn5 (data) {
      for (var i in data) {
        data[i].selected = true
        console.log(data[i].id);
        this.menuIds.push(data[i].id)
        if (data[i].menus && data[i].menus.length) {
          this.fn5(data[i].menus)
        } else {
          let arr = data[i].privileges
          for (var j in arr) {
            this.privilegeIds.push(arr[j].id)
            // data[i].selectedPrivileges.push
          }
          data[i].selected = true
          data[i].selectedPrivileges = this.privilegeIds
          // return false
        }
        console.log(this.menuIds, this.privilegeIds);
      }
    },
    // 全取消
    fn6 (data) {
      this.menuIds = [this.currentModuleId]
      this.privilegeIds = []
      console.log(this.menuIds);
      for (var i in data) {
        data[i].selected = false
        if (data[i].menus && data[i].menus.length) {
          this.fn6(data[i].menus)
        } else {
          data[i].selected = false
          // let arr = []
          data[i].selectedPrivileges = []
          // return false
        }
      }
    },
    // 单行全选递归
    fn3 (data, id, parentId) {
      for (var i in data) {
        let currentId = data[i].id.toString()
        if (parentId && parentId.indexOf(currentId) !== -1) {
          data[i].selected = true
          if (this.menuIds.indexOf(data[i].id) === -1) {
            console.log('添加成功');
            console.log(data[i].id);
            this.menuIds.push(data[i].id)
          }
        }
        if (data[i].menus && data[i].menus.length) {
          this.fn3(data[i].menus, id, parentId)
        } else {
          if (data[i].id === id) {
            // this.menuIds.push(data[i].id)
            let arr = data[i].privileges
            let arr2 = []

            // 存选中id
            for (var j in arr) {
              this.privilegeIds.push(arr[j].id)
              arr2.push(arr[j].id)
            }
            data[i].selectedPrivileges = arr2
            return false
          }
        }
      }
    },
    // 取消单行全选递归
    fn4 (data, id) {
      for (var i in data) {
        // console.log(data[i])
        // 取消下级菜单勾选

        if (data[i].parentIds && data[i].parentIds.split(',').indexOf(id.toString()) !== -1) {
          data[i].selected = false
          this.menuIds = this.menuIds.filter(id => id !== data[i].id)
          // console.log(this.menuIds);
        }
        if (data[i].menus && data[i].menus.length) {
          this.fn4(data[i].menus, id)
        } else {
          // 取消单行全选
          if (data[i].id === id || data[i].parentIds.split(',').indexOf(id.toString()) !== -1) {
            data[i].selected = false
            this.menuIds = this.menuIds.filter(id => id !== data[i].id)
            console.log(this.menuIds);

            let arr = []
            data[i].selectedPrivileges = arr
            for (var j in data[i].privileges) {
              this.privilegeIds = this.privilegeIds.filter(id => id !== data[i].privileges[j].id)
            }
            console.log(this.privilegeIds);

            return false
          }
        }
      }
    },
    // 回显递归
    fn7 (data) {
      for (var i in data) {
        console.log(this.menuIds)
        if (this.menuIds.indexOf(data[i].id) !== -1) {
          data[i].selected = true
        }
        if (data[i].menus && data[i].menus.length) {
          this.fn7(data[i].menus)
        } else {
          let arr = data[i].privileges
          let arr2 = []
          for (var j in arr) {
            if (this.privilegeIds.indexOf(arr[j].id) !== -1) {
              arr2.push(arr[j].id)
            }
          }
          data[i].selectedPrivileges = arr2
        }
      }
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.role {
   height: 100%;
   background-color: #fff;
   overflow: hidden;
}
.el-tabs {
  // padding: 0 16px;
  height: 100%;
  // overflow-y: scroll;
  // overflow-x: hidden;
  position: relative;
  .employeeRole {
    height: 75vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  /deep/.el-tabs__content {
    height: 100%;
  }
  .el-table {
     .span {
      cursor: pointer;
    }
    .span:hover {
      text-decoration: underline;
      color: #237BFF;
    }
  }
}
/deep/.el-tabs__header {
  margin-bottom: 0;
}
/deep/.el-tabs__nav-wrap.is-top {
  height: 64px;
  line-height: 64px;
  padding-left: 16px;

}

 .el-drawer__wrapper {
    position: fixed;
    z-index: 300;
    top: 105px;
    right: 0;
    width: 100%;
    height: 100%;
    .title {
      height: 48px;
      line-height: 46px;
      font-size:16px;
      font-weight:500;
      color:rgba(48,49,51,1);
      border-bottom: 1px solid #eee;
      margin-top: 32px;
      span {
        display: inline-block;
        padding: 0 5px;
        height: 48px;
        border-bottom: 1px solid #237BFF;
      }
    }
    .el-col {
      padding-right: 32px;
    }
    .el-select {
      width: 100%;
    }
    /deep/.el-form-item__label {
      color: #909399;
      font-size: 14px;
      font-weight: 500;
    }
    /deep/.el-drawer__body {
      padding: 0 16px;
      height: 100%;
    }
    /deep/.el-drawer__header {
      height: 64px;
      box-sizing: border-box;
      padding-top: 0;
      font-size: 16px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(48,49,51,1);
      border-bottom: 1px solid #eee;
      margin-bottom: 0;
      padding: 30px;
    }
    /deep/.el-drawer.rtl {
      width: calc(100% - 305px) !important;
      box-shadow: none;
      border-left: 1px solid #eee;
    }
  }

 // 新增抽屉样式
 /deep/.el-drawer__body {
      padding-bottom: 120px;
      /deep/.el-collapse-item__header {
        background-color: rgba(245,247,250,1);
        padding-left:16px;
      }
      .el-checkbox {
        margin-top: 20px;
      }
      /deep/.el-collapse-item__content {
        padding-left: 16px;
      }
      .noRoles {
        text-align: center;
        font-size:14px;
        color:rgba(144,147,153,1);
        margin-top: 13px;
      }
 }
.el-drawer__wrapper .create-el-form {
    height: 90%;
    // flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 80px;
    // display: flex;
    position: relative;
    padding: 0 340px 50px 340px;
}

// 角色权限设置样式
.light {
    background:rgba(236,245,255,1);
    color:#237BFF;
}
.container {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  .packageList {
    width: 270px;
    background-color: #fff;
    border-right:1px solid #eee;
    box-sizing: border-box;
    height: 100%;
    .title {
      width: 238px;
      .addicon {
        float: right;
        font-size: 26px;
        margin-top: -8px;
        color: #237BFF;
        cursor: pointer;
      }
    }
    .list {
      margin-top: 16px;
      border-top: 1px solid #eee;
      font-size: 14px;
      height: 70vh;
      overflow-y: scroll;
      overflow-x: hidden;
      .item1 {
        height: 46px;
        line-height: 46px;
        box-sizing: border-box;
        padding: 0 15px;
        border-bottom: 1px solid #eee;
        margin-bottom: 3px;
        margin-top: 3px;
        color:#BFBFBF;
        span {
          float: right;
          line-height: 46px;
          cursor: pointer;
        }
      }
      .item {
        height: 46px;
        line-height: 46px;
        box-sizing: border-box;
        padding: 0 15px;
        padding-left: 42px;
        font-size: 14px;
        color:#606266;
        span {
          float: right;
          line-height: 46px;
          cursor: pointer;
        }
      }
      .item:hover {
        background:rgba(236,245,255,1);
        border:1px solid rgba(35, 123, 255, 1);
        color:#237BFF;
      }
    }
  }
  .package-con {
    flex: 1;
    background-color: #fff;
    padding: 15px;
    p {
      height:14px;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(144,147,153,1);
      margin-top: 17px;
      margin-bottom: 17px;
      margin-left: 3px;
    }
  }
}
.box {
  display: flex;
  flex-flow: column;
  width: 100%;
  background-color: #fff;
  position: relative;
  height: 75vh;
  overflow-y: scroll;
  overflow-x: none;
  .top-operate {
    height: 223px;

  }
  .bottom-btn {
    // position: absolute;
    width: 100%;
    // bottom: 10px;
    // left: 0;
    padding-top: 10px;
    height: 64px;
    // flex: 1;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 15px;
  }
}
/deep/.el-menu--horizontal>.el-menu-item {
  height: 40px;
  line-height: 40px;
  color: #000;
  font-size: 14px;
}
/deep/.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #237BFF;
}
.menusTable {
  // height: calc(100% - 65px);
  // overflow-y: scroll;
  // overflow-x: hidden;
  /*滚动条样式*/

}
// .bottom-btn {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   height: 64px;
//   width: 100%;
// }

</style>

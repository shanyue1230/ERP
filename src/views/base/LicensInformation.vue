<template>
  <div class="LicensInformation">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>许可信息</el-breadcrumb-item>
      <el-breadcrumb-item>许可信息</el-breadcrumb-item>
    </el-breadcrumb>
    <h4 class="info-title per-title">许可信息</h4>
    <!-- 许可信息 -->
    <el-form style="padding-left: 16px;" :inline="true" ref="searchForm" :model="searchForm" class="demo-form-inline" label-position="left" label-width="120px">
          <el-row>
             <el-col :span="6">
              <!-- 所属单位 -->
              <el-form-item label="所属单位:" prop="companyId">
                 <el-input v-model="searchForm.companyId">
                 </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 许可名称 -->
              <el-form-item label="许可名称:" prop="deptId">
                 <el-input v-model="searchForm.deptId">
                 </el-input>
              </el-form-item>
            </el-col>
              <el-col :span="6">
              <!-- 许可套餐 -->
              <el-form-item label="许可套餐:" prop="phoneNumber">
                 <el-input v-model="searchForm.phoneNumber">
                 </el-input>
              </el-form-item>
            </el-col>
             <el-col :span="6">
              <!-- 有效期至 -->
              <el-form-item label="有效期至:" prop="name">
                <el-date-picker
                  v-model="searchForm.name"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
    </el-form>

    <!-- 套餐信息 -->
    <h4 class="info-title">套餐信息</h4>

     <div class="box">
        <div class="top-operate">
          <div class="package-con">
            <!-- 套餐名称 -->
            <el-menu :default-active="activeIndex[0]" class="el-menu-demo" mode="horizontal">
              <el-menu-item v-for="(item,index) in moduleList" :key="index" :index="item.id+''" @click="getMenusList(item.id)">{{item.caption}}</el-menu-item>
              <!-- <el-menu-item index="2">子系统名称</el-menu-item>
              <el-menu-item index="3">子系统名称</el-menu-item> -->
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
            <el-button type="primary" @click="addPackage">确定</el-button>
          </div>
      </div>
  </div>
</template>

<script>
// import { packageList, getMenus, addPackage, delPackage, packageView, editPackage } from '../../api/getData.js'
export default {
  data () {
    return {
      searchForm: {
        companyId: '',
        deptId: '',
        phoneNumber: '',
        name: ''
      },
      isVisible: true,
      institution: '',
      current: -1,
      // 套餐列表
      itemList: [],
      ruleForm: {
        packageName: ''
      },
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
      rules: {
        packageName: [
          { required: true, message: '请输入套餐名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
    // 套餐新增  +  套餐编辑
    addPackage () {
      console.log('新增成功');
      console.log(this.privilegeIds, this.menuIds);
      // const data = {
      //   id: this.packageId,
      //   packageName: this.ruleForm.packageName,
      //   menuIds: this.menuIds,
      //   privilegeIds: this.privilegeIds
      // }
      // if (this.ruleForm.packageName === '') {
      //   this.$message.warning('请输入套餐名称')
      // } else {
      //   if (this.packageId === '') {
      //     addPackage(data).then(res => {
      //       console.log(res);
      //       if (res.data.code === 200) {
      //         this.$message.success('添加套餐成功')
      //         // 重新渲染套餐列表
      //         this.getPackageList()
      //         // 清空套餐明细
      //         this.delAll()
      //         this.ruleForm.packageName = ''
      //       } else {
      //         this.$message.error('内容加载失败，请重试')
      //       }
      //     })
      //   } else {
      //     // 套餐编辑
      //     editPackage(data).then(res => {
      //       console.log(res)
      //       if (res.data.code === 200) {
      //         this.getPackageList()
      //         this.$message.success('套餐修改成功')
      //       } else {
      //         this.$message.error('内容加载失败，请重试')
      //       }
      //     })
      //     // 套餐新增
      //   }
      // }
    },
    // 删除套餐
    delPackage (id) {
      // delPackage(id).then(res => {
      //   console.log(res);
      //   if (res.data.code === 200) {
      //     this.$message.success('删除套餐成功')
      //     this.getPackageList()
      //   } else {
      //     this.$message.error('内容加载失败，请重试')
      //   }
      // })
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
      //     this.$message.error('内容加载失败，请重试')
      //   }
      // })
    },
    // 获取菜单列表
    getMenusList (id) {
      // this.menuIds = [id]
      this.currentModuleId = id
      // const data = {
      //   parentId: id,
      //   isChild: true,
      //   isTree: true,
      //   isPermission: false
      // }
      // getMenus(data).then(res => {
      //   console.log(res)
      //   if (res.data.code === 200) {
      //     this.tableData = res.data.data
      //     // 数据回显
      //     console.log(res.data.data)
      //     let data = res.data.data
      //     this.fn7(data)
      //   } else {
      //     this.$message.error('内容加载失败，请重试')
      //   }
      // })
    },
    // 获取所有子模块
    getAllMenus () {
      // const data = {
      //   parentId: 0,
      //   isChild: true,
      //   isTree: true,
      //   isPermission: false
      // }
      // getMenus(data).then(res => {
      //   if (res.data.code === 200) {
      //     this.moduleList = res.data.data
      //   } else {
      //     this.$message.error('内容加载失败，请重试')
      //   }
      // })
    },
    showIcon (index) {
      this.current = index
    },
    hideIcon () {
      this.current = -1
    },
    // 套餐点击事件
    showLight (index, id, name) {
      this.disabled = true
      this.islight = index
      this.packageId = id
      this.ruleForm.packageName = name
      // 清空套餐明细
      this.menuIds = [1, 2, 3, 4]
      this.privilegeIds = []
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
      console.log(checkedCities)
      this.privilegeIds = checkedCities
      // 收集id
      // for (var i in cities) {
      //   this.privilegeIds = this.privilegeIds.filter(id => id !== cities[i].id)
      // }
      // this.privilegeIds = []
      // 在添加选中的id
      // for (var j in checkedCities) {
      //   this.privilegeIds.push(checkedCities[j])
      // }
      console.log(this.privilegeIds)
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

          // let arr = data[i].privileges
          // for (var j in arr) {
          //   this.privilegeIds.push(arr[j].id)
          // }
          // data[i].selectedPrivileges = arr
          // console.log(data[i].selectedPrivileges);
        }
      }
    }

  },
  components: {
  }
}
</script>

<style lang="less" scoped>
  .LicensInformation {
    height: 100%;
    background-color: #fff;
    overflow: hidden;
    .info-title {
      height: 40px;
      line-height: 40px;
      padding-left: 16px;
    }
    .per-title {
       margin-top: 16px;
    }
    .el-col:nth-child(-n+3) {
      padding-right: 10px;
    }
    /deep/.el-form-item__content {
      width: 100%;
    }
     /deep/label.el-form-item__label {
    width: 100%;
    text-align: left;
    }
    /deep/.el-date-editor--daterange.el-input__inner {
      width: 100%;
      margin-right: 10px;
    }
    /deep/input.el-input__inner {
      padding-right: 30px;
      width:100%;
    }
    .box {
      padding: 0 16px;
      height: 75vh;
      overflow-y: scroll;
      overflow-x: none;
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
  }
</style>

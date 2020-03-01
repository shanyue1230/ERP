<template>
  <div class="department">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体部分 -->
    <div class="main">
      <div class="Inquire">
        <el-form :inline="true" :model="formSearch" class="demo-form-inline">
          <el-row>
            <el-col :span="6" style="padding:0">
              <el-form-item label="所属单位：" style="width:100%;padding-right: 10px;">
                <el-select v-model="formSearch.companyId" placeholder="全部" @change="unitSearchChange">
                  <el-option
                    v-for="item in unitSearch"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0">
              <el-form-item label="状态：" style="width:100%;padding-right: 10px;">
                <el-select v-model="formSearch.isDisabled" placeholder="全部">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="padding:0; ">
              <el-form-item
                style="padding-top:40px;box-sizing: border-box; width:auto;"
              >
                <el-button @click="searchSubmit" type="primary">确定</el-button>
                <el-button @click="searchCancle">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-button type="primary" @click="showDrawer">新增</el-button>
      <!-- 树形结构表格 -->
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;margin-top: 16px;"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'departmentList', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="机构名称" :show-overflow-tooltip='true' width="250"></el-table-column>
        <el-table-column prop="parentDeptName" label="上级部门" width="200"></el-table-column>
        <el-table-column prop="userCount" label="人数"></el-table-column>
        <el-table-column prop="deptTypeStr" label="部门类型"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="{row}">
            <span v-if="row.isDisabled === false" style="color:green">正常</span>
            <span v-if="row.isDisabled === true" style="color:red">停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="{row}">
            <span class="span" @click="isEdit(row.id)">编辑</span>&nbsp;&nbsp;
            <span style="color:#ccc">|</span>&nbsp;&nbsp;
            <span class="span" @click="isDetails(row)">查看详情</span>&nbsp;&nbsp;
            <span style="color:#ccc">|</span>&nbsp;&nbsp;
            <span class="span" @click="isDisable(row.id)" v-if="row.isDisabled === false">停用</span>
            <span class="span" @click="isEnable(row.id)" v-if="row.isDisabled === true">启用</span>
            <span style="color:#ccc">|</span>&nbsp;&nbsp;
            <span class="span" @click="deleteRow(row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增的抽屉框 -->
    <el-drawer :title="title"  :visible.sync="newDrawer" :before-close="handleClose">
      <el-form :model="drawerForm" :rules="rules" ref="Form">
        <el-form-item label="所属单位：" prop="companyId">
          <el-select v-model="drawerForm.companyId" placeholder="全部" @change="changeCompany" :disabled="companyDisabled">
            <el-option
              v-for="item in optionsCompany"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级部门：" prop="parentId">
          <el-select v-model="drawerForm.parentId" placeholder="无" @focus="parentDept">
              <el-option
              key="0"
              label="无"
              value="无"
            ></el-option>
            <el-option
              v-for="item in optionsDept"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门类型：" prop="deptType">
          <el-select v-model="drawerForm.deptType" placeholder="全部">
            <el-option
              v-for="item in dictItemOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model.trim="drawerForm.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer" style="text-align: right">
        <el-button @click="newDrawer=false">取 消</el-button>
        <el-button @click="onSubmit" type="primary">确 定</el-button>
      </div>
    </el-drawer>

    <!-- 查看详情的抽屉框 -->
    <el-drawer title="查看详情" :visible.sync="viewDrawer"  :before-close="handleClose">
      <el-row style="height:100%;padding:31px">
        <el-col :span="12" style="height:100%">
          <div class="info">
            <el-form style="padding:0">
              <el-form-item label="部门名称">{{formView.name}}</el-form-item>
              <el-form-item label="所属单位">{{formView.companyName}}</el-form-item>
              <el-form-item label="上级部门">{{formView.parentDeptName?formView.parentDeptName:'无'}}</el-form-item>
              <el-form-item label="部门类型">{{formView.deptTypeStr}}</el-form-item>
              <el-form-item label="部门人数">{{formView.userCount?formView.userCount:'0'}}</el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12" style="height:100%">
          <div class="dynamic">
            <div class="all">
              <span>所有动态</span>
              <el-select
                v-model="valueDate"
                @change="dateOptionFun"
                placeholder="请选择"
                style="width:96px;height:32px !important;"
                @visible-change="isChange"
              >
                <el-option
                  v-for="item in dateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <i v-if="!selst" class="el-icon-caret-bottom arrow"></i>
              <i v-if="selst" class="el-icon-caret-top arrow"></i>
            </div>
            <!-- all info -->
            <div class="box">
              <div class="allInfo" v-for="item in infoList" :key="item.id">
                <div class="top" style="margin-bottom:5px">
                  <div class="oper" style="color:rgba(144,147,153,1);">
                    <span style="margin-right:3px">{{item.editor}}</span>
                    <span>{{item.isCreated? '创建':'编辑'}}</span>了&nbsp;&nbsp;&nbsp;
                    <span>{{item.mainContent}}</span>
                  </div>
                  <div class="infoTime" style="color:rgba(144,147,153,1);;">{{item.editTime}}</div>
                </div>
                <div class="bottom">
                  <span
                    style="color:rgba(144,147,153,1); margin-right:10px"
                  >{{item.isCreated? '创建':'修改'}}</span>
                  <span>{{item.isCreated? item.mainContent:item.fieldName}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="demo-drawer__footer" style="text-align: right">
        <el-button @click="viewDrawer=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { departmentList, departmentAdd, departmentEdit, departmentDisable, departmentEnable, departmentDelete, departmentView, departmentCheck, getEditLog, dictItem, childCompanyList } from '../../api/getData';

export default {
  data () {
    return {
      companyDisabled: false,
      newDrawer: false,
      editDrawer: false,
      viewDrawer: false,
      direction: 'rtl',
      selst: false,
      listCompanyId: '',
      title: '',
      valueDate: 0,
      detailId: '',
      time: 0,
      userCompanyId: '',
      formSearch: {
        companyId: '',
        isDisabled: '',
        isTree: true
      },
      formView: {
        name: '',
        companyName: '',
        parentDeptName: '',
        deptTypeStr: '',
        userCount: ''

      },
      tableData: [],
      unitSearch: [],
      options2: [{
        value: '',
        label: '全部'
      },
      {
        value: 0,
        label: '正常'
      },
      {
        value: 1,
        label: '停用'
      }],
      optionsCompany: [],
      optionsDept: [],
      dictItemOptions: [],
      dateOptions: [
        {
          value: 0,
          label: '近一周'
        },
        {
          value: 1,
          label: '近一月'
        },
        {
          value: 2,
          label: '近一年'
        }
      ],
      drawerForm: {
        id: '',
        companyId: '',
        deptType: '',
        parentId: '',
        name: ''
      },
      superDept: {
        companyId: '',
        isDisabled: 0,
        isTree: false
      },
      rules: {
        companyId: [{ required: true, message: '请选择所属单位', trigger: 'blur' }],
        parentId: [
          { required: true, message: '请选择上级部门', trigger: 'blur' }
        ],
        deptType: [{ required: true, message: '请选择部门类型', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入部门名称', trigger: 'change' },
          { min: 3, max: 10, message: '至少输入3到10位字符', trigger: 'change' },
          { validator: this.validName, trigger: ['change'] }
        ]
      },
      infoList: []
    };
  },
  components: {
  },
  methods: {
    searchSubmit () {
      departmentList(this.formSearch).then(res => {
        this.tableData = res.data.data;
        // this.list()
      })
    },
    searchCancle () {
      this.formSearch.companyId = this.userCompanyId
      this.listCompanyId = this.userCompanyId
      this.formSearch.isDisabled = ''
      this.list()
    },
    onSubmit () {
      let parentIdMark = ''
      if (this.drawerForm.parentId === '无') {
        parentIdMark = ''
      } else {
        parentIdMark = this.drawerForm.parentId
      }

      this.$refs['Form'].validate((valid) => {
        if (valid) {
          if (this.title === '新增部门') {
            let data = {
              companyId: this.drawerForm.companyId,
              deptType: this.drawerForm.deptType,
              parentId: parentIdMark,
              name: this.drawerForm.name
            }
            departmentAdd(data).then(res => {
            // this.tableData = res.data.data;
              if (res.data.code === 200) {
                this.newDrawer = false
                this.$message({
                  type: 'success',
                  message: '成功!'
                });
                this.list()
              } else {
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              }
            })
          } else if (this.title === '编辑部门') {
            let data = {
              id: this.rowId,
              companyId: this.drawerForm.companyId,
              deptType: this.drawerForm.deptType,
              parentId: parentIdMark,
              name: this.drawerForm.name
            }
            departmentEdit(data).then(res => {
            // this.tableData = res.data.data;
              if (res.data.code === 200) {
                this.newDrawer = false
                this.$message({
                  type: 'success',
                  message: '成功!'
                });
                this.list()
              } else {
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              }
            })
          }
        }
      })
    },
    parentDept () {
      this.superDeptFun()
    },
    unitSearchChange () {
      this.listCompanyId = this.formSearch.companyId
    },
    handleClose (done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {

      //   })
      //   .catch(_ => {});
    },
    // 打开编辑的抽屉框
    isEdit (id) {
      this.rowId = id
      this.title = '编辑部门'
      this.companyDisabled = true
      this.newDrawer = true;
      let data = {
        id: id
      }
      departmentView(data).then(res => {
        this.drawerForm = res.data.data
        this.drawerForm.deptType = res.data.data.deptType.toString()
        if (res.data.data.parentId === 0) {
          this.drawerForm.parentId = '无'
        }
      })
    },
    // 查看详情的抽屉框
    isDetails (row) {
      this.detailId = row.id
      this.viewDrawer = true;
      this.dateOptionFun()
      let data = {
        id: row.id
      }
      departmentView(data).then(res => {
        this.formView = res.data.data
      })
    },
    isChange () {
      this.selst = !this.selst;
    },
    unitSearchFun (val) {
      // this.form.comapnyId = val
    },
    isClosable () {
    },
    showDrawer () {
      this.drawerForm = {
        companyId: this.userCompanyId,
        deptType: '',
        parentId: '',
        name: ''
      }
      this.title = '新增部门'
      this.drawerForm.deptType = '1'
      this.drawerForm.parentId = '无'
      this.companyDisabled = false
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
      this.newDrawer = true
    },
    dateOptionFun () {
      let data = {
        tableName: 'department',
        recordId: this.detailId,
        timeInterval: this.valueDate
      }
      getEditLog(data).then(res => {
        // if (res.data.data.length === 0) {
        //   this.dataLogLength = false
        // } else {
        //   this.dataLogLength = true
        this.infoList = res.data.data;
        // }
      })
    },
    validName (rule, value, callback) {
      if (this.title === '新增部门') {
        let data = {
          companyId: this.superDept.companyId,
          name: value
        }
        departmentCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('部门名称已存在'))
          }
          callback()
        })
      } else if (this.title === '编辑部门') {
        let data = {
          id: this.rowId,
          name: value
        }
        departmentCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('部门名称已存在'))
          }
          callback()
        })
      }
    },
    dictItem () {
      dictItem({ code: 'deptType', showSelectOption: false }).then(res => {
        this.dictItemOptions = res.data.data;
      })
    },
    childCompanyList () {
      let data = {
        id: this.userCompanyId
      }
      this.formSearch.companyId = this.userCompanyId
      childCompanyList(data).then(res => {
        this.optionsCompany = res.data.data;
        this.unitSearch = res.data.data;
      })
    },
    deleteRow (val) {
      let data = {
        id: val
      }
      departmentDelete(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.list()
        } else {
          this.$confirm('该部门下仍存在工作人员，请优先移出工作人员，在尝试该操作。', '删除部门', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        }
      })
    },
    isDisable (val) {
      let data = {
        id: val
      }
      departmentDisable(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '停用成功!'
          });
          this.list()
        } else {
          this.$confirm('该部门下仍存在工作人员，请优先移出工作人员，在尝试该操作。', '停用部门', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        }
      })
    },
    isEnable (val) {
      let data = {
        id: val
      }
      departmentEnable(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '启用成功!'
          });
          this.list()
        } else {
          this.$message.error('启用失败');
        }
      })
    },
    changeCompany (val) {
      this.superDept.companyId = val
      this.superDeptFun()
      this.drawerForm.parentId = '无'
    },
    superDeptFun () {
      departmentList(this.superDept).then(res => {
        this.optionsDept = res.data.data;
        // this.optionsDept = this.optionsDept.unshift('无')
      })
    },
    list () {
      let data = {
        companyId: this.listCompanyId,
        isTree: true
      }

      departmentList(data).then(res => {
        this.tableData = res.data.data;
      })

      // let treeFalse = {
      //   companyId: loginObj.companyId,
      //   isDisabled: 0,
      //   isTree: false
      // }
      // departmentList(treeFalse).then(res => {
      //   this.optionsDept = res.data.data;
      //   // this.optionsDept = this.optionsDept.unshift('无')
      // })
    }
  },
  created () {
    let loginObj = JSON.parse(localStorage.getItem('login'))
    this.userCompanyId = loginObj.companyId
    this.listCompanyId = loginObj.companyId
    this.superDept.companyId = loginObj.companyId
    this.list()
    this.dictItem()
    this.childCompanyList()
    this.superDeptFun()
  }
};
</script>
<style>
:focus{
    outline:0;
}
</style>
<style lang="less" scoped>
.department {
  height: 100%;
    overflow: hidden;
  .main {
    background-color: #fff;
    padding: 0 16px;
    height: calc(100% - 111px);
    overflow: auto;
    box-sizing: border-box;
    .Inquire {
      /deep/.el-form {
        /deep/.el-form-item {
          /deep/ .el-form-item__content {
            width: 100%;
            /deep/ .el-select {
              width: 100%;
            }
          }
        }
      }
      /deep/.el-col{
        padding-right: 10px !important;
      }
    }
    /deep/
      .el-table
      .el-table__header-wrapper
      .el-table__header
      .has-gutter
      tr
      th {
      background-color: rgba(245, 247, 250, 1) !important;
    }
  }
  .span {
    cursor: pointer;
  }
  .span:hover {
    text-decoration: underline;
    color: #237bff;
  }
  /deep/.el-drawer.rtl {
      box-shadow: none;
      border-left: 1px solid #eee;
    }
  /deep/.el-drawer__wrapper {
    position: fixed;
    top: 104px;
    right: 0;
    left: 304px;
    bottom: 0;
    /deep/.el-drawer {
      width: 100% !important;
      /deep/ .el-drawer__header {
        margin: 0;
        padding: 24px 30px;
        border-bottom: 1px solid #e4e7ed;
        span {
          color: #303133;
          cursor: not-allowed;
          pointer-events: none;
          border: none;
        }
      }
      /deep/.el-drawer__body {
        position: relative;

        /deep/.el-form {
          padding: 0 340px;
          box-sizing: border-box;
          padding-top: 32px;
          .el-form-item {
            margin-bottom: 10px;
            /deep/ .el-form-item__label {
              color: #909399;
            }
            .el-form-item__content {
              width: 100%;
              margin-left: 0 !important;
              .el-select {
                width: 100%;
              }
            }
          }
        }
        /deep/ .demo-drawer__footer {
          position: absolute;
          bottom: 0;
          right: 10px;
          height: 64px;
          padding: 12px 0;
          box-sizing: border-box;
          width: 100%;
          border-top: 1px solid #e4e7ed;
        }
      }
    }
  }
  .info {
    padding-right: 30px;
    .el-form {
      /deep/.el-form-item {
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(228, 231, 237, 1);
      }
    }
  }
  .dynamic {
    padding-left: 16px;
    padding-right: 10px;
    .all {
      height: 48px;
      line-height: 48px;
      width: 100%;
      padding-left: 15px;
      box-sizing: border-box;
      position: relative;
      background-color: rgba(245, 247, 250, 1);
      span {
        width: 64px;
        height: 16px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(48, 49, 51, 1);
      }
      .el-select {
        position: absolute;
        top: 8px;
        right: 16px;
        height: 32px !important;
        /deep/ .el-input {
          height: 100%;
          .el-input__inner {
            height: 100%;
            position: relative;
            top: -7px;
            right: 0;
          }
          /deep/ .el-input__suffix {
            display: none !important;
          }
        }
      }
      .arrow {
        position: absolute;
        top: 16px;
        right: 22px;
        // font-size: 18px;
      }
    }
    .box {
      height: 320px;
      overflow-x: hidden;
      overflow-y: scroll;
      .allInfo {
        height: 72px;
        padding: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(228, 231, 237, 1);
        .top {
          overflow: hidden;
          .oper {
            float: left;
            font-size: 14px;
          }
          .infoTime {
            float: right;
          }
        }
        .bottom span{
          font-size: 14px;
        }
      }
    }
  }
}

</style>

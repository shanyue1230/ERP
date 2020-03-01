<template>
  <div class="employee">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>共享权限</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <div class="xf-right">
        <div style="margin-top:20px;margin-bottom: 20px;">
          <el-button type="primary" @click="showDrawer">新增共享规则</el-button>
        </div>
          <!-- 表格 -->
          <el-table
            :data="tableData"
            :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id">
              <el-table-column type="index" label="No.">
              </el-table-column>
              <el-table-column
                label="共享数据"
                prop="menuName"
                >
              </el-table-column>
              <el-table-column
                label="共享范围"
                min-width="100%"
                prop=""
                >
                 <template v-slot="scope">
                      <span v-for="(item,index) in scope.row.sharedScope" :key="index"><span v-if="item" class="sharedScopeCon">{{item}}</span></span>
                  </template>
              </el-table-column>
              <el-table-column
                prop=""
                label="操作"
                width="150px"
                >
                <template v-slot="scope">
                  <div class="operation">
                      <span @click="showEditDialog(scope.row.id)">编辑</span>
                      <el-divider direction="vertical"></el-divider>
                      <span @click="showDelete(scope.row)">删除</span>
                    </div>
                  </template>
              </el-table-column>
          </el-table>

          <!-- 分页器 -->
          <el-pagination
            :page-sizes="[20, 50, 100]"
            :page-size="pageSizeShare"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalShare"
            @size-change="handleSizeChangeTotal"
            @current-change="handleCurrentChangeTotal"
            style="margin-top:15px"
          ></el-pagination>

          <!-- 新增抽屉 -->
          <el-drawer
          :title="title"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <el-form  :model="formLabelAlign" :rules="ruleForm" ref="Form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="数据来源" prop="companyId">
                  <el-input type="text" v-model="companyName" placeholder="请输入数据来源" :disabled="true"></el-input>
                </el-form-item>
                <div class="title">
                  <span>共享至企业机构</span>
                </div>
                <el-button type="primary" @click="shareCompany" style="margin:16px 0px">新增</el-button>
                <!-- 表格 -->
                <el-table
                  :data="tableCompanyList"
                  :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  ref= "multipleTempCompany"
                  @selection-change="changeCom">
                    <el-table-column
                      type="selection"
                      >
                    </el-table-column>
                    <el-table-column type="index" label="No.">
                    </el-table-column>
                    <el-table-column
                      label="共享企业机构"
                      prop="name"
                      >
                    </el-table-column>
                    <el-table-column
                      prop=""
                      min-width="100%"
                      label="操作"
                      >
                      <template v-slot="scope">
                        <div class="operation">
                            <span @click="showDeleteCompany(scope.$index)">删除</span>
                          </div>
                        </template>
                    </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <el-form-item label="共享数据" prop="listByShared">
                      <el-select  placeholder="全部" v-model="formLabelAlign.listByShared">
                        <el-option
                          v-for="item in listBySharedOption"
                          :key="item.value"
                          :label="item.caption"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                </el-form-item>
                <div class="title">
                  <span>共享至部门</span>
                </div>
                <el-button type="primary" @click="shareDept" style="margin:16px 0px">新增</el-button>
                <!-- 表格 -->
                <el-table
                  :data="tableDeptList"
                  :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  ref="multipleTempDept"
                  @selection-change="changeDept">
                    <el-table-column
                      type="selection"
                      >
                    </el-table-column>
                    <el-table-column type="index" label="No.">
                    </el-table-column>
                    <el-table-column
                      label="共享部门"
                      prop="name"
                      >
                    </el-table-column>
                    <el-table-column
                      prop=""
                      min-width="100%"
                      label="操作"
                      >
                      <template v-slot="scope">
                        <div class="operation">
                            <span @click="showDeleteDept(scope.$index)">删除</span>
                          </div>
                        </template>
                    </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-form>
          <div class="saveAndCancle">
            <el-button @click="drawer = false">取消</el-button>
            <el-button @click="onSubmit" type="primary">确认</el-button>
          </div>
          <!-- <el-button  @click="drawer = false" style="margin: 15px 32px 0 15px;float: right;">取消</el-button>
          <el-button  @click="onSubmit" type="primary" style="margin: 15px 15px 0 15px;float: right;">确认</el-button> -->
        </el-drawer>

        <!-- 选择企业机构 -->
        <el-dialog title="选择企业机构" :visible.sync="selectComDialog" width="530px">
          <el-form :label-position="labelPosition">
            <el-form-item label="企业类型" style="margin-bottom:20px;">
             <el-select  v-model="companyTypeValue" placeholder="全部" @change="companyTypeChange">
                <el-option
                  v-for="item in companyType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
                </el-select>
            </el-form-item>
            <!-- 表格 -->
            <el-table
              :data="getSharedCompanyOption"
              :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
              style="width: 100%;margin-bottom: 20px;"
              :row-key="getRowComKey"
              ref="getSharedCompanyRef"
              @selection-change="selectListCom">
                <el-table-column
                  type="selection"
                  :reserve-selection="true"
                  >
                </el-table-column>
                <el-table-column type="index" label="No.">
                </el-table-column>
                <el-table-column
                  label="企业机构"
                  prop="name"
                  >
                </el-table-column>
            </el-table>
            <div class="block">
              <!-- 分页器 -->
              <el-pagination
                :page-sizes="[20, 50, 100]"
                :page-size="pageSizeCom"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCom"
                @size-change="handleSizeChangeCom"
                @current-change="handleCurrentChangeCom"
                style="margin-top:15px;"
              ></el-pagination>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="selectComDialog = false">取 消</el-button>
            <el-button type="primary" @click="createCom">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 选择部门 -->
        <el-dialog title="选择部门" :visible.sync="selectDeptDialog" width="530px">
          <el-form :label-position="labelPosition">
            <el-form-item label="共享企业" style="margin-bottom:20px;">
              <el-select  v-model="sharedCompanyValue" placeholder="全部" @change="sharedCompanyChange">
                <el-option
                  v-for="item in sharedCompany"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
                </el-select>
            </el-form-item>
            <!-- 表格 -->
            <el-table
              :data="getSharedDeptOption"
              :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
              style="width: 100%;margin-bottom: 20px;"
              :row-key="getRowDeptKey"
              ref="getSharedDeptRef"
              @selection-change="selectListDept">
                <el-table-column
                  type="selection"
                  :reserve-selection="true"
                  >
                </el-table-column>
                <el-table-column type="index" label="No.">
                </el-table-column>
                <el-table-column
                  label="企业机构"
                  prop="name"
                  >
                </el-table-column>
                <el-table-column
                  label="部门名称"
                  prop="name"
                  >
                </el-table-column>
            </el-table>
            <div class="block">
              <!-- 分页器 -->
              <el-pagination
                :page-sizes="[20, 50, 100]"
                :page-size="pageSizeDept"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalDept"
                @size-change="handleSizeChangeDept"
                @current-change="handleCurrentChangeDept"
                style="margin-top:15px"
              ></el-pagination>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="selectDeptDialog = false">取 消</el-button>
            <el-button type="primary" @click="selectDept">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { dataRuleList, getSharedCompany, getSharedDept, dictItem, listByShared, dataRuleAdd, dataRuleDelete, dataRuleView, dataRuleEdit } from '../../api/getData';
export default {
  data () {
    return {
      title: '',
      direction: 'rtl',
      rowId: '',
      companyTypeValue: '',
      sharedCompanyValue: '',
      companyName: '',
      drawer: false,
      selectComDialog: false,
      selectDeptDialog: false,
      labelPosition: 'right',
      pageSizeCom: 20,
      pageSizeDept: 20,
      pageSizeShare: 20,
      totalCom: 0,
      totalDept: 0,
      totalShare: 0,
      handleSizeChangeComNum: 20,
      handleCurrentChangeComNum: 1,
      handleSizeChangeDeptNum: 20,
      handleCurrentChangeDeptNum: 1,
      handleCurrentChangeTotalNum: 1,
      handleSizeChangeTotalNum: 20,
      getSharedCompanyOption: [],
      getSharedDeptOption: [],
      changeComSelected: [],
      changeDeptSelected: [],
      selectedCom: [],
      selectedDept: [],
      tableData: [],
      sharedCompany: [],
      tableCompanyList: [],
      tableDeptList: [],
      tableCompanyListTemp: [],
      tableDeptListTemp: [],
      listBySharedOption: [],
      currentCompanyId: '',
      userCompanyId: '',
      formLabelAlign: {
        listByShared: ''
      },
      tableDataCompany: [],
      companyType: [],
      // 表单验证
      ruleForm: {
        listByShared: [
          { required: true, message: '请选择共享数据', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getRowComKey (row) {
      return row.id
    },
    getRowDeptKey (row) {
      return row.id
    },
    onSubmit () {
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          if (this.title === '新建共享规则') {
            let data = {
              sourceCompanyId: this.userCompanyId,
              targetMenuId: this.formLabelAlign.listByShared,
              companyIds: this.changeComSelected,
              departmentIds: this.changeDeptSelected
            }
            dataRuleAdd(data).then(res => {
              if (res.data.code === 200) {
                this.drawer = false
                this.list()
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
              }
            })
          } else {
            let data = {
              id: this.rowId,
              sourceCompanyId: this.userCompanyId,
              targetMenuId: this.formLabelAlign.listByShared,
              companyIds: this.changeComSelected,
              departmentIds: this.changeDeptSelected
            }
            dataRuleEdit(data).then(res => {
              if (res.data.code === 200) {
                this.drawer = false
                this.list()
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
              }
            })
          }
        }
      })
    },
    selectCom () {

    },
    createCom () {
      this.tableCompanyList = this.tableCompanyList.concat(this.tableCompanyListTemp)
      let arr = this.tableCompanyList
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {
            arr.splice(j, 1);
            // 因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            j--;
          }
        }
      }
      this.tableCompanyList = arr
      this.tableCompanyList.forEach((ele, indexItem) => {
        this.$nextTick(() => {
          this.$refs.multipleTempCompany.toggleRowSelection(this.tableCompanyList[indexItem], true);
        })
      })

      this.selectComDialog = false
    },
    selectDept () {
      if (this.tableDeptList) {
        this.tableDeptList = this.tableDeptList.concat(this.tableDeptListTemp)
      } else {
        this.tableDeptList = this.tableDeptListTemp
      }

      let temp = []; // 一个新的临时数组
      for (let i = 0; i < this.tableDeptList.length; i++) {
        if (temp.indexOf(this.tableDeptList[i]) === -1) {
          temp.push(this.tableDeptList[i]);
        }
      }
      // this.tableDeptList = temp

      let arr = this.tableDeptList
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) {
            arr.splice(j, 1);
            // 因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
            j--;
          }
        }
      }
      this.tableDeptList = arr
      this.tableDeptList.forEach((ele, indexItem) => {
        this.$nextTick(() => {
          this.$refs.multipleTempDept.toggleRowSelection(this.tableDeptList[indexItem], true);
        })
      })
      this.selectDeptDialog = false
    },
    showEditDialog (val) {
      this.rowId = val
      this.drawer = true
      this.title = '编辑共享规则'
      let data = {
        id: val
      }
      dataRuleView(data).then(res => {
        let CompanyList = res.data.data.companyItems
        let companyTemp = []
        CompanyList.forEach((ele, indexItem) => {
          companyTemp.push({
            id: CompanyList[indexItem].targetCompanyId,
            name: CompanyList[indexItem].companyName
          })
        })
        this.tableCompanyList = companyTemp
        this.tableCompanyList.forEach((ele, indexItem) => {
          this.$nextTick(() => {
            this.$refs.multipleTempCompany.toggleRowSelection(this.tableCompanyList[indexItem], true);
          })
        })

        let DeptList = res.data.data.deptItems
        DeptList.forEach((ele, indexItem) => {
          DeptList[indexItem].id = DeptList[indexItem].targetDeptId
          DeptList[indexItem].name = DeptList[indexItem].deptName
        })
        this.tableDeptList = DeptList
        this.tableDeptList.forEach((ele, indexItem) => {
          this.$nextTick(() => {
            this.$refs.multipleTempDept.toggleRowSelection(this.tableDeptList[indexItem], true);
          })
        })
        this.formLabelAlign.listByShared = res.data.data.targetMenuId
      })
    },
    showDelete (val) {
      let data = {
        id: val.id
      }
      dataRuleDelete(data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.list()
        }
      })
    },
    showDeleteCompany (index) {
      this.tableCompanyList.splice(index, 1)
    },
    showDeleteDept (index) {
      this.tableDeptList.splice(index, 1)
    },
    showDetailDialog () {

    },
    shareCompany () {
      this.handleCurrentChangeComNum = 1
      this.handleSizeChangeComNum = 10
      this.companyTypeValue = ''
      // this.getSharedCompany()
      this.companyTypeChange('')
      this.selectComDialog = true
      this.getSharedCompanyOption.forEach((ele, indexItem) => {
        this.$nextTick(() => {
          this.$refs.getSharedCompanyRef.toggleRowSelection(this.getSharedCompanyOption[indexItem], false);
        })
      })
    },
    shareDept () {
      this.handleCurrentChangeDeptNum = 0
      this.handleSizeChangeDeptNum = 10
      this.currentCompanyId = this.userCompanyId
      this.sharedCompanyValue = ''
      // this.getSharedDept()
      this.sharedCompanyChange()

      this.selectDeptDialog = true
      this.getSharedDeptOption.forEach((ele, indexItem) => {
        this.$nextTick(() => {
          this.$refs.getSharedDeptRef.toggleRowSelection(this.getSharedDeptOption[indexItem], false);
        })
      })
    },
    showDrawer () {
      this.drawer = true
      this.changeComSelected = [];
      this.changeDeptSelected = [];
      this.title = '新建共享规则'
      this.formLabelAlign.listByShared = ''
      this.tableCompanyList = []
      this.tableDeptList = []
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
    },
    handleSizeChangeCom (val) {
      this.handleSizeChangeComNum = val
      this.getSharedCompany()
    },
    handleCurrentChangeCom (val) {
      this.handleCurrentChangeComNum = val
      this.getSharedCompany()
    },
    handleSizeChangeDept (val) {
      this.handleSizeChangeDeptNum = val
      this.getSharedDept()
    },
    handleCurrentChangeDept (val) {
      this.handleCurrentChangeDeptNum = val
      this.getSharedDept()
    },
    handleSizeChangeTotal (val) {
      this.handleSizeChangeTotalNum = val
    },
    handleCurrentChangeTotal (val) {
      this.handleCurrentChangeTotalNum = val
    },
    companyTypeChange () {
      this.getSharedCompany()
    },
    sharedCompanyChange () {
      this.currentCompanyId = this.sharedCompanyValue
      this.getSharedDept()
    },
    changeCom (val) {
      let arr = []
      val.forEach(item => {
        arr.push(item.id);
      })
      this.changeComSelected = arr
    },
    changeDept (val) {
      let arr = []
      val.forEach(item => {
        arr.push(item.id);
      })
      this.changeDeptSelected = arr
    },
    selectListCom (val) {
      let arr = [];
      val.forEach(item => {
        arr.push({
          id: item.id,
          name: item.name
        });
      })
      this.tableCompanyListTemp = arr
    },
    selectListDept (val) {
      this.tableDeptListTemp = val
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      // this.drawer = false
    },
    // 被选中的单位名称
    selectUnit (date) {
      console.log(date)
    },
    // 是否展开
    expand () {
      this.show = !this.show
    },
    pickerOptionsStart (t) {
      console.log(t)
    },
    sharedCompanyFun () {
      let data = {
        isPage: false
      }
      getSharedCompany(data).then(res => {
        this.sharedCompany = res.data.data;
      })
    },
    listByShared () {
      listByShared().then(res => {
        this.listBySharedOption = res.data.data
      })
    },
    dictItem () {
      // 共享企业
      dictItem({ code: 'companyType', showSelectOption: false }).then(res => {
        this.companyType = res.data.data
      })
    },
    getSharedCompany () {
      let data = {
        isPage: true,
        page: this.handleCurrentChangeComNum,
        limit: this.handleSizeChangeComNum,
        type: this.companyTypeValue
      }
      getSharedCompany(data).then(res => {
        this.getSharedCompanyOption = res.data.data.records;
        this.totalCom = res.data.data.total
      })
    },
    getSharedDept () {
      let data = {
        page: this.handleCurrentChangeDeptNum,
        limit: this.handleSizeChangeDeptNum,
        companyId: this.currentCompanyId
      }
      getSharedDept(data).then(res => {
        this.getSharedDeptOption = res.data.data.records;
        this.totalDept = res.data.data.total
      })
    },
    list () {
      let data = {
        page: this.handleCurrentChangeTotalNum,
        limit: this.handleSizeChangeTotalNum
      }
      dataRuleList(data).then(res => {
        this.tableData = res.data.data.records;
        this.totalShare = res.data.data.total
      })
    }

  },
  components: {

  },
  created () {
    let loginObj = JSON.parse(localStorage.getItem('login'))
    this.companyName = loginObj.companyName
    this.currentCompanyId = loginObj.companyId
    this.userCompanyId = loginObj.companyId
    this.list()
    this.getSharedCompany()
    this.getSharedDept()
    this.dictItem()
    this.listByShared()
    this.sharedCompanyFun()
  }
}
</script>
<style>
:focus{
    outline:0;
}
</style>
<style lang="less" scoped>
.employee {
  height: calc(100% - 50px);
  display: flex;
  flex-flow: column;
  overflow: hidden;
  // position: relative;
}
.sharedScopeCon{
    border: 1px solid #E9E9EB;
    background: #F4F4F5;
    padding: 5px 10px;
    display: inline-block;
    margin-right: 8px;
    margin-top: 5px;
    border-radius: 3px;
}
  .xf-main {
    flex: 1;
    display: flex;
    height: 100%;
    border-left: 1px solid #eee;

    .xf-right {
      flex: 1;
     height: calc(100% - 65px);
     overflow: auto;
      background-color: #fff;
      border-left: 1px solid #eee;
      padding: 0 15px;
      .el-col:nth-child(-n+3) {
        padding-right: 10px;
      }
      /deep/.el-form-item__content {
        width: 100%;
      }
      /deep/.el-select {
        width: 100% !important;
      }

    }
  }
.el-drawer__wrapper {
  position: fixed;
  z-index: 300;
  top: 105px;
  right: 0;
  width: 100%;
  height: calc(100% - 105px);
      .title {
      height: 48px;
      line-height: 46px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(48,49,51,1);
      border-bottom: 1px solid #eee;
      margin-top: 20px;
      span {
        display: inline-block;
        padding: 0 5px;
        height: 48px;
        border-bottom: 1px solid #237BFF;
      }
    }
  .el-form {
    height: calc(100% - 65px);
    overflow-y: scroll;
    overflow-x: hidden;
    border-bottom: 1px solid #eee;
    padding-bottom: 65px;
  }
  .saveAndCancle {
    width: 100%;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background: #fff;
    height: 65px;
    padding-left: 40px;
    padding-right: 34px;
    .el-button {
      margin-left: 20px;
      float: right;
      margin-top: 13px;
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
    padding-left: 32px;
    height: 100%;
  }
  /deep/.el-drawer__header {
    height: 64px;
    box-sizing: border-box;
    padding-top: 0;
    font-size: 16px;
    font-weight: 500;
    color: rgba(48, 49, 51, 1);
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

  .el-form-item {
    margin-bottom: 0;
    width: 100%;
    margin: 0;
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
.saveAndCancle {
    width: 100%;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background: #fff;
    height: 65px;
    padding-left: 40px;
    padding-right: 34px;
    z-index: 9999;
    .el-button {
      margin-left: 20px;
      float: right;
      margin-top: 13px;
    }
  }

   /*滚动条样式*/

  ::-webkit-scrollbar {
    /*滚动条整体样式*/

    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/

    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    border-radius: 5px;

    background: rgba(122, 140, 162, 1);
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/

    border-radius: 0;
    // display: none;
    background: rgba(0, 0, 0, 0.1);
  }
  .operation span:hover{
     text-decoration: underline;
     cursor:pointer;
     color: #237BFF;
  }
</style>

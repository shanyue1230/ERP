<template>
  <div class="contai">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
      <el-breadcrumb-item>行政机构管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体 -->
    <div class="major">
      <el-button type="primary" @click="showAddDialog">新增</el-button>
      <el-button type="primary" @click="forbiddenUse(tableData)">停用</el-button>
      <el-button type="primary" @click="startUse(tableData)">启用</el-button>

      <!-- 新增对话框 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="560px">
        <el-form :label-position="labelPosition"  :model="formLabelAlign" :rules="ruleForm" ref="Form">
          <el-form-item label="行政市区：" prop="regionLocaleIdsArr">
             <el-cascader
              style="width:100%"
              v-model="formLabelAlign.regionLocaleIdsArr"
              :options="optionsRegion"
              @change="changeCascader"
              :props="{ checkStrictly: true,expandTrigger: 'hover',value:'parentIds',label:'name',children:'regionLocales' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="机构分类：" prop="dictItemValue">
            <el-select v-model="formLabelAlign.dictItemValue" placeholder="请选择机构分类" @focus="focusDictItem" @change="changeDictItem" style="width:100%">
              <el-option v-for="(item,index) in dictItemOptions" :key="index" :label="item.name" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构名称：" prop="name">
            <el-input v-model.trim="formLabelAlign.name" @input="toNameInform" placeholder="请填写机构名称"></el-input>
          </el-form-item>
          <el-form-item label="机构编码：" prop="prefix">
            <el-input v-model.trim="formLabelAlign.prefix" @input="toPrefixInform" placeholder="请填写机构编码"></el-input>
          </el-form-item>
          <el-form-item label="上级机构：">
            <el-select v-model="superiorId" placeholder="请选择上级机构" @focus="focusSuperior" @change="changeSuperior" style="width:100%">
                <el-option  v-for="(item,index) in superiorOptions" :key="index"  :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="联系电话：">
            <el-input v-model.trim="formLabelAlign.phoneNumber"  placeholder="请填写联系电话"></el-input>
          </el-form-item>
           <el-form-item label="所在地址：">
            <el-input v-model="formLabelAlign.address" placeholder="请填写所在地址" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 详情对话框 -->
      <el-dialog title="查看详情" :visible.sync="dialogDetailVisible" class="dialog-detail" width="900px" :rules="ruleForm">
        <el-row :gutter="0">
          <el-col :span="12" class="grid-right">
            <div class="grid-content bg-purple">
                <el-form :label-position="labelPosition" label-width="80px" :model="formDetail">
                  <el-form-item label="行政市区">
                    {{formDetail.regionLocaleName}}
                  </el-form-item>
                  <el-form-item label="机构分类">
                    {{formDetail.dictItemName}}
                  </el-form-item>
                  <el-form-item label="机构名称">
                    {{formDetail.name}}
                  </el-form-item>
                  <el-form-item label="机构编码">
                    {{formDetail.prefix}}
                  </el-form-item>
                  <el-form-item label="上级机构">
                    {{formDetail.superior}}
                  </el-form-item>
                  <el-form-item label="联系电话">
                    {{formDetail.phoneNumber}}
                  </el-form-item>
                  <el-form-item label="所在地址">
                    {{formDetail.address}}
                  </el-form-item>
                </el-form>
            </div>
          </el-col>
          <el-col :span="12" class="grid-left">
            <div class="grid-content">
                <el-row type="flex" class="row-bg title-bg" justify="space-between">
                  <el-col :span="14">
                    <div class="grid-content">所有动态</div>
                  </el-col>
                  <el-col :span="10"><div class="grid-content">
                    <el-select v-model="valueDate" placeholder="请选择" class="date-type" @change="dateOptionFun">
                      <el-option
                        v-for="item in dateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                      </el-option>
                    </el-select>
                    </div>
                  </el-col>
                </el-row>
                 <el-row type="flex" v-for ="(item,index) in dataLog" :key="index" v-show="dataLogLength" class="row-bg action-detail" justify="space-between" >
                  <el-col :span="12">
                    <div class="grid-content" v-show= "item.isCreated">
                      {{item.editor}} 创建了 行政机构
                    </div>
                    <div class="grid-content"  v-show= "item.isCreated">
                     <span> 创建 行政机构</span>
                    </div>
                    <div class="grid-content"  v-show= "!item.isCreated">
                      {{item.editor}} 修改了 行政机构
                    </div>
                     <div class="grid-content"  v-show= "!item.isCreated">
                       修改 <span>{{item.fieldName}}</span>
                    </div>
                  </el-col>
                  <el-col :span="12" style="text-align: right;">
                    <div class="grid-content">
                      {{item.editTime}}
                    </div>
                  </el-col>
                </el-row>
                <el-row v-show="!dataLogLength">
                  <el :span="24" style="text-align:center;">
                   <div style="margin-top:5px">暂无数据</div>
                  </el>
                </el-row>
              </div>
            </el-col>
        </el-row>
      </el-dialog>

      <!-- 启用机构 -->
      <el-dialog title="启用机构" :visible.sync="enableVisible" class="enable-dialog" width="425px">
        <el-row :gutter="0">
          <el-col>
            <div class="el-icon-warning"></div>
            <p style="padding-left: 36px;padding-top: 2px;">启用该机构，是否同步启用该机构下所属部门。</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="padding-top: 16px;">
          <el-col :span="12">
            <span style="padding-left: 10px;">
              <el-checkbox v-model="checkedOrg">仅启用机构</el-checkbox>
            </span>
          </el-col>
          <el-col :span="12">
            <div style="padding: 5px 15px 0;text-align: right;">
              <el-button @click="enableCancle" size="small">取消</el-button>
              <el-button type="primary" @click="enableButton" size="small">确定</el-button>
            </div>
          </el-col>
        </el-row>
      </el-dialog>

      <!-- 表格 -->
       <el-table
        :data="tableData"
        :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        fit
        default-expand-all
        :tree-props="{children: 'companys', hasChildren: 'hasChildren'}">
        <el-table-column
          type=""
          width="40">
            <template  slot-scope="scope">
                <el-checkbox v-model="scope.row.checked"  @change="changeCheckbox(scope.row.checked,scope.row.id)"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="机构名称"
            :show-overflow-tooltip='true'
            width="280">
        </el-table-column>
        <el-table-column
          prop="dictItemName"
          label="分类"
          min-width="100%"
         >
        </el-table-column>
        <el-table-column
          prop="totalNumber"
          min-width="100%"
          label="人数">
        </el-table-column>
         <el-table-column
          prop="regionLocaleName"
          min-width="100%"
          label="省市区">
        </el-table-column>
          <el-table-column
          prop="isDisabledName"
          min-width="100%"
          label="状态">
            <template v-slot="scope">
              <div v-if="scope.row.isDisabled == 1" class="box" style="color:red">
                 停用
              </div>
              <div v-else-if="scope.row.isDisabled == 0" class="box" style="color:green">
                 正常
              </div>
            </template>
        </el-table-column>
         <el-table-column
          prop="operate"
          min-width="100%"
          label="操作">
          <template v-slot="scope">
           <div class="operation">
              <span @click="showEditDialog(scope.row)">编辑</span>
              <el-divider direction="vertical"></el-divider>
              <span @click="showDetailDialog(scope.row)">查看详情</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { companyList, getRegionLocale, dictItem, nameCheckName, nameCheckCode, officeAdd, enable, disable, getEditLog, companyView, officeEdit } from '../../api/getData';
export default {
  data () {
    return {
      checkedOrg: false,
      checked: true,
      superiorId: '',
      valueDate: 0,
      detailId: '',
      dataLog: [],
      regionLocaleIdsArrlen: 0,
      dateOptions: [{
        value: 0,
        label: '近一周'
      }, {
        value: 1,
        label: '近一月'
      }, {
        value: 2,
        label: '近一年'
      }],
      optionsRegion: [],
      dictItemOptions: [],
      superiorOptions: [],
      formDetail: {
        regionLocaleName: '',
        dictItemName: '',
        name: '',
        prefix: '',
        superior: '',
        phoneNumber: '',
        address: ''
      },
      dataLogLength: true,
      // 对话框标题
      title: '',
      // 表格数据
      tableData: [],
      superiorParam: { type: '1', isTree: false, dictItemValue: '' },
      // 增加对话框数据
      formLabelAlign: {
        regionLocaleIdsArr: '1,',
        regionLocaleIds: '1,',
        dictItemValue: '',
        name: '',
        prefix: '',
        type: 1,
        parentId: '',
        parentIds: '',
        address: '',
        phoneNumber: ''
      },
      checkedList: [],
      arrCheckedTrue: [],
      currentEditId: '',
      validcodeNameData: {
        id: 0,
        name: ''
      },
      validcodePrefixData: {
        id: 0,
        prefix: ''
      },
      dialogFormVisible: false,
      dialogDetailVisible: false,
      enableVisible: false,
      labelPosition: 'right',
      // 表单验证
      ruleForm: {
        regionLocaleIdsArr: [
          { required: true, message: '请选择行政市区', trigger: 'blur' }
        ],
        dictItemValue: [
          { required: true, message: '请选择机构分类', trigger: ['blur'] }
        ],
        name: [
          { required: true, message: '请输入机构名称', trigger: ['change'] },
          { min: 5, max: 20, message: '至少输入5到20位字符', trigger: ['change'] },
          { validator: this.validcodeName, trigger: ['change'] }
        ],
        prefix: [
          { required: true, min: 3, max: 12, message: '至少输入3到12位字符', trigger: ['change'] },
          { validator: this.validcoding, trigger: ['change'] }
        ],
        phoneNumber: [
          { validator: this.validPhone, trigger: ['change'] }
        ]
      }
    }
  },
  components: {
  },
  methods: {
    onSubmit () {

    },
    toNameInform (val) {
      this.validcodeNameData.name = val
    },
    toPrefixInform (val) {
      this.validcodePrefixData.prefix = val
    },
    // 展示新增对话框
    showAddDialog () {
      this.dialogFormVisible = true
      this.title = '新建行政机构'
      this.superiorId = ''
      this.formLabelAlign = {
        id: 0,
        regionLocaleIdsArr: '1,',
        regionLocaleIds: '1,',
        dictItemValue: '',
        name: '',
        prefix: '',
        type: 1,
        parentId: '',
        parentIds: '',
        address: '',
        phoneNumber: ''
      }
      // 重置表单
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
    },
    // 展示编辑对话框
    showEditDialog (row) {
      this.listSuperion()
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.clearValidate();
      }
      this.dialogFormVisible = true
      this.title = '编辑行政机构'
      let regionLocaleIdsStr = row.regionLocaleIds
      this.currentEditId = row.id
      let arr = regionLocaleIdsStr.split(',')
      var m = [];
      for (var i = 0; i < arr.length - 1; i++) {
        m.push(arr[i]);
      }
      let regionArr = [];
      if (m.length === 1) {
        regionArr[0] = m[0] + ','
      }
      if (m.length === 2) {
        regionArr[0] = m[0] + ','
        regionArr[1] = row.regionLocaleIds
      }
      if (m.length === 3) {
        regionArr[0] = m[0] + ','
        regionArr[1] = m[0] + ',' + m[1] + ','
        regionArr[2] = row.regionLocaleIds
      }

      this.validcodeNameData.name = row.name
      this.validcodePrefixData.prefix = row.prefix

      this.formLabelAlign.regionLocaleIdsArr = regionArr
      this.formLabelAlign.name = row.name
      this.formLabelAlign.prefix = row.prefix
      this.formLabelAlign.dictItemValue = row.dictItemValue.toString()
      if (row.parentId) {
        this.superiorId = row.parentId
      } else {
        this.superiorId = ''
      }
      this.formLabelAlign.parentId = row.parentId
      this.formLabelAlign.parentIds = row.parentIds
      if (row.dictItemValue === 1) {
        this.superiorId = ''
        this.superiorOptions = []
      }
      this.superiorParam.dictItemValue = row.dictItemValue - 1
      this.formLabelAlign.phoneNumber = row.phoneNumber
      this.formLabelAlign.address = row.address
    },
    showDetailDialog (row) {
      this.detailId = row.id
      this.dialogDetailVisible = true
      this.dateOptionFun()
      let data = {
        id: this.detailId
      }
      companyView(data).then(res => {
        this.formDetail = res.data.data
        if (res.data.data.supervisionCompanyList.length === 0) {
          this.formDetail.superior = '无'
        } else {
          this.formDetail.superior = res.data.data.supervisionCompanyList[0].name
        }
      })
    },
    dateOptionFun () {
      let data = {
        tableName: 'administration',
        recordId: this.detailId,
        timeInterval: this.valueDate
      }
      getEditLog(data).then(res => {
        if (res.data.data.length === 0) {
          this.dataLogLength = false
        } else {
          this.dataLogLength = true
          this.dataLog = res.data.data;
        }
      })
    },
    changeCascader () {
      this.regionLocaleIdsArrlen = this.formLabelAlign.regionLocaleIdsArr.length
      // this.formLabelAlign.dictItemValue = ''
      // this.superiorId = ''
    },
    changeCheckbox (checked, id) {
      if (checked === true) {
        if (this.arrCheckedTrue.indexOf(id) === -1) {
          this.arrCheckedTrue.push(id);
        }
      }
      if (checked === false) {
        let index = this.arrCheckedTrue.indexOf(id);
        if (index > -1) { // 大于0 代表存在，
          this.arrCheckedTrue.splice(index, 1);// 存在就删除
        }
      }
    },
    forbiddenUse (val) {
      if (this.arrCheckedTrue.length === 0) {
        this.$message.error('请选择要停用的列表')
      } else {
        this.$confirm('停用该机构，将同步停用该机构下所属部门，是否确认停用。', '停用机构', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disable(this.arrCheckedTrue).then(res => {
            if (res) {
              this.list()
              this.arrCheckedTrue = []
              this.$message({
                type: 'success',
                message: '停用成功!'
              });
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消停用'
          // });
        });
      }
    },
    startUse (val) {
      this.checkedOrg = false;
      if (this.arrCheckedTrue.length === 0) {
        this.$message.error('请选择要启用的列表')
      } else {
        this.enableVisible = true;

        // this.$confirm('启用该机构，将同步启用该机构下所属部门，是否确认启用。', '启用机构', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   enable(this.arrCheckedTrue).then(res => {
        //     if (res) {
        //       this.list()
        //       this.arrCheckedTrue = []
        //       this.$message({
        //         type: 'success',
        //         message: '启用成功!'
        //       });
        //     }
        //   })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消启用'
        //   });
        // });
      }
    },
    enableButton () {
      let data = {
        ids: this.arrCheckedTrue,
        isEnableDept: this.checkedOrg
      }
      enable(data).then(res => {
        if (res) {
          this.list()
          this.enableVisible = false
          this.arrCheckedTrue = []
          this.$message({
            type: 'success',
            message: '启用成功!'
          });
        }
      })
    },
    enableCancle () {
      this.enableVisible = false
    },
    // 自定义表单校验
    validcodeName (rule, value, callback) {
      if (this.title === '编辑行政机构') {
        let data = {
          id: this.currentEditId,
          name: this.validcodeNameData.name
        }
        nameCheckName(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('机构名称已存在'))
          }
          callback()
        })
      } else if (this.title === '新建行政机构') {
        let data = {
          id: 0,
          name: this.validcodeNameData.name
        }
        nameCheckName(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('机构名称已存在'))
          }
          callback()
        })
      }
    },
    validcoding (rule, value, callback) {
      if (this.title === '编辑行政机构') {
        let data = {
          id: this.currentEditId,
          prefix: this.validcodePrefixData.prefix
        }
        nameCheckCode(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('机构编码已存在'))
          }
          callback()
        })
      } else if (this.title === '新建行政机构') {
        let data = {
          id: 0,
          prefix: this.validcodePrefixData.prefix
        }
        nameCheckCode(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('机构编码已存在'))
          }
          callback()
        })
      }
    },
    validPhone (rule, value, callback) {
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (value) {
        if (reg.test(value) === false) {
          callback(new Error('请输入正确的手机号格式'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    // 提交表单功能
    submitForm () {
      let data = this.formLabelAlign;
      if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
        this.formLabelAlign.parentId = 0
      } else {
        this.formLabelAlign.regionLocaleIds = this.formLabelAlign.regionLocaleIdsArr[this.formLabelAlign.regionLocaleIdsArr.length - 1]
      }
      let that = this
      that.$refs['Form'].validate((valid) => {
        if (valid) {
          if (this.title === '新建行政机构') {
            this.formLabelAlign.id = 0
            officeAdd(data).then(res => {
              this.list()
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
                this.dialogFormVisible = false
                this.list()
              } else {
                this.$message({
                  type: 'success',
                  message: data.msg
                })
              }
            })
          } else if (this.title === '编辑行政机构') {
            this.formLabelAlign.id = this.currentEditId
            officeEdit(data).then(res => {
              this.list()
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
                this.dialogFormVisible = false
                this.list()
              } else {
                this.$message({
                  type: 'success',
                  message: data.msg
                })
              }
            })
          }
        } else {
          if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
            this.formLabelAlign.parentId = ''
          }
        }
      })
    },
    focusDictItem (val) {
      this.listSuperion();
      this.dataset()
      this.dictItemOptions.map(item => {
        if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
          if (item.name === '区级机构' || item.name === '街道机构' || item.name === '居委机构') {
            item.disabled = true
          }
        } else if (this.formLabelAlign.regionLocaleIdsArr.length === 2) { // 区级
          if (item.name === '市级机构') {
            item.disabled = true
          } else {
            item.disabled = false
          }
        } else if (this.formLabelAlign.regionLocaleIdsArr.length === 3) {
          if (item.name === '市级机构' || item.name === '区级机构') {
            item.disabled = true
          } else {
            item.disabled = false
          }
        } else {
          this.dataset()
        }
      })
    },
    changeDictItem (val) {
      this.dictItemOptions.map(item => {
        if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
        } else {
          if (item.value === val) {
            this.superiorParam.dictItemValue = item.value - 1
            this.superiorId = ''
            this.superiorOptions = []
            this.formLabelAlign.parentId = 0
            this.formLabelAlign.parentIds = ''
            this.listSuperion()
          }
        }
      })
    },
    focusSuperior (val) {
      if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
        this.superiorOptions = []
      } else {
        this.listSuperion();
      }
    },
    changeSuperior (val) {
      this.superiorOptions.map(item => {
        if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
          this.formLabelAlign.parentId = 0
        } else {
          if (item.id === val) {
            this.formLabelAlign.parentId = item.id
            this.formLabelAlign.parentIds = item.parentIds
          }
        }
      })
    },
    // 校验机构名称
    toInform () {
    },
    list () {
      companyList({ type: '1', isTree: true }).then(res => {
        this.tableData = res.data.data
      })
    },
    listSuperion () {
      companyList(this.superiorParam).then(res => {
        this.superiorOptions = res.data.data
      })
    },
    getRegionLocale () {
      getRegionLocale({ parentId: '0', isTree: true }).then(res => {
        this.optionsRegion = res.data.data;
      })
    },
    dictItem () {
      dictItem({ code: 'agencyType', showSelectOption: false }).then(res => {
        this.dictItemOptions = res.data.data;
      })
      this.dataset()
    },
    dataset () {
      this.dictItemOptions.map(item => {
        item.disabled = false
      })
    }
  },
  created () {
    this.list()
    this.listSuperion()
    this.getRegionLocale()
    this.dictItem()
  },
  watch: {
    'regionLocaleIdsArrlen': {
      handler (newName, oldName) {
        this.formLabelAlign.dictItemValue = ''
      }
    }

  }
}
</script>

<style lang="less" scoped>
  .contai {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .major {
    background-color: #fff;
    padding: 16px 20px 10px 20px;
    text-align: left;
    height: calc(100% - 130px);
    overflow: auto;
    .el-form {
      text-align: left;
    }
    .el-dialog__body{
      padding: 20px 68px;
    }
    /deep/ .el-form-item__content {
      width: 100%;
      margin-left:0px !important;
    }
    /deep/.el-form-item{
      margin-bottom:5px !important;
    }
    /deep/.el-form-item__label{
      text-align:left
    }
    .enable-dialog  /deep/.el-dialog{
      margin-top: 0px;
      width: 425px;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -212px;
      margin-top: -80px !important;
    }
  }
  .el-table {
    margin-top: 16px;
  }
  .date-type{
    width:80%;
    height:30px;
    float:right;
  }
  .operation span:hover{
     text-decoration: underline;
     cursor:pointer;
     color: #237BFF;
  }
  .el-dialog__body {
    // padding: 30px 30px;
  }
  .action-detail .grid-content{
    color:#9FA1A7;
    line-height: 25px;
  }
  .action-detail .grid-content span{
    color:#000;
    // margin-left: 10px;
  }
  .action-detail{
    padding: 12px 10px 12px 10px;
    border-bottom: 1px solid #EBEEF5;
  }
  .grid-right{
    border-right: 1px solid #EBEEF5;
    height: 380px;
  }
  .grid-left{
    padding-left: 10px;
    height:380px;
    overflow:auto;
    padding-bottom: 20px;
  }
  .title-bg  /deep/.el-input__inner {
    height:35px;
  }
  .title-bg{
    background:#F5F7FA;
    line-height: 40px;
    padding: 3px 3px 3px 10px;
  }
  .enable-dialog /deep/.el-dialog__body{
    padding: 0px 0px 10px 10px;
  }
  .enable-dialog  .el-icon-warning{
      color: #E6A23C;
      font-size: 24px;
      float: left;
      padding-left: 7px;
      padding-right: 13px;
  }
  .grid-right .el-form-item {
    margin-bottom: 15px;
    border-bottom: 1px solid #EBEEF5;
    margin-right: 20px;
  }
  .dialog-detail /deep/.el-dialog__body{
    height: 410px;
    overflow: auto;
    overflow: hidden
  }
  .grid-left .grid-content{
    margin-right: 10px
  }
  /deep/.cell {
    max-height: 30px!important;
  }
  .el-pagination {
    text-align: center;
  }
  // 新增对话框样式
  /deep/.el-dialog {
    border-radius: 5px;
  }
  /deep/.el-dialog__body {
    padding: 10px 68px;
  }

  // 状态显示样式
  //  .box {
  //       vertical-align: center;
  //       position: relative;
  //       padding-left: 10px;
  //       .state {
  //         display: inline-block;
  //         width: 5px;
  //         height: 5px;
  //         border-radius: 50%;
  //         position: absolute;
  //         left: 0;
  //         top: 50%;
  //         transform: translateY(-50%)
  //       }
  //     }

</style>

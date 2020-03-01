<template>
  <div class="contai">
     <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
      <el-breadcrumb-item>企业单位管理</el-breadcrumb-item>
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
          <el-form-item label="单位分类：">
            <el-input v-model="companyName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="单位名称：" prop="name">
            <el-input v-model.trim="formLabelAlign.name" @input="toNameInform" placeholder="请填写单位名称"></el-input>
          </el-form-item>
          <el-form-item label="单位编码：" prop="prefix">
            <el-input v-model.trim="formLabelAlign.prefix" @input="toPrefixInform" placeholder="请填写单位编码"></el-input>
          </el-form-item>
          <el-form-item label="监管单位：" v-show="flagForm">
            <el-select v-model="formLabelAlign.supervisionCompanys" filterable  placeholder="请选择监管单位" multiple style="width:100%">
                <el-option  v-for="(item,index) in superiorOptions" :key="index"  :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="联系电话：" v-show="flagForm">
            <el-input v-model="formLabelAlign.phoneNumber"  placeholder="请填写联系电话"></el-input>
          </el-form-item>
           <el-form-item label="所在地址：" v-show="flagForm">
            <el-input v-model="formLabelAlign.address" placeholder="请填写所在地址" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>

       <!-- 创建下级对话框 -->
      <el-dialog :title="title" :visible.sync="createFormVisible" width="560px">
        <el-form :label-position="labelPosition"  :model="createFormList" :rules="ruleForm" ref="createForm">
          <el-form-item label="行政市区：" prop="regionLocaleIds">
             <el-cascader
              style="width:100%"
              v-model="createFormList.regionLocaleIds"
              :options="optionsRegion"
              @change="changeCascader"
              :props="{ checkStrictly: true,expandTrigger: 'hover',value:'parentIds',label:'name',children:'regionLocales' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上级单位名称">
            <el-input v-model="createFormList.dictItemName" :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="单位名称" prop="name">
            <el-input v-model="createFormList.name" @input="toNameInform"></el-input>
          </el-form-item>
          <el-form-item label="单位编码" prop="prefix">
            <el-input v-model="createFormList.prefix" @input="toPrefixInform"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="createFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createSubmitForm">确 定</el-button>
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
                  <el-form-item label="单位分类">
                    {{formDetail.dictItemName}}
                  </el-form-item>
                  <el-form-item label="单位名称">
                    {{formDetail.name}}
                  </el-form-item>
                  <el-form-item label="单位编码">
                    {{formDetail.prefix}}
                  </el-form-item>
                  <el-form-item label="监管单位">
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
                      {{item.editor}} 创建了 企业单位
                    </div>
                    <div class="grid-content"  v-show= "item.isCreated">
                     <span> 创建 企业单位</span>
                    </div>
                    <div class="grid-content"  v-show= "!item.isCreated">
                      {{item.editor}} 修改 企业单位
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

      <!-- 启用单位 -->
      <el-dialog title="启用单位" :visible.sync="enableVisible" class="enable-dialog" width="425px">
        <el-row :gutter="0">
          <el-col>
            <div class="el-icon-warning"></div>
            <p style="padding-left: 36px;padding-top: 2px;">启用该单位，是否同步启用该单位下所属部门。</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="padding-top: 16px;">
          <el-col :span="12">
            <span style="padding-left: 10px;">
              <el-checkbox v-model="checkedOrg">仅启用单位</el-checkbox>
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
            label="单位名称"
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
          min-width="180%"
          label="操作">
          <template v-slot="scope">
           <div class="operation">
              <span @click="showEditDialog(scope.row)">编辑</span>
              <el-divider direction="vertical"></el-divider>
              <span @click="showFormDialog(scope.row)">创建下级</span>
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
      flagForm: false,
      checkedOrg: false,
      companyName: '公司',
      checked: true,
      superiorId: '',
      valueDate: 0,
      detailId: '',
      dataLog: [],
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
      createFormList: {
        regionLocaleIdsArr: '',
        regionLocaleIds: '',
        dictItemName: '',
        name: '',
        prefix: '',
        parentId: 0,
        parentIds: 0,
        type: 2
      },
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
      createFormVisible: false,
      // 表格数据
      tableData: [],
      superiorParam: { isTree: false, dictItemValue: '', isNotCompanyId: 0 },
      // 增加对话框数据
      formLabelAlign: {
        regionLocaleIdsArr: '1,',
        regionLocaleIds: '1,',
        dictItemValue: '',
        name: '',
        prefix: '',
        type: 2,
        parentId: '',
        parentIds: '',
        address: '',
        supervisionCompanys: '',
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
          { required: true, message: '请选择单位分类', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入单位名称', trigger: ['change'] },
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
    createSubmitForm () {
      let data = this.createFormList
      officeAdd(data).then(res => {
        if (res.data.code === 200) {
          this.list()
          this.createFormVisible = false
          this.$message({
            type: 'success',
            message: '成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    showFormDialog (row) {
      this.createFormVisible = true
      this.$nextTick(() => {
        this.$refs.createForm.clearValidate();
      })
      this.createFormList = {
        regionLocaleIdsArr: '',
        regionLocaleIds: '',
        dictItemName: '',
        name: '',
        prefix: '',
        parentId: 0,
        parentIds: 0,
        type: 2
      }
      this.title = '创建下级'
      let regionLocaleIdsStr = row.regionLocaleIds
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

      this.createFormList.regionLocaleIdsArr = regionArr
      this.createFormList.regionLocaleIds = row.regionLocaleIds
      this.createFormList.dictItemName = row.name
      this.createFormList.parentId = row.id
      this.createFormList.parentIds = row.parentIds
      if (this.$refs['ruleForm'] !== undefined) {
        this.$refs.ruleForm.clearValidate();
      }
    },
    toNameInform (val) {
      this.validcodeNameData.name = val
    },
    toPrefixInform (val) {
      this.validcodePrefixData.prefix = val
    },
    // 展示新增对话框
    showAddDialog () {
      this.flagForm = true
      this.dialogFormVisible = true
      this.title = '新建企业单位'
      this.superiorId = ''
      this.superiorParam.isNotCompanyId = 0
      this.formLabelAlign = {
        id: 0,
        regionLocaleIdsArr: '1,',
        regionLocaleIds: '1,',
        dictItemValue: '',
        name: '',
        prefix: '',
        type: 2,
        parentId: '',
        parentIds: '',
        address: '',
        supervisionCompanys: '',
        phoneNumber: ''
      }
      // 重置表单
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
    },
    // 展示编辑对话框
    showEditDialog (row) {
      if (!row.parentId) {
        this.flagForm = true
      } else {
        this.flagForm = false
      }
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.clearValidate();
      }
      this.dialogFormVisible = true

      this.title = '编辑企业单位'
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
      // this.formLabelAlign.dictItemValue = row.dictItemValue.toString()
      this.superiorId = row.parentId
      this.formLabelAlign.parentId = row.parentId
      this.formLabelAlign.parentIds = row.parentIds
      this.listSuperion()
      let arrCompanys = [];
      if (row.supervisionCompanys) {
        var supervisionArr = row.supervisionCompanys.split(',')
        for (let arrint in supervisionArr) {
          arrCompanys.push(parseInt(supervisionArr[arrint]))
        }
        this.formLabelAlign.supervisionCompanys = arrCompanys
      } else {
        this.formLabelAlign.supervisionCompanys = ''
      }
      this.superiorParam.isNotCompanyId = row.id
      this.formLabelAlign.phoneNumber = row.phoneNumber
      this.formLabelAlign.address = row.address
    },
    showDetailDialog (row) {
      this.detailId = row.id
      this.dialogDetailVisible = true
      this.dateOptionFun()
      let data = {
        id: row.id
      }
      companyView(data).then(res => {
        this.formDetail = res.data.data
        if (res.data.data.supervisionCompanys) {
          let supervisionCompanyArr = res.data.data.supervisionCompanys.split(',')
          // 把字符串转为数字
          let supervisionCompanyNum = []
          for (let arrnum in supervisionCompanyArr) {
            supervisionCompanyNum.push(parseInt(supervisionCompanyArr[arrnum]))
          }
          let supervisionCompanyName = []
          this.superiorOptions.map(item => {
            supervisionCompanyNum.map(item1 => {
              if (item.id === item1) {
                supervisionCompanyName.push(item.name)
              }
            })
          })
          this.formDetail.superior = supervisionCompanyName.join(',')
        }
      })
    },
    dateOptionFun () {
      let data = {
        tableName: 'company',
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
        this.$confirm('停用该单位，将同步停用该单位下所属部门，是否确认停用。', '停用单位', {
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
      // this.checkedOrg = false;
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
      if (this.title === '编辑企业单位') {
        let data = {
          id: this.currentEditId,
          name: this.validcodeNameData.name
        }
        nameCheckName(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('单位名称已存在'))
          }
          callback()
        })
      } else if (this.title === '新建企业单位' || this.title === '创建下级') {
        let data = {
          id: 0,
          name: this.validcodeNameData.name
        }
        nameCheckName(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('单位名称已存在'))
          }
          callback()
        })
      }
    },
    validcoding (rule, value, callback) {
      if (this.title === '编辑企业单位') {
        let data = {
          id: this.currentEditId,
          prefix: this.validcodePrefixData.prefix
        }
        nameCheckCode(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('单位编码已存在'))
          }
          callback()
        })
      } else if (this.title === '新建企业单位' || this.title === '创建下级') {
        let data = {
          id: 0,
          prefix: this.validcodePrefixData.prefix
        }
        nameCheckCode(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('单位编码已存在'))
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
          if (this.formLabelAlign.supervisionCompanys.length) {
            this.formLabelAlign.supervisionCompanys = this.formLabelAlign.supervisionCompanys.join(',')
          } else {
            this.formLabelAlign.supervisionCompanys = ''
          }
          if (this.title === '新建企业单位') {
            this.formLabelAlign.id = 0
            officeAdd(data).then(res => {
              if (res.data.code === 200) {
                this.list()
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
                this.dialogFormVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          } else if (this.title === '编辑企业单位') {
            this.formLabelAlign.id = this.currentEditId
            officeEdit(data).then(res => {
              if (res.data.code === 200) {
                this.list()
                this.$message({
                  type: 'success',
                  message: '成功!'
                })
                this.dialogFormVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          }
        }
      })
    },
    focusDictItem (val) {
      this.listSuperion();
      this.dictItemOptions.map(item => {
        if (this.formLabelAlign.regionLocaleIdsArr.length === 1 || this.formLabelAlign.regionLocaleIdsArr === '1,') {
          if (item.name === '区级机构' || item.name === '街道机构' || item.name === '居委机构') {
            item.disabled = true
          }
        } else {
          this.dataset()
        }
      })
    },
    changeDictItem (val) {},
    focusSuperior (val) {
      this.listSuperion();
    },
    changeSuperior (val) {
      this.superiorOptions.map(item => {
        if (item.id === val) {
          this.formLabelAlign.parentId = item.id
          this.formLabelAlign.parentIds = item.parentIds
        }
      })
    },
    // 校验单位名称
    toInform () {
    },
    list () {
      companyList({ type: '2', isTree: true }).then(res => {
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
    height: calc(100% - 100px);
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

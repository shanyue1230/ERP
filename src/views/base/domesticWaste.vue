<template>
  <div class="domesticWaste">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>垃圾收集点</el-breadcrumb-item>
      <el-breadcrumb-item>生活垃圾</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="xf-main">
      <div class="xf-left">
         <belongUnit :unitList="unitList" @handleChange="selectUnit"></belongUnit>
      </div>
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
          <el-row>
             <el-col :span="5">
              <!-- 收集点名称 -->
              <el-form-item label="收集点名称:" prop="workersNumber">
                 <el-input v-model="searchForm.workersNumber" placeholder="请输入收集点名称">
                 </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <!-- 所属单位 -->
              <el-form-item label="所属单位:" prop="name">
                  <el-select v-model="searchForm.name" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="5">
              <!-- 所属街道 -->
              <el-form-item label="所属街道:" prop="driverLicense">
                  <el-select v-model="searchForm.driverLicense" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <!-- 操作 -->
              <el-form-item style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px">
                <el-button type="primary" @click="searchDriverList">确定</el-button>
                <el-button @click="resetSearchForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 新增 + 导出 -->
        <div style="margin-top:20px;">
          <el-button type="primary" @click="showDrawer">新增</el-button>
          <el-button v-show=" privilegeCodes.indexOf('basic:driver:driverExport') !== -1" type="warning" style="float: right;" @click="exportExcel">导出</el-button>
        </div>

        <!-- 表格 -->
        <!-- height="" height="55vh" -->
        <el-table
            ref="multipleTable"
            :data="driverTableData"
            tooltip-effect="dark"
            >
            <el-table-column
              label="No."
              prop="no"
              >
            </el-table-column>
            <el-table-column
              label="所属单位"
              prop="workersNumber"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="所属街道"
              >
            </el-table-column>
            <el-table-column
              prop="licenseTypeDesc"
              label="收集点名称"
              >
            </el-table-column>
            <el-table-column
              prop="expirationDate"
              label="地址"
              >
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              width="200px"
              >
              <template v-slot="{row}">
                <span v-show="currentCompanyIds.indexOf(row.companyId) !== -1 && privilegeCodes.indexOf('basic:driver:edit') !== -1" class="span" @click="showEditDrawer(row.id)">编辑</span>&nbsp;&nbsp;
                <span style="color:#ccc">|</span>&nbsp;&nbsp;
                <span class="span" @click="viewDetail(row.id)">查看详情</span>&nbsp;&nbsp;
                <span style="color:#ccc">|</span>&nbsp;&nbsp;
                <span v-show="currentCompanyIds.indexOf(row.companyId) !== -1 && privilegeCodes.indexOf('basic:driver:delete') !== -1" class="span" @click="showDeleteDrawer(row.id)">删除</span>
              </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
         <el-pagination
          style="margin-top: 16px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

        <!-- 新增抽屉 -->
      <el-drawer
          :title="title"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <el-form class="create-el-form" :model="createDriver" :rules="rules" ref="createDriver">
          <el-form-item label="所属单位:" prop="companyId">
             <el-select v-model="createDriver.companyId" placeholder="全部">
                  <el-option
                    v-for="item in companyIdList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                 </el-select>
          </el-form-item>
          <el-form-item label="所属街道:" prop="workersNumber">
                <el-cascader
                  v-model="createDriver.workersNumber"
                  :options="optionsCasc"
                  :props="{ expandTrigger: 'hover' }"
                   ></el-cascader>
          </el-form-item>
          <el-form-item label="收集点名称:" prop="name">
              <el-input type="text" placeholder="请输入收集点名称" v-model="createDriver.name"></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop="driverLicense">
                 <el-input type="text" placeholder="请输入地址" v-model="createDriver.driverLicense" @blur="driverLicenseCheck"></el-input>
          </el-form-item>
          <el-form-item label="性质:" prop="licenseType">
             <el-select v-model="createDriver.companyId" placeholder="全部">
                  <el-option
                    v-for="item in companyIdList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
              </el-select>
          </el-form-item>
          </el-form>
           <div class="saveAndCancle">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="addDriverDone">确认</el-button>
           </div>
      </el-drawer>

      <!-- 查看详情抽屉 -->
        <el-drawer
        title="查看详情"
        :append-to-body="true"
        :visible.sync="viewDrawer"
        :direction="direction"
        :before-close=" viewHandleClose">
        <el-form :model="createDriver" class="view-el-form" label-width="120px" style="padding-bottom: 100px; padding-top: 20px;">
          <!-- 账号信息 -->
          <drawer-left>
            <el-form-item label="所属单位:" style="border-bottom: 2px solid #eee;">{{createDriver.companyName}}</el-form-item>
            <el-form-item label="员工工号:" style="border-bottom: 2px solid #eee;">{{createDriver.workersNumber}}</el-form-item>
            <el-form-item label="员工姓名:" style="border-bottom: 2px solid #eee;">{{createDriver.name}}</el-form-item>
            <el-form-item label="驾照号码:" style="border-bottom: 2px solid #eee;">{{createDriver.driverLicense}}</el-form-item>
            <el-form-item label="驾照类型:" style="border-bottom: 2px solid #eee;">{{createDriver.licenseTypeDesc}}</el-form-item>
            <el-form-item label="驾照档案号:" style="border-bottom: 2px solid #eee;">{{createDriver.fileNumber}}</el-form-item>
            <el-form-item label="领证日期:" style="border-bottom: 2px solid #eee;">{{createDriver.certificateDate}}</el-form-item>
            <el-form-item label="有效期:" style="border-bottom: 2px solid #eee;">{{createDriver.expirationDate}}</el-form-item>
          </drawer-left>
          <drawer-right>
             <div class="all">
              <span>所有动态</span>
                <el-select v-model="time" placeholder="请选择" @change="timeChange" style="width:96px;height:32px !important;"
                >
                        <el-option
                          v-for="item in timeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
              </el-select>
              <i v-if="!selst" class="el-icon-caret-bottom arrow"></i>
              <i v-if="selst" class="el-icon-caret-top arrow"></i>
            </div>
            <!-- all info -->
            <div class="allInfo" v-for="item in infoList" :key="item.id">
              <div class="top" style="margin-bottom:5px">
                <div class="oper" style="color:rgba(144,147,153,1);"> <span >{{item.editor}}</span> <span>{{item.isCreated? '创建':'编辑'}}</span>了&nbsp;&nbsp;&nbsp;<span>{{item.mainContent}}</span></div>
                <div class="infoTime" style="color:rgba(144,147,153,1);;">
                  {{item.editTime}}
                </div>
              </div>
              <div class="bottom"> <span style="color:rgba(144,147,153,1); margin-right:10px">{{item.isCreated? '创建':'修改'}}</span><span> {{item.isCreated? item.mainContent:item.fieldName}}</span></div>
            </div>
          </drawer-right>
        </el-form>
         <div class="saveAndCancle">
            <el-button @click="viewHandleClose">取消</el-button>
            <el-button type="primary" >确认</el-button>
          </div>
      </el-drawer>
      </div>
    </div>

    <!-- 删除二次确认框 -->
    <el-dialog
      title="删除驾驶员"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <p>请确认删除该员工后，是否保留历史记录?</p>
      <el-checkbox v-model="isDeleteHistoryd">保存历史记录</el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDriver">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import belongUnit from '../../components/belong-unit'
// childCompanyList employeeList
import { getDataFilter, driverPagingList, childCompanyList, employeeListing, driverCheck, addDriver, driverView, driverEdit, driverDelete, dataDictItem, driverExport } from '../../api/getData.js'
export default {
  data () {
    let checkDriverLicense = (rule, value, callback) => {
      setTimeout(() => {
        if (this.driverLicenseCode === 400) {
          return callback(new Error('驾照号码已存在'));
        } else {
          callback();
        }
      }, 500);
    };
    let checkFileNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (this.fileNumberCode === 400) {
          return callback(new Error('驾照号码已存在'));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      value: '',
      title: '',
      driverID: '',
      driverLicenseCode: '',
      fileNumberCode: '',
      infoList: [],
      currentCompanyIds: [],
      privilegeCodes: [],
      selst: false,
      dialogVisible: false,
      isDeleteHistoryd: false,
      expending: '展开',
      time: 0,
      recordId: '',
      total: 0,
      currentPage: 1,
      pageSize: 20,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      optionsCasc: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈' }]
          }]
        }
      ],
      timeOptions: [
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
      drawer: false,
      viewDrawer: false,
      imageUrl: '',
      direction: 'rtl',
      show: false,
      unitList: [],
      checkList: [],
      searchForm: {
        workersNumber: '',
        name: '',
        driverLicense: '',
        expirationDate: ''
      },
      // 所属部门
      companyIdList: [],

      // 表格数据
      driverTableData: [],
      // 导出表格
      exportTableData: [],
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      // 新建驾驶员
      createDriver: {
        companyId: '',
        workersNumber: '',
        name: '',
        driverLicense: '',
        licenseType: [],
        fileNumber: '',
        certificateDate: '',
        expirationDate: ''
      },
      restaurants: [],
      restaurants2: [],
      state2: '',
      rules: {
        companyId: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        workersNumber: [
          { required: true, message: '请输入员工工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        driverLicense: [
          { required: true, message: '请输入驾照号码', trigger: 'blur' },
          { pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/, message: '请输入正确的驾照号码', trigger: 'blur' },
          { validator: checkDriverLicense, trigger: 'blur' }
        ],
        licenseType: [
          { required: true, message: '请选择驾照类型', trigger: 'blur' }
        ],
        fileNumber: [
          { validator: checkFileNumber, trigger: 'blur' }
        ],
        certificateDate: [
          { required: true, message: '请选择领证日期', trigger: 'blur' }
        ],
        expirationDate: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ]
      },
      // 开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.createDriver.expirationDate) {
            return time.getTime() > new Date(this.createDriver.expirationDate).getTime();
          }
        }
      },
      // 结束时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.createDriver.certificateDate) {
            return (
              time.getTime() < new Date(this.createDriver.certificateDate).getTime() // 加- 8.64e7则表示包当天
            );
          }
        }
      }
    }
  },
  created () {
    this.fn()
    this.selectUnit()
  },
  methods: {
    showDrawer () {
      this.drawer = true
      this.driverID = ''
      this.title = '新建生活垃圾'
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.createDriver.resetFields()
          this.drawer = false
          done();
        })
        .catch(_ => {});
    },
    viewHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.viewDrawer = false
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getDriverTableList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDriverTableList()
    },

    // 导出表格
    async exportExcel () {
      const data = {
        dataFilters: this.checkList,
        workersNumber: this.searchForm.workersNumber,
        name: this.searchForm.name,
        driverLicense: this.searchForm.driverLicense,
        StartExpirationDate: this.searchForm.expirationDate[0] || '',
        endExpirationDate: this.searchForm.expirationDate[1] || ''
      }
      const res = await driverExport(data)
      this.exportTableData = res.data.data
      import('../../assets/js/Export2Excel.js').then(excel => {
        const tHeader = ['工号', '姓名', '准驾车型', '有效期']
        const filterVal = ['workersNumber', 'name', 'licenseTypeDesc', 'expirationDate']
        const list = this.exportTableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },

    // 修改数据格式
    formatJson (filterVal, jsonData) {
      console.log(filterVal, jsonData)
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },

    // 被选中的单位名称
    async selectUnit (date) {
      // console.log(this.unitList)
      this.checkList = date
      // 获取驾驶员列表数据
      const data2 = {
        page: this.currentPage,
        limit: this.pageSize,
        dataFilters: this.checkList,
        workersNumber: this.searchForm.workersNumber,
        name: this.searchForm.name,
        driverLicense: this.searchForm.driverLicense,
        StartExpirationDate: this.searchForm.expirationDate[0] || '',
        endExpirationDate: this.searchForm.expirationDate[1] || ''
      }
      const res2 = await driverPagingList(data2)
      if (res2.data.code === 200) {
        this.driverTableData = res2.data.data.records
        this.total = res2.data.data.total
      }
    },
    // 是否展开
    expand () {
      this.show = !this.show;
      if (this.expending === '展开') {
        this.expending = '收起'
      } else {
        this.expending = '展开'
      }
    },
    // 驾驶证号唯一验证
    driverLicenseCheck () {
      const params = {
        driverLicense: this.createDriver.driverLicense
      }
      driverCheck(params).then(res => {
        this.driverLicenseCode = res.data.code
      })
    },

    // 驾驶证档案号唯一验证
    fileNumberCheck () {
      const params = {
        driverLicense: this.createDriver.fileNumber
      }
      driverCheck(params).then(res => {
        this.fileNumberCode = res.data.code
      })
    },

    // 有效期事件
    changeExpirationDate (value) {
      if (this.searchForm.expirationDate) {
      } else {
        this.searchForm.expirationDate = []
        console.log(this.searchForm.expirationDate);
      }
    },

    // 筛选驾驶员列表
    searchDriverList () {
      console.log(this.searchForm);
      const data = {
        page: this.currentPage,
        limit: this.pageSize,
        dataFilters: this.checkList,
        workersNumber: this.searchForm.workersNumber,
        name: this.searchForm.name,
        driverLicense: this.searchForm.driverLicense,
        StartExpirationDate: this.searchForm.expirationDate[0] || '',
        endExpirationDate: this.searchForm.expirationDate[1] || ''

      }
      driverPagingList(data).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.driverTableData = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },

    // 重置查询表单
    resetSearchForm () {
      this.$refs.searchForm.resetFields()
    },

    // 查看详情
    viewDetail (id) {
      this.recordId = id
      this.viewDrawer = true
      const params = {
        id
      }
      driverView(params).then(res => {
        console.log(res.data.data.licenseType.split(','));
        res.data.data.licenseType = res.data.data.licenseType.split(',')
        this.createDriver = res.data.data
        console.log(this.createDriver);
      })
      this.timeChange()
    },

    // 获取驾驶员列表数据
    getDriverTableList () {
      const data2 = {
        page: this.currentPage,
        limit: this.pageSize,
        // dataFilters: [this.unitList[0]]
        dataFilters: this.checkList,
        workersNumber: this.searchForm.workersNumber,
        name: this.searchForm.name,
        driverLicense: this.searchForm.driverLicense,
        StartExpirationDate: this.searchForm.expirationDate[0] || '',
        endExpirationDate: this.searchForm.expirationDate[1] || ''
      }
      driverPagingList(data2).then(res2 => {
        if (res2.data.code === 200) {
          console.log(res2)
          this.driverTableData = res2.data.data.records
          this.total = res2.data.data.total
          this.privilegeCodes = JSON.parse(localStorage.getItem('login')).privilegeCodes
          console.log(this.privilegeCodes)
        }
      })
    },
    async fn () {
      // 获取所属单位列表展示
      const data1 = {
        menuCode: localStorage.getItem('code')
      }
      const res = await getDataFilter(data1)
      if (res.data.code === 200) {
        this.unitList = res.data.data.filters
        const comId = JSON.parse(localStorage.getItem('login')).companyId
        this.unitList.forEach(ele => {
          if (ele.companyId === comId) {
            const defaultList = []
            defaultList.push(ele)
            this.checkList = defaultList
            console.log(defaultList, ele)
          }
        });
        this.currentCompanyIds = res.data.data.currentCompanyIds
        console.log(this.checkList)
      }
      this.getDriverTableList()
      // 获新增框内所属单位
      const data3 = {
        id: JSON.parse(localStorage.getItem('login')).companyId
      }
      const res3 = await childCompanyList(data3)
      this.companyIdList = res3.data.data
      this.createDriver.companyId = data3.id

      // 员工工号模糊查询
      const data4 = {
        companyId: JSON.parse(localStorage.getItem('login')).companyId,
        workersNumber: ''
      }
      const res4 = await employeeListing(data4)
      console.log(res4);
      res4.data.data.forEach(result => this.restaurants.push({ 'value': result.workersNumber, 'id': result.id }))

      // 员工姓名模糊查询
      const data5 = {
        companyId: JSON.parse(localStorage.getItem('login')).companyId,
        name: ''
      }
      const res5 = await employeeListing(data5)
      res5.data.data.forEach(result => this.restaurants2.push({ 'value': result.name, 'id': result.id }))
    },

    // 查看历史编辑记录
    timeChange () {
      const data = {
        'tableName': 'driver',
        'recordId': this.recordId,
        'timeInterval': this.time
      }
      dataDictItem(data).then(res => {
        console.log(res)
        this.infoList = res.data.data
      })
    },

    // 显示编辑抽屉
    showEditDrawer (id) {
      this.driverID = id
      this.drawer = true
      this.title = '编辑驾驶员'
      const params = {
        id
      }
      driverView(params).then(res => {
        console.log(res.data.data.licenseType.split(','));
        res.data.data.licenseType = res.data.data.licenseType.split(',')
        console.log(res.data.data);

        this.createDriver = res.data.data
      })
    },

    // 模糊查询
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2 (queryString, cb) {
      var restaurants2 = this.restaurants2;
      var results = queryString ? restaurants2.filter(this.createFilter2(queryString)) : restaurants2;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    createFilter2 (queryString) {
      return (restaurant2) => {
        return (restaurant2.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll () {
      return this.restaurants
    },
    loadAll2 () {
      return this.restaurants2
    },
    async handleSelect (item) {
      console.log(item.id);
      this.createDriver.employeeId = item.id
      // 同步员工姓名
      const data4 = {
        companyId: JSON.parse(localStorage.getItem('login')).companyId,
        workersNumber: item.value
      }
      const res4 = await employeeListing(data4)
      console.log(res4);
      this.createDriver.name = res4.data.data[0].name
    },
    async handleSelect2 (item) {
      this.createDriver.employeeId = item.id
      console.log(item);
      const data5 = {
        companyId: JSON.parse(localStorage.getItem('login')).companyId,
        name: item.value
      }
      const res5 = await employeeListing(data5)
      this.createDriver.workersNumber = res5.data.data[0].workersNumber
    },

    // 新增驾驶员 + 编辑驾驶员
    addDriverDone () {
      let data = JSON.parse(JSON.stringify(this.createDriver))
      data.licenseType = data.licenseType.join(',')
      this.$refs.createDriver.validate((valid) => {
        if (valid) {
          if (this.driverID === '') {
            // 新增
            console.log('校验成功');
            addDriver(data).then(res => {
              if (res.data.code === 200) {
                this.$message.success('已新建驾驶员')
                this.getDriverTableList()
                this.drawer = false
              }
            })
          } else {
            // 编辑
            this.createDriver.id = this.driverID
            console.log(this.createDriver);
            const editData = JSON.parse(JSON.stringify(this.createDriver))
            editData.licenseType = editData.licenseType.join(',')
            driverEdit(editData).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.$message.success('已修改当前驾驶员信息')
                this.getDriverTableList()
                this.drawer = false
              }
            })
          }
        } else {
          return false
        }
      })
    },

    // 显示删除驾驶员框
    showDeleteDrawer (id) {
      this.dialogVisible = true
      this.driverID = id
      this.isDeleteHistoryd = false
    },

    // 删除驾驶员
    deleteDriver () {
      const params = {
        id: this.driverID,
        isDeleteHistoryd: this.isDeleteHistoryd
      }
      driverDelete(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getDriverTableList()
          this.dialogVisible = false
        }
      })
    }
  },
  mounted () {
    this.restaurants = this.loadAll();
    this.restaurants2 = this.loadAll2()
  },
  components: {
    belongUnit
  }
}
</script>

<style lang="less" scoped>
.domesticWaste {
    height: 100%;
      background-color: #fff;
      overflow: hidden;
}
 .xf-main {
    display: flex;
    border-left: 1px solid #eee;

    // height: 100%;
    .xf-left {
      width: 270px;
      background-color: #fff;
    }
    .xf-right {
      flex: 1;
      height: 80vh;
      overflow-y: scroll;
      overflow-x: hidden;
      // overflow: hidden;
      background-color: #fff;
      border-left: 1px solid #eee;
      padding: 0 30px 0 16px;
      box-sizing: border-box;
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
    .title {
      height: 48px;
      line-height: 46px;
      font-size:16px;
      font-family:PingFang SC;
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
      padding-left: 32px;
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
  .el-table {
    .span {
      cursor: pointer;
    }
    .span:hover {
      text-decoration: underline;
      color: #237BFF;
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
    margin-top: 6px;
  }
  /deep/.el-date-editor.el-input {
        width: 100% !important;
  }
  /deep/.el-date-editor--daterange.el-input__inner {
    width: 100%;
     margin-right: 10px;
  }
  /deep/input.el-input__inner {
    padding-right: 30px;
    width:100% !important;
  }
  // 新增抽屉样式
.el-drawer__wrapper .create-el-form {
    padding: 0 340px 50px 340px;
    .el-cascader {
      width: 100%;
    }
}

//  // 详情抽屉样式
.el-drawer__wrapper .view-el-form {
    height: 100%;
    display: flex;
    position: relative;
    drawer-left {
      height: 100%;
      // background-color: #ccc;
      flex: 1;
      overflow-y: scroll;
      overflow-x: hidden;
      box-sizing: border-box;
      padding:15px;
    }
    drawer-right {
      overflow-y: scroll;
      overflow-x: hidden;
      flex: 1;
      height: 100%;
      // background-color: pink;
      box-sizing: border-box;
      padding:15px;
       .all {
            height: 48px;
            line-height: 48px;
            width: 100%;
            padding-left: 15px;
            box-sizing: border-box;
            position: relative;
            background-color: rgba(245,247,250,1);
            span {
               width:64px;
                height:16px;
                font-size:16px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(48,49,51,1);
            }
            .el-select {
              position: absolute;
              top: 8px;
              right: 16px;
              height: 32px !important;
              /deep/.el-input {
                height: 100%;
                /deep/.el-input__inner {
                    height: 100%;
                    position: relative;
                    top: -7px;
                    right: 0;

                }
                /deep/ .el-select__caret {
                      display: none !important;
                }
              }
            }
            .arrow {
              position: absolute;
              top: 16px;
              right: 22px ;
              // font-size: 18px;
            }
          }
          .allInfo {
            height: 72px;
            padding: 15px;
            box-sizing: border-box;
            border-bottom:1px solid rgba(228,231,237,1);
            .top {
              overflow: hidden;
              .oper {
                float: left;
              }
              .infoTime {
                float: right;
              }
            }
          }
    }
}
  /deep/.el-dialog__body {
    padding: 0 20px;
  }
  .el-main {
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

</style>

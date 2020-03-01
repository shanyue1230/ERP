<template>
  <div class="employee">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item>电瓶车信息登记</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <div class="xf-left">
         <belongUnit :unitList="unitList" @handleChange="selectUnit"></belongUnit>
      </div>
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-row>
            <el-col :span="5">
              <el-form-item label="车牌号:">
                 <el-input v-model="searchForm.vehiclePlate" placeholder="请输入车牌号">
                 </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="自编号:">
                 <el-input v-model="searchForm.selfNumber" placeholder="请输入自编号">
                 </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="车辆状态:">
                 <el-select width="200px" v-model="searchForm.vehicleStatus" placeholder="全部">
                  <el-option
                    v-for="item in vehicleStatusOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                 </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <el-form-item style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px">
                <el-button type="primary"  @click="isSearch">确定</el-button>
                <el-button type="success" icon="el-icon-arrow-down" style="width: 70px;position: relative; padding-left: 10px;" @click="expand">展开</el-button>
                <el-button @click="searchCancle">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 展开的表单 -->
          <div v-show="show">
            <el-row>
              <el-col :span="5">
                <el-form-item label="车辆类型:">
                  <el-select v-model="searchForm.vehicleType" placeholder="全部">
                    <el-option
                      v-for="item in vehicleTypeOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
             </el-col>
             <el-col :span="5">
              <el-form-item label="回收类型:">
                 <el-select v-model="searchForm.recycleType" placeholder="全部">
                  <el-option
                    v-for="item in recycleTypeOption"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                 </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="10">
              <el-form-item label="启用日期:">
                 <el-date-picker
                  v-model="searchForm.activationSatrtDate"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
             </el-col>
            </el-row>
          </div>
        </el-form>

        <!-- 新增 + 导出 -->
        <div style="margin-top:20px;">
          <el-button type="primary" @click="showDrawer">新增</el-button>
          <el-button type="warning" @click="exportList" style="float: right;">导出</el-button>
        </div>

        <!-- 表格 -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;margin-top:16px"
            >
            <el-table-column
              type="selection"
              >
            </el-table-column>
            <el-table-column
              label="No."
              type="index"
              >
            </el-table-column>
            <el-table-column
              label="车牌号"
              prop="vehiclePlate"
              >
            </el-table-column>
            <el-table-column
              prop="selfNumber"
              label="自编号"
              >
            </el-table-column>
            <el-table-column
              prop="vehicleShortName"
              label="车辆简称"
              >
            </el-table-column>
            <el-table-column
              prop="recycleTypeStr"
              label="回收类型"
              >
            </el-table-column>
            <el-table-column
              prop="activationDate"
              label="启用日期"
              >
            </el-table-column>
            <el-table-column
              prop="vehicleStatus"
              label="状态"
              >
            <template slot-scope="{row}">
              <span v-if="row.vehicleStatus===0" style="color:green">正常</span>
              <span v-else-if="row.vehicleStatus===1" style="color:orange">维修中</span>
              <span v-else-if="row.vehicleStatus===2" style="color:red">停用</span>
              <span v-else-if="row.vehicleStatus===3" style="color:#ccc">失效</span>
            </template>
            </el-table-column>
            <el-table-column
              prop=""
              min-width="180%"
              label="操作"
              >
              <template v-slot="scope">
                <div class="operation">
                  <span @click="showEditDialog(scope.row)">编辑</span>
                  <el-divider direction="vertical"></el-divider>
                  <span @click="isDelete(scope.row)">删除</span>
                  <el-divider direction="vertical"></el-divider>
                  <span @click="viewDetail(scope.row)">查看详情</span>
                </div>
              </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 16px;"
          :page-sizes="[ 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeTotal"
          @current-change="handleCurrentChangeTotal"
          :total="total"
        ></el-pagination>
        <!-- 新增抽屉 -->
        <el-drawer
        :title='title'
        :modal="true"
        :append-to-body="true"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <el-form :model="createEmployee" :rules="rules" ref="Form">
          <div class="title">
            <span>基础信息</span>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属单位" prop="companyId">
                <el-select v-model="createEmployee.companyId" @change="comChange" placeholder="请选择">
                  <el-option
                    v-for="item in optionsCom"
                    :key="item.companyId"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车牌号" prop="vehiclePlate">
                 <el-input type="text" placeholder="请输入车牌号" v-model="createEmployee.vehiclePlate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="自编号" prop="selfNumber">
                 <el-input type="text" placeholder="请输入自编号" v-model="createEmployee.selfNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="8">
              <el-form-item label="回收类型" prop="recycleType">
                 <el-select v-model="createEmployee.recycleType" placeholder="请选择回收类型">
                      <el-option
                        v-for="item in recycleTypeOption"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车辆状态" prop="vehicleStatus">
                  <el-select v-model="createEmployee.vehicleStatus" placeholder="请选择车辆状态">
                      <el-option
                        v-for="item in formStatusOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                   </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="启用日期" prop="activationDate">
                <el-date-picker
                  v-model="createEmployee.activationDate"
                  type="date"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptionsStart"
                  placeholder="请选择启用日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="设备编号（主机）" prop="deviceNo">
                <el-input type="text" placeholder="请输入设备编号" v-model="createEmployee.deviceNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备状态" prop="deviceStatus" :disabled="true">
                <el-input type="text" placeholder="请输入设备状态" v-model="createEmployee.deviceStatus" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报废日期" prop="scrapDate">
                <el-date-picker
                style="width:100%"
                v-model="createEmployee.scrapDate"
                type="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsEnd"
                placeholder="请选择报废日期">
              </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="报废原因" prop="scrapReason">
                <el-input type="textarea" v-model="createEmployee.scrapReason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 补充信息 -->
          <div class="title">
            <span>补充信息</span>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="车辆类型" prop="vehicleType">
                  <el-select v-model="createEmployee.vehicleType" placeholder="请选择车辆类型">
                    <el-option
                    v-for="item in TypeOptionForm"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="车辆简称" prop="vehicleShortName">
                   <el-input type="text" placeholder="请输入车辆简称" v-model="createEmployee.vehicleShortName"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="8">
              <el-form-item label="加油类型">
                <el-input type="text"  value="电力"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="8">
              <el-form-item label="车身装置" prop="bodyDevice">
                 <el-select v-model="createEmployee.bodyDevice" placeholder="请选择车身装置">
                    <el-option
                      v-for="item in bodyDeviceOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="8">
               <el-form-item label="发动机号" prop="engineNumber">
                  <el-input type="text" placeholder="请输入发动机号" v-model="createEmployee.engineNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
               <el-form-item label="车架号" prop="frameNumber">
                  <el-input type="text" placeholder="请输入车架号" v-model="createEmployee.frameNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="吨位" prop="tonnage">
                <el-input type="number" placeholder="请输入吨位" v-model="createEmployee.tonnage"></el-input>
              </el-form-item>
               <el-form-item label="车身颜色">
                 <el-input type="text" placeholder="请输入车身颜色" v-model="createEmployee.color"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车系品牌" prop="carBrand">
                  <el-select v-model="createEmployee.carBrand" placeholder="请选择车系品牌">
                      <el-option
                        v-for="item in liveEefuseOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
               <el-form-item label="维修次数">
                 <el-input type="text" placeholder="请输入维修次数" v-model="createEmployee.repairNum" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="照片:" prop="photo">
                <el-upload
                  class="avatar-uploader"
                  action="http://112.65.228.185:8004/upload/singleImage/"
                  :show-file-list="false"
                  :headers="importHeaders"
                  :on-success="handleAvatarSuccess"
                  >
                  <img v-if="imageUrl" :src="createEmployee.photo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button @click="drawer = false" style="margin: 15px 32px 0 15px;float: right;">取消</el-button>
        <el-button type="primary" @click="onSubmit" style="margin: 15px 15px 0 15px;float: right;">确认</el-button>
      </el-drawer>

      <!-- 查看详情抽屉 -->
        <el-drawer
          title="查看详情"
          :modal="true"
          :append-to-body="true"
          :visible.sync="viewDrawer"
          :direction="direction"
          :before-close="handleClose"
        >
        <el-form
          class="view-el-form"
          label-width="120px"
          style="padding-bottom: 100px; padding-top: 20px;"
        >
        <!-- 账号信息 -->
        <div class="drawer-left">
          <el-form-item label="车牌号:">{{viewList.vehiclePlate}}</el-form-item>
          <el-form-item label="自编号:">{{viewList.selfNumber}}</el-form-item>
          <el-form-item label="回收类型:">{{viewList.recycleTypeStr}}</el-form-item>
          <el-form-item label="车辆状态:">
            <template>
              <span v-if="viewList.vehicleStatus===0">正常</span>
              <span v-else-if="viewList.vehicleStatus===1">维修中</span>
              <span v-else-if="viewList.vehicleStatus===2">停用</span>
              <span v-else-if="viewList.vehicleStatus===3">失效</span>
            </template>
          </el-form-item>
          <el-form-item label="启用日期:">{{viewList.activationDate}}</el-form-item>
          <el-form-item label="报废日期:">{{viewList.scrapDate}}</el-form-item>
          <el-form-item label="报废原因:">{{viewList.scrapReason}}</el-form-item>
          <el-form-item label="车辆类型:">{{viewList.vehicleTypeStr}}</el-form-item>
          <el-form-item label="车辆简称:">{{viewList.vehicleShortName}}</el-form-item>
          <el-form-item label="加油类型:">{{viewList.oilType}}</el-form-item>
          <el-form-item label="车身装置:">{{viewList.bodyDeviceStr}}</el-form-item>
          <el-form-item label="发动机号:">{{viewList.engineNumber}}</el-form-item>
          <el-form-item label="车架号:">{{viewList.frameNumber}}</el-form-item>
          <el-form-item label="吨位（单位kg）:">{{viewList.tonnage}}</el-form-item>
          <el-form-item label="车身颜色:">{{viewList.color}}</el-form-item>
          <el-form-item label="车系品牌:">{{viewList.carBrandStr}}</el-form-item>
        </div>
        <div class="drawer-right">
          <div class="all">
            <span>所有动态</span>
            <el-select
              v-model="valueDate"
              placeholder="请选择"
              style="width:96px;height:32px !important;"
              @change="changeTime"
            >
              <el-option
                v-for="item in dateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div v-show="!dataLogLength" style="margin-top:5px;text-align:center;font-size:14px;">暂无数据</div>
          <!-- all info -->
          <div class="allInfo" v-show="dataLogLength" v-for="item in infoList" :key="item.id">
          <div class="top" style="margin-bottom:5px">
            <div class="oper" style="color:rgba(144,147,153,1);"> <span >{{item.editor}}</span> <span>{{item.isCreated? '创建':'编辑'}}</span>了&nbsp;&nbsp;&nbsp;<span>{{item.mainContent}}</span></div>
            <div class="infoTime" style="color:rgba(144,147,153,1);;">
              {{item.editTime}}
            </div>
          </div>
          <div class="bottom"> <span style="color:rgba(144,147,153,1); margin-right:10px">{{item.isCreated? '创建':'修改'}}</span><span> {{item.isCreated? item.mainContent:item.fieldName}}</span></div>
          </div>
        </div>
        </el-form>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import belongUnit from '../../components/belong-unit'
import { electricList, CompanyList, getEditLog, electricExport, getDataFilter, dictItem, electricView, electricDelete, electricAdd, electricEdit, vehicleCheck } from '../../api/getData';

export default {
  data () {
    return {
      value: '',
      rowId: '',
      drawer: false,
      viewDrawer: false,
      valueDate: 0,
      TypeOptionForm: [],
      bodyDeviceOptions: [],
      liveEefuseOptions: [],
      imageUrl: '',
      direction: 'rtl',
      show: false,
      comdata: [],
      companyIds: [],
      importHeaders: { 'access-token': localStorage.getItem('token') },
      viewList: {
        vehiclePlate: '',
        selfNumber: '',
        recycleTypeStr: '',
        vehicleStatus: '',
        activationDate: '',
        scrapDate: '',
        scrapReason: '',
        vehicleTypeStr: '',
        vehicleShortName: '',
        oilType: '电力',
        bodyDeviceStr: '',
        engineNumber: '',
        frameNumber: '',
        tonnage: '',
        color: '',
        carBrandStr: ''
      },
      recycleTypeOption: [],
      vehicleStatusOption: [],
      formStatusOptions: [],
      arr: [],
      dataLogLength: true,
      searchForm: {
        vehiclePlate: '',
        selfNumber: '',
        recycleType: '',
        vehicleStatus: '',
        vehicleType: '',
        activationSatrtDate: '',
        activationEndDate: ''
      },
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
      tableData: [],
      infoList: [],
      options: [
        { value: '1',
          label: '在职' },
        { value: '2',
          label: '离职' }
      ],
      // 所属部门
      departmentOptions: [
        { value: '1',
          label: '在职' },
        { value: '2',
          label: '离职' }
      ],
      delId: '',
      title: '',
      vehicleTypeOption: [],
      pageSize: 20,
      pageNum: 1,
      total: 0,
      optionsCom: [],
      unitList: [],
      detailId: '',
      excelData: [],
      // 新建表单
      createEmployee: {
        companyId: '',
        vehiclePlate: '',
        selfNumber: '',
        recycleType: '',
        vehicleStatus: '',
        activationDate: '',
        scrapDate: '',
        scrapReason: '',
        vehicleType: '',
        vehicleShortName: '',
        // oilType: '',
        bodyDevice: '',
        engineNumber: '',
        frameNumber: '',
        tonnage: '',
        color: '',
        carBrand: '',
        repairNum: '',
        photo: ''
      },
      // 开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          return time.getTime() > new Date(this.createEmployee.scrapDate).getTime();
        }
      },
      // 结束时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.createEmployee.activationDate) {
            return (
              time.getTime() < new Date(this.createEmployee.activationDate).getTime() // 加- 8.64e7则表示包当天
            );
          }
        }
      },
      rules: {
        companyId: [{ required: true, message: '请选择所属单位', trigger: 'blur' }],
        vehiclePlate: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { validator: this.vehicleCheckFun, trigger: ['change', 'blur'] }
        ],
        selfNumber: [{ required: true, message: '请填写自编号', trigger: 'blur' },
          { validator: this.selfNumberCheckFun, trigger: ['change', 'blur'] }
        ],
        recycleType: [
          { required: true, message: '请选择回收类型', trigger: 'blur' }
        ],
        vehicleStatus: [{ required: true, message: '请选择车辆状态', trigger: 'blur' }],
        activationDate: [{ required: true, message: '请选择启用日期', trigger: 'blur' }]
      }
    }
  },
  methods: {
    comChange () {
      // this.vehicleCheckFun(this.rule, this.createEmployee.vehiclePlate, this.callback)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = true;
      this.createEmployee.photo = res.data.url;
    },
    searchCancle () {
      this.searchForm.vehiclePlate = ''
      this.searchForm.selfNumber = ''
      this.searchForm.recycleType = ''
      this.searchForm.vehicleStatus = ''
      this.searchForm.vehicleType = ''
      this.searchForm.activationSatrtDate = ''
    },
    exportList () {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          'dataFilters': this.comdata,
          'vehiclePlate': this.searchForm.vehiclePlate,
          'selfNumber': this.searchForm.selfNumber,
          'recycleType': this.searchForm.recycleType,
          'vehicleStatus': this.searchForm.vehicleStatus,
          'vehicleType': this.searchForm.vehicleType,
          'activationSatrtDate': this.searchForm.activationSatrtDate === null ? '' : this.searchForm.activationSatrtDate[0],
          'activationEndDate': this.searchForm.activationSatrtDate === null ? '' : this.searchForm.activationSatrtDate[1],
          'page': this.pageNum,
          'limit': this.pageSize
        }
        electricExport(data).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.excelData = res.data.data
              for (let i = 0; i < this.excelData.length; i++) {
                if (this.excelData[i].vehicleStatus === 0) {
                  this.excelData[i].vehicleStatus = '正常'
                } else if (this.excelData[i].vehicleStatus === 1) {
                  this.excelData[i].vehicleStatus = '有效'
                } else if (this.excelData[i].vehicleStatus === 2) {
                  this.excelData[i].vehicleStatus = '停用'
                }
              }
              this.export2Excel()
              this.$message.success('导出成功')
            } else {
              this.$message.error(res.data.msg)
            }
          }
        })
        // 你要导出的数据list。
      }).catch(() => {
        this.$message.error('已取消导出')
      });
    },
    export2Excel () {
      import('../../assets/js/Export2Excel').then(excel => {
        const tHeader = ['车牌号', '自编号', '回收类型', '启用日期', '状态']
        const filterVal = ['vehiclePlate', 'selfNumber', 'recycleTypeStr', 'activationDate', 'vehicleStatus']
        const list = this.excelData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '电瓶车信息登记列表',
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    vehicleCheckFun (rule, value, callback) {
      if (this.title === '新增电瓶车信息') {
        let data = {
          companyId: this.createEmployee.companyId,
          vehiclePlate: value
        }
        console.log(data)
        vehicleCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('车牌号已存在'))
          }
          callback()
        })
      } else if (this.title === '编辑电瓶车信息') {
        let data = {
          id: this.rowId,
          vehiclePlate: value
        }
        vehicleCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('车牌号已存在'))
          }
          callback()
        })
      }
    },
    selfNumberCheckFun (rule, value, callback) {
      if (this.title === '新增电瓶车信息') {
        let data = {
          selfNumber: value
        }
        vehicleCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('自编号已存在'))
          }
          callback()
        })
      } else if (this.title === '编辑电瓶车信息') {
        let data = {
          id: this.rowId,
          selfNumber: value
        }
        vehicleCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('自编号已存在'))
          }
          callback()
        })
      }
    },
    showEditDialog (row) {
      if (row.photo) {
        this.imageUrl = true
      }
      this.drawer = true
      // 重置表单
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
      this.title = '编辑电瓶车信息'
      this.rowId = row.id
      electricView(
        {
          'id': row.id
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.createEmployee.vehiclePlate = res.data.data.vehiclePlate
          this.createEmployee.selfNumber = res.data.data.selfNumber
          this.createEmployee.recycleType = res.data.data.recycleType
          this.createEmployee.vehicleStatus = res.data.data.vehicleStatus
          this.createEmployee.activationDate = res.data.data.activationDate
          this.createEmployee.scrapDate = res.data.data.scrapDate
          this.createEmployee.scrapReason = res.data.data.scrapReason
          this.createEmployee.vehicleType = res.data.data.vehicleType
          this.createEmployee.vehicleShortName = res.data.data.vehicleShortName
          this.createEmployee.bodyDevice = res.data.data.bodyDevice
          this.createEmployee.engineNumber = res.data.data.engineNumber
          this.createEmployee.frameNumber = res.data.data.frameNumber
          this.createEmployee.tonnage = res.data.data.tonnage
          this.createEmployee.color = res.data.data.color
          this.createEmployee.carBrand = res.data.data.carBrand
          this.createEmployee.repairNum = res.data.data.repairNum
          this.createEmployee.photo = res.data.data.photo
        }
      })
    },
    showDrawer () {
      this.imageUrl = false
      this.drawer = true
      // 重置表单
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
      this.title = '新增电瓶车信息'
      this.createEmployee.vehiclePlate = ''
      this.createEmployee.selfNumber = ''
      this.createEmployee.recycleType = ''
      this.createEmployee.vehicleStatus = ''
      this.createEmployee.activationDate = ''
      this.createEmployee.scrapDate = ''
      this.createEmployee.scrapReason = ''
      this.createEmployee.vehicleType = ''
      this.createEmployee.vehicleShortName = ''
      this.createEmployee.bodyDevice = ''
      this.createEmployee.engineNumber = ''
      this.createEmployee.frameNumber = ''
      this.createEmployee.tonnage = ''
      this.createEmployee.color = ''
      this.createEmployee.carBrand = ''
      this.createEmployee.repairNum = ''
      this.createEmployee.photo = ''
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      // this.drawer = false
    },
    // 删除功能
    isDelete (row) {
      this.delId = row.id
      let data = {
        'id': row.id
      }
      electricDelete(data).then(res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功！')
          this.list()
        } else {
          this.$confirm(res.data.msg, '删除车辆', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          })
        }
      })
    },
    onSubmit () {
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          if (this.title === '新增电瓶车信息') {
            electricAdd(this.createEmployee).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '成功!'
                });
                this.list()
                this.drawer = false
              } else {
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              }
            })
          } else if (this.title === '编辑电瓶车信息') {
            this.createEmployee.id = this.rowId
            let data = {
              id: this.rowId,
              companyId: this.createEmployee.companyId,
              vehiclePlate: this.createEmployee.vehiclePlate,
              selfNumber: this.createEmployee.selfNumber,
              recycleType: this.createEmployee.recycleType,
              vehicleStatus: this.createEmployee.vehicleStatus,
              activationDate: this.createEmployee.activationDate,
              scrapDate: this.createEmployee.scrapDate,
              scrapReason: this.createEmployee.scrapReason,
              vehicleType: this.createEmployee.vehicleType,
              vehicleShortName: this.createEmployee.vehicleShortName,
              bodyDevice: this.createEmployee.bodyDevice,
              engineNumber: this.createEmployee.engineNumber,
              frameNumber: this.createEmployee.frameNumber,
              tonnage: this.createEmployee.tonnage,
              color: this.createEmployee.color,
              carBrand: this.createEmployee.carBrand,
              repairNum: this.createEmployee.repairNum,
              photo: this.createEmployee.photo
            }
            electricEdit(data).then(res => {
              if (res.data.code === 200) {
                this.newDrawer = false
                this.$message({
                  type: 'success',
                  message: '成功!'
                });
                this.list()
                this.drawer = false
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
    // 查看详情
    viewDetail (row) {
      this.detailId = row.id
      this.changeTime()
      this.viewDrawer = true;
      electricView(
        {
          'id': row.id
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.viewList.vehiclePlate = res.data.data.vehiclePlate
          this.viewList.selfNumber = res.data.data.selfNumber
          this.viewList.recycleTypeStr = res.data.data.recycleTypeStr
          this.viewList.vehicleStatus = res.data.data.vehicleStatus
          this.viewList.activationDate = res.data.data.activationDate
          this.viewList.scrapDate = res.data.data.scrapDate
          this.viewList.scrapReason = res.data.data.scrapReason
          this.viewList.vehicleTypeStr = res.data.data.vehicleTypeStr
          this.viewList.vehicleShortName = res.data.data.vehicleShortName
          this.viewList.oilType = '电力'
          this.viewList.bodyDeviceStr = res.data.data.bodyDeviceStr
          this.viewList.engineNumber = res.data.data.engineNumber
          this.viewList.frameNumber = res.data.data.frameNumber
          this.viewList.tonnage = res.data.data.tonnage
          this.viewList.color = res.data.data.color
          this.viewList.carBrandStr = res.data.data.carBrandStr
          this.viewList.repairNum = res.data.data.repairNum
        }
      })
    },
    // 查询表单
    isSearch () {
      electricList({
        'dataFilters': this.comdata,
        'vehiclePlate': this.searchForm.vehiclePlate,
        'selfNumber': this.searchForm.selfNumber,
        'recycleType': this.searchForm.recycleType,
        'vehicleStatus': this.searchForm.vehicleStatus,
        'vehicleType': this.searchForm.vehicleType,
        'activationSatrtDate': this.searchForm.activationSatrtDate === null ? '' : this.searchForm.activationSatrtDate[0],
        'activationEndDate': this.searchForm.activationSatrtDate === null ? '' : this.searchForm.activationSatrtDate[1],
        'page': this.pageNum,
        'limit': this.pageSize
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total
        }
      });
    },
    // 被选中的单位名称
    selectUnit (date) {
      // this.comdata.push()
      this.comdata = date
      electricList({
        'dataFilters': date,
        'page': this.pageNum,
        'limit': this.pageSize,
        'vehiclePlate': this.searchForm.vehiclePlate,
        'selfNumber': this.searchForm.selfNumber,
        'recycleType': this.searchForm.recycleType,
        'vehicleStatus': this.searchForm.vehicleStatus,
        'vehicleType': this.searchForm.vehicleType,
        'activationSatrtDate': this.searchForm.activationSatrtDate === null ? '' : this.searchForm.activationSatrtDate[0],
        'activationEndDate': this.searchForm.activationSatrtDate === null ? '' : this.searchForm.activationSatrtDate[1]
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total
        }
      });
    },
    // 是否展开
    expand () {
      this.show = !this.show
    },
    // 获取共享数据列表
    codeList () {
      let code = localStorage.getItem('code');
      let data = JSON.parse(localStorage.getItem('login')).privilegeCodes;
      let comId = JSON.parse(localStorage.getItem('login')).companyId;
      data = data.filter(item => {
        if (item.indexOf(code) !== -1) {
          return item;
        }
      });
      this.arr = data;
      getDataFilter({
        menuCode: localStorage.getItem('code')
      }).then(res => {
        if (res.data.code === 200) {
          this.unitList = res.data.data.filters;
          this.unitList.forEach(item => {
            if (item.companyId === comId) {
              this.comdata.push(item)
            }
          });
          this.companyIds = res.data.data.currentCompanyIds;
          this.selectUnit(this.comdata)
        }
      });
    },
    changeTime () {
      let data = {
        tableName: 'electricVehicle',
        recordId: this.detailId,
        timeInterval: this.valueDate
      }
      getEditLog(data).then(res => {
        if (res.data.data.length === 0) {
          this.dataLogLength = false
        } else {
          this.dataLogLength = true
          this.infoList = res.data.data;
        }
      })
    },
    // 获取单位列表
    isShowUnit () {
      let data = JSON.parse(localStorage.getItem('login'));
      this.createEmployee.companyId = data.companyId
      CompanyList({
        id: data.companyId
      }).then(res => {
        if (res.data.code === 200) {
          this.optionsCom = res.data.data;
        }
      });
    },
    handleSizeChangeTotal (val) {
      this.limit = val
    },
    handleCurrentChangeTotal (val) {
      this.page = val
    },
    list () {
      let data = {
        'page': this.pageNum,
        'limit': this.pageSize,
        'dataFilters': this.comdata
      }
      electricList(data).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
      })
    },
    dictItemFun () {
      dictItem({ 'code': 'vehicleType', showSelectOption: false }).then(res => {
        this.vehicleTypeOption = res.data.data
        this.TypeOptionForm = res.data.data
      })
      dictItem({ 'code': 'recycleType', showSelectOption: false }).then(res => {
        this.recycleTypeOption = res.data.data
      })
      dictItem({ 'code': 'vehicleStatus', showSelectOption: false }).then(res => {
        this.formStatusOptions = res.data.data
        this.vehicleStatusOption = res.data.data
      })
      dictItem({ 'code': 'bodyDevice', showSelectOption: false }).then(res => {
        this.bodyDeviceOptions = res.data.data
      })
      dictItem({ 'code': 'liveEefuse', showSelectOption: false }).then(res => {
        this.liveEefuseOptions = res.data.data
      })
    }
  },
  components: {
    belongUnit
  },
  created () {
    let comId = JSON.parse(localStorage.getItem('login')).companyId;
    let comName = JSON.parse(localStorage.getItem('login')).companyName;

    this.comdata = [{
      'companyName': comName,
      'type': 1,
      'companyId': comId
    }]
    this.list()
    this.isShowUnit()
    this.dictItemFun()
    this.codeList()
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
  height: 75vh;
  display: flex;
  flex-flow: column;
  // position: relative;
}
 /deep/input.el-input__inner{
    padding-right:0px !important;
  }
/deep/ .el-table .el-table__header-wrapper .el-table__header .has-gutter tr th {
  background-color: rgba(245, 247, 250, 1) !important;
}
.el-row{
  margin-bottom:16px;
}
  .xf-main {
    flex: 1;
    display: flex;
    height: 100%;
    border-left: 1px solid #eee;

    .xf-left {
      width: 270px;
      background-color: #fff;
    }
    .xf-right {
      flex: 1;
      height: 100%;
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
    height: 100%;
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
    .view-el-form .el-form-item{
      border-bottom:1px solid #eee;
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
.el-drawer__wrapper .el-form {
    height: 68vh;
    overflow-y: scroll;
    overflow-x: hidden;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
}

  // 上传图片样式
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 24px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      border: 1px dashed #ccc;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
//  // 详情抽屉样式
.el-drawer__wrapper .view-el-form {
  height: 90%;
  padding-bottom: 80px;
  display: flex;
  position: relative;
  .drawer-left {
    height: 100%;
    // background-color: #ccc;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 15px;
  }
  .drawer-right {
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1;
    height: 100%;
    // background-color: pink;
    box-sizing: border-box;
    padding: 15px;
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
        right: 22px;
        // font-size: 18px;
      }
    }
    .allInfo {
      height: 72px;
      padding: 15px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(228, 231, 237, 1);
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

.operation {
  span {
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
    color: #237bff;
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

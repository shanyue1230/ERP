<template>
  <div class="station">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>环卫设施点</el-breadcrumb-item>
      <el-breadcrumb-item>小压站</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <div class="xf-left">
        <belongUnit :unitList="unitList" @handleChange="selectUnit"></belongUnit>
      </div>
      <div class="xf-right">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-row>
            <el-col :span="5">
              <!-- 小压站名称 -->
              <el-form-item label="小压站名称:" prop="name">
                <el-input v-model="listQuery.name" placeholder="请输入小压站名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <!-- 所属单位 -->
              <!-- <el-form-item label="所属单位:" prop="companyId">
                <el-select
                v-model="listQuery.companyId"
                filterable
                remote
                placeholder="请输入所属单位"
                :remote-method="getCompanyList"
                :loading="companyLoading"
              >
                <el-option
                  v-for="item in scompanies"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              </el-form-item> -->
              <!-- 是否设置区域 -->
                <el-form-item label="是否设置区域:" prop="deptId">
                  <el-select v-model="listQuery.isSetArea" placeholder="全部">
                    <el-option
                      v-for="item in positionOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
              <!-- 所属街道 -->
              <el-form-item label="所属街道:" prop="streetId">
                  <el-cascader
                            v-model="listQuery.regionLocaleId"
                            :options="regionLocaleList"
                            :props="{ expandTrigger: 'hover', label: 'name', value: 'id', children: 'regionLocales', }"
                           ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <!-- 操作 -->
              <el-form-item
                style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px"
              >
                <el-button type="primary" @click="handleFilter">确定</el-button>
                <!-- <el-button
                  type="success"
                  icon="el-icon-arrow-down"
                  style="width: 70px;position: relative; padding-left: 10px;"
                  @click="expand"
                >展开</el-button> -->
                <el-button @click="resetSearchForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 展开的表单 -->
          <!-- <div v-show="show">
            <el-row>
              <el-col :span="5">
              </el-col>
            </el-row>
          </div> -->
        </el-form>

        <!-- 新增 + 导出 -->
        <div style="margin-top:20px;">
          <el-button type="primary" @click="showDrawer">新增</el-button>
          <el-button type="warning" style="float: right;" @click="exportExcel">导出</el-button>
        </div>

        <!-- 表格 -->
        <!-- height="" -->
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="65%">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column  type="index" label="No." width="50"></el-table-column>
          <el-table-column prop="companyId" label="所属单位"></el-table-column>
          <el-table-column prop="regionLocaleId" label="所属街道"></el-table-column>
          <el-table-column prop="name" label="小压站名称"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template v-slot="{row}">
              <span v-if="row.status===0" style="color:#67C23A">正常</span>
              <span v-else-if="row.status===1" style="color:#F56C6C">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" width="200px">
            <template v-slot="{row}">
                <span class="span" @click="showEditDrawer(row.id)">编辑</span>&nbsp;&nbsp;
                <span style="color:#ccc">|</span>&nbsp;&nbsp;
                <span class="span" @click="showViewDrawer(row.id)">查看详情</span>&nbsp;&nbsp;
                <span style="color:#ccc">|</span>&nbsp;&nbsp;
                <span class="span" @click="showPositionDrawer(row.id)">定位</span>
                <span style="color:#ccc">|</span>&nbsp;&nbsp;
                <span class="span"  @click="deleteFormData(row.id)">删除</span>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          style="margin-top: 16px;"
          :current-page="1"
          :page-sizes="[10, 20, 30]"
          :page-size.sync="listQuery.limit"
          current-page.sync="listQuery.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>

        <!-- 新增抽屉 -->
        <el-drawer
          title="新建小压站"
          :modal="false"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose"
        >
          <el-form
          class="create-el-form"
          :model="form"
          :rules="rules"
          ref="ruleForm"
        >
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属单位" prop="companyId">
                     <el-select
                  v-model="form.companyId"
                  filterable
                  remote
                  placeholder="请输入所属单位"
                  :remote-method="getCompanyList"
                  :loading="companyLoading"
                >
                  <el-option
                    v-for="item in scompanies"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属街道" prop="regionLocaleId">
                     <el-cascader
                        v-model="form.regionLocaleId"
                        :options="regionLocaleList"
                        :props="{ expandTrigger: 'hover', label: 'name', value: 'id', children: 'regionLocales', }"
                        ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="小压站名称" prop="name">
                  <el-input type="text" placeholder="请输入小压站名称" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址" prop="address">
                  <el-input type="text" placeholder="请输入地址" v-model="form.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="启用日期" prop="useDate">
                  <el-date-picker
                    v-model="form.useDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :editable="false"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建筑面积" prop="constructionArea">
                  <el-input type="number" placeholder="请输入建筑面积" v-model="form.constructionArea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="负责人" prop="employeeId">
                          <el-select
                  v-model="form.employeeId"
                  filterable
                  remote
                  placeholder="请输入所属单位"
                  :remote-method="getEmployeeList"
                >
                  <el-option
                    v-for="item in employeeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="场地电话" prop="fieldPhone">
                  <el-input type="text" placeholder="请输入场地电话" v-model="form.fieldPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="设备编号" prop="deviceNo">
                  <el-input type="text" placeholder="请输入场地电话" v-model="form.deviceNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备状态" prop="deviceCode">
                  <el-select v-model="form.deviceCode" placeholder="请选择设备状态" disabled>
                    <el-option
                      v-for="item in sstaus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片" prop="picUrl">
                     <el-upload
                        class="avatar-uploader"
                        action="http://112.65.228.185:8004/upload/singleImage"
                        :show-file-list="false"
                        :headers="importHeaders"
                        accept=".jpg,.png"
                        :on-success="handleAvatarSuccess"
                        >
                        <img v-if="imageUrl" :src="form.picUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-button style="margin: 15px 32px 0 15px;float: right;">取消</el-button>
            <el-button type="primary" @click="addFormData" style="margin: 15px 15px 0 15px;float: right;">确认</el-button>
          </el-form>
        </el-drawer>
        <!-- 编辑抽屉 -->
        <el-drawer
          title="编辑小压站"
          :modal="false"
          :append-to-body="true"
          :visible.sync="editDrawer"
          :direction="direction"
        >
          <el-form
          class="create-el-form"
          :model="form"
          :rules="rules"
          ref="editRuleForm"
        >
            <el-row>
              <el-col :span="12">
                <el-form-item label="所属单位" prop="companyId">
                     <el-select
                  v-model="form.companyId"
                  filterable
                  remote
                  placeholder="请输入所属单位"
                  :remote-method="getCompanyList"
                  :loading="companyLoading"
                >
                  <el-option
                    v-for="item in scompanies"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属街道" prop="regionLocaleId">
                     <el-cascader
                        v-model="form.regionLocaleId"
                        :options="regionLocaleList"
                        :props="{ expandTrigger: 'hover', label: 'name', value: 'id', children: 'regionLocales', }"
                        ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="小压站名称" prop="name">
                  <el-input type="text" placeholder="请输入小压站名称" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址" prop="address">
                  <el-input type="text" placeholder="请输入地址" v-model="form.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="启用日期" prop="useDate">
                  <el-date-picker
                    v-model="form.useDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :editable="false"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建筑面积" prop="constructionArea">
                  <el-input type="number" placeholder="请输入建筑面积" v-model="form.constructionArea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="负责人" prop="employeeId">
                          <el-select
                  v-model="form.employeeId"
                  filterable
                  remote
                  placeholder="请输入所属单位"
                  :remote-method="getEmployeeList"
                >
                  <el-option
                    v-for="item in employeeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="场地电话" prop="fieldPhone">
                  <el-input type="text" placeholder="请输入场地电话" v-model="form.fieldPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- -------------- -->
            <!-- <el-row>
              <el-col :span="12">
                <el-form-item label="设备编号" prop="deviceNo">
                  <el-input type="text" placeholder="请输入场地电话" v-model="form.deviceNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备状态" prop="deviceCode">
                  <el-select v-model="form.deviceCode" placeholder="请选择设备状态" disabled>
                    <el-option
                      v-for="item in sstaus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- -------------- -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="照片" prop="picUrl">
                     <el-upload
                        class="avatar-uploader"
                        action="http://112.65.228.185:8004/upload/singleImage"
                        :show-file-list="false"
                        :headers="importHeaders"
                        accept=".jpg,.png"
                        :on-success="handleAvatarSuccess"
                        >
                        <img v-if="imageUrl" :src="form.picUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-button  @click="editDrawer = false" style="margin: 15px 32px 0 15px;float: right;" >取消</el-button>
            <el-button type="primary" @click="editFormData" style="margin: 15px 15px 0 15px;float: right;">确认</el-button>
          </el-form>
        </el-drawer>

        <!-- 查看详情抽屉 -->
        <el-drawer
          title="查看详情"
          :modal="false"
          :append-to-body="true"
          :visible.sync="viewDrawer"
          :direction="direction"
        >
            <el-row style="height:100%;padding:31px">
                            <el-col :span="12" style="height:100%">
                                <div class="info">
                                  <el-form style="padding:0" :model="form" >
                                    <el-form-item  label="所属单位">{{form.companyName}}</el-form-item>
                                    <el-form-item  label="所属街道">{{form.regionLocaleName}}</el-form-item>
                                    <el-form-item  label="小压站转站名称">{{form.name}}</el-form-item>
                                    <el-form-item  label="地址">{{form.address}}</el-form-item>
                                    <el-form-item  label="启用日期">{{form.useDate}}</el-form-item>
                                    <el-form-item  label="建筑面积">{{form.constructionArea}}</el-form-item>
                                    <el-form-item  label="负责人">{{form.employeeName}}</el-form-item>
                                    <el-form-item  label="场地电话">{{form.fieldPhone}}</el-form-item>
                                  </el-form>
                                </div>
                            </el-col>
                            <el-col :span="12" style="height:100%">
                              <div class="dynamic">
                                <div class="all">
                                    <span>所有动态</span>
                                    <el-select v-model="time" placeholder="请选择" style="width:96px;height:32px !important;"
                                    @change="changeTimeInterval"
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
                                <div class="box">
                                  <div class="allInfo" v-for="item in history" :key="item.id">
                                  <div class="top" style="margin-bottom:5px">
                                    <div class="oper" style="color:rgba(144,147,153,1);"> <span >{{item.editor}}</span> <span>{{item.isCreated? '创建':'编辑'}}</span>了&nbsp;&nbsp;&nbsp;<span>{{item.mainContent}}</span></div>
                                    <div class="infoTime" style="color:rgba(144,147,153,1);;">
                                      {{item.editTime}}
                                      </div>
                                  </div>
                                  <div class="bottom"> <span style="color:rgba(144,147,153,1); margin-right:10px">{{item.isCreated? '创建':'修改'}}</span><span> {{item.isCreated? item.mainContent:item.fieldName}}</span></div>
                                </div>
                                </div>
                              </div>
                            </el-col>
                </el-row>
            <div class="view-footer" style="position: fixed; bottom: 15px; right: 50px;">
              <el-button style="margin: 15px 32px 0 15px;float: right;">取消</el-button>
              <el-button type="primary" style="margin: 15px 15px 0 15px;float: right;">确认</el-button>
            </div>

        </el-drawer>
        <!-- 定位的抽屉框 -->
          <el-drawer
            title="定位"
            :visible.sync="positionDrawer"
            :direction="direction"
          >
            <el-form v-model="positionForm" style="padding-top: 16px">
                    <el-row type="flex" class="row-bg" justify="space-between">
                         <el-col style="width:250px;position: relative;">
                           <el-form-item style="position: absolute;bottom: 0">
                                    <el-button type="primary" @click="isNewPoint">新增点位</el-button>
                                    <el-button type="primary" @click="delPointLocation">删除点位</el-button>
                           </el-form-item>
                        </el-col>
                         <el-col :span="5">
                           <el-form-item  label="检索地址：" style="position: relative;">
                             <el-input v-model="positionForm.address" @input="isSearch" placeholder="请输入详细地址"></el-input>
                             <div class="Search_address" v-if="restaurants.length!==0">
                               <ul>
                                   <li  v-for="(item,index) in restaurants" :key="index" @click="isShowtext(item.name,item.location)" style="cursor:pointer;">
                                     <div style="width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                               {{item.name}}
                                               {{item.district.length===0? [] :item.district}}
                                     </div>
                                   </li>
                               </ul>
                             </div>
                             <!-- <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
                           </el-form-item>
                         </el-col>
                          <el-col  :span="5"  :offset="8" style="margin-right:20px">
                           <el-form-item  label="工作范围：">
                                         <el-select v-model="positionForm.range" placeholder="全部" @change="changeRange">
                                                <el-option
                                                  v-for="item in options10"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                           </el-form-item>
                         </el-col>
                   </el-row>
            </el-form>
            <div class="map">
                 <div class="amap-page-container">
                    <div :style="{width:'100%',height:'60vh'}">
                       <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center" :zoom="zoom" >
                       <el-amap-marker v-for="(marker, index) in markers" :key="marker.index" :position="marker.position" :icon="marker.icon" :title="marker.title" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
                       <el-amap-circle v-for="circle in circles" :key="circle.index"  fillColor='#dae6f0' strokeOpacity='0' strokeColor='#000' :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" ></el-amap-circle>
                </el-amap>
                    </div>
            </div>
            </div>
                <div class="saveAndCancle">
                       <el-button @click="positionDrawer=false">取 消</el-button>
                       <el-button type="primary">确 定</el-button>
                </div>
          </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import belongUnit from '../../components/belong-unit';
import axios from 'axios';
import { getDataFilter, companyList, getRegionLocale, pressureStationList, employeeListing, pressureStationAdd, pressureStationView, pressureStationEdit, dataDictItem, pressureStationDelete, pressureStationPosition, pressureStationExport } from '../../api/getData';
export default {
  data () {
    return {
      positionOptions: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
      ],
      selst: false,
      recordId: undefined,
      time: 0,
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
      editDrawer: false,
      viewDrawer: false,
      imageUrl: false,
      positionDrawer: false,
      direction: 'rtl',
      show: false,
      unitList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        // companyId: undefined,
        regionLocaleId: undefined,
        isSetArea: undefined,
        dataFilters: undefined
      },
      // 表格数据
      tableData: [
        {
          no: 1,
          companyId: 11111,
          streetId: 22222,
          name: 33333,
          address: 44444,
          startDate: '2020-01-15',
          area: 55555,
          responsiblePerson: '小高',
          placePhone: 13966074552,
          deviceNo: 'xfr001',
          status: 0
        }
      ],
      // 表单数据
      form: {
        companyId: undefined,
        regionLocaleId: undefined,
        name: undefined,
        address: undefined,
        useDate: undefined,
        constructionArea: undefined,
        employeeId: undefined,
        fieldPhone: undefined,
        deviceNo: undefined,
        picUrl: undefined
        // status: 0
      },
      history: [],
      importHeaders: { 'access-token': localStorage.getItem('token') },
      currentCompanyIds: [],
      scompanies: [],
      companyLoading: false,
      regionLocaleList: [],
      employeeList: [],
      rules: {
        companyId: [
          { required: true, message: '请选择所属单位', trigger: 'change' }
        ],
        regionLocaleId: [
          { required: true, message: '请选择所属街道', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写小压站名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写小压站地址', trigger: 'blur' }
        ]
      },
      positionForm: {
        address: '',
        range: 1
      },
      transferStationId: undefined,
      restaurants: [],
      options10: [
        {
          value: 1,
          label: '500米'
        },
        {
          value: 2,
          label: '1000米'
        },
        {
          value: 3,
          label: '1500米'
        },
        {
          value: 4,
          label: '2000米'
        }
      ],
      // 地图插件
      qaqqq: [],
      address: '',
      // 地图缩放
      zoom: 14,
      // 初始中心
      // center: [114.406539, 30.492921],
      center: [31.395315, 31.395315],
      lng: 0,
      lat: 0,
      loaded: false,
      // 点击显示的标记默认的定位
      markers: [{
        position: [31.395315, 31.395315]
      }],

      // 圆覆盖圈
      circles: [
        {
          center: [31.395315, 31.395315],
          radius: 500,
          fillOpacity: 0.5,
          events: {
            click: () => {
              // alert('click');
            }
          }
        }
      ],
      //  定位
      plugin: [{
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        pName: 'Geolocation',
        events: {
          init (o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log('aaaa');
              if (result && result.position) {
                console.log(window);
                window.lng = result.position.lng
                window.lat = result.position.lat
                if (self.lng === 0) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  // window.lng = self.lng
                  // window.lat = self.lat
                  // this.lng = result.position.lng
                  // this.lat = result.position.lat
                  console.log(self.lng, self.lat);

                  // 初始定位地图中心位置
                  self.center = [self.lng, self.lat];
                  // 初始定位圆的位置
                  self.circles[0].center = [self.lng, self.lat]
                  // 初始定位标记的位置
                  self.markers[0].position = [self.lng, self.lat]

                  self.loaded = true;
                  self.$nextTick();
                } else {
                  // 初始定位地图中心位置
                  self.center = [self.lng, self.lat];
                  // 初始定位圆的位置
                  self.circles[0].center = [self.lng, self.lat]
                  // 初始定位标记的位置
                  self.markers[0].position = [self.lng, self.lat]
                }
              }
            });

            console.log(self.lng);
          }
        }
      }]
    };
  },
  created () {
    this.init()
  },
  methods: {
    /**
       * 初始化数据
       */
    async init () {
      await this.getDataFilter();
      this.getCompanyList(undefined);
      this.getRegionLocaleList();
      this.getList();
      this.getEmployeeList(undefined);
    },
    /**
     * 每页条数改变
     */
    handleSizeChange (size) {
      this.listQuery.page = 1;
      this.getList();
    },
    /**
     * 改变当前页
     */
    handleCurrentChange (currentPage) {
      this.getList();
    },
    /**
     * 条件筛选
     */
    handleFilter () {
      this.getList();
    },
    /**
     * 重置列表搜索条件
     */
    resetSearchForm () {
      this.listQuery.name = undefined;
      this.listQuery.companyId = undefined;
      this.listQuery.regionLocaleId = undefined;
      this.listQuery.isSetArea = undefined;
    },
    /**
     * 获取数据过滤器单位列表
     */
    async getDataFilter () {
      const res = await getDataFilter({
        menuCode: localStorage.getItem('code')
      })
      if (res.data.code === 200) {
        this.unitList = res.data.data.filters
        const comId = JSON.parse(localStorage.getItem('login')).companyId
        this.unitList.forEach(ele => {
          if (ele.companyId === comId) {
            const defaultList = []
            defaultList.push(ele)
            this.listQuery.dataFilters = defaultList
          }
        });
        this.currentCompanyIds = res.data.data.currentCompanyIds
      }
    },
    /**
     * 获取单位列表
     */
    getCompanyList (query) {
      companyList({ isTree: false, name: query }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.scompanies = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 获取街道列表
     */
    getRegionLocaleList () {
      getRegionLocale({ isTree: true, parentId: 0 }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.regionLocaleList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 获取列表
     */
    getList () {
      pressureStationList(this.listQuery).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 获取负责人列表
     */
    getEmployeeList (query) {
      employeeListing({ companyId: JSON.parse(localStorage.getItem('login')).companyId, name: query }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.employeeList = res.data.data;
            // res.data.data.forEach(result => this.employeeList.push({ 'value': result.name, 'id': result.id }))
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 图片上传成功
     */
    handleAvatarSuccess (res, file) {
      console.log(res);
      this.imageUrl = true
      this.form.picUrl = res.data.url
    },
    // 导出表格
    async exportExcel () {
      const res = await pressureStationExport(this.listQuery)
      this.exportTableData = res.data.data
      import('../../assets/js/Export2Excel.js').then(excel => {
        const tHeader = ['所属单位', '所属街道', '小压站站名称', '状态']
        const filterVal = ['companyName', 'regionLocaleName', 'name', 'status']
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
    /**
     * 打开新增抽屉
     */
    showDrawer () {
      this.drawer = true;
      this.imageUrl = false;
      this.form = {
        companyId: undefined,
        regionLocaleId: undefined,
        name: undefined,
        address: undefined,
        useDate: undefined,
        constructionArea: undefined,
        employeeId: undefined,
        fieldPhone: undefined,
        deviceNo: undefined,
        picUrl: undefined
      }
      this.$refs.ruleForm.resetFields()
    },
    /**
     * 关闭新增drawer
     */
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      this.drawer = false;
    },
    /*
     * 打开编辑抽屉
     */
    showEditDrawer (id) {
      this.editDrawer = true;
      this.$refs.editRuleForm.resetFields();
      pressureStationView(id).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.data
          this.imageUrl = this.form.picUrl
        }
      })
    },
    /**
     * 打开查看详情抽屉
     */
    showViewDrawer (id) {
      this.viewDrawer = true
      this.recordId = id
      pressureStationView(id).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.data
        }
      })
      this.eidtHistory()
    },
    /**
     * 历史编辑记录
     */
    eidtHistory () {
      const data = {
        'tableName': 'pressureStation',
        'recordId': this.recordId,
        'timeInterval': this.time
      }
      dataDictItem(data).then(res => {
        this.history = res.data.data
      })
    },
    /**
     * 修改编辑记录时间间隔
     */
    changeTimeInterval () {
      this.selst = !this.selst
      this.eidtHistory()
    },
    // 被选中的单位名称
    selectUnit (date) {
      console.log(date);
    },
    // 是否展开
    expand () {
      this.show = !this.show;
    },
    /**
     * 新增
     */
    addFormData () {
      console.log(this.form);
      // 校验表单
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.form.regionLocaleId instanceof Array) { this.form.regionLocaleId = this.form.regionLocaleId.pop(); }
          pressureStationAdd(this.form).then(res => {
            if (res.data.code === 200) {
              this.getList();
              this.$message.success('新建成功')
              this.drawer = false
              // 重置表单
              this.$refs.ruleForm.resetFields()
              this.imageUrl = false
            }
          })
        }
      });
    },
    /**
     * 编辑
     */
    editFormData () {
      if (this.form.regionLocaleId instanceof Array) { this.form.regionLocaleId = this.form.regionLocaleId.pop(); }
      pressureStationEdit(this.form).then(res => {
        if (res.data.code === 200) {
          this.editDrawer = false;
          this.getList();
          this.$message.success('编辑成功')
        }
      })
    },
    /**
     * 删除
     */
    deleteFormData (id) {
      pressureStationDelete(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getList();
        }
      })
    },
    showPositionDrawer (id) {
      console.log(window.lng);

      this.positionDrawer = true
      this.transferStationId = id
      this.positionForm.address = ''
      // 点位回显
      this.$nextTick(() => {
        pressureStationView(id).then(res => {
          if (res.data.code === 200) {
            console.log(res.data.data.latitude, res.data.data.longitude);

            if (res.data.data.latitude !== null) {
              console.log('有点位');
              this.lng = res.data.data.longitude
              this.lat = res.data.data.latitude
              this.center = [+res.data.data.longitude, +res.data.data.latitude]
              this.markers[0].position = [+res.data.data.longitude, +res.data.data.latitude]
              this.circles[0].center = [+res.data.data.longitude, +res.data.data.latitude]
              // this.address = res.data.data.address
              // console.log(this.center, this.markers[0].position, this.circles[0].center);
            } else {
              this.center = [window.lng, window.lat]
              this.markers[0].position = [window.lng, window.lat]
              this.circles[0].center = [window.lng, window.lat]
            }
          }
        })
      })
    },
    // 新增点位
    isNewPoint () {
      const data = {
        id: this.transferStationId,
        address: this.positionForm.address,
        rangeType: this.positionForm.range,
        longitude: this.center[0],
        latitude: this.center[1]
      }
      pressureStationPosition(data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('成功添加点位')
        }
      })
    },

    // 删除点位
    delPointLocation () {
      const data = {
        id: this.transferStationId,
        address: this.positionForm.address,
        rangeType: this.positionForm.range
      }
      pressureStationPosition(data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('成功删除点位')
          this.center = [window.lng, window.lat]
          this.markers[0].position = [window.lng, window.lat]
          this.circles[0].center = [window.lng, window.lat]
        }
      })
    },

    // 根据用户输入的地址搜索
    isSearch () {
      if (this.positionForm.address) {
        axios({
          method: 'GET',
          url: 'https://restapi.amap.com/v3/assistant/inputtips?key=f510d999ca866fcec046e0bf05431804&keywords=' + this.positionForm.address
        }).then((res) => {
          console.log(res.data);
          if (res.data.infocode === '10000') {
            this.restaurants = res.data.tips
            // this.center = res.data.
            console.log(this.restaurants);
          }
        })
      } else {
        this.restaurants = []
      }
    },
    changeRange (val) {
      // console.log(val);
      if (val === 1) {
        this.circles[0].radius = 500
      } else if (val === 2) {
        this.circles[0].radius = 1000
      } else if (val === 3) {
        this.circles[0].radius = 1500
      } else if (val === 4) {
        this.circles[0].radius = 2000
      }
    },
    isShowtext (val1, val2) {
      // console.log(val1, val2);
      this.center = val2.split(',')
      console.log(this.center);
      this.markers[0].position = val2.split(',')
      this.circles[0].center = val2.split(',')
      this.positionForm.address = val1
      this.restaurants = []
    }
  },
  components: {
    belongUnit
  }
};
</script>

<style lang="less" scoped>
.station {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.xf-main {
  flex: 1;
  display: flex;
  height: 100%;
  border-left: 1px solid #eee;
  box-sizing: border-box;

  .xf-left {
    width: 270px;
    background-color: #fff;
    height: 100%;
  }
  .xf-right {
    flex: 1;
    height: 100%;
    background-color: #fff;
    border-left: 1px solid #eee;
    padding: 0 30px 0 16px;
    box-sizing: border-box;
    .el-col:nth-child(-n + 3) {
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
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(48, 49, 51, 1);
    border-bottom: 1px solid #eee;
    margin-top: 32px;
    span {
      display: inline-block;
      padding: 0 5px;
      height: 48px;
      border-bottom: 1px solid #237bff;
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
    font-family: PingFang SC;
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
.el-table {
  .span {
    cursor: pointer;
  }
  .span:hover {
    text-decoration: underline;
    color: #237bff;
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
/deep/.el-date-editor {
  width: 100%;
  margin-right: 10px;
}
/deep/.el-input {
  width: 100%;
  margin-right: 10px;
}
/deep/.el-cascader {
  width: 100%;
  margin-right: 10px;
}
/deep/.el-autocomplete {
  width: 100%;
  margin-right: 10px;
}

// 新增抽屉样式
.el-drawer__wrapper .create-el-form {
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 80px;
  position: relative;
}

        .info {
            padding-right:30px;
         .el-form {
              /deep/.el-form-item {
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(228,231,237,1);
              }
              }
              /deep/label.el-form-item__label {
                width: 30%;
                text-align: left;
            }
          }
          .dynamic {
           padding-left:16px ;
           padding-right:10px ;
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
              right: 22px ;
              // font-size: 18px;
            }
          }
          .box {
             height: 50vh;
            overflow-x: hidden;
            overflow-y: scroll;
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
 .map {
       height: 60vh;
       border:1px solid #ccc;
       .amap-page-container {width:100%; height: 60vh; }
    }

  .Search_address {
     width: auto;
     height: 25vh;
     overflow-x: hidden;
     overflow-y: scroll;
     position: absolute;
     z-index: 999;
       top: 88px;
       padding: 15px;
       box-sizing: border-box;
       border-radius: 5px;
       left: 0;
       border: 1px solid #ccc;
       background-color: #fff;
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
  border-color: #409eff;
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

.el-table {
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

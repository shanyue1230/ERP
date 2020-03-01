<template>
  <div class="vehicleDevice">
    <!-- 面包屑导航 -->
    <Breadcrumb :levelList="levelList"></Breadcrumb>
    <!-- 页面主体部分 -->
    <div class="main">
      <div class="affiliation">
        <el-form :model="formInline" class="demo-form-inline">
          <!-- 查询所属单位的模态框 -->
          <div class="unit">
            <el-form-item label="所属单位">
              <el-input v-model="formInline.unit" placeholder="请输入机构名称">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item>
          </div>
          <!-- 所属单位名称  --多选 -->
          <div class="Checkbox">
            <el-checkbox-group v-model="formInline.checkList"  @change="changeCheckList">
              <el-checkbox
              style="font-weight:400"
                v-for="(item,index) in checkboxList"
                :label="item.id"
                :key="item.id"
                 :checked='index === 0'
                 :disabled='formInline.checkList.length === 1 &&formInline.checkList[0]===item.id'
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form>
      </div>
      <div class="affiliationInfo">

                      <!-- :fetch-suggestions="querySearchAsync" -->
                      <!-- @select="handleSelect" -->
        <el-form :inline="true" :model="form" ref="Form" class="demo-form-inline">
          <el-row>
            <el-col :span="5" style="padding:0">
              <el-form-item label="所属车辆：">
                  <el-autocomplete
                      v-model="form.value1"
                      placeholder="请输入内容"

                      style="width:100%"
                    ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0; margin-left:16px">
              <el-form-item label="项目编号：">
                <el-input v-model="form.num1" placeholder="请输入项目编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0;margin-left:16px">
              <el-form-item label="设备编号：">
                <el-input v-model="form.num2" placeholder="请输入设备编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="padding:0; width:250px;">
              <el-form-item
                style="padding-top:40px;box-sizing: border-box; width:auto; margin-left:16px"
              >
                <el-button type="primary" @click="isInquire">确定</el-button>
                <el-button type="success"  @click="isShow">{{showtext}}</el-button>
                <el-button @click="resetForm3">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 隐藏的表单 -->
          <el-row v-if="show">
            <el-col :span="5" style="padding:0">
              <el-form-item label="设备状态：">
                <el-select v-model="form.value2" placeholder="全部">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0;margin-left:16px">
              <el-form-item label="上线日期：" >
              <el-date-picker
              v-model="form.value3"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                 style="width:100%"
              >
            </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0;margin-left:16px">
              <el-form-item label="维保到期日：">
              <el-date-picker
              v-model="form.value4"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="width:100%"
              >
            </el-date-picker>

              </el-form-item>
            </el-col>
            <el-col style="padding:0; width:250px;"></el-col>
          </el-row>
        </el-form>
        <!-- 新增 停用  启用  删除  导出 -->
        <el-row>
          <el-button type="primary" @click="isNewDialog">新增</el-button>
          <el-button type="primary" @click="isDisable">停用</el-button>
          <el-button type="primary" @click="isEnable">启用</el-button>
          <el-button type="danger" @click="isVehicleDeviceDelete">删除</el-button>
          <el-button type="warning" style="float: right;"  @click="outExe">导出</el-button>
        </el-row>
        <!-- 多选表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="margin-top:16px"
          empty-text="暂无更多数据"
          @selection-change="changeFun"
        >

          <el-table-column type="selection" width="55" ref="multipleTable"></el-table-column>
          <el-table-column  type="index" label="No."></el-table-column>
          <el-table-column prop="code" label="设备编号"></el-table-column>
          <el-table-column prop="vehicleId" label="所属车辆"></el-table-column>
          <el-table-column prop="type" label="设备类型"></el-table-column>
          <el-table-column prop="useDate" label="安装日期"></el-table-column>
          <el-table-column prop="expiryDate" label="维保到期日"></el-table-column>
          <el-table-column  label="状态">
            <template slot-scope="{row}">
              <span v-if="row.status===0" style="color:green">正常</span>
              <span v-else-if="row.status===1" style="color:orange">维修中</span>
              <span v-else-if="row.status===2" style="color:red">停用</span>
              <span v-else-if="row.status===3" style="color:#ccc">失效</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="{row}">
                <span class="span" @click="isEdit(row)">编辑</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span class="span" @click="isDetails(row)">查看详情</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
          style="margin-top:15px"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增的对话框 -->
    <el-dialog
      title="新建车载设备"
      :visible.sync="newDialogVisible"
      class="newDialogVisible"
      @close ="resetForm('ruleForm')">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属单位：" prop="unit">
              <el-select v-model="ruleForm.unit"  filterable  placeholder="请选择所属单位" @change="resetForm2('ruleForm',ruleForm.unit)">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="project">
              <el-input v-model="ruleForm.project" placeholder="请输入项目编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号：" prop="device">
              <el-input v-model="ruleForm.device" placeholder="请输入设备编号" @change="isVerification(ruleForm.unit,ruleForm.device)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型：">
              <el-input   placeholder="主机">主机</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- -------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属车辆：" prop="car">
              <el-select v-model="ruleForm.car" placeholder="请选择所属车辆">
                <el-option
                  v-for="item in options3"
                  :key="item.id"
                  :label="item.vehiclePlate"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备状态：" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择设备状态">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="启用日期：" prop="startTime">
              <!-- 日期选择器 -->
              <el-date-picker
                v-model="ruleForm.startTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维保到期日：" prop="endTime">
              <!-- 日期选择器 -->
              <el-date-picker
                v-model="ruleForm.endTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsEnd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ----------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="SD卡容量：">
              <el-select v-model="ruleForm.card" placeholder="请选择SD卡容量">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量卡运营商：">
              <el-select v-model="ruleForm.flowCard" placeholder="请选择流量卡运营商">
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流量卡号："  prop="cardNum">
              <el-input v-model="ruleForm.cardNum" placeholder="请输入流量卡号"  @change="isVerification2(ruleForm.unit,ruleForm.cardNum)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量卡容量：">
              <el-select v-model="ruleForm.operator" placeholder="请选择流量卡容量">
                <el-option
                  v-for="item in options7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ------ -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流量卡到期日：">
                 <el-date-picker
                    v-model="ruleForm.expiration"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量卡容量：" class="choice">
              <el-checkbox-group v-model="ruleForm.choice">
                <el-checkbox
                  v-for="item in choiceList"
                  :label="item"
                  :key="item"
                >{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button  @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="isVehicleDeviceAdd('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情的对话框 -->
    <el-dialog title="查看详情" :visible.sync="dialogView"  class="dialogView">
                    <el-row style="height:100%">
                               <el-col :span="12" style="height:100%">
                                  <div class="info">
                                    <el-form>
                                      <el-form-item  label="所属单位">{{viewList.companyName}}</el-form-item>
                                      <el-form-item  label="项目编号">{{viewList.projectCode}}</el-form-item>
                                      <el-form-item  label="设备编号">{{viewList.code}}</el-form-item>
                                      <el-form-item  label="设备类型">{{viewList.type}}</el-form-item>
                                      <el-form-item  label="所属车辆">{{viewList.vehicleId}}</el-form-item>
                                      <el-form-item  label="设备状态">{{viewList.statusName}}</el-form-item>
                                      <el-form-item  label="启用日期">{{viewList.useDate}}</el-form-item>
                                      <el-form-item  label="维保到期日">{{viewList.expiryDate}}</el-form-item>
                                      <el-form-item  label="SD卡容量">{{viewList.sdCapacity}}</el-form-item>
                                      <el-form-item  label="流量卡运营商">{{viewList.trafficOperator}}</el-form-item>
                                      <el-form-item  label="流量卡号">{{viewList.trafficCard}}</el-form-item>
                                      <el-form-item  label="流量卡容量">{{viewList.trafficCardCapacity}}</el-form-item>
                                      <el-form-item  label="流量卡到期日">{{viewList.trafficCardEndDate}}</el-form-item>
                                      <el-form-item  label="摄像通道">{{viewList2}}</el-form-item>
                                    </el-form>
                                  </div>
                               </el-col>
                               <el-col :span="12" style="height:100%">
                                 <div class="dynamic">
                                   <div class="all">
                                      <span>所有动态</span>
                                       <el-select v-model="time" placeholder="请选择" style="width:96px;height:32px !important;" @visible-change="isChange"
                                       @change="isDataDictItem">
                                                <el-option
                                                  v-for="item in options8"
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
                                 </div>
                              </el-col>
                   </el-row>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogView = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑的对话框 -->
       <el-dialog
      title="编辑车载设备"
      :visible.sync="editDialogVisible"
      class="newDialogVisible"
    >
      <el-form
        :model="ruleFormEdit"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属单位：" prop="unit">
              <el-select v-model="ruleFormEdit.unit" filterable placeholder="请选择所属单位"   @change="resetForm2('ruleForm',ruleFormEdit.unit)">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号：" prop="project">
              <el-input v-model="ruleFormEdit.project" placeholder="请输入项目编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号："  prop="device">
              <el-input v-model="ruleFormEdit.device" placeholder="请输入设备编号"   @change="isVerification(ruleFormEdit.unit,ruleFormEdit.device)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型：">
              <el-input v-model="ruleFormEdit.host" placeholder="主机"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- -------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属车辆：" prop="car">
              <el-select v-model="ruleFormEdit.car" placeholder="请选择所属车辆">
                <el-option
                  v-for="item in options3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备状态：" prop="status">
              <el-select v-model="ruleFormEdit.status" placeholder="请选择设备状态">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="启用日期：" prop="startTime">
              <!-- 日期选择器 -->
              <el-date-picker
                v-model="ruleFormEdit.startTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维保到期日：" prop="endTime">
              <!-- 日期选择器 -->
              <el-date-picker
                v-model="ruleFormEdit.endTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsEnd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ----------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="SD卡容量：">
              <el-select v-model="ruleFormEdit.card" placeholder="请选择SD卡容量">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量卡运营商：">
              <el-select v-model="ruleFormEdit.flowCard" placeholder="请选择流量卡运营商">
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- --------- -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流量卡号："  prop="cardNum">
              <el-input v-model="ruleFormEdit.cardNum" placeholder="请输入流量卡号"   @change="isVerification2(ruleFormEdit.unit,ruleFormEdit.cardNum)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量卡容量：">
              <el-select v-model="ruleFormEdit.operator" placeholder="请选择流量卡容量">
                <el-option
                  v-for="item in options7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- ------ -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流量卡到期日：">
                <el-date-picker
                    v-model="ruleFormEdit.expiration"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流量卡容量：" class="choice">
              <el-checkbox-group v-model="ruleFormEdit.choice">
                <el-checkbox
                  v-for="item in choiceList"
                  :label="item"
                  :key="item"
                >{{item}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isVehicleDeviceEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb';
import { vehicleDeviceAdd, vehicleDeviceList, vehicleDeviceDelete, vehicleDeviceEnable, vehicleDeviceDisable, companyAdd, dataDictItem, vehicleDeviceEdit, vehicleDeviceView, vehicleDeviceValid, vehicleDeviceExport, companyList, vehicleSelectionList } from '../../api/getData'
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      setTimeout(() => {
        if (this.code === 400) {
          return callback(new Error('设备编号已存在'));
        } else {
          callback();
        }
      }, 500);
    };
    var checkAge2 = (rule, value, callback) => {
      setTimeout(() => {
        if (this.code2 === 400) {
          return callback(new Error('流量卡号已存在'));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      show: false,
      showtext: '展开',
      newDialogVisible: false,
      editDialogVisible: false,
      dialogView: false,
      time: 0,
      selst: false,
      total: 0,
      valList: [],
      viewList: '',
      viewList2: '',
      pageNumber: 1,
      pageSize: 20,
      multipleSelection: [],
      rowList: '',
      rowList2: '',
      excelData: [],
      filename: '车载设备列表',
      autoWidth: true,
      bookType: 'xlsx',
      code: '',
      code2: '',
      levelList: [{ title: '设备管理' }, { title: '车载设备管理' }],
      formInline: {
        unit: '',
        checkList: []
      },
      checkboxList: [],
      form: {
        value1: '',
        num1: '',
        num2: '',
        value2: '',
        value3: [],
        value4: []
      },
      options: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '维修'
        },
        {
          value: '2',
          label: '停用'
        },
        {
          value: '3',
          label: '失效'
        }
      ],
      tableData: [],
      ruleForm: {
        unit: '',
        project: '',
        device: '',
        host: '',
        car: '',
        status: '',
        startTime: new Date(),
        endTime: '',
        flowCard: '',
        cardNum: '',
        operator: '',
        card: '',
        expiration: '',
        choice: []
      },
      ruleFormEdit: {
        unit: '',
        project: '',
        device: '',
        host: '',
        car: '',
        status: '',
        startTime: new Date(),
        endTime: '',
        card: '',
        flowCard: '',
        cardNum: '',
        operator: '',
        expiration: '',
        choice: ''
      },
      options2: [],
      options3: [],
      options4: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '维修'
        },
        {
          value: '2',
          label: '停用'
        },
        {
          value: '3',
          label: '失效'
        }
      ],
      options5: [
        {
          value: 1,
          label: '64G'
        },
        {
          value: 2,
          label: '128G'
        }
      ],
      options6: [
        {
          value: '1',
          label: '联通'
        },
        {
          value: '2',
          label: '移动'
        },
        {
          value: '3',
          label: '电信'
        }
      ],
      options7: [
        {
          value: '1',
          label: '24G'
        },
        {
          value: '2',
          label: '60G'
        }
      ],
      options8: [
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
      choiceList: ['CH1', 'CH2', 'CH3', 'CH4'],
      infoList: [
        {
          id: 1,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '创建',
          theway: '创建',
          time: new Date().toLocaleTimeString()

        },
        {
          id: 2,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()
        },
        {
          id: 3,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()

        },
        {
          id: 4,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()

        },
        {
          id: 5,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()

        },
        {
          id: 6,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()

        },
        {
          id: 7,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()

        },
        {
          id: 8,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()
        },
        {
          id: 9,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()
        },
        {
          id: 10,
          people: 'XXX',
          address: '上海绿化市容局',
          way: '编辑',
          theway: '修改',
          time: new Date().toLocaleTimeString()
        }
      ],
      rules: {
        unit: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        project: [
          { required: true, message: '请输入项目编号', trigger: 'blur' },
          { min: 5, max: 20, message: '项目编号不能小于5位大于20位字符', trigger: 'blur' },
          {
            pattern: /^[^\s]*$/,
            message: '项目编号不能有空格'
          }
        ],
        device: [
          { required: true, message: '设备编号不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '设备编号不能小于5位大于30位字符', trigger: 'blur' },
          {
            pattern: /^[^\s]*$/,
            message: '设备编号不能有空格'
          },
          { validator: checkAge, trigger: 'blur' }
        ],
        cardNum: [
          { validator: checkAge2, trigger: 'blur' }
        ],
        car: [
          { required: true, message: '请选择所属车辆', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择设备状态', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择启用日期', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择维保到期日', trigger: 'blur' }
        ]
      },
      // 开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          return time.getTime() > new Date(this.ruleForm.endTime).getTime();
        }
      },
      // 结束时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.ruleForm.startTime) {
            return (
              time.getTime() < new Date(this.ruleForm.startTime).getTime() // 加- 8.64e7则表示包当天
            );
          }
        }
      }
    };
  },
  computed: {
  },
  components: {
    Breadcrumb
  },
  created () {
    this.isvehicleDeviceList()
    this.isCompanyList()
  },
  methods: {
    isShow () {
      this.show = !this.show;
      if (!this.show) {
        this.showtext = '展开'
      } else {
        this.showtext = '收起'
      }
    },
    // 打开新增的对话框
    isNewDialog () {
      this.newDialogVisible = true;
      return companyAdd({
        'isTree': false
      }).then(res => {
        console.log(res);
        let { data } = res
        this.options2 = data.data
      })
    },
    // 打开编辑的对话框
    isEdit (row) {
      this.editDialogVisible = true;
      this.rowList = row
      console.log(row)
      this.ruleFormEdit.unit = row.companyId
      this.ruleFormEdit.project = row.projectCode
      this.ruleFormEdit.device = row.code
      this.ruleFormEdit.car = row.vehicleId
      this.ruleFormEdit.status = row.status
      this.ruleFormEdit.startTime = row.useDate
      this.ruleFormEdit.endTime = row.expiryDate
      this.ruleFormEdit.card = row.sdCapacity
      this.ruleFormEdit.flowCard = row.trafficOperator
      this.ruleFormEdit.cardNum = row.trafficCard
      this.ruleFormEdit.operator = row.trafficCardCapacity
      this.ruleFormEdit.expiration = row.trafficCardEndDate
      this.ruleFormEdit.choice = !row.channelsList ? [] : row.channelsList
      return companyAdd({
        'isTree': false
      }).then(res => {
        console.log(res);
        let { data } = res
        this.options2 = data.data
      })
    },
    // 打开详情的对话框
    isDetails (row) {
      this.dialogView = true
      this.rowList2 = row
      vehicleDeviceView(row).then(res => {
        console.log(res);
        this.viewList = res.data.data
        this.viewList2 = !res.data.data.channelsList ? '' : row.channelsList.toString()
      })
      this.isDataDictItem()
    },
    isChange () {
      this.selst = !this.selst
    },
    // 新增功能的接口请求
    isVehicleDeviceAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return vehicleDeviceAdd({
            'companyId': this.ruleForm.unit,
            'vehicleId': this.ruleForm.car,
            'projectCode': this.ruleForm.project,
            'code': this.ruleForm.device,
            'type': '1',
            'useDate': this.ruleForm.startTime,
            'expiryDate': this.ruleForm.endTime,
            'sdCapacity': this.ruleForm.card,
            'trafficOperator': this.ruleForm.flowCard,
            'trafficCard': this.ruleForm.cardNum,
            'trafficCardCapacity': this.ruleForm.operator,
            'trafficCardEndDate': this.ruleForm.expiration,
            'channelsList': this.ruleForm.choice,
            'description': '我是备注3+5',
            'status': this.ruleForm.status
          }).then(res => {
            console.log(res);
            if (res.status === 200) {
              if (res.data.code === 200) {
                this.$message.success('添加成功')
                this.newDialogVisible = false
                this.isvehicleDeviceList()
              } else {
                this.$message.error(res.data.msg)
              }
            }
          })
        } else {
          this.$message.error('添加失败，请重试！')
          return false;
        }
      });
    },
    // 获取表格列表
    isvehicleDeviceList () {
      return vehicleDeviceList({
        'page': this.pageNumber,
        'limit': this.pageSize,
        'projectCode': this.form.num1,
        'code': this.form.num2,
        'status': this.form.value2,
        'companyIds': this.formInline.checkList,
        'useStartDate': !this.form.value3 ? null : this.form.value3[0],
        'useEndDate': !this.form.value3 ? null : this.form.value3[1],
        'expiryStartDate': !this.form.value4 ? null : this.form.value4[0],
        'expiryEndDate': !this.form.value4 ? null : this.form.value4[1]
      }).then(res => {
        console.log(res)
        let { data } = res
        this.tableData = data.data.records
        this.total = data.data.total
      })
    },
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.isvehicleDeviceList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.pageNumber = val
      this.isvehicleDeviceList()
    },
    // 车载设备删除
    isVehicleDeviceDelete () {
      if (this.multipleSelection.length !== 0) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return vehicleDeviceDelete(
            this.multipleSelection
          ).then(res => {
            console.log(res);
            this.isvehicleDeviceList()
            this.$message.success('删除成功!');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message.error('请选择要删除的列表')
      }
    },
    // 车载设备启用
    isEnable () {
      if (this.multipleSelection.length !== 0) {
        return vehicleDeviceEnable(
          this.multipleSelection
        ).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success('启用成功')
            this.isvehicleDeviceList()
          }
        })
      } else {
        this.$message.error('请选择要启用的列表')
      }
    },
    // 车载设备停用
    isDisable () {
      if (this.multipleSelection.length !== 0) {
        if (this.valList.find(item => { return item.statusName === '维修' })) {
          this.$alert('该设备仍处于维修状态，请优先处理设备维修，在尝试该操作。', '停用车载设备', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message();
            }
          });
        } else {
          return vehicleDeviceDisable(
            this.multipleSelection
          ).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success('停用成功')
              this.isvehicleDeviceList()
            }
          })
        }
      } else {
        this.$message.error('请选择要停用的列表')
      }
    },
    // 车载设备编辑
    isVehicleDeviceEdit () {
      return vehicleDeviceEdit(
        {
          'id': this.rowList.id,
          'companyId': this.ruleFormEdit.unit,
          'vehicleId': this.ruleFormEdit.car,
          'projectCode': this.ruleFormEdit.project,
          'code': this.ruleFormEdit.device,
          'type': '1',
          'useDate': this.ruleFormEdit.startTime,
          'expiryDate': this.ruleFormEdit.endTime,
          'sdCapacity': this.ruleFormEdit.card,
          'trafficOperator': this.ruleFormEdit.flowCard,
          'trafficCard': this.ruleFormEdit.cardNum,
          'trafficCardCapacity': this.ruleFormEdit.operator,
          'trafficCardEndDate': this.ruleFormEdit.expiration,
          'channelsList': this.ruleFormEdit.choice,
          'description': '我是备注3+5',
          'status': this.ruleFormEdit.status
        }
      ).then(res => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message.success('编辑成功')
            this.editDialogVisible = false
            this.isvehicleDeviceList()
          } else {
            this.$message.error(res.data.msg)
          }
        }
      })
    },
    // 记录用户点击了几个选项
    changeFun (val) {
      let arr = []
      val.forEach(item => {
        arr.push(item.id); // 把所有的id放进multipleSelection
      })
      this.multipleSelection = arr
      console.log(this.multipleSelection);
      this.valList = val
      // console.log(val);
    },
    // 车载设备验证
    // 新增的对话框点击取消关闭模态框和重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.newDialogVisible = false
      this.ruleForm.choice = []
      this.ruleForm.card = ''
      this.ruleForm.flowCard = ''
      this.ruleForm.expiration = ''
      this.ruleForm.operator = ''
    },
    resetForm2 (val, rid) {
      this.ruleForm.device = ''
      this.ruleForm.cardNum = ''
      this.ruleFormEdit.device = ''
      this.ruleFormEdit.cardNum = ''
      this.isVehicleSelectionList(rid)
    },
    resetForm3 (form) {
      this.form.value1 = ''
      this.form.num1 = ''
      this.form.num2 = ''
      this.form.value2 = ''
      this.form.value3 = ''
      this.form.value4 = ''
    },
    // 验证设备编号
    isVerification (unit, val) {
      return vehicleDeviceValid({
        'companyId': unit,
        'code': val
      }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            console.log(res)
            this.code = res.data.code
          } else {
            console.log(res);
            // this.$message.error(res.data.msg)
            this.code = res.data.code
          }
        }
      })
    },
    // 验证流量卡号
    isVerification2 (unit, val) {
      return vehicleDeviceValid({
        'companyId': unit,
        'trafficCard': val
      }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            console.log(res)
            this.code2 = res.data.code
          } else {
            console.log(res);
            this.code2 = res.data.code
          }
        }
      })
    },
    // 查询功能
    isInquire () {
      console.log(this.form);
      return vehicleDeviceList({
        'page': this.pageNumber,
        'limit': this.pageSize,
        'projectCode': this.form.num1,
        'code': this.form.num2,
        'status': this.form.value2,
        'companyIds': this.formInline.checkList,
        'useStartDate': this.form.value3 === null ? '' : this.form.value3[0],
        'useEndDate': this.form.value3 === null ? '' : this.form.value3[1],
        'expiryStartDate': this.form.value4 === null ? '' : this.form.value4[0],
        'expiryEndDate': this.form.value4 === null ? '' : this.form.value4[1]
      }).then(res => {
        console.log(res)
        let { data } = res
        if (data.code === 200) {
          this.tableData = data.data.records
          this.total = data.data.total
        }
      })
    },
    // 导出
    outExe () {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vehicleDeviceExport(
          {
            'projectCode': this.form.num1,
            'code': this.form.num2,
            'useStartDate': this.form.value3[0],
            'useEndDate': this.form.value3[1],
            'expiryStartDate': this.form.value4[0],
            'expiryEndDate': this.form.value4[1]
          }
        ).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.excelData = res.data.data
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
        const tHeader = ['设备编号', '所属车辆', '设备类型', '安装日期', '维保到期日', '状态']
        const filterVal = ['code', 'vehicleId', 'type', 'useDate', 'expiryDate', 'statusName']
        const list = this.excelData
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
    formatJson (filterVal, jsonData) {
      console.log(jsonData)
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    //  编辑记录接口
    isDataDictItem () {
      return dataDictItem({
        'tableName': 'vehicleDevice',
        'recordId': this.rowList2.id,
        'timeInterval': this.time
      }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            console.log(res);
            this.infoList = res.data.data
          }
        }
      })
    },
    // 获取左侧单位公司的列表
    isCompanyList () {
      return companyList(
        {
          'isTree': false
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.checkboxList = res.data.data
        }
      })
    },
    // 选中单位的多选框
    changeCheckList (data) {
      console.log(this.formInline.checkList);

      this.isvehicleDeviceList()
    },
    // 所属车辆下拉框的数据
    isVehicleSelectionList (rid) {
      return vehicleSelectionList(
        {
          'companyId': rid
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.options3 = res.data.data
        }
      })
    }
  }

};
</script>

<style  lang="less" scoped>
.vehicleDevice {
  .main {
    display: flex;
    // overflow: auto;
    height: auto;
    .affiliation {
      width: 270px;
      box-sizing: border-box;
      background-color: #fff;
      border-left: 1px solid rgba(228, 231, 237, 1);
      border-right: 1px solid rgba(228, 231, 237, 1);
     /deep/ .el-form  {
      display: flex;
      flex-flow: column;
      }
      .unit {
        /deep/ .el-form-item {
          margin-bottom: 0;
        }
        /deep/ .el-form-item__label {
          padding-left: 13px;
          font-weight: 500;
          color: rgba(48, 49, 51, 1);
        }
        /deep/ .el-form-item__content {
          padding: 0px 16px 16px 14px;
          border-bottom: 1px solid rgba(228, 231, 237, 1);
        }
      }
       .Checkbox {
         height: 73vh;
         overflow-x: hidden;
         overflow-y: scroll;
      }
      /deep/ .el-checkbox {
        height: 48px;
        line-height: 48px;
        width: 100%;
        margin-right: 0;
        /deep/ .el-checkbox__label {
          padding-left: 14px;
        }
        /deep/ .el-checkbox__input {
          margin-left: 14px;
        }
      }
      /deep/.el-checkbox:hover {
        background-color: rgba(236, 245, 255, 1);
      }
    }
    .affiliationInfo {
       flex: 1;
      height: 80vh;
     overflow-x: hidden;
     overflow-y: scroll;
      padding: 16px;
      padding-top: 0;
      background-color: #fff;

      /deep/ .el-form-item {
        width: 100% !important;
        height: 80px;
        margin-right: 0px;
        margin-bottom: 15px;
        /deep/ .el-select {
          width: 100%;
        }
        /deep/ .el-form-item__content {
          width: 100%;
        }
        /deep/.el-form-item__label {
          color: #000;
        }
      }
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
  .span {
    cursor: pointer;
  }
  .span:hover {
    text-decoration: underline;
    color: #237BFF;
  }
  //  新增对话框的样式
  .newDialogVisible {
    /deep/ .el-dialog {
      width: 1072px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      /deep/ .el-dialog__header {
        width: 1072px;
        height: 64px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -1px 0px 0px rgba(228, 231, 237, 1);
        border-radius: 4px 4px 0 0;
        padding: 20px 0 25px 51px !important;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      /deep/ .el-dialog__body {
        padding: 20px 68px;
        height: 610px;
        overflow-x: hidden;
        overflow-y: scroll;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .demo-ruleForm {
      .el-form-item {
        margin-bottom: 16px;
        /deep/ .el-form-item__content {
          width: 100%;
          margin-left: 0 !important ;
          /deep/ .el-select {
            width: 100%;
          }
          /deep/.el-date-editor {
            width: 100%;
          }
        }
        /deep/ .el-form-item__label {
          text-align: left !important;
        }
      }
      .choice {
        /deep/.el-form-item__label {
          width: 100% !important;
        }
      }
    }
  }
  // 查看详情的对话框
  .dialogView {
        /deep/ .el-dialog {
      width: 1072px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      /deep/ .el-dialog__header {
        width: 1072px;
        height: 64px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -1px 0px 0px rgba(228, 231, 237, 1);
        border-radius: 4px 4px 0 0;
        padding: 20px 0 25px 51px !important;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
           /deep/ .el-dialog__body {
        padding: 31px 52px;
        height: 610px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .info {
          border-right:1px solid rgba(235,238,245,1);
            height: 580px;
            overflow-x: hidden;
            overflow-y: scroll;
            .el-form {
              /deep/.el-form-item {
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(228,231,237,1);
              }
            }
        }
        .dynamic {
                   height: 580px;
            overflow-x: hidden;
            overflow-y: scroll;
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
              .el-input {
                height: 100%;
                .el-input__inner {
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
        }
  }
}
</style>

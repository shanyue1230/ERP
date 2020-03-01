<template>
  <div class="employee">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item>机动车信息登记</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <div class="xf-left">
        <belongUnit :unitList="unitList" @handleChange="selectUnit"></belongUnit>
      </div>
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="form">
          <el-row>
            <el-col :span="5">
              <el-form-item label="车牌号:" prop="vehicleNo">
                <el-input v-model="searchForm.vehicleNo" placeholder="请输入车牌号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="自编号:" prop="selfCode">
                <el-input v-model="searchForm.selfCode" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="车辆状态:" prop="vehicleStatus">
                <el-select width="200px" v-model="searchForm.vehicleStatus" placeholder="全部">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col style="width: 250px;">
              <el-form-item
                style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px"
              >
                <el-button type="primary" @click="isSearchCar">确定</el-button>
                <el-button
                  type="success"
                  @click="expand"
                >展开</el-button>
                <el-button @click="isResetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 展开的表单 -->
          <div v-show="show">
            <el-row>
              <el-col :span="5">
                <!-- 所属部门 -->
                <el-form-item label="车辆类型:" prop="vehicleType">
                  <el-select v-model="searchForm.vehicleType" placeholder="全部">
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <!-- 所属岗位 -->
                <el-form-item label="回收类型:" prop="recyleType">
                  <el-select v-model="searchForm.recyleType" placeholder="全部">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="启用日期:" prop="startDate">
                  <el-date-picker
                    v-model="searchForm.birthDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>

        <!-- 新增 + 导出 -->
        <div style="margin-top:20px;">
          <el-button type="primary" @click="showDrawer" v-if="arr.some(item =>{return item ==='basic:vehicle:add'})">新增</el-button>
          <el-button type="warning" style="float: right;"  @click="outExe"  v-if="arr.some(item =>{return item ==='basic:vehicle:export'})">导出</el-button>
        </div>

        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="employeeData"
          tooltip-effect="dark"
          style="width: 100%;margin-top:16px"
        >
          <el-table-column label="No." type="index" width="50"></el-table-column>
          <el-table-column label="车牌号" prop="vehiclePlate"></el-table-column>
          <el-table-column prop="selfNumber" label="自编号"></el-table-column>
          <el-table-column prop="vehicleShortName" label="车辆简称"></el-table-column>
          <el-table-column prop="recycleTypeStr" label="回收类型"></el-table-column>
          <el-table-column prop="activationDate" label="启用日期"></el-table-column>
           <el-table-column  label="状态">
            <template slot-scope="{row}">
              <span v-if="row.vehicleStatus===0" style="color:green">正常</span>
              <span v-else-if="row.vehicleStatus===1" style="color:orange">维修中</span>
              <span v-else-if="row.vehicleStatus===2" style="color:red">停用</span>
              <span v-else-if="row.vehicleStatus===3" style="color:#ccc">失效</span>
            </template>
          </el-table-column>
          <el-table-column   width="200px" label="操作">
            <template slot-scope="{row}">
               <span
                class="span"
                v-if="companyIds.some(item =>{ return item ===row.companyId}) && arr.some(item =>{return item ==='basic:vehicle:edit'})"
               @click="showEditDialog(row)">编辑</span>&nbsp;&nbsp;
              <span
                style="color:#ccc"
                v-if="companyIds.some(item =>{ return item ===row.companyId}) && arr.some(item =>{return item ==='basic:vehicle:edit'})"
              >|</span>&nbsp;&nbsp;
              <span class="span"  @click="showDetailDialog(row)">查看详情</span>&nbsp;&nbsp;
              <span
                style="color:#ccc"
                v-if="companyIds.some(item =>{ return item ===row.companyId}) && arr.some(item =>{return item ==='basic:vehicle:delete'})"
              >|</span>&nbsp;&nbsp;
              <span
                class="span"
                v-if="companyIds.some(item =>{ return item ===row.companyId}) && arr.some(item =>{return item ==='basic:vehicle:delete'})"
             @click="showDelete(row)">删除</span>
            </template>

            <!-- <template v-slot="scope.row">
                <span v-if="row.status===2" style="color:red">离职</span>
                <span v-if="row.status===0" style="color:green">在职</span>
                <span v-else-if="row.status===1" style="color:orange">外借</span>
            </template>-->
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
        <!-- 新增抽屉 -->
        <el-drawer
          title="新建机动车信息"
          :modal="false"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          @close="isClose('ruleForm')"
          :before-close="handleClose"
        >
          <el-form :model="createEmployee" :rules="rules" ref="ruleForm">
            <div class="title">
              <span>基础信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属单位" prop="companyId">
                  <el-select v-model="createEmployee.companyId" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车牌号" prop="vehicleNo">
                  <el-input
                    type="text"
                    placeholder="请输入车牌号"
                    v-model="createEmployee.vehicleNo"
                    @blur="isBlurCarNum()"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="自编号" prop="selfCode">
                  <el-input
                    type="text"
                    placeholder="请输入自编号"
                    v-model="createEmployee.selfCode"
                    @blur="isBlurSelfCode()"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="回收类型" prop="recyleType">
                  <el-select v-model="createEmployee.recyleType" placeholder="请选择回收类型">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆状态" prop="vehicleStatus">
                  <el-select v-model="createEmployee.vehicleStatus" placeholder="请选择车辆状态">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用日期" prop="startDate">
                  <el-date-picker
                    v-model="createEmployee.startDate"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择启用日期"
                    :picker-options="pickerOptionsStart"
                    style="width:100%"
                  ></el-date-picker>
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
                <el-form-item label="设备状态" prop="deviceStatus">
                  <el-input type="text" placeholder="请输入设备状态" v-model="createEmployee.deviceStatus" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报废日期" prop="endDate">
                  <el-date-picker
                    styel="width:100%"
                    v-model="createEmployee.endDate"
                    type="date"
                    placeholder="请选择报废日期"
                    :picker-options="pickerOptionsEnd"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="报废原因" prop="deviceStatus">
                  <el-input type="textarea" v-model="createEmployee.desc"></el-input>
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
                  <el-select v-model="createEmployee.vehicleType" place="请选择车辆类型">
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆简称" prop="simpleName">
                  <el-input type="text" placeholder="请输入车辆简称" v-model="createEmployee.simpleName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加油类型" prop="oilType">
                  <el-select v-model="createEmployee.oilType" place="请选择加油类型">
                    <el-option
                      v-for="item in options5"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车身装置" prop="carEquip">
                  <el-select v-model="createEmployee.carEquip" placeholder="请选择车身装置">
                    <el-option
                      v-for="item in options6"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发动机号" prop="engineNo">
                  <el-input type="text" placeholder="请输入发动机号" v-model="createEmployee.engineNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车架号" prop="carFrame">
                  <el-input type="text" placeholder="请输入车架号" v-model="createEmployee.carFrame"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="吨位" prop="ton">
                  <el-input type="text" placeholder="请输入吨位" v-model="createEmployee.ton"></el-input>
                </el-form-item>
                <el-form-item label="车身颜色" prop="carColor">
                  <el-input type="text" placeholder="请输入车身颜色" v-model="createEmployee.carColor"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车系品牌" prop="carBrand">
                  <el-select v-model="createEmployee.carBrand" placeholder="请选择车系品牌">
                    <el-option
                      v-for="item in options7"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="维修次数" prop="repairNum">
                  <el-input type="text" placeholder="请输入维修次数" v-model="createEmployee.repairNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="照片:" prop="img">
                  <el-upload
                    class="avatar-uploader"
                    action="http://112.65.228.185:8004/upload/singleImage"
                    :show-file-list="false"
                    :headers="importHeaders"
                    :on-success="handleAvatarSuccess"
                  >
                    <img v-if="imageUrl" :src="createEmployee.img" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-button style="margin: 15px 32px 0 15px;float: right;" @click="drawer=false">取消</el-button>
          <el-button
            type="primary"
            style="margin: 15px 15px 0 15px;float: right;"
            @click="isAddCar"
          >确认</el-button>
        </el-drawer>
        <!-- 编辑抽屉 -->
        <el-drawer
          title="编辑机动车信息"
          :modal="false"
          :append-to-body="true"
          :visible.sync="editDrawer"
          :direction="direction"
          @close="isClose('ruleForm')"
          :before-close="handleClose"
        >
          <el-form :model="editEmployee" :rules="rules" ref="ruleForm">
            <div class="title">
              <span>基础信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所属单位" prop="companyId">
                  <el-select v-model="editEmployee.companyId" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车牌号" prop="vehicleNo">
                  <el-input
                    type="text"
                    placeholder="请输入车牌号"
                    v-model="editEmployee.vehicleNo"
                    @blur="isBlurCarNum2()"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="自编号" prop="selfCode">
                  <el-input
                    type="text"
                    placeholder="请输入自编号"
                    v-model="editEmployee.selfCode"
                    @blur="isBlurSelfCode2()"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="回收类型" prop="recyleType">
                  <el-select v-model="editEmployee.recyleType" placeholder="请选择回收类型">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆状态" prop="vehicleStatus">
                  <el-select v-model="editEmployee.vehicleStatus" placeholder="请选择车辆状态">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用日期" prop="startDate">
                  <el-date-picker
                    v-model="editEmployee.startDate"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择启用日期"
                    :picker-options="pickerOptionsStart"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="设备编号（主机）" prop="deviceNo">
                  <el-input type="text" placeholder="请输入设备编号" v-model="editEmployee.deviceNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备状态" prop="deviceStatus">
                  <el-input type="text" placeholder="请输入设备状态" v-model="editEmployee.deviceStatus" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报废日期" prop="endDate">
                  <el-date-picker
                    styel="width:100%"
                    v-model="editEmployee.endDate"
                    type="date"
                    placeholder="请选择报废日期"
                    :picker-options="pickerOptionsEnd"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="报废原因" prop="deviceStatus">
                  <el-input type="textarea" v-model="editEmployee.desc"></el-input>
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
                  <el-select v-model="editEmployee.vehicleType" place="请选择车辆类型">
                    <el-option
                      v-for="item in options4"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆简称" prop="simpleName">
                  <el-input type="text" placeholder="请输入车辆简称" v-model="editEmployee.simpleName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加油类型" prop="oilType">
                  <el-select v-model="editEmployee.oilType" place="请选择加油类型">
                    <el-option
                      v-for="item in options5"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车身装置" prop="carEquip">
                  <el-select v-model="editEmployee.carEquip" placeholder="请选择车身装置">
                    <el-option
                      v-for="item in options6"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发动机号" prop="engineNo">
                  <el-input type="text" placeholder="请输入发动机号" v-model="editEmployee.engineNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车架号" prop="carFrame">
                  <el-input type="text" placeholder="请输入车架号" v-model="editEmployee.carFrame"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="吨位" prop="ton">
                  <el-input type="text" placeholder="请输入吨位" v-model="editEmployee.ton"></el-input>
                </el-form-item>
                <el-form-item label="车身颜色" prop="carColor">
                  <el-input type="text" placeholder="请输入车身颜色" v-model="editEmployee.carColor"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车系品牌" prop="carBrand">
                  <el-select v-model="editEmployee.carBrand" placeholder="请选择车系品牌">
                    <el-option
                      v-for="item in options7"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="维修次数" prop="repairNum">
                  <el-input type="text" placeholder="请输入维修次数" v-model="editEmployee.repairNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="照片:" prop="img">
                  <el-upload
                    class="avatar-uploader"
                    action="http://112.65.228.185:8004/upload/singleImage"
                    :show-file-list="false"
                    :headers="importHeaders"
                    :on-success="handleAvatarSuccess"
                  >
                    <img v-if="imageUrl" :src="editEmployee.img" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-button style="margin: 15px 32px 0 15px;float: right;" @click="editDrawer=false">取消</el-button>
          <el-button
            type="primary"
            style="margin: 15px 15px 0 15px;float: right;"
            @click="isEditCar"
          >确认</el-button>
        </el-drawer>
                <!-- 查看详情抽屉 -->
        <el-drawer
              title="查看详情"
              :modal="false"
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
                  <el-form-item label="所属单位:" style="border-bottom: 2px solid #eee;">{{viewList.companyName}}</el-form-item>
                  <el-form-item label="车牌号:" style="border-bottom: 2px solid #eee;">{{viewList.vehiclePlate}}</el-form-item>
                  <el-form-item label="自编号:" style="border-bottom: 2px solid #eee;">{{viewList.selfNumber}}</el-form-item>
                  <el-form-item label="回收类型:" style="border-bottom: 2px solid #eee;">{{viewList.recycleTypeStr}}</el-form-item>
                  <el-form-item label="车辆状态:" style="border-bottom: 2px solid #eee;">{{viewList.vehicleStatusStr}}</el-form-item>
                  <el-form-item label="启用日期:" style="border-bottom: 2px solid #eee;">{{viewList.activationDate}}</el-form-item>
                  <el-form-item label="设备编号:" style="border-bottom: 2px solid #eee;">{{viewList.deviceCode}}</el-form-item>
                  <el-form-item label="设备状态:" style="border-bottom: 2px solid #eee;">{{viewList.deviceStatusStr}}</el-form-item>
                  <el-form-item label="报废日期:" style="border-bottom: 2px solid #eee;">{{viewList.scrapDate}}</el-form-item>
                  <el-form-item label="报废原因:" style="border-bottom: 2px solid #eee;">{{viewList.scrapReason}}</el-form-item>
                  <el-form-item label="车辆类型:" style="border-bottom: 2px solid #eee;">{{viewList.vehicleTypeStr}}</el-form-item>
                  <el-form-item label="车辆简称:" style="border-bottom: 2px solid #eee;">{{viewList.vehicleShortName}}</el-form-item>
                  <el-form-item label="加油类型:" style="border-bottom: 2px solid #eee;">{{viewList.oilTypeStr}}</el-form-item>
                  <el-form-item label="车身装置:" style="border-bottom: 2px solid #eee;">{{viewList.bodyDevice}}</el-form-item>
                  <el-form-item label="发动机号:" style="border-bottom: 2px solid #eee;">{{viewList.engineNumber}}</el-form-item>
                  <el-form-item label="车架号:" style="border-bottom: 2px solid #eee;">{{viewList.frameNumber}}</el-form-item>
                  <el-form-item label="吨位:" style="border-bottom: 2px solid #eee;">{{viewList.tonnage}}</el-form-item>
                  <el-form-item label="车系品牌:" style="border-bottom: 2px solid #eee;">{{viewList.carBrandStr}}</el-form-item>
                  <el-form-item label="车身颜色:" style="border-bottom: 2px solid #eee;">{{viewList.color}}</el-form-item>
            </div>
                <div class="drawer-right">
                  <div class="all">
                    <span>所有动态</span>
                    <el-select
                      v-model="time"
                      placeholder="请选择"
                      style="width:96px;height:32px !important;"
                      @change="changeTime"
                      @visible-change="isChange"
                    >
                      <el-option
                        v-for="item in timeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
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
                <div class="view-footer" style="position: fixed; bottom: 15px; right: 50px;">
                  <el-button style="margin: 15px 32px 0 15px;float: right;" @click="viewDrawer = false">取消</el-button>
                  <el-button type="primary" style="margin: 15px 15px 0 15px;float: right;" @click="viewDrawer = false">确认</el-button>
                </div>
              </el-form>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import belongUnit from '../../components/belong-unit';
import {
  vehicleList,
  getDataFilter,
  childCompanyList,
  dictItemData,
  vehicleAdd,
  vehicleView,
  vehicleEdit,
  vehicleDelete,
  dataDictItem,
  vehicleExport,
  vehicleCheck
} from '../../api/getData';
export default {
  data () {
    return {
      value: '',
      rowId: '',
      rid: '',
      drawer: false,
      editDrawer: false,
      selst: false,
      arr: [],
      dataFilter: '',
      viewDrawer: false,
      imageUrl: '',
      importHeaders: { 'access-token': localStorage.getItem('token') },
      direction: 'rtl',
      show: false,
      employeeData: [],
      pageNumber: 1,
      pageSize: 20,
      total: 0,
      time: 0,
      unitList: [],
      companyIds: [],
      searchForm: {
        vehicleNo: '',
        selfCode: '',
        simpleName: '',
        recyleType: '',
        startDate: '',
        status: ''
      },
      options: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      options7: [],
      viewList: [],
      infoList: [],
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
      // 新建车辆表单
      createEmployee: {
        companyId: '',
        vehicleNo: '',
        selfCode: '',
        recyleType: '',
        vehicleStatus: '',
        startDate: '',
        deviceNo: '',
        deviceStatus: '',
        endDate: '',
        desc: '',
        vehicleType: '',
        simpleName: '',
        oilType: '',
        carEquip: '',
        engineNo: '',
        carFrame: '',
        ton: '',
        carColor: '',
        carBrand: '',
        repairNum: '',
        img: ''
      },
      // 编辑车辆表单
      editEmployee: {
        companyId: '',
        vehicleNo: '',
        selfCode: '',
        recyleType: '',
        vehicleStatus: '',
        startDate: '',
        deviceNo: '',
        deviceStatus: '',
        endDate: '',
        desc: '',
        vehicleType: '',
        simpleName: '',
        oilType: '',
        carEquip: '',
        engineNo: '',
        carFrame: '',
        ton: '',
        carColor: '',
        carBrand: '',
        repairNum: '',
        img: ''
      },
      // 表单校验
      rules: {
        companyId: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        vehicleNo: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        selfCode: [
          { required: true, message: '请输入自编号', trigger: 'blur' }
        ],
        recyleType: [
          { required: true, message: '请选择回收类型', trigger: 'blur' }
        ],
        vehicleStatus: [
          { required: true, message: '请选择车辆状态', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择启用日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择报废日期', trigger: 'blur' }
        ]
      },
      // 开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          return (
            time.getTime() > new Date(this.createEmployee.endDate).getTime()
          );
        }
      },
      // 结束时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.createEmployee.startDate) {
            return (
              time.getTime() < new Date(this.createEmployee.startDate).getTime() // 加- 8.64e7则表示包当天
            );
          }
        }
      }
    };
  },
  created () {
    this.isGetDataFilter();
    this.isChildCompanyList();
    this.isShowType();
  },
  methods: {
    // 打开编辑的抽屉
    showEditDialog (row) {
      if (row.photo) {
        this.imageUrl = true
      }
      console.log(row);
      this.rowId = row.id
      this.editDrawer = true
      this.editEmployee.companyId = row.companyId
      this.editEmployee.vehicleNo = row.vehiclePlate
      this.editEmployee.selfCode = row.selfNumber
      this.editEmployee.recyleType = row.recycleType
      this.editEmployee.vehicleStatus = row.vehicleStatus
      this.editEmployee.startDate = row.activationDate
      this.editEmployee.endDate = row.scrapDate
      this.editEmployee.desc = row.scrapReason
      this.editEmployee.vehicleType = row.vehicleType
      this.editEmployee.simpleName = row.vehicleShortName
      this.editEmployee.oilType = row.oilType
      this.editEmployee.carEquip = row.bodyDevice
      this.editEmployee.engineNo = row.engineNumber
      this.editEmployee.carFrame = row.frameNumber
      this.editEmployee.ton = row.tonnage
      this.editEmployee.carColor = row.color
      this.editEmployee.carBrand = row.carBrand
      this.editEmployee.img = row.photo
      vehicleView(
        {
          id: row.id
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.editEmployee.deviceNo = res.data.data.deviceCode
          this.editEmployee.deviceStatus = res.data.data.deviceStatusStr
        }
        console.log(res);
      })
    },
    // 删除车辆
    showDelete (row) {
      if (row.vehicleStatus === 1) {
        return this.$alert('该车辆或绑定的车辆设备正在维修，请确认维修完成，在尝试该操作', '删除车辆', {
          confirmButtonText: '确定'
        });
      } else {
        return this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vehicleDelete(
            {
              id: row.id
            }
          ).then(res => {
            console.log(res);

            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.isGetDataFilter();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    // 查看详情
    showDetailDialog (row) {
      this.viewDrawer = true
      this.rid = row.id
      vehicleView(
        {
          id: row.id
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.viewList = res.data.data
        }
      })
      this.isDatadataDictItem(row.id)
    },
    showDrawer () {
      this.drawer = true;
    },
    handleClose (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      done();
      // this.drawer = false
    },
    // 被选中的单位名称
    selectUnit (date) {
      console.log(date);
      this.dataFilter = date
      this.isVehicleList(date);
    },
    // 是否展开
    expand () {
      this.show = !this.show;
    },
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.isGetDataFilter();
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.isGetDataFilter();
    },
    // 获取左侧的单位列表
    isGetDataFilter () {
      let code = localStorage.getItem('code');
      let data = JSON.parse(localStorage.getItem('login')).privilegeCodes;
      data = data.filter(item => {
        if (item.indexOf(code) !== -1) {
          return item;
        }
      });
      this.arr = data;
      return getDataFilter({
        menuCode: localStorage.getItem('code')
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.unitList = res.data.data.filters;
          this.companyIds = res.data.data.currentCompanyIds;
          this.dataFilter = res.data.data.filters.filter(
            item =>
              item.companyId ===
                JSON.parse(localStorage.getItem('login')).companyId
          )
          return vehicleList({
            page: this.pageNumber,
            limit: this.pageSize,
            dataFilters: res.data.data.filters.filter(
              item =>
                item.companyId ===
                JSON.parse(localStorage.getItem('login')).companyId
            )
          }).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.employeeData = res.data.data.records;
              this.total = res.data.data.total;
            }
          });
        }
      });
    },
    // 获取右侧机动车列表的数据
    isVehicleList (val) {
      return vehicleList({
        page: this.pageNumber,
        limit: this.pageSize,
        dataFilters: val
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.employeeData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    // 获取新增所属单位的数据
    isChildCompanyList () {
      return childCompanyList({
        id: JSON.parse(localStorage.getItem('login')).companyId
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.options = res.data.data;
        }
      });
    },
    // 字典接口
    isShowType () {
      return dictItemData([
        'recycleType',
        'vehicleStatus',
        'vehicleType',
        'oilType',
        'bodyDevice',
        'liveEefuse'
      ]).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.options2 = res.data.data.recycleType;
          this.options3 = res.data.data.vehicleStatus;
          this.options4 = res.data.data.vehicleType;
          this.options5 = res.data.data.oilType;
          this.options6 = res.data.data.bodyDevice;
          this.options7 = res.data.data.liveEefuse;
        }
      });
    },
    // 新增功能的接口
    isAddCar () {
      return vehicleAdd({
        companyId: this.createEmployee.companyId,
        vehiclePlate: this.createEmployee.vehicleNo,
        selfNumber: this.createEmployee.selfCode,
        recycleType: this.createEmployee.recyleType,
        vehicleStatus: this.createEmployee.vehicleStatus,
        activationDate: this.createEmployee.startDate,
        scrapDate: this.createEmployee.endDate,
        vehicleType: this.createEmployee.vehicleType,
        vehicleShortName: this.createEmployee.simpleName,
        oilType: this.createEmployee.oilType,
        bodyDevice: this.createEmployee.carEquip,
        engineNumber: this.createEmployee.engineNo,
        frameNumber: this.createEmployee.carFrame,
        tonnage: this.createEmployee.ton,
        carBrand: this.createEmployee.carBrand,
        color: this.createEmployee.carColor,
        photo: this.createEmployee.img,
        scrapReason: this.createEmployee.desc
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.isGetDataFilter();
          this.drawer = false;
        }
      });
    },
    // 验证车牌号的唯一性
    isBlurCarNum () {
      return vehicleCheck({
        vehiclePlate: this.createEmployee.vehicleNo
      }).then(res => {
        console.log(res);
        if (res.data.code === 400) {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑验证车牌号的唯一性
    isBlurCarNum2 () {
      return vehicleCheck({
        id: this.rowId,
        vehiclePlate: this.editEmployee.vehicleNo
      }).then(res => {
        console.log(res);
        if (res.data.code === 400) {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 验证自编号号的唯一性
    isBlurSelfCode () {
      return vehicleCheck({
        selfNumber: this.createEmployee.selfCode
      }).then(res => {
        console.log(res);
        if (res.data.code === 400) {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑验证自编号号的唯一性
    isBlurSelfCode2 () {
      return vehicleCheck({
        id: this.rowId,
        selfNumber: this.editEmployee.selfCode
      }).then(res => {
        console.log(res);
        if (res.data.code === 400) {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 关闭抽屉 重置表单
    isClose (form) {
      this.$refs[form].resetFields();
      this.imageUrl = '';
    },
    // 上传文件
    handleAvatarSuccess (res, file) {
      console.log(res);
      this.imageUrl = true;
      this.createEmployee.img = res.data.url;
      this.editEmployee.img = res.data.url;
    },
    // 编辑功能的接口
    isEditCar () {
      return vehicleEdit(
        {
          'id': this.rowId,
          'companyId': this.editEmployee.companyId,
          'vehiclePlate': this.editEmployee.vehicleNo,
          'selfNumber': this.editEmployee.selfCode,
          'recycleType': this.editEmployee.recyleType,
          'vehicleStatus': this.editEmployee.vehicleStatus,
          'activationDate': this.editEmployee.startDate,
          'scrapDate': this.editEmployee.endDate,
          'vehicleType': this.editEmployee.vehicleType,
          'vehicleShortName': this.editEmployee.simpleName,
          'oilType': this.editEmployee.oilType,
          'bodyDevice': this.editEmployee.carEquip,
          'engineNumber': this.editEmployee.engineNo,
          'frameNumber': this.editEmployee.carFrame,
          'tonnage': this.editEmployee.ton,
          'carBrand': this.editEmployee.carBrand,
          'color': this.editEmployee.carColor,
          'photo': this.editEmployee.img,
          'scrapReason': this.editEmployee.desc
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.isGetDataFilter();
          this.editDrawer = false;
        }
        console.log(res);
      })
    },
    isChange (val) {
      this.selst = !this.selst
    },
    // 编辑记录接口
    isDatadataDictItem (id) {
      let code = localStorage.getItem('code');
      return dataDictItem(
        {
          'tableName': code,
          'recordId': id,
          'timeInterval': this.time
        }
      ).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.infoList = res.data.data
        }
      })
    },
    // 根据时间筛选动态
    changeTime () {
      // console.log(this.time);
      let code = localStorage.getItem('code');
      return dataDictItem(
        {
          'tableName': code,
          'recordId': this.rid,
          'timeInterval': this.time
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.infoList = res.data.data
        }
      })
    },
    // 查询机动车
    isSearchCar () {
      return vehicleList({
        'page': this.pageNumber,
        'limit': this.pageSize,
        'vehiclePlate': this.searchForm.vehicleNo,
        'selfNumber': this.searchForm.selfCode,
        'recycleType': this.searchForm.recyleType,
        'vehicleStatus': this.searchForm.vehicleStatus,
        'vehicleType': this.searchForm.vehicleType,
        'activationSatrtDate': !this.searchForm.birthDate ? null : this.searchForm.birthDate[0],
        'activationEndDate': !this.searchForm.birthDate ? null : this.searchForm.birthDate[1],
        'dataFilters': this.dataFilter
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.employeeData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },
    // 重置查询表单
    isResetForm () {
      this.searchForm.vehicleNo = ''
      this.searchForm.selfCode = ''
      this.searchForm.recyleType = ''
      this.searchForm.vehicleStatus = ''
      this.searchForm.vehicleType = ''
      this.searchForm.birthDate = ''
    },
    // 导出
    outExe () {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vehicleExport(
          {
            'vehiclePlate': this.searchForm.vehicleNo,
            'selfNumber': this.searchForm.selfCode,
            'recycleType': this.searchForm.recyleType,
            'vehicleStatus': this.searchForm.vehicleStatus,
            'vehicleType': this.searchForm.vehicleType,
            'activationSatrtDate': !this.searchForm.birthDate ? null : this.searchForm.birthDate[0],
            'activationEndDate': !this.searchForm.birthDate ? null : this.searchForm.birthDate[1],
            'dataFilters': this.dataFilter
          }
        ).then(res => {
          console.log(res);
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
        const tHeader = ['车牌号', '自编号', '车辆简称', '回收类型', '启用日期', '状态']
        const filterVal = ['vehiclePlate', 'selfNumber', 'recycleType', 'vehicleShortName', 'activationDate', 'vehicleStatus']
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
    }
  },
  components: {
    belongUnit
  }
};
</script>
<style>
:focus {
  outline: 0;
}
</style>
<style lang="less" scoped>
.employee {
  height: 100%;
  display: flex;
  flex-flow: column;
  // position: relative;
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
    height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 16px;
    padding-top: 0;
    background-color: #fff;
    border-left: 1px solid #eee;
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
/deep/ .el-table .el-table__header-wrapper .el-table__header .has-gutter tr th {
  background-color: rgba(245, 247, 250, 1) !important;
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
  width: 100%;
}
.el-drawer__wrapper .el-form {
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
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
.operation span:hover {
  text-decoration: underline;
  cursor: pointer;
  color: #237bff;
}
</style>

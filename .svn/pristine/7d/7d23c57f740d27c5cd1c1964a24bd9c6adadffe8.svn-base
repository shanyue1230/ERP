<template>
  <div class="public">
       <!-- 面包屑导航 -->
    <Breadcrumb :levelList="levelList"></Breadcrumb>
       <!-- 主体部分 -->
       <div class="main">
         <div class="left">
            <belongUnit :unitList="unitList"></belongUnit>
         </div>
         <div class="right">
         <div class="Inquire">
              <el-form :inline="true" :model="form" class="demo-form-inline">
                      <el-row>
                        <el-col :span="5" style="padding:0">
                          <el-form-item label="公共厕所名称：">
                            <el-select v-model="form.name" placeholder="全部">
                              <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5" style="padding:0">
                          <el-form-item label="所属单位：" style="margin-left:16px">
                            <el-select v-model="form.unit" placeholder="全部">
                              <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5" style="padding:0">
                          <el-form-item label="所属街道：" style="margin-left:16px">
                            <el-select v-model="form.street" placeholder="全部">
                              <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col  style="padding:0; width:280px;">
                          <el-form-item
                            style="padding-top:40px;box-sizing: border-box; width:auto; margin-left:16px"
                          >
                            <el-button type="primary">确定</el-button>
                            <el-button type="success" @click="isShow">{{text}}</el-button>
                            <el-button>重置</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 隐藏的表单 -->
                    <el-row v-if="show">
                      <el-col :span="5" style="padding:0">
                        <el-form-item label="是否设置区域：">
                          <el-select v-model="form.region" placeholder="全部">
                            <el-option
                              v-for="item in options4"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5" style="padding:0;margin-left:16px">
                      </el-col>
                      <el-col :span="5" style="padding:0;margin-left:16px">
                      </el-col>
                      <el-col style="padding:0; width:250px;"></el-col>
                    </el-row>
        </el-form>
         </div>
           <!-- 新增  导出 -->
        <el-row>
          <el-button type="primary" @click="isNewDrawer">新增</el-button>
          <el-button type="warning" style="float: right;">导出</el-button>
        </el-row>
              <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;margin-top:16px">
         <el-table-column type="index" label="No." width="50"></el-table-column>
        <el-table-column prop="unit" label="所属单位" ></el-table-column>
        <el-table-column prop="street" label="所属街道" ></el-table-column>
        <el-table-column prop="committee" label="所属居委" ></el-table-column>
        <el-table-column prop="name" label="公厕名称" ></el-table-column>
        <el-table-column prop="type" label="公厕类型" ></el-table-column>
        <el-table-column prop="level" label="公厕级别" ></el-table-column>
        <el-table-column prop="status" label="状态">
           <template slot-scope="{row}">
            <span v-if="row.status === 0" style="color:green">正常</span>
            <span v-if="row.status === 1" style="color:red">停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="{row}">
               <span class="span" @click="isEdit(row)">编辑</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span class="span" @click="isDetails(row)">查看详情</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span  class="span" @click="isPosition(row)">定位</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span  class="span">删除</span>
          </template>
        </el-table-column>
      </el-table>
              <!-- 分页器 -->
        <el-pagination
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-top:15px"
        ></el-pagination>
         </div>

       </div>
       <!-- 新增的抽屉框 -->
          <el-drawer
            title="新建公共厕所"
             :visible.sync="newDrawer"
             :before-close="handleClose">
            <el-form   :model="drawerForm"  :rules="rules">
              <el-row :gutter="30">
                <el-col :span="12">
                       <el-form-item label="所属单位：" prop="unit">
                                        <el-select v-model="drawerForm.unit" placeholder="全部">
                                                <el-option
                                                  v-for="item in options5"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="所属街道：" prop="street">
                                       <el-select v-model="drawerForm.street" placeholder="全部">
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
              <!-- ------------ -->
                <el-row  :gutter="30">
                <el-col :span="12">
                       <el-form-item label="公厕名称：" prop="name">
                          <el-input v-model="drawerForm.name" placeholder="请输入公厕名称"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="居委会：" prop="committee">
                                          <el-select v-model="drawerForm.committee" placeholder="请选择居委">
                                                <el-option
                                                  v-for="item in options11"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                </el-col>
              </el-row>
              <!-- --------------- -->
               <el-row  :gutter="30">
                <el-col :span="12">
                       <el-form-item label="公厕编号："  prop="num">
                              <el-input v-model="drawerForm.num" placeholder="请输入公厕编号"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="地址：" prop="address">
                          <el-input v-model="drawerForm.address" placeholder="请输入地址"></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <!-- --------------- -->
              <el-row  :gutter="30">
                <el-col :span="12">
                       <el-form-item label="建造日期："  prop="date">
                        <el-date-picker
                          v-model="drawerForm.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="公厕类型："   prop="type">
                                        <el-select v-model="drawerForm.type" placeholder="请选择公厕类型">
                                                <el-option
                                                  v-for="item in options12"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="级别："   prop="level">
                           <el-input v-model="drawerForm.level" placeholder="请输入级别"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="水冲方式："   prop="flush">
                                       <el-select v-model="drawerForm.flush" placeholder="请选择水冲方式">
                                                <el-option
                                                  v-for="item in options13"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
                <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="男蹲位数量：">
                           <el-input v-model="drawerForm.maleSquat" placeholder="请输入男蹲位数量"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="男站位数量：">
                           <el-input v-model="drawerForm.maleStation" placeholder="请输入男站位数量"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="女蹲位数量：">
                           <el-input v-model="drawerForm.femaleSquat" placeholder="请输入女蹲位数量"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="女站位数量：">
                           <el-input v-model="drawerForm.femaleStation" placeholder="请输入女站位数量"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="开放时间：">
                         <el-date-picker
                          v-model="drawerForm.startDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                           :picker-options="pickerOptionsStart"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="关闭时间：">
                        <el-date-picker
                          v-model="drawerForm.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :picker-options="pickerOptionsEnd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="残疾设备：">
                                        <el-select v-model="drawerForm.disability" placeholder="请选择残疾设备">
                                                <el-option
                                                  v-for="item in options14"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="室内导向设备：">
                                        <el-select v-model="drawerForm.indoor" placeholder="请选择室内导向设备">
                                                <el-option
                                                  v-for="item in options15"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="收费许可证：">
                                        <el-select v-model="drawerForm.license" placeholder="请选择收费许可证">
                                                <el-option
                                                  v-for="item in options16"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="单位作业：">
                                    <el-input v-model="drawerForm.operation" placeholder="请输入单位作业"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="管理单位：">
                                     <el-input v-model="drawerForm.management" placeholder="请输入管理单位"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="实际收费：">
                                    <el-input v-model="drawerForm.toll" placeholder="请输入实际收费"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
            <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="联系人：">
                                     <el-input v-model="drawerForm.person" placeholder="请输入联系人"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item></el-form-item>
                  </el-col>
              </el-row>
              </el-form>
                <div class="saveAndCancle">
                       <el-button @click="newDrawer=false">取 消</el-button>
                        <el-button type="primary">确 定</el-button>
                </div>
          </el-drawer>
        <!-- 编辑的抽屉框 -->
          <el-drawer
            title="编辑公共厕所"
            :visible.sync="editDrawer"
            :before-close="handleClose">
                <el-form   :model="drawerForm"  :rules="rules">
              <el-row :gutter="30">
                <el-col :span="12">
                       <el-form-item label="所属单位：" prop="unit">
                                        <el-select v-model="drawerForm.unit" placeholder="全部">
                                                <el-option
                                                  v-for="item in options5"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="所属街道：" prop="street">
                                       <el-select v-model="drawerForm.street" placeholder="全部">
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
              <!-- ------------ -->
                <el-row  :gutter="30">
                <el-col :span="12">
                       <el-form-item label="公厕名称：" prop="name">
                          <el-input v-model="drawerForm.name" placeholder="请输入公厕名称"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="居委会：" prop="committee">
                                          <el-select v-model="drawerForm.committee" placeholder="请选择居委">
                                                <el-option
                                                  v-for="item in options11"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                </el-col>
              </el-row>
              <!-- --------------- -->
               <el-row  :gutter="30">
                <el-col :span="12">
                       <el-form-item label="公厕编号："  prop="num">
                              <el-input v-model="drawerForm.num" placeholder="请输入公厕编号"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="地址：" prop="address">
                          <el-input v-model="drawerForm.address" placeholder="请输入地址"></el-input>
                      </el-form-item>
                </el-col>
              </el-row>
              <!-- --------------- -->
              <el-row  :gutter="30">
                <el-col :span="12">
                       <el-form-item label="建造日期："  prop="date">
                        <el-date-picker
                          v-model="drawerForm.date"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                      <el-form-item label="公厕类型："   prop="type">
                                        <el-select v-model="drawerForm.type" placeholder="请选择公厕类型">
                                                <el-option
                                                  v-for="item in options12"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                </el-col>
              </el-row>
              <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="级别："   prop="level">
                           <el-input v-model="drawerForm.level" placeholder="请输入级别"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="水冲方式："   prop="flush">
                                       <el-select v-model="drawerForm.flush" placeholder="请选择水冲方式">
                                                <el-option
                                                  v-for="item in options13"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
                <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="男蹲位数量：">
                           <el-input v-model="drawerForm.maleSquat" placeholder="请输入男蹲位数量"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="男站位数量：">
                           <el-input v-model="drawerForm.maleStation" placeholder="请输入男站位数量"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="女蹲位数量：">
                           <el-input v-model="drawerForm.femaleSquat" placeholder="请输入女蹲位数量"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="女站位数量：">
                           <el-input v-model="drawerForm.femaleStation" placeholder="请输入女站位数量"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="开放时间：">
                         <el-date-picker
                          v-model="drawerForm.startDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                           :picker-options="pickerOptionsStart"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="关闭时间：">
                        <el-date-picker
                          v-model="drawerForm.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :picker-options="pickerOptionsEnd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="残疾设备：">
                                        <el-select v-model="drawerForm.disability" placeholder="请选择残疾设备">
                                                <el-option
                                                  v-for="item in options14"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="室内导向设备：">
                                        <el-select v-model="drawerForm.indoor" placeholder="请选择室内导向设备">
                                                <el-option
                                                  v-for="item in options15"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="收费许可证：">
                                        <el-select v-model="drawerForm.license" placeholder="请选择收费许可证">
                                                <el-option
                                                  v-for="item in options16"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="单位作业：">
                                    <el-input v-model="drawerForm.operation" placeholder="请输入单位作业"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
               <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="管理单位：">
                                     <el-input v-model="drawerForm.management" placeholder="请输入管理单位"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item label="实际收费：">
                                    <el-input v-model="drawerForm.toll" placeholder="请输入实际收费"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
            <el-row  :gutter="30">
                 <el-col  :span="12">
                    <el-form-item label="联系人：">
                                     <el-input v-model="drawerForm.person" placeholder="请输入联系人"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col  :span="12">
                    <el-form-item></el-form-item>
                  </el-col>
              </el-row>
              </el-form>
                <div class="saveAndCancle">
                       <el-button @click="editDrawer=false">取 消</el-button>
                       <el-button type="primary">确 定</el-button>
                </div>
          </el-drawer>
        <!-- 查看详情的抽屉框 -->
           <el-drawer
            title="查看详情"
            :visible.sync="viewDrawer"
            :direction="direction"
            :before-close="handleClose">
                    <el-row style="height:100%;padding:31px">
                               <el-col :span="12" style="height:100%">
                                  <div class="info">
                                    <el-form style="padding:0">
                                      <el-form-item  label="部门单位">此处应为部门名称</el-form-item>
                                      <el-form-item  label="所属街道">此处应为所属单位</el-form-item>
                                      <el-form-item  label="公厕名称">无</el-form-item>
                                      <el-form-item  label="状态">管理</el-form-item>
                                    </el-form>
                                  </div>
                               </el-col>
                               <el-col :span="12" style="height:100%">
                                 <div class="dynamic">
                                   <div class="all">
                                      <span>所有动态</span>
                                       <el-select v-model="time" placeholder="请选择" style="width:96px;height:32px !important;"
                                       @change="isChange"
                                       >
                                                <el-option
                                                  v-for="item in options9"
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
                                 </div>
                              </el-col>
                   </el-row>
                <div class="saveAndCancle">
                       <el-button @click="viewDrawer=false">取 消</el-button>
                       <el-button type="primary">确 定</el-button>
                </div>
          </el-drawer>
          <!-- 定位的抽屉框 -->
          <el-drawer
            title="定位"
            :visible.sync="positionDrawer"
            :direction="direction"
            :before-close="handleClose">
            <el-form v-model="positionForm" style="padding-top: 16px" class="map-form">
                    <el-row type="flex" class="row-bg" justify="space-between">
                         <el-col style="width:250px;position: relative;">
                           <el-form-item style="position: absolute;bottom: 0">
                                    <el-button type="primary" @click="isNewPoint">新增点位</el-button>
                                    <el-button type="primary">删除点位</el-button>
                           </el-form-item>
                        </el-col>
                         <el-col :span="5">
                           <el-form-item  label="检索地址：">
                             <el-input v-model="positionForm.address" placeholder="请输入详细地址"></el-input>
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
                <!-- 点击显示标记 -->
                    <el-amap-marker v-for="(marker, index) in markers" :key="marker.index" :position="marker.position" :icon="marker.icon" :title="marker.title" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
                    <!-- 显示的圆覆盖圈 -->
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
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb';
import belongUnit from '../../components/belong-unit'
// import { restapi } from '../../api/getData'
import axios from 'axios'
export default {
  data () {
    const self = this;
    return {
      levelList: [{ title: '环卫设施点' }, { title: '公共厕所' }],
      unitList: [{ id: 1, label: 'a', name: '单位名称1' }, { id: 2, label: 'b', name: '单位名称2' }],
      show: false,
      text: '展开',
      time: 0,
      selst: false,
      pageSize: 10,
      newDrawer: false,
      editDrawer: false,
      viewDrawer: false,
      dialogImageUrl: '',
      dialogVisible: false,
      positionDrawer: false,
      direction: 'rtl',
      total: 40,
      form: {
        name: '',
        unit: '',
        street: '',
        region: ''
      },
      drawerForm: {
        unit: '',
        street: '',
        name: '',
        committee: '',
        num: '',
        address: '',
        date: '',
        type: '',
        level: '',
        flush: '',
        maleSquat: '',
        maleStation: '',
        femaleSquat: '',
        femaleStation: '',
        startDate: '',
        endDate: '',
        disability: '',
        indoor: '',
        license: '',
        operation: '',
        management: '',
        toll: '',
        person: ''
      },
      positionForm: {
        address: '',
        range: 0
      },
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      options7: [],
      options8: [],
      options11: [],
      options12: [],
      options13: [],
      options14: [],
      options15: [],
      options16: [],
      options9: [
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
      options10: [
        {
          value: 0,
          label: '500米'
        },
        {
          value: 1,
          label: '1000米'
        },
        {
          value: 2,
          label: '1500米'
        },
        {
          value: 3,
          label: '2000米'
        }
      ],
      tableData: [
        {
          id: 1,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 1
        },
        {
          id: 2,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 1
        },
        {
          id: 3,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 1
        },
        {
          id: 4,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        },
        {
          id: 5,
          unit: '单位名称',
          street: '街道名称',
          name: '中转站名称',
          status: 0
        }
      ],
      rules: {
        unit: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        street: [
          { required: true, message: '请选择所属街道', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入公厕名称', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入公厕编号', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择建造日期', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择公厕类型', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入级别', trigger: 'blur' }
        ],
        flush: [
          { required: true, message: '请选择水冲方式', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        area: [
          {
            pattern: /^[0-9a-zA-Z]+$/,
            message: '仅且只可输入数字字符'
          }
        ]
      },
      infoList: [
        {
          id: 1,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 2,
          editor: 'xxx',
          isCreated: true,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 3,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 4,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 5,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 6,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 7,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        },
        {
          id: 8,
          editor: 'xxx',
          isCreated: false,
          mainContent: '菜单名称',
          editTime: '2019.12.21 13:16',
          fieldName: '总经办'
        }
      ],
      // 地图插件
      qaqqq: [],
      address: '',
      // 地图缩放
      zoom: 14,
      // 初始中心
      center: [114.406539, 30.492921],
      lng: 0,
      lat: 0,
      loaded: false,
      // 点击显示的标记默认的定位
      markers: [{
        position: [114.406539, 30.492921]
      }],

      // 圆覆盖圈
      circles: [
        {
          center: [114.406539, 30.492921],
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
              console.log(self);
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;

                // 初始定位地图中心位置
                self.center = [self.lng, self.lat];
                // 初始定位圆的位置
                self.circles[0].center = [self.lng, self.lat]
                // 初始定位标记的位置
                self.markers[0].position = [self.lng, self.lat]

                // console.log(self.circles[0].center)
                // console.log(self.center)
                self.loaded = true;
                // self.$nextTick();
              }
            });
          }
        }
      }],
      // 开始时间
      pickerOptionsStart: {
        disabledDate: time => {
          return time.getTime() > new Date(this.drawerForm.endDate).getTime();
        }
      },
      // 结束时间
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.drawerForm.startDate) {
            return (
              time.getTime() < new Date(this.drawerForm.startDate).getTime() // 加- 8.64e7则表示包当天
            );
          }
        }
      }
    }
  },
  components: {
    Breadcrumb,
    belongUnit
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    isShow () {
      this.show = !this.show
      if (!this.show) {
        this.text = '展开'
      } else {
        this.text = '收起'
      }
    },
    // 打开编辑的抽屉框
    isEdit (row) {
      this.editDrawer = true
    },
    isDetails (row) {
      this.viewDrawer = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    isChange () {
      this.selst = !this.selst
    },
    isNewDrawer () {
      this.newDrawer = true
    },
    isPosition () {
      this.positionDrawer = true
    },
    // 地理编码
    isNewPoint () {
      console.log(this.positionForm.address);
      axios({
        method: 'GET',
        url: 'https://restapi.amap.com/v3/geocode/geo?key=f510d999ca866fcec046e0bf05431804&address=' + this.positionForm.address
      }).then((res) => {
        // console.log(res);
        if (res.data.infocode === '10000') {
          this.center = res.data.geocodes[0].location.split(',')
          this.markers[0].position = res.data.geocodes[0].location.split(',')
          this.circles[0].center = res.data.geocodes[0].location.split(',')
        }
      })
    },
    changeRange (val) {
      // console.log(val);
      if (val === 0) {
        this.circles[0].radius = 500
      } else if (val === 1) {
        this.circles[0].radius = 1000
      } else if (val === 2) {
        this.circles[0].radius = 1500
      } else if (val === 3) {
        this.circles[0].radius = 2000
      }
    }

  }
}
</script>
<style>
:focus {
  outline: 0;
}
</style>
<style  lang="less" scoped>
.public {
  height: 100%;
  .main {
    background-color: #fff;
    display: flex;
    border-left: 1px solid #eee;
    box-sizing: border-box;
    .left {
            width: 270px;
            background-color: #fff;
            height: 100%;
    }
    .right {
            flex: 1;
             height: 80vh;
            overflow-x: hidden;
            overflow-y: scroll;
            background-color: #fff;
            border-left: 1px solid #eee;
            padding:  0 16px;
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

  }
        .span {
    cursor: pointer;
  }
  .span:hover {
    text-decoration: underline;
    color: #237BFF;
  }
  // 抽屉的样式
              .el-drawer__wrapper {
                    position: fixed;
                    z-index: 300;
                    top: 105px;
                    right: 0;
                    width: 100%;
                    height: calc(100% - 105px);

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
              /deep/.el-drawer__body {
              // padding:0 32px;
              height: 100%;
              }
                     /deep/.el-form  {
                     padding: 0 32px;

                     box-sizing: border-box;
                     height: 70vh;
                      overflow-x: hidden;
                     overflow-y: scroll;
                     padding-top:32px ;
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
                         .last-item {
                           .el-form-item__label {
                             width: 100%;
                             text-align: left;
                           }
                         }
                     }
                     .map-form {
                        height: auto !important;
                     }
                    /deep/ .saveAndCancle{
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

                /deep/.el-drawer.rtl {
                  width: calc(100% - 305px) !important;
                  box-shadow: none;
                  border-left: 1px solid #eee;
                }
                 }
          /deep/ .el-date-editor  {
          width: 100%;
        }
    .map {
       height: 60vh;
       border:1px solid #ccc;
       margin: 0 32px;
       .amap-page-container {width:100%; height: 60vh; }
    }
    .info {
            padding-right:30px;
         .el-form {
              /deep/.el-form-item {
                margin-bottom: 10px;
                border-bottom: 1px solid rgba(228,231,237,1);
              }
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
}

</style>

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
            <el-checkbox-group v-model="formInline.checkList" @change="changeCheckList">
              <el-checkbox
              style="font-weight:400"
                v-for="item in checkboxList"
                :label="item"
                :key="item.companyId"
                :checked='item.companyId === index'
                  :disabled='formInline.checkList.length === 1 &&formInline.checkList[0].companyId===item.companyId'
              >{{item.companyName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form>
      </div>
      <div class="affiliationInfo">
        <el-form :inline="true" :model="form" ref="Form" class="demo-form-inline">
          <el-row>
            <el-col :span="5" style="padding:0">
              <el-form-item label="所属车辆：">
                <el-select v-model="form.value1" placeholder="全部">
                  <el-option
                    v-for="item in options3"
                    :key="item.id"
                    :label="item.vehiclePlate"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0; margin-left:16px">
              <el-form-item label="设备编号：">
                <el-input v-model="form.num2" placeholder="请输入项目编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="padding:0;margin-left:16px">
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
            <el-col :span="5" tyle="padding:0">
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
              <span class="span" @click="isDetails(row)">查看详情</span>
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
  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb'
import { vehicleDeviceSharedList, dataDictItem, vehicleDeviceView, vehicleDeviceExport, getDataFilter, vehicleSelectionList } from '../../api/getData'
export default {
  data () {
    return {
      show: false,
      showtext: '展开',
      dialogView: false,
      time: 0,
      selst: false,
      dataFilter: '',
      total: 0,
      valList: [],
      viewList: '',
      viewList2: '',
      pageNumber: 1,
      pageSize: 10,
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
      options3: [],
      tableData: [],
      infoList: [],
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
      ]
    };
  },
  computed: {
    index () {
      return JSON.parse(localStorage.getItem('login')).companyId;
    }
  },
  components: {
    Breadcrumb
  },
  created () {
    this.isGetDataFilter()
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
    resetForm3 (form) {
      this.form.value1 = ''
      this.form.num1 = ''
      this.form.num2 = ''
      this.form.value2 = ''
      this.form.value3 = ''
      this.form.value4 = ''
    },
    // 获取表格列表
    isvehicleDeviceSharedList () {
      return vehicleDeviceSharedList({
        'page': this.pageNumber,
        'limit': this.pageSize,
        'dataFilters': this.dataFilter
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
    // 查询功能
    isInquire () {
      console.log(this.form);
      return vehicleDeviceSharedList({
        'page': this.pageNumber,
        'limit': this.pageSize,
        'code': this.form.num2,
        'status': this.form.value2,
        'useStartDate': !this.form.value3 ? null : this.form.value3[0],
        'useEndDate': !this.form.value3 ? null : this.form.value3[1],
        'expiryStartDate': !this.form.value4 ? null : this.form.value4[0],
        'expiryEndDate': !this.form.value4 ? null : this.form.value4[1],
        'dataFilters': this.dataFilter
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
    // 获取左侧单位列表is
    isGetDataFilter () {
      return getDataFilter(
        {
          menuCode: localStorage.getItem('code')
        }
      ).then(res => {
        console.log(res);

        if (res.data.code === 200) {
          this.checkboxList = res.data.data.filters
          this.dataFilter = res.data.data.filters.filter(
            item =>
              item.companyId ===
                JSON.parse(localStorage.getItem('login')).companyId
          )
          this.isvehicleDeviceSharedList()
          vehicleSelectionList(
            {
              'dataFilters': res.data.data.filters.filter(
                item =>
                  item.companyId ===
                JSON.parse(localStorage.getItem('login')).companyId
              )
            }
          ).then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.options3 = res.data.data
            }
          })
        }
      })
    },
    // 选中所属单位渲染对应的列表
    changeCheckList (data) {
      console.log(data);
      this.dataFilter = data
      this.isvehicleDeviceSharedList()
      this.isVehicleSelectionList()
    },
    // 所属车辆下拉框的数据
    isVehicleSelectionList () {
      return vehicleSelectionList(
        {
          'dataFilters': this.dataFilter
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

<template>
  <div class="inspectionTemplate">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>巡查评分</el-breadcrumb-item>
      <el-breadcrumb-item>巡查小区</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="xf-main">
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
          <el-row>
           <el-col :span="5">
              <!-- 模糊搜索模板名称 -->
              <el-form-item label="搜索:" prop="search">
                  <el-input type="text" placeholder="模糊搜索模板名称" v-model="searchForm.search"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="5">
              <!-- 状态 -->
              <el-form-item label="日期:" prop="date">
                <el-date-picker
                  v-model="searchForm.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <!-- 巡查地区 -->
              <el-form-item label="巡查地区:" prop="status">
                <el-cascader
                  v-model="searchForm.area"
                  :options="options"
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <!-- 操作 -->
              <el-form-item style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-top:6px; margin-left:16px">
                <el-button type="primary" @click="isSearch">确定</el-button>
                <el-button type="success" @click="isShow">展开</el-button>
                <el-button  @click="isReset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="show">
            <el-col :span="5">
                <el-form-item label="巡查状态:" prop="status">
                  <el-select v-model="searchForm.status" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
                 <el-form-item label="评分范围：">
                 <el-input style="width:100px" placeholder="最低分" v-model="lowest"></el-input> - <el-input style="width:100px" placeholder="最高分" v-model="highest"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 新增 + 导出 -->
        <div style="margin-top:20px;">
          <el-button type="primary" @click="showDrawer">新增</el-button>
          <!-- <el-button v-show=" privilegeCodes.indexOf('basic:driver:driverExport') !== -1" type="warning" style="float: right;">导出</el-button> -->
        </div>

        <!-- 表格 -->
        <!-- height="" height="55vh" -->
        <el-table
            ref="multipleTable"
            :data="driverTableData"
            tooltip-effect="dark"

          style="margin-top:16px"
            >
            <el-table-column
              label="No."
              type="index" width="50"
              >
            </el-table-column>
            <el-table-column
              label="交付点No"
              prop="name"
              >
            </el-table-column>
             <el-table-column
              label="所属地区"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              label="单位类型"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              label="巡查时间"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              label="巡查人员"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              label="巡查状态"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="评分结果"
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="巡查计划"
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="拍照方式"
              >
            </el-table-column>
            <el-table-column
              prop="operate"
              label="操作"
              width="200px"
              >
              <template v-slot="{row}">
                <span class="span" @click="showEditDrawer(row.id)">编辑</span>&nbsp;&nbsp;
                <span style="color:#ccc">|</span>&nbsp;&nbsp;
                <span class="span" @click="showDeleteDrawer(row.id)">删除</span>
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
         title="新建小区"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <el-form class="create-el-form" :model="createDriver" :rules="rules" ref="createDriver">
          <el-form-item label="所属区:" prop="area">
                   <el-cascader
                    v-model="createDriver.area"
                    :options="companyIdList"
                    :props="{ value: 'parentIds',label:'name',children:'regionLocales' }"
                   >
                    </el-cascader>
          </el-form-item>
          <el-form-item label="小区编号:" prop="cellNumber">
             <el-input type="text" placeholder="请输入小区编号" v-model="createDriver.cellNumber"></el-input>
          </el-form-item>
          <el-form-item label="小区名称:" prop="name">
              <el-input type="text" placeholder="请输入小区名称" v-model="createDriver.name"></el-input>
          </el-form-item>
          <el-form-item label="小区地址:" prop="address">
              <el-input type="text" placeholder="请输入小区地址" v-model="createDriver.address"></el-input>
          </el-form-item>
          </el-form>
           <div class="saveAndCancle">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="isAddCell">确认</el-button>
           </div>
      </el-drawer>
        <!-- 编辑抽屉 -->
      <el-drawer
          title="编辑小区"
          :append-to-body="true"
          :visible.sync="editDrawer"
          :direction="direction"
          :before-close="handleClose">
          <el-form class="create-el-form" :model="editDriver" :rules="rules" ref="createDriver">
          <el-form-item label="所属区:" prop="area">

                  <el-cascader
                    v-model="editDriver.area"
                    :options="companyIdList"
                    :props="{ value: 'parentIds',label:'name',children:'regionLocales' }"
                   >
                    </el-cascader>
          </el-form-item>
          <el-form-item label="小区编号:" prop="cellNumber">
             <el-input type="text" placeholder="请输入小区编号" v-model="editDriver.cellNumber"></el-input>
          </el-form-item>
          <el-form-item label="小区名称:" prop="name">
              <el-input type="text" placeholder="请输入小区名称" v-model="editDriver.name"></el-input>
          </el-form-item>
          <el-form-item label="小区地址:" prop="address">
              <el-input type="text" placeholder="请输入小区地址" v-model="editDriver.address"></el-input>
          </el-form-item>
          </el-form>
           <div class="saveAndCancle">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="isEditCell">确认</el-button>
           </div>
      </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      title: '',
      rid: '',
      show: false,
      driverID: '',
      driverLicenseCode: '',
      fileNumberCode: '',
      infoList: [],
      currentCompanyIds: [],
      privilegeCodes: [],
      selst: false,
      dialogVisible: false,
      editDrawer: false,
      isDeleteHistoryd: false,
      expending: '展开',
      time: 0,
      recordId: '',
      total: 0,
      currentPage: 1,
      pageSize: 20,
      options: [
        {
          id: '1',
          name: '启用'
        }, {
          id: '2',
          name: '禁用'
        }
      ],
      optionsCasc: [],
      drawer: false,
      direction: 'rtl',
      unitList: [],
      checkList: [],
      searchForm: {
        workersNumber: '',
        name: JSON.parse(localStorage.getItem('login')).companyId,
        driverLicense: '',
        expirationDate: ''
      },
      // 所属部门
      companyIdList: [],

      // 表格数据
      driverTableData: [
        {
          id: 1,
          name: '模板1',
          status: '启用'
        }
      ],
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      // 新建小区
      createDriver: {
        area: '',
        cellNumber: '',
        name: '',
        address: ''
      },
      // 编辑小区
      editDriver: {
        area: '',
        cellNumber: '',
        name: '',
        address: ''
      },
      restaurants: [],
      restaurants2: [],
      state2: '',
      rules: {
      }
    }
  },
  created () {
  },
  methods: {
    isShow () {
      this.show = !this.show
    }
  },
  mounted () {
  },
  components: {
  }
}
</script>
<style>
:focus {
  outline: 0;
}
</style>
<style lang="less" scoped>
.inspectionTemplate {
    height: 100%;
      background-color: #fff;
      overflow: hidden;
}
 .xf-main {
    display: flex;
    border-left: 1px solid #eee;

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
  /deep/
    .el-table
    .el-table__header-wrapper
    .el-table__header
    .has-gutter
    tr
    th {
    background-color: rgba(245, 247, 250, 1) !important;
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

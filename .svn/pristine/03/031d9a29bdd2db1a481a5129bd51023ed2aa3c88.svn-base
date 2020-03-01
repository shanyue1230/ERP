<template>
  <div class="inspectionTemplate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>质量管理</el-breadcrumb-item>
      <el-breadcrumb-item>巡查计划</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
          <el-row>
            <el-col :span="5">
              <!-- 巡查样本 -->
              <el-form-item label="搜索:" prop="name">
                <el-input type="text" placeholder="模糊查询巡查小区或单位名称" v-model="searchForm.name"></el-input>
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
              <el-form-item
                style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-top:6px; margin-left:16px"
              >
                <el-button type="primary" >确定</el-button>
                <el-button >重置</el-button>
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
          <el-table-column label="No." type="index" width="50"></el-table-column>
          <el-table-column label="巡查计划名称" prop="name"></el-table-column>
          <el-table-column label="样本类型" prop="type"></el-table-column>
          <el-table-column label="巡查范围" prop="range"></el-table-column>
          <el-table-column label="推送日期" prop="date"></el-table-column>
          <el-table-column prop="schedule" label="计划执行进度"></el-table-column>
          <el-table-column prop="operate" label="操作" width="200px">
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
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 新增抽屉 -->
        <el-drawer
          title="新增巡查计划"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
        >
         <el-form label-width="100px" :model="formLabelAdd" :rules="rules" ref="Form">
          <el-form-item label="巡查计划名称:" prop="classify" label-width="120px" style="marginTop:15px">
            <el-input v-model="formLabelAdd.input" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label prop="classify" label-width="0px">
            <div class="reservation" style="display:flex;align-items: center;">
              <span></span>
              <p>第一步：巡查样本筛选</p>
              <el-button type="primary" style="marginLeft:10px" size="small">筛选样本</el-button>
            </div>
          </el-form-item>
          <el-form-item label="样本类型" prop="resource">
            <el-radio-group v-model="formLabelAdd.resource">
              <el-radio :label="1">居住区</el-radio>
              <el-radio :label="2">单位</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="巡查范围" prop="omit">
            <el-select
              v-model="formInline.omit"
              placeholder="活动区域"
              style="marginRight:5px;width:20%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select
              v-model="formInline.city"
              placeholder="活动区域"
              style="marginRight:5px;width:20%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select
              v-model="formInline.region"
              placeholder="活动区域"
              style="marginRight:5px;width:20%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select
              v-model="formInline.street"
              placeholder="活动区域"
              style="marginRight:5px;width:20%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label prop="classify" label-width="0px">
            <div class="reservation" style="display:flex;align-items: center;">
              <span></span>
              <p>第二步：巡查周期设置</p>
              <el-button type="primary" style="marginLeft:10px" size="small">批量执行</el-button>
            </div>
          </el-form-item>
          <el-form-item label="抽样次数:" label-width="120px">
            <el-select
              v-model="formInline.street"
              placeholder="活动区域"
              style="marginRight:5px;width:20%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每次抽样:" label-width="120px">
            <span>100%</span>
          </el-form-item>
          <el-form-item label="完成日期:" prop="urban" label-width="120px">
            <el-date-picker
              v-model="formLabelAdd.date"
              type="date"
              placeholder="年/月/日"
              style="marginRight: 10px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="抽样顺序:" prop="urban" label-width="120px">
            <el-radio-group v-model="formLabelAdd.order">
              <el-radio :label="1">居住区</el-radio>
              <el-radio :label="2">单位</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label prop="classify" label-width="0px">
            <div class="reservation" style="display:flex;align-items: center;">
              <span></span>
              <p>第三步：巡查计划指派</p>
              <el-button type="primary" style="marginLeft:10px" size="small">上传巡查计划</el-button>
              <el-button
                type="primary"
                style="marginLeft:10px"
                size="small"
                @click="isPersonnel"
              >指派巡查人员</el-button>
            </div>
          </el-form-item>

          <el-table
            ref="multipleTable"
            :data="tableList"
            tooltip-effect="dark"
            style="width: 100%;overflow:auto"
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              prop="unit"
              label="小区或单位"
              sortable
              :show-overflow-tooltip="true"
              width="120"
              column-key="recover"
            ></el-table-column>
            <el-table-column prop="name" label="样本名称" sortable width="120"></el-table-column>
            <el-table-column
              prop="area"
              label="所属地区"
              sortable
              :show-overflow-tooltip="true"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="详细地址"
              sortable
              :show-overflow-tooltip="true"
              width="120"
            ></el-table-column>
            <el-table-column prop="type" label="样本类型" sortable width="120"></el-table-column>
            <el-table-column prop="person" label="巡查人员" sortable width="120"></el-table-column>
            <el-table-column prop="person" label="计划完成日期" sortable width="190">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="年/月/日"
                style="marginRight: 10px;width:100%"
              ></el-date-picker>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-sizes="[5, 10, 15, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40"
          ></el-pagination>
        </el-form>
          <div class="saveAndCancle">
            <el-button >取消</el-button>
            <el-button type="primary" @click="isAddCell">确认</el-button>
            <el-button type="success" >推送巡查计划</el-button>
          </div>
        </el-drawer>
        <!-- 指派人员的模态框 -->
        <el-dialog
          title="派发巡查人员"
          :visible.sync="dialog"
          width="30%"
          :before-close="handleClose">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-tree class="filter-tree" :data="dataPerson" default-expand-all ref="tree"></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="dialog = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      privilegeCodes: [],
      formInline: [],
      dialogVisible: false,
      editDrawer: false,
      isDeleteHistoryd: false,
      dialog: false,
      recordId: '',
      total: 0,
      currentPage: 1,
      pageSize: 20,
      options: [
        {
          id: '1',
          name: '启用'
        },
        {
          id: '2',
          name: '禁用'
        }
      ],
      optionsCasc: [],
      formLabelAdd: [],
      drawer: false,
      direction: 'rtl',
      show: false,
      unitList: [],
      checkList: [],
      searchForm: {
        name: '',
        date: '',
        area: ''
      },
      // 所属部门
      companyIdList: [],

      // 表格数据
      driverTableData: [
        {
          id: 1,
          name: '2019年10月宝山区巡查计划',
          type: '居住区',
          range: '上海市宝山区',
          date: '2019-09-09',
          schedule: '26.5%'
        }
      ],
      dataPerson: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    };
  },
  created () {
  },
  methods: {
    showDrawer () {
      this.drawer = true
    },
    // 打开指派人员的模态框
    isPersonnel () {
      this.dialog = true
    }
  },
  mounted () {},
  components: {}
};
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
  width: 100% !important;
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
    padding: 15px;
  }
  drawer-right {
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
/deep/ .el-table .el-table__header-wrapper .el-table__header .has-gutter tr th {
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
  .reservation {
    line-height: 30px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 50px;
    position: relative;
    // margin-top: 30px;
    // margin-bottom: 30px;
    span {
      position: absolute;
      top: 3px;
      left: 8px;
      display: block;
      width: 6px;
      height: 30px;
      background-color: #000;
      margin-top: 5px;
    }
  }
  /deep/ .el-drawer__body{
    .el-form {
      padding-right: 16px;
      height: 80vh;
      overflow-y: scroll;
      overflow-x: hidden;
      .el-form-item {
        margin-bottom: 20px;
      }
    }
  }

</style>

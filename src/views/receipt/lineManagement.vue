<template>
  <div class="constructionWaste">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>线路管理</el-breadcrumb-item>
      <el-breadcrumb-item>线路设置</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="xf-main">
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
          <el-row>
            <el-col :span="5">
              <!-- 所属单位 -->
              <el-form-item label="搜索:" prop="companyId">
                <el-autocomplete
                    v-model="searchForm.lineName"
                    :fetch-suggestions="querySearch"
                    placeholder="模糊查询线路名称"
                    @select="handleSelect"
                  ></el-autocomplete>
              </el-form-item>
            </el-col>
              <el-col :span="5">
              <!-- 所属街道 -->
              <el-form-item label="状态:" prop="status">
                <el-select v-model="searchForm.status" placeholder="全部">
                  <el-option
                    label="启用"
                    value="0">
                  </el-option>
                  <el-option
                    label="禁用"
                    value="1">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <!-- 操作 -->
              <el-form-item style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px">
                <el-button type="primary" @click="searchPropertyList">确定</el-button>
                <el-button @click="resetSearchForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 新增 + 导出 -->
        <div style="margin-top:20px;">
          <el-button type="primary" @click="showDrawer">新增</el-button>
        </div>

        <!-- 表格 -->
        <!-- height="" height="55vh" -->
        <el-table
            ref="multipleTable"
            :data="lineTableData"
            tooltip-effect="dark"
            >
            <el-table-column
              type="selection"
              width="55"
              >
            </el-table-column>
            <el-table-column
              label="线路名称"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              prop="regionLocaleName"
              label="收运类型"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态"
              >
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
          <el-form :model="createLine" class="view-el-form" style="padding-bottom: 100px; padding-top: 20px;" :rules="createRules">
            <!-- 账号信息 -->
            <drawer-left>
              <div class="line-title">线路设置</div>
              <el-form-item label="线路名称:" prop="lineName">
                <el-input v-model="createLine.lineName" placeholder="请输入线路名称"></el-input>
              </el-form-item>
              <el-form-item label="线路状态:" prop="status">
                <el-select v-model="createLine.status" placeholder="全部">
                  <el-option
                    label="启用"
                    value="0">
                  </el-option>
                  <el-option
                    label="禁用"
                    value="1">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收运类型:" prop="type">
                <el-select v-model="createLine.type" placeholder="请选择收运类型">
                  <el-option
                     v-for="(item,index) in receiptType"
                     :key="index"
                    :label="启用"
                    :value="0">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作业人员:" prop="person">
                <el-input v-model="createLine.person" style="width: 70%"></el-input>
                <el-button type="primary" style="margin-left: 15px;" @click="showChosePeople">选择人员</el-button>
              </el-form-item>
            </drawer-left>
            <drawer-right>
              <el-button type="primary" @click="showChosePoint">选择作业点位</el-button>
              <el-table
                :data="pointTableData"
                style="width: 100%">
                <el-table-column
                  prop="pointName"
                  label="点位名称"
                  >
                </el-table-column>
                <el-table-column
                  prop="pointAddress"
                  label="点位地址"
                  >
                </el-table-column>
                <el-table-column
                  prop="region"
                  label="所属地区">
                </el-table-column>
                <el-table-column
                prop="community"
                label="所属小区或单位">
              </el-table-column>
              <el-table-column
                prop="communityAddress"
                label="所属小区或单位">
              </el-table-column>
              </el-table>
            </drawer-right>
          </el-form>
           <div class="saveAndCancle">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="addPropertyDone">确认</el-button>
           </div>
      </el-drawer>

      <!-- 选择人员弹框 -->
      <el-dialog
        title="选择人员"
        :visible.sync="chosePeopleDialogVisible"
        width="40%"
        :before-close="chosePeopleHandleClose">
        <!-- 人员模糊查询 -->
        <el-form :model="searchPeopleData">
          <el-form-item label="模糊搜索:">
            <el-autocomplete
                    v-model="searchPeopleData.people"
                    :fetch-suggestions="querySearch"
                    placeholder="模糊查询线路名称"
                    @select="handleSelect"
                  ></el-autocomplete>
            <el-button type="primary" style="margin-left: 20px;">确定</el-button>
          </el-form-item>
        </el-form>
        <!-- 人员表格 -->
        <el-table
          :data="peopleTableData"
          style="width: 100%; margin-top: 20px;">
          <el-table-column
          type="selection"
          width="55">
        </el-table-column>
          <el-table-column
            prop="componey"
            label="公司"
            width="180">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            width="180">
          </el-table-column>
          <el-table-column
            prop="people"
            label="人员">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="chosePeopleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="chosePeopleDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 选择点位弹框 -->
      <el-dialog
        title="选择点位"
        :inline="true"
        :visible.sync="pointDialogVisible"
        width="60%"
        :before-close="chosePeopleHandleClose">
        <el-form :model="chosePointData" >
          <el-row>
            <el-col :span="6" >
              <el-form-item label="省市区:">
                <el-cascader
                v-model="chosePointData.region"
                :options="regionList"
                :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="所属街道:">
                <el-cascader
                v-model="chosePointData.street"
                :options="streetList"
                :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="模糊搜索:">
                <el-autocomplete
                        v-model="chosePointData.address"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入名称、地址"
                        @select="handleSelect"
                      ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="6" >
              <el-form-item label="">
                <div style="margin-top: 45px">
                  <el-button type="primary">确定</el-button>
                  <el-button>重置</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 点位表格 -->
        <el-table
          :data="chosepointTableData"
          style="width: 100%; margin-top: 20px;">
          <el-table-column
          type="selection"
          width="55">
        </el-table-column>
          <el-table-column
            prop="name"
            label="点位名称"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="点位地址"
            >
          </el-table-column>
          <el-table-column
            prop="unit"
            label="所属小区或单位">
          </el-table-column>
          <el-table-column
            prop="unitAddress"
            label="小区或单位地址">
          </el-table-column>
          <el-table-column
            prop="region"
            label="所属地区">
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 16px;"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2">
        </el-pagination>

        <span slot="footer" class="dialog-footer">
          <el-button @click="pointDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="pointDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      </div>
    </div>

  </div>
</template>

<script>
import { } from '../../api/getData.js'
export default {
  data () {
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
      chosePeopleDialogVisible: false,
      pointDialogVisible: false,
      lineRestaurants: [],
      regionList: [],
      streetList: [],
      expending: '展开',
      time: 0,
      recordId: '',
      total: 0,
      total2: 0,
      currentPage: 1,
      pageSize: 20,
      currentPage2: 1,
      pageSize2: 20,
      createLine: {

      },
      // 收运类型
      receiptType: [],
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
      restaurants: [],
      searchForm: {
        lineName: '',
        status: ''
      },
      // 所属部门
      regionIdList: [],
      // 人员模糊查询
      searchPeopleData: {
        people: ''
      },
      // 人员表格
      peopleTableData: {
        componey: '',
        department: '',
        people: ''
      },
      // 点位表格
      chosePointData: {

      },
      // 选择点位表格
      chosepointTableData: {
        name: '',
        address: '',
        unit: '',
        unitAddress: '',
        region: ''
      },
      // 表格数据
      lineTableData: [],
      // 导出表格
      exportTableData: [],
      pointTableData: {
        pointName: '',
        pointAddress: '',
        region: '',
        community: '',
        communityAddress: ''
      },
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      // 新建物业
      createProperty: {
        regionLocaleIds: '',
        code: '',
        name: '',
        address: ''
      },
      currentRegionLocaleIds: '',
      state2: '',
      createRules: {
        lineName: [
          { required: true, message: '请输入线路名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择收运类型', trigger: 'blur' }
        ],
        person: [
          { required: true, message: '请选择作业人员', trigger: 'blur' }
        ]
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
      this.title = '新建线路'
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.drawer = false
          this.$refs.createProperty.resetFields()
          done();
        })
        .catch(_ => {});
    },
    chosePeopleHandleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
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
    handleSizeChange2 (val) {
      this.pageSize = val
      this.getDriverTableList()
    },
    handleCurrentChange2 (val) {
      this.currentPage = val
      this.getDriverTableList()
    },

    // 显示选择人员对话框
    showChosePeople () {
      this.chosePeopleDialogVisible = true
    },

    // 显示选择点位对话框
    showChosePoint () {
      this.pointDialogVisible = true
    },

    // 被选中的单位名称
    async selectUnit (date) {
      // console.log(this.unitList)
      this.checkList = date
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

    // 有效期事件
    changeExpirationDate (value) {
      if (this.searchForm.expirationDate) {
      } else {
        this.searchForm.expirationDate = []
        console.log(this.searchForm.expirationDate);
      }
    },

    // 筛选线路列表
    searchPropertyList () {

    },

    // 重置查询表单
    resetSearchForm () {
      this.$refs.searchForm.resetFields()
    },

    // 获取物业列表
    getPropertyList () {
    },
    async fn () {
      this.getPropertyList()
    },

    // 模糊查询线路名称
    querySearch (queryString, cb) {
      let restaurants = this.peopleRestaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll () {
      return this.lineRestaurants
    },
    handleSelect (item) {
      console.log(item);
    },

    // 新增物业 + 编辑物业
    addPropertyDone () {
      this.$refs.createProperty.validate(valid => {
      })
    }
  },
  mounted () {
    this.restaurants = this.loadAll();
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.constructionWaste {
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
    padding: 0 30px 50px 30px;
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
      .line-title {
        width: 100%;
        height: 48px;
        line-height: 48px;
        font-weight: 530;
        background-color: rgba(245,247,250,1);
        padding-left: 16px;
        /* margin-bottom: 20px; */
      }
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

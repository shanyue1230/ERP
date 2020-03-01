<template>
  <div class="constructionWaste">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>物业管理</el-breadcrumb-item>
      <el-breadcrumb-item>物业管理</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="xf-main">
      <div class="xf-right">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
          <el-row>
            <el-col :span="5">
              <!-- 所属单位 -->
              <el-form-item label="所属单位:" prop="companyId">
                  <el-select v-model="searchForm.companyId" placeholder="请选择">
                    <el-option
                      v-for="item in companyIdList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="5">
              <!-- 所属街道 -->
              <el-form-item label="物业名称:" prop="name">
                  <el-input type="text" placeholder="请输入物业名称" v-model="searchForm.name"></el-input>
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
            :data="propertyTableData"
            tooltip-effect="dark"
            >
            <el-table-column
              type="index"
              label="No."
              prop="no"
              >
            </el-table-column>
            <el-table-column
              label="物业名称"
              prop="name"
              >
            </el-table-column>
            <el-table-column
              prop="regionLocaleName"
              label="省市区"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="物业单位地址"
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
          :title="title"
          :append-to-body="true"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <el-form class="create-el-form" :model="createProperty" :rules="rules" ref="createProperty">
          <el-form-item label="所属区:" prop="regionLocaleIds">
                <el-cascader
                      v-model="createProperty.regionLocaleIds"
                      :options="regionIdList"
                      :show-all-levels="false"
                      :props="{ expandTrigger: 'hover', label: 'name', value: 'id', children: 'regionLocales', checkStrictly: 'true'}"
                      ></el-cascader>
          </el-form-item>
          <el-form-item label="物业编号:" prop="code">
             <el-input type="text" placeholder="请输入物业编号" v-model="createProperty.code"></el-input>
          </el-form-item>
          <el-form-item label="物业名称:" prop="name">
              <el-input type="text" placeholder="请输入物业名称" v-model="createProperty.name"></el-input>
          </el-form-item>
          <el-form-item label="物业地址:" prop="address">
              <el-input type="text" placeholder="请输入物业地址" v-model="createProperty.address"></el-input>
          </el-form-item>
          </el-form>
           <div class="saveAndCancle">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="addPropertyDone">确认</el-button>
           </div>
      </el-drawer>

      </div>
    </div>

  </div>
</template>

<script>
import { propertyPagingList, getRegionLocale, propertyAdd, propertyView, propertyEdit, propertyDelete, childCompanyList, driverView, dataDictItem } from '../../api/getData.js'
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
      companyIdList: [],
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
        companyId: '',
        name: ''
      },
      // 所属部门
      regionIdList: [],

      // 表格数据
      propertyTableData: [],
      // 导出表格
      exportTableData: [],
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
      rules: {
        regionLocaleIds: [
          { required: true, message: '请选择所属区', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入物业编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入物业名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入物业地址', trigger: 'blur' }
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
      this.title = '新建物业'
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

    // 筛选物业列表
    searchPropertyList () {
      const data = {
        companyId: JSON.parse(localStorage.getItem('login')).companyId,
        name: this.searchForm.name,
        page: this.currentPage,
        limit: this.pageSize
      }
      if (this.searchForm.companyId !== '') {
        data.companyId = this.searchForm.companyId
      }
      propertyPagingList(data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.propertyTableData = res.data.data.records
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

    // 获取物业列表
    getPropertyList () {
      const data = {
        companyId: JSON.parse(localStorage.getItem('login')).companyId,
        name: '',
        page: this.currentPage,
        limit: this.pageSize
      }
      propertyPagingList(data).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.propertyTableData = res.data.data.records
          this.total = res.data.data.total
        }
      })
    },
    async fn () {
      this.getPropertyList()
      // 所属区列表
      const data1 = {
        isTree: true,
        parentId: 0,
        levelSection: 2
      }
      const res1 = await getRegionLocale(data1)
      console.log(res1);
      this.regionIdList = res1.data.data

      // 获取新增框内所属单位
      const data3 = {
        id: JSON.parse(localStorage.getItem('login')).companyId
      }
      const res3 = await childCompanyList(data3)
      this.companyIdList = res3.data.data
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
      this.drawer = true
      this.driverID = id
      propertyView(id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.createProperty = res.data.data
          this.currentRegionLocaleIds = this.createProperty.regionLocaleIds
          this.createProperty.regionLocaleIds = +this.createProperty.regionLocaleIds.split(',')[1]
          console.log(this.currentRegionLocaleIds);
        }
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
    },
    async handleSelect2 (item) {

    },

    // 新增物业 + 编辑物业
    addPropertyDone () {
      this.$refs.createProperty.validate(valid => {
        if (valid) {
          // 新增物业
          if (this.driverID === '') {
            console.log(this.driverID);
            console.log(this.createProperty);
            this.createProperty.regionLocaleIds = this.createProperty.regionLocaleIds.join(',') + ','
            this.createProperty.companyId = JSON.parse(localStorage.getItem('login')).companyId
            const data = this.createProperty
            propertyAdd(data).then(res => {
              if (res.data.code === 200) {
                this.$message.success('创建成功')
                this.$refs.createProperty.resetFields()
                this.drawer = false
                this.getPropertyList()
              }
            })
          } else {
          // 编辑物业
            if (this.createProperty.regionLocaleIds instanceof Array) {
              this.createProperty.regionLocaleIds = this.createProperty.regionLocaleIds.join(',') + ','
            } else {
              this.createProperty.regionLocaleIds = this.currentRegionLocaleIds
            }
            this.createProperty.companyId = JSON.parse(localStorage.getItem('login')).companyId
            const editData = this.createProperty
            propertyEdit(editData).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success('编辑成功')
                this.drawer = false
                this.getPropertyList()
              }
            })
          }
        }
      })
    },

    // 显示删除驾驶员框
    showDeleteDrawer (id) {
      propertyDelete(id).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getPropertyList()
        }
      })
    }

  },
  mounted () {
    this.restaurants = this.loadAll();
    this.restaurants2 = this.loadAll2()
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

<template>
  <div class="employee">
     <el-breadcrumb separator="/">
      <el-breadcrumb-item>垃圾收集点</el-breadcrumb-item>
      <el-breadcrumb-item>生活垃圾</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <div class="xf-left">
         <belongUnit :unitList="unitList" @handleChange="selectUnit"></belongUnit>
      </div>
      <div class="xf-right">
       <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-row>
            <el-col :span="5">
              <el-form-item label="收集点名称:">
                 <el-input v-model="searchForm.name" placeholder="请输入收集点名称">
                 </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属单位:">
                <el-select v-model="searchForm.companyId" placeholder="请选择所属单位"  >
                  <el-option
                    v-for="item in optionsCompany"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="所属街道:">
                 <el-cascader
                  placeholder="请选择所属街道"
                  style="width:100%"
                  v-model="searchForm.regionLocaleIds"
                  :options="optionsRegionSearch"
                  :props="{ checkStrictly: true,expandTrigger: 'hover',value:'parentIds',label:'name',children:'regionLocales' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col style="width: 250px;">
              <el-form-item style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px">
                <el-button type="primary"  @click="isSearch">确定</el-button>
                <el-button @click="searchCancle">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
              label="所属单位"
              prop="companyName"
              >
            </el-table-column>
            <el-table-column
              prop="regionLocaleName"
              label="所属街道"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="收集点名称"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              >
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
         <el-form-item label="所属单位：" prop="companyId">
          <el-select v-model="createEmployee.companyId" placeholder="全部"  >
            <el-option
              v-for="item in optionsCom"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属街道：" prop="regionLocaleIds">
          <el-cascader
              style="width:100%"
              placeholder="请选择所属街道"
              v-model="createEmployee.regionLocaleIds"
              :options="optionsRegion"
              @change="changeCascader"
              :props="{ checkStrictly: true,expandTrigger: 'hover',value:'parentIds',label:'name',children:'regionLocales' }"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="收集点名称：" prop="name">
          <el-input v-model.trim="createEmployee.name" placeholder="请输入收集点名称"></el-input>
        </el-form-item>
         <el-form-item label="地址：" prop="address">
          <el-input v-model.trim="createEmployee.address" placeholder="请输入地址"></el-input>
        </el-form-item>
         <el-form-item label="性质：" prop="nature">
           <el-select width="200px" v-model="createEmployee.nature" placeholder="请选择性质">
            <el-option
              v-for="item in natureOption"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
            </el-select>
        </el-form-item>
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
                  <el-form-item label="所属街道:">{{viewList.regionLocaleName}}</el-form-item>
                  <el-form-item label="收集点名称:">{{viewList.name}}</el-form-item>
                  <el-form-item label="地址:">{{viewList.address}}</el-form-item>
                  <el-form-item label="性质:">{{viewList.natureDesc}}</el-form-item>
            </div>
                <div class="drawer-right">
                  <div class="all">
                    <span>所有动态</span>
                    <el-select
                      v-model="valueDate"
                      placeholder="请选择"
                      style="width:96px;height:32px !important;"
                      @change="changeTime"
                      @visible-change="isChange"
                    >
                      <el-option
                        v-for="item in dateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <!-- <i v-if="!selst" class="el-icon-caret-bottom arrow"></i>
                    <i v-if="selst" class="el-icon-caret-top arrow"></i> -->
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
                <!-- <div class="view-footer" style="position: fixed; bottom: 15px; right: 50px;">
                  <el-button style="margin: 15px 32px 0 15px;float: right;" @click="viewDrawer = false">取消</el-button>
                  <el-button type="primary" style="margin: 15px 15px 0 15px;float: right;">确认</el-button>
                </div> -->
              </el-form>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import belongUnit from '../../components/belong-unit'
import { liveRefusePagingList, getRegionLocale, liveNameCheck, CompanyList, getEditLog, constructionRefuseExport, getDataFilter, dictItem, refuseView, liveIsDelete, refuseAdd, refuseliveEdit } from '../../api/getData';

export default {
  data () {
    return {
      value: '',
      rowId: '',
      drawer: false,
      viewDrawer: false,
      valueDate: 0,
      natureOption: [],
      imageUrl: '',
      direction: 'rtl',
      show: false,
      comdata: [],
      optionsRegion: [],
      optionsRegionSearch: [],
      arr: [],
      companyIds: [],
      viewList: {
        regionLocaleName: '',
        name: '',
        address: '',
        natureDesc: ''
      },
      dataLogLength: true,
      searchForm: {
        name: '',
        companyId: '',
        regionLocaleIds: ''
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
      delId: '',
      title: '',
      vehicleTypeOption: [],
      pageSize: 20,
      pageNum: 1,
      total: 0,
      optionsCom: [],
      optionsCompany: [],
      unitList: [],
      detailId: '',
      excelData: [],
      // 新建表单
      createEmployee: {
        companyId: '',
        regionLocaleIds: '',
        name: '',
        address: '',
        nature: ''
      },
      rules: {
        companyId: [{ required: true, message: '请选择所属单位', trigger: 'blur' }],
        regionLocaleIds: [{ required: true, message: '请选择所属街道', trigger: 'blur' }],
        name: [
          { required: true, message: '请填写收集点名称', trigger: 'blur' },
          { validator: this.liveNameCheckName, trigger: ['change', 'blur'] }
        ],
        address: [{ required: true, message: '请填写地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changeCascader () {
      console.log(this.createEmployee.regionLocaleIds)
    },
    searchCancle () {
      this.searchForm.name = ''
      this.searchForm.companyId = ''
      this.searchForm.regionLocaleIds = ''
    },
    exportList () {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          'dataFilters': this.comdata,
          'name': this.searchForm.name,
          'companyId': this.searchForm.companyId,
          'regionLocaleIds': this.searchForm.regionLocaleIds[this.searchForm.regionLocaleIds.length - 1],
          'page': this.pageNum,
          'limit': this.pageSize
        }
        constructionRefuseExport(data).then(res => {
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
        const tHeader = ['所属单位', '所属街道', '收集点名称', '地址']
        const filterVal = ['companyName', 'regionLocaleName', 'name', 'address']
        const list = this.excelData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '建筑垃圾列表',
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
    liveNameCheckName (rule, value, callback) {
      if (this.title === '新增生活垃圾') {
        let data = {
          id: '',
          companyId: this.createEmployee.companyId,
          name: value
        }
        liveNameCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('该公司下收集点名称已存在'))
          }
          callback()
        })
      } else if (this.title === '编辑生活垃圾') {
        let data = {
          id: this.rowId,
          companyId: this.createEmployee.companyId,
          name: value
        }
        liveNameCheck(data).then(res => {
          if (res.data.code === 400) {
            return callback(new Error('该公司下收集点名称已存在'))
          }
          callback()
        })
      }
    },
    showEditDialog (row) {
      console.log(row)
      this.drawer = true
      this.title = '编辑生活垃圾'
      this.rowId = row.id
      let data = {
        'id': row.id
      }

      let regionLocaleIdsStr = row.regionLocaleIds
      let arr = regionLocaleIdsStr.split(',')
      var m = [];
      for (var i = 0; i < arr.length - 1; i++) {
        m.push(arr[i]);
      }
      console.log(m)
      let regionArr = [];
      if (m.length === 1) {
        regionArr[0] = m[0] + ','
      }
      if (m.length === 2) {
        regionArr[0] = m[0] + ','
        regionArr[1] = row.regionLocaleIds
      }
      if (m.length === 3) {
        regionArr[0] = m[0] + ',' + m[1] + ','
        regionArr[1] = row.regionLocaleIds
      }
      this.createEmployee.regionLocaleIds = regionArr
      refuseView(data).then(res => {
        if (res.data.code === 200) {
          this.createEmployee.companyId = res.data.data.companyId
          this.createEmployee.name = res.data.data.name
          this.createEmployee.address = res.data.data.address
          this.createEmployee.nature = res.data.data.nature
          this.createEmployee.regionLocaleIds = regionArr
        }
      })
    },
    showDelete () {

    },
    showDetailDialog () {

    },
    showDrawer () {
      this.drawer = true
      this.title = '新增生活垃圾'
      this.createEmployee.regionLocaleIds = ''
      this.createEmployee.name = ''
      this.createEmployee.address = ''
      this.createEmployee.nature = ''
      // 重置表单
      if (this.$refs['Form'] !== undefined) {
        this.$refs.Form.resetFields()
      }
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
      liveIsDelete(data).then(res => {
        console.log(res);
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
          if (this.title === '新增生活垃圾') {
            let data = {
              companyId: this.createEmployee.companyId,
              regionLocaleIds: this.createEmployee.regionLocaleIds[this.createEmployee.regionLocaleIds.length - 1],
              name: this.createEmployee.name,
              address: this.createEmployee.address,
              nature: this.createEmployee.nature
            }
            refuseAdd(data).then(res => {
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
          } else if (this.title === '编辑生活垃圾') {
            this.createEmployee.id = this.rowId
            let data = {
              id: this.rowId,
              companyId: this.createEmployee.companyId,
              regionLocaleIds: this.createEmployee.regionLocaleIds[this.createEmployee.regionLocaleIds.length - 1],
              name: this.createEmployee.name,
              address: this.createEmployee.address,
              nature: this.createEmployee.nature
            }
            console.log(data)
            refuseliveEdit(data).then(res => {
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
      refuseView(
        {
          'id': row.id
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.viewList.regionLocaleName = res.data.data.regionLocaleName
          this.viewList.name = res.data.data.name
          this.viewList.address = res.data.data.address
          this.viewList.natureDesc = res.data.data.natureDesc
        }
      })
    },
    // 查询表单
    isSearch () {
      liveRefusePagingList({
        'dataFilters': this.comdata,
        'name': this.searchForm.name,
        'companyId': this.searchForm.companyId,
        'regionLocaleIds': this.searchForm.regionLocaleIds[this.searchForm.regionLocaleIds.length - 1],
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
      liveRefusePagingList({
        'dataFilters': date,
        'page': this.pageNum,
        'limit': this.pageSize,
        'name': this.searchForm.name,
        'companyId': this.searchForm.companyId,
        'regionLocaleIds': this.searchForm.regionLocaleIds[this.searchForm.regionLocaleIds.length - 1]
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.records;
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
        }
      });
    },
    isChange () {},
    changeTime () {
      let data = {
        tableName: 'liveRefuse',
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
      this.searchForm.companyId = data.companyId
      CompanyList({
        id: data.companyId
      }).then(res => {
        if (res.data.code === 200) {
          this.optionsCom = res.data.data;
          this.optionsCompany = res.data.data
        }
      });
    },
    getRegionLocale () {
      getRegionLocale({ parentId: '0', isTree: true }).then(res => {
        this.optionsRegion = res.data.data[0].regionLocales;
        this.optionsRegionSearch = res.data.data[0].regionLocales;
      })
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
      liveRefusePagingList(data).then(res => {
        this.tableData = res.data.data.records
        this.total = res.data.data.total
      })
    },
    dictItemFun () {
      dictItem({ 'code': 'liveRefuseNature', showSelectOption: false }).then(res => {
        this.natureOption = res.data.data
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
    this.getRegionLocale()
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
    margin-bottom:15px;
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

<template>
  <div class="position">
    <!-- 面包屑导航 -->
    <Breadcrumb :levelList="levelList"></Breadcrumb>
    <!-- 主体部分 -->
    <div class="main">
      <div class="Inquire">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-row>
            <el-col :span="4" style="padding:0">
              <el-form-item label="所属单位：" >
                <el-select v-model="form.unit" placeholder="全部" @change ="isChangeHigher">
                  <el-option
                    v-for="item in options1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="padding:0">
              <el-form-item label="所属部门：" style="margin-left:16px">
                <el-select v-model="form.department" placeholder="全部">
                  <el-option
                    v-for="item in options2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="padding:0">
              <el-form-item label="状态：" style="margin-left:16px">
                <el-select v-model="form.status" placeholder="全部">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="padding:0">
              <el-form-item label="岗位名称：" style="margin-left:16px">
                <el-input v-model="form.name" placeholder="请输入岗位名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="padding:0;width:250px">
              <el-form-item
                style="padding-top:40px;box-sizing: border-box; width:auto; margin-left:16px"
              >
                <el-button type="primary" @click="isInquire">确定</el-button>
                <el-button @click="isReset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-button type="primary" @click="IsNewDrawer">新增</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;margin-top:16px">
        <el-table-column prop="name" label="岗位名称" ></el-table-column>
        <el-table-column prop="deptName" label="所属部门" ></el-table-column>
        <el-table-column prop="totalNumber" label="人数"></el-table-column>
        <el-table-column prop="dictItemName" label="岗位类型"></el-table-column>
        <el-table-column prop="isDisabled" label="状态">
           <template slot-scope="{row}">
            <span v-if="row.status === 0" style="color:green">正常</span>
            <span v-if="row.status === 1" style="color:red">停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="{row}">
               <span class="span" @click="isEdit(row)">编辑</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span class="span" @click="isDetails(row)">查看详情</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span  class="span">停用</span>&nbsp;&nbsp;<span style="color:#ccc">|</span>&nbsp;&nbsp;<span  class="span" @click="isRemove(row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
              <!-- 分页器 -->
        <el-pagination
          :page-sizes="[20, 50,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
            @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
          style="margin-top:15px"
        ></el-pagination>
    </div>
          <!-- 新增的抽屉框 -->
           <el-drawer
            title="新建岗位"
            :visible.sync="newDrawer"
            :before-close="handleClose"
            @close="isClose('ruleForm')">
            <el-form   :model="drawerForm"  :rules="rules" ref="ruleForm">
                      <el-form-item label="所属单位：" prop="unit">
                                        <el-select v-model="drawerForm.unit" placeholder="全部" @change ="isChangeHigher">
                                                <el-option
                                                  v-for="item in options4"
                                                  :key="item.id"
                                                  :label="item.name"
                                                  :value="item.id"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                      <el-form-item label="所属部门：" prop="higher">
                                       <el-select v-model="drawerForm.higher" placeholder="全部" >
                                                <el-option
                                                  v-for="item in options5"
                                                  :key="item.id"
                                                  :label="item.name"
                                                  :value="item.id"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                      <el-form-item label="岗位类型：" prop="type">
                                        <el-select v-model="drawerForm.type" placeholder="全部">
                                                <el-option
                                                  v-for="item in options6"
                                                  :key="item.value"
                                                  :label="item.name"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                      <el-form-item label="岗位名称：" prop="name">
                           <el-input v-model="drawerForm.name" placeholder="请输入部门名称" @blur="isCheck(drawerForm.unit,drawerForm.name)"></el-input>
                      </el-form-item>
            </el-form>
                <div class="demo-drawer__footer" style="text-align: right">
                      <el-button @click="newDrawer=false">取 消</el-button>
                       <el-button type="primary" @click="isNewPosition">确 定</el-button>
                </div>
          </el-drawer>
          <!-- 编辑的抽屉框 -->
          <el-drawer
            title="编辑岗位"
            :visible.sync="editDrawer"
            :direction="direction"
            :before-close="handleClose">
            <el-form   :model="drawerFormEdit"  :rules="rules">
                      <el-form-item label="所属单位：" prop="unit">
                                        <el-select v-model="drawerFormEdit.unit" placeholder="全部"  @change ="isChangeHigher">
                                                <el-option
                                                  v-for="item in options7"
                                                  :key="item.id"
                                                  :label="item.name"
                                                  :value="item.id"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                      <el-form-item label="所属部门：" prop="higher">
                                       <el-select v-model="drawerFormEdit.higher" placeholder="全部">
                                                <el-option
                                                  v-for="item in options8"
                                                  :key="item.id"
                                                  :label="item.name"
                                                  :value="item.id"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                      <el-form-item label="部门类型：" prop="type">
                                        <el-select v-model="drawerFormEdit.type" placeholder="全部">
                                                <el-option
                                                  v-for="item in options9"
                                                  :key="item.value"
                                                  :label="item.name"
                                                  :value="item.value"
                                                ></el-option>
                                        </el-select>
                      </el-form-item>
                      <el-form-item label="岗位名称：" prop="name">
                           <el-input v-model="drawerFormEdit.name" placeholder="请输入部门名称"  @blur="isCheck(drawerFormEdit.unit,drawerFormEdit.name)"></el-input>
                      </el-form-item>
            </el-form>
                <div class="demo-drawer__footer" style="text-align: right">
                      <el-button @click="editDrawer=false">取 消</el-button>
                       <el-button type="primary" @click="isEditPosition">确 定</el-button>
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
                                      <el-form-item  label="岗位名称">{{viewList.name}}</el-form-item>
                                      <el-form-item  label="所属单位">{{viewList.companyName}}</el-form-item>
                                      <el-form-item  label="所属部门">{{viewList.deptName}}</el-form-item>
                                      <el-form-item  label="部门类型">{{viewList.dictItemName}}</el-form-item>
                                      <el-form-item  label="部门人数">{{viewList.totalNumber}}</el-form-item>
                                    </el-form>
                                  </div>
                               </el-col>
                               <el-col :span="12" style="height:100%">
                                 <div class="dynamic">
                                   <div class="all">
                                      <span>所有动态</span>
                                       <el-select v-model="time" placeholder="请选择" style="width:96px;height:32px !important;" @change="changeTime" @visible-change="isChange"
                                       >
                                                <el-option
                                                  v-for="item in options10"
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
                <div class="demo-drawer__footer" style="text-align: right">
                      <el-button @click="viewDrawer=false">取 消</el-button>
                       <el-button type="primary">确 定</el-button>
                </div>
          </el-drawer>
  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb';
import { positionList, positionAdd, CompanyList, departmentList, dictItemData, positionDelete, positionView, dataDictItem, positionEdit, positionCheck } from '../../api/getData';
export default {
  data () {
    return {
      pageSize: 20,
      pageNum: 1,
      total: 0,
      newDrawer: false,
      editDrawer: false,
      viewDrawer: false,
      direction: 'rtl',
      viewList: '',
      selst: false,
      rowId: '',
      id: 0,
      time: 0,
      levelList: [{ title: '组织架构管理' }, { title: '岗位管理' }],
      form: {
        unit: '',
        department: '',
        status: '',
        name: ''
      },
      tableData: [],
      options1: [],
      options2: [],
      options3: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '停用'
        }
      ],
      options4: [],
      options5: [],
      options6: [],
      options7: [],
      options8: [],
      options9: [],
      options10: [
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
      drawerForm: {
        unit: '',
        higher: '',
        type: '',
        name: ''
      },
      drawerFormEdit: {
        unit: '',
        higher: '',
        type: '',
        name: ''
      },
      rules: {
        unit: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        higher: [
          { required: true, message: '请选择所属部门', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择岗位类型', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
          { min: 3, message: '请输入至少3位字符', trigger: 'blur' }
        ]
      },
      infoList: []
    };
  },
  components: {
    Breadcrumb
  },
  created () {
    this.ispositionList()
    this.isCreatedUnit()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 打开编辑的抽屉框
    isEdit (row) {
      this.editDrawer = true
      console.log(row);
      this.rowId = row.id
      this.id = row.id
      this.drawerFormEdit.unit = row.companyId
      this.drawerFormEdit.higher = row.deptId
      this.drawerFormEdit.type = row.dictItemValue
      this.drawerFormEdit.name = row.name
      let data = JSON.parse(localStorage.getItem('login'))
      CompanyList(
        {
          'id': data.companyId
        }
      ).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          console.log(res);
          this.options7 = res.data.data
          this.isChangeHigher(data.companyId)
        }
      })
      dictItemData(
        [
          'deptType'
        ]
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.options9 = res.data.data.deptType
        }
      })
    },
    // 查看详情的抽屉框
    isDetails (row) {
      this.viewDrawer = true
      this.rowId = row.id
      positionView(
        {
          'id': row.id
        }
      ).then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.viewList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
      this.isDataDictItem(row.id)
    },
    isChange (val) {
      this.selst = !this.selst
    },
    // 岗位管理的列表
    ispositionList () {
      let data = JSON.parse(localStorage.getItem('login'))
      return positionList({
        'companyId': data.companyId,
        'page': this.pageNum,
        'limit': this.pageSize,
        'deptId': this.form.department,
        'isDisabled': this.form.status,
        'name': this.form.name
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
          console.log(res);
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.ispositionList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val
      this.ispositionList()
    },
    // 打开新增的抽屉
    IsNewDrawer () {
      this.newDrawer = true
      let data = JSON.parse(localStorage.getItem('login'))
      CompanyList(
        {
          'id': data.companyId
        }
      ).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          console.log(res);
          this.options4 = res.data.data
          this.drawerForm.unit = data.companyId
          this.isChangeHigher(data.companyId)
        }
      })
      dictItemData(
        [
          'deptType'
        ]
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.options6 = res.data.data.deptType
          this.drawerForm.unit = data.companyId
        }
      })
    },
    // 新增岗位的功能
    isNewPosition () {
      return positionAdd(
        {
          'name': this.drawerForm.name,
          'companyId': this.drawerForm.unit,
          'deptId': this.drawerForm.higher,
          'dictItemValue': this.drawerForm.type
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.$message.success('添加成功')
          this.newDrawer = false
          this.ispositionList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 获取新增的部门列表
    isChangeHigher (val) {
      // console.log(val);
      return departmentList(
        {
          'companyId': val,
          'isDisabled': 0,
          'isTree': false
        }
      ).then(res => {
        if (res.data.code === 200) {
          console.log(res);
          this.options5 = res.data.data
          this.options8 = res.data.data
          this.options2 = res.data.data
        }
      })
    },
    // 关闭抽屉 重置表单
    isClose (form) {
      this.$refs[form].resetFields();
    },
    // 删除岗位
    isRemove (row) {
      console.log(row);
      this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return positionDelete({
          'id': row.id
        }).then(res => {
          if (res.data.code === 200) {
            console.log(res);
            this.$message.success('删除成功！')
            this.ispositionList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 编辑记录接口
    isDataDictItem (id) {
      return dataDictItem(
        {
          'tableName': 'position',
          'recordId': id,
          'timeInterval': this.time
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.infoList = res.data.data
        }
      })
    },
    // 修改岗位的接口
    isEditPosition () {
      return positionEdit(
        {
          'id': this.rowId,
          'name': this.drawerFormEdit.name,
          'companyId': this.drawerFormEdit.unit,
          'deptId': this.drawerFormEdit.higher,
          'dictItemValue': this.drawerFormEdit.type
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success('修改成功!')
          this.ispositionList()
          this.editDrawer = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 数据验证
    isCheck (rid, name) {
      console.log(this.drawerForm.name);
      return positionCheck(
        {
          'companyId': rid,
          'id': this.id,
          'name': name
        }).then(res => {
        console.log(res);
        if (res.data.code === 400) {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 页面初始化加载的所属单位
    isCreatedUnit () {
      let data = JSON.parse(localStorage.getItem('login'))
      CompanyList(
        {
          'id': data.companyId
        }
      ).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          console.log(res);
          this.options1 = res.data.data
          this.form.unit = data.companyId
          this.isChangeHigher(data.companyId)
        }
      })
    },
    // 查询岗位
    isInquire () {
      return positionList({
        'companyId': this.form.unit,
        'deptId': this.form.department,
        'isDisabled': this.form.status,
        'name': this.form.name,
        'page': this.pageNum,
        'limit': this.pageSize
      }).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
          console.log(res);
        }
      })
    },
    isReset () {
      let data = JSON.parse(localStorage.getItem('login'))
      this.form.unit = data.companyId
      this.form.department = ''
      this.form.status = ''
      this.form.name = ''
    },
    // 根据时间筛选动态
    changeTime () {
      // console.log(val);
      return dataDictItem(
        {
          'tableName': 'position',
          'recordId': this.rowId,
          'timeInterval': this.time
        }
      ).then(res => {
        console.log(res);
        if (res.data.code === 200) {
          this.infoList = res.data.data
        }
      })
    }
  }
};
</script>
<style>
:focus {
  outline: 0;
}
</style>
<style   lang="less" scoped>

.position {
  .main {
    height: 80vh;
    overflow-x: hidden;
   overflow-y: scroll;

    background-color: #fff;
    padding: 0 16px;
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
      .span {
    cursor: pointer;
  }
  .span:hover {
    text-decoration: underline;
    color: #237BFF;
  }
.el-drawer__wrapper {
  position: fixed;
  z-index: 300;
  top: 105px;
  right: 0;
  width: 100%;
  height: calc(100% - 105px);
    /deep/.el-form  {
                     padding: 0 340px;
                     box-sizing: border-box;
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
                     }
  .demo-drawer__footer {
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
  /deep/.el-drawer__body {
    padding-left: 32px;
    height: 100%;
  }
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
  /deep/.el-drawer.rtl {
    width: calc(100% - 305px) !important;
    box-shadow: none;
    border-left: 1px solid #eee;
  }
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

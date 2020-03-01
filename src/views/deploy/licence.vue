<template>
  <div class="licence">
    <!-- 面包屑导航 -->
    <Breadcrumb :levelList="levelList"></Breadcrumb>
    <!-- 页面主体部分 -->
    <div class="main">
      <!-- 查询条件 -->
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-col :span="5" style="padding:0">
            <el-form-item label="状态：">
              <el-select v-model="listQuery.status" placeholder="全部">
                <el-option
                  v-for="item in sstaus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="padding:0">
            <el-form-item label="所属单位：" style="margin-left:16px">
              <el-select
                v-model="listQuery.companyId"
                filterable
                remote
                placeholder="请输入所属单位"
                :remote-method="getCompanyList"
                :loading="companyLoading"
              >
                <el-option
                  v-for="item in scompanies"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="padding:0">
            <el-form-item label="许可证名称：" style="margin-left:16px">
              <el-input v-model="listQuery.licenseName" placeholder="请输入许可证名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col style="padding:0; width:250px;">
            <el-form-item
              style="padding-top:40px;box-sizing: border-box; width:auto; margin-left:16px"
            >
              <el-button type="primary" @click="handleFilter">确定</el-button>
              <el-button @click="resetSearchForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 新增 删除-->
      <el-row>
        <el-button type="primary" @click="showNewDialog">新增</el-button>
        <!-- <el-button type="danger">删除</el-button> -->
      </el-row>
      <!-- 多选表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="margin-top:16px"
        empty-text="暂无更多数据"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="companyName" label="所属单位">
          <template slot-scope="{row}">
            <el-popover trigger="hover" placement="top">
              <p>{{ row.companyName }}</p>
              <div slot="reference" class="company">{{ row.companyName }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="licenseName" label="许可证名称"></el-table-column>
        <el-table-column prop="packageName" label="许可套餐"></el-table-column>
        <el-table-column prop="userMaxLimit" label="人数上限"></el-table-column>
        <el-table-column prop="validDate" label="使用日期"></el-table-column>
        <el-table-column prop="status" label="状态" width="150px">
          <template slot-scope="{row}">
            <span v-if="row.status===0" style="color:#67C23A">有效</span>
            <span v-else-if="row.status===1" style="color:#F56C6C">失效</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="{row}">
            <span class="span" @click="showEditDialog(row.id)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        :page-sizes="[10,20,30]"
        :page-size.sync="listQuery.limit"
        :current-page.sync="listQuery.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top:15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!-- 新增的对话框 -->
    <el-dialog
      title="新建许可证"
      :visible.sync="newDialogVisible"
      :before-close="handleBeforeClose"
      class="newDialogVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100%"
        class="demo-ruleForm"
      >
        <div class="licenceInfo">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="所属单位：" prop="companyId">
                <el-select
                  v-model="ruleForm.companyId"
                  filterable
                  remote
                  placeholder="请输入所属单位"
                  :remote-method="getFormCompanyList"
                  :loading="companyLoading"
                >
                  <el-option
                    v-for="item in companies"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- -------- -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="许可证名称：" prop="licenseName">
                <el-input v-model="ruleForm.licenseName" placeholder="请输入许可证名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- -------- -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="IP地址：" prop="ip">
                <el-input v-model="ruleForm.ip" placeholder="请输入IP地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- --------- -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="有效期至" prop="validDate">
                <!-- 日期选择器 -->
                <el-date-picker
                  v-model="ruleForm.validDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :editable="false"
                  :readonly="ruleForm.id > 0"
                ></el-date-picker>
                <el-button type="primary" class="renewal" @click="renewalLicence">续期</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- ----------- -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="用户上限" prop="userMaxLimit">
                <el-input-number v-model="ruleForm.userMaxLimit" :min="1" style="width:100%;"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- --------- -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择状态" disabled>
                  <el-option
                    v-for="item in sstaus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="splitLine"></div>
        <div class="licenceMenu">
          <div class="title">产品套餐名称</div>
          <div class="menus">
            <el-form-item prop="packageId">
              <el-radio-group v-model="ruleForm.packageId">
                <div
                  class="menuOption"
                  style="display:block;"
                  :class="ruleForm.packageId == item.id ? 'checkedOption' : ''"
                  v-for="item in packages"
                  :key="item.id"
                >
                  <el-radio :label="item.id">{{item.packageName}}</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="hideNewDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb';
import {
  companyList,
  packageList,
  licenseList,
  addLicense,
  licenseView,
  editLicense
} from '../../api/getData';
import { toDate } from '../../api/changeDate';
export default {
  data () {
    return {
      newDialogVisible: false,
      levelList: [{ title: '业务' }, { title: '许可证管理' }],
      sstaus: [
        {
          value: 0,
          label: '有效'
        },
        {
          value: 1,
          label: '失效'
        }
      ],
      companyLoading: false,
      scompanies: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        status: undefined,
        companyId: undefined,
        licenseName: undefined
      },
      tableData: [],
      companies: [],
      packages: [],
      ruleForm: {
        id: undefined,
        companyId: undefined,
        licenseName: undefined,
        validDate: new Date(),
        userMaxLimit: undefined,
        ip: undefined,
        packageId: undefined,
        status: 0
      },
      rules: {
        companyId: [
          { required: true, message: '请选择所属单位', trigger: 'change' }
        ],
        licenseName: [
          { required: true, message: '请填写许可证名称', trigger: 'blur' }
        ],
        validDate: [
          {
            required: true,
            message: '请选择有效期',
            trigger: 'change'
          }
        ],
        userMaxLimit: [
          { required: true, message: '请输入用户上限', trigger: 'change' }
        ],
        packageId: [
          { required: true, message: '请选择绑定套餐', trigger: 'change' }
        ],
        status: [{ required: true, message: '', trigger: 'change' }]
      }
    };
  },
  created () {
    this.getCompanyList(undefined);
    this.getList();
  },
  components: {
    Breadcrumb
  },
  methods: {
    /**
     * 获取单位列表
     */
    getCompanyList (query) {
      companyList({ isTree: false, name: query }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.scompanies = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 获取列表
     */
    getList () {
      licenseList(this.listQuery).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 每页条数改变
     */
    handleSizeChange (size) {
      this.listQuery.page = 1;
      this.getList();
    },
    /**
     * 改变当前页
     */
    handleCurrentChange (currentPage) {
      this.getList();
    },
    /**
     * 条件筛选
     */
    handleFilter () {
      this.getList();
    },
    /**
     * 重置搜索条件
     */
    resetSearchForm () {
      this.listQuery.status = undefined;
      this.listQuery.companyId = undefined;
      this.listQuery.licenseName = undefined;
    },
    /**
     * 打开新增的对话框
     */
    showNewDialog () {
      this.newDialogVisible = true;
      this.getFormCompanyList(undefined);
      this.getPackageList();
    },
    /**
     * 关闭（隐藏）新增的对话框
     */
    hideNewDialog () {
      this.newDialogVisible = false;
      this.resetForm('ruleForm');
    },
    /**
     * 关闭弹框前
     */
    handleBeforeClose (done) {
      this.resetForm('ruleForm');
      done();
    },
    /**
     * 编辑
     */
    showEditDialog (id) {
      licenseView(id).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.showNewDialog();
            this.ruleForm = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 表单单位选择列表
     */
    getFormCompanyList (query) {
      companyList({ isTree: false, name: query }).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.companies = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 表单产品套餐选择列表
     */
    getPackageList () {
      packageList({}).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.packages = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    /**
     * 表单提交啊
     */
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        if (!this.ruleForm.id) {
          addLicense(this.ruleForm).then(res => {
            if (res.status === 200) {
              if (res.data.code === 200) {
                this.$message.success('新增成功！');
                this.hideNewDialog();
                this.getList(); // 刷新列表
              } else {
                this.$message.error(res.data.msg);
              }
            }
          });
        } else {
          editLicense(this.ruleForm).then(res => {
            if (res.status === 200) {
              if (res.data.code === 200) {
                this.$message.success('修改成功！');
                this.hideNewDialog();
                this.getList(); // 刷新列表
              } else {
                this.$message.error(res.data.msg);
              }
            }
          });
        }
      });
    },
    /**
     * 重置表单
     */
    resetForm (formName) {
      this.ruleForm = {
        id: undefined,
        companyId: undefined,
        licenseName: undefined,
        validDate: new Date(),
        userMaxLimit: undefined,
        ip: undefined,
        packageId: undefined,
        status: 0
      };
      this.$refs[formName].resetFields();
    },
    /**
     * 续期
     */
    renewalLicence () {
      // eslint-disable-next-line no-debugger
      debugger;
      let validate = new Date(this.ruleForm.validDate);
      validate.setFullYear(validate.getFullYear() + 3);
      this.ruleForm.validDate = toDate(validate);
    }
  }
};
</script>

<style  lang="less" scoped>
.licence {
  .main {
    flex: 1;
    padding: 16px;
    overflow: hidden;
    padding-top: 0;
    background-color: #fff;
    border-left: 1px solid #eee;
    /deep/ .el-form-item {
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

  /deep/ .el-button--success {
    position: relative;
    padding-left: 10px;
    i {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
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
  /deep/
    .el-table
    .el-table__body-wrapper
    .el-table__body
    tbody
    tr
    td.el-table_1_column_2
    .cell
    .company {
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .span {
    cursor: pointer;
  }
  .span:hover {
    text-decoration: underline;
    color: #237bff;
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
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .demo-ruleForm {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .licenceInfo {
        width: 45%;
      }
      .splitLine {
        width: 1px;
        height: 614px;
        background: rgba(235, 238, 245, 1);
      }
      .licenceMenu {
        box-sizing: border-box;
        padding-right: 10px;
        width: 45%;
        height: 624px;
        overflow-x: hidden;
        overflow-y: scroll;
        .title {
          box-sizing: border-box;
          padding: 16px;
          height: 48px;
          background: rgba(245, 247, 250, 1);
          font-size: 16px;
          line-height: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(48, 49, 51, 1);
        }
        .menus {
          .el-radio-group {
            width: 100%;
            .menuOption {
              box-sizing: border-box;
              padding: 16px;
              width: 100%;
              height: 48px;
              border-bottom: 1px solid rgba(235, 238, 245, 1);
              &:hover {
                background: rgba(245, 247, 250, 1);
              }
              &.checkedOption {
                background: #ecf5ff;
                border: 1px solid #237bff;
              }
            }
          }
        }
      }
      .el-form-item {
        margin-bottom: 16px;
        /deep/ .el-form-item__label {
          text-align: left !important;
        }
        /deep/ .el-form-item__content {
          width: 100%;
          margin-left: 0 !important ;
          /deep/ .el-select {
            width: 100%;
          }
          /deep/.el-date-editor {
            width: 80%;
          }
          /deep/ .el-input-number {
            width: 100%;
          }
          .renewal {
            margin-left: 10px;
            width: calc(20% - 10px);
          }
        }
      }
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
    display: none;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>

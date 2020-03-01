<template>
  <div class="station">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>环卫设施点</el-breadcrumb-item>
      <el-breadcrumb-item>小压站</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xf-main">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-col :span="5">
            <!-- 所属单位 -->
            <el-form-item label="所属单位:" prop="companyId">
              <el-select v-model="listQuery.companyId" placeholder="全部">
                <el-option
                  v-for="item in positionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <!-- 小区名称 -->
            <el-form-item label="小区名称:" prop="name">
              <el-input v-model="listQuery.name" placeholder="请输入小区名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 操作 -->
            <el-form-item
              style="padding-top:40px;box-sizing: border-box; width:auto;margin: 0; margin-left:16px"
            >
              <el-button type="primary">确定</el-button>
              <el-button @click="resetSearchForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 新增 -->
      <div style="margin-top:20px;">
        <el-button type="primary" @click="showDrawer">新增</el-button>
      </div>

      <!-- 表格 -->
      <!-- height="" -->
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="65%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="No." prop="no"></el-table-column>
        <el-table-column prop="companyId" label="小区名称"></el-table-column>
        <el-table-column prop="streetId" label="所属区"></el-table-column>
        <el-table-column prop="name" label="小区地址"></el-table-column>
        <el-table-column prop="operate" label="操作" width="200px">
          <span class="span">编辑</span>&nbsp;&nbsp;
          <span style="color:#ccc">|</span>&nbsp;&nbsp;
          <span class="span">删除</span>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 16px;"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="200"
      ></el-pagination>

      <!-- 新增抽屉 -->
      <el-drawer
        title="新建小区"
        :modal="false"
        :append-to-body="true"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <el-form class="create-el-form" v-model="formData">
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="所属区" prop="districtId">
                <el-select v-model="formData.districtId" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- -------------- -->
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="小区名称" prop="name">
                <el-input type="text" placeholder="请输入小区名称" v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- -------------- -->
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="小区编号" prop="code">
                <el-input type="text" placeholder="请输入小区编号" v-model="formData.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- -------------- -->
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-form-item label="小区地址" prop="address">
                <el-input type="text" placeholder="请输入小区地址" v-model="formData.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="drawer__footer">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sstaus: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '失效'
        }
      ],
      positionOptions: [
        {
          value: 0,
          label: '否'
        },
        {
          value: 1,
          label: '是'
        }
      ],
      selst: false,
      time: 0,
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
      unitList: [
        { id: 1, label: 'a', name: '单位名称1' },
        { id: 2, label: 'b', name: '单位名称2' }
      ],
      options: [
        { value: '1', label: '在职' },
        { value: '2', label: '离职' }
      ],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        companyId: undefined,
        streetId: undefined,
        hasposition: undefined
      },
      // 表格数据
      tableData: [
        {
          no: 1,
          companyId: 11111,
          streetId: 22222,
          name: 33333,
          address: 44444,
          startDate: '2020-01-15',
          area: 55555,
          responsiblePerson: '小高',
          placePhone: 13966074552,
          deviceNo: 'xfr001',
          status: 0
        }
      ],
      // 表单数据
      formData: {
        districtId: undefined,
        name: undefined,
        code: undefined,
        address: undefined,
        status: 0
      }
    };
  },
  methods: {
    /**
     * 重置列表搜索条件
     */
    resetSearchForm () {
      this.listQuery.name = undefined;
      this.listQuery.companyId = undefined;
      this.listQuery.streetId = undefined;
      this.listQuery.hasposition = undefined;
    },
    showDrawer () {
      this.drawer = true;
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      // this.drawer = false
    },
    // 被选中的单位名称
    selectUnit (date) {
      console.log(date);
    },
    // 是否展开
    expand () {
      this.show = !this.show;
    },
    // 查看详情
    viewDetail () {
      this.viewDrawer = true;
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.station {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.xf-main {
  height: 100%;
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

  .create-el-form {
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 80px;
    position: relative;
  }

  .drawer__footer {
    text-align: right;
    padding: 10px 30px;
    border-top: 1px solid #eee;
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
}
/deep/.el-date-editor {
  width: 100%;
  margin-right: 10px;
}
/deep/.el-input {
  width: 100%;
  margin-right: 10px;
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

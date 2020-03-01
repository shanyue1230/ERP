<template>
  <div class="conWrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>一级</el-breadcrumb-item>
      <el-breadcrumb-item>二级</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="opearation">
      <el-button type="primary" @click="showDrawer">新增共享规则</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      :header-cell-style="{background:'rgba(229, 233, 242, 1)',color:'#000',fontWeight:'400'}"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
    >
      <el-table-column type="index" label="No."></el-table-column>
      <el-table-column label="数据1" prop="name"></el-table-column>
      <el-table-column label="数据2" prop="range"></el-table-column>
      <el-table-column prop min-width="100%" label="操作">
        <template v-slot="scope">
          <div class="operation">
            <span @click="showEditDialog(scope.row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="showDelete(scope.row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增抽屉 -->
    <el-drawer
      :title="title"
      :modal="false"
      :append-to-body="true"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form>
        <el-row>
          <el-col>
            <div style="background:#ccc;height:1000px">事例</div>
          </el-col>
        </el-row>
      </el-form>
      <div class="saveAndCancle">
        <el-button @click="drawer = false">取消</el-button>
        <el-button @click="onSubmit" type="primary">确认</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      direction: 'rtl',
      drawer: false,
      tableData: [
        {
          name: 1,
          range: 1
        },
        {
          name: 1,
          range: 1
        },
        {
          name: 1,
          range: 1
        },
        {
          name: 1,
          range: 1
        }
      ]
    };
  },
  methods: {
    showDrawer () {
      this.drawer = true;
      this.title = '新建';
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      // this.drawer = false
    }
  },
  components: {}
};
</script>
<style>
:focus {
  outline: 0;
}
</style>
<style lang="less" scoped>
.conWrapper {
  height: 100%;
  .opearation {
    margin: 20px;
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
.operation span:hover {
  text-decoration: underline;
  cursor: pointer;
  color: #237bff;
}
</style>

<template>
  <div class="remind-panel">
    <div class="remind-options">
      <el-menu
        :default-active="activeIndex"
        class="remind-menus"
        mode="horizontal"
        active-text-color="#237BFF"
        @select="handleSelect"
      >
        <el-menu-item index="1">全部事项</el-menu-item>
        <el-menu-item index="2">报警事项</el-menu-item>
        <el-menu-item index="3">提醒事项</el-menu-item>
        <el-menu-item index="4">待办事项</el-menu-item>
      </el-menu>
      <div class="remind-bottons">
        <div class="refesh">
          刷新
          <i class="el-icon-refresh"></i>
        </div>
        <div class="showmore">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
    </div>

    <div class="remind-details">
      <div class="remind-item" v-for="o in 8" :key="o">{{'列表内容 ' + o }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
.remind-panel {
  background: #ffffff;
  min-height: 464px;
  border-radius: 2px;
  .remind-options {
    display: flex;
    justify-content: space-between;
    .el-menu {
      margin-left: 16px;
      width: 376px;
      .el-menu-item {
        width: 94px;
        height: 50px;
      }
    }
    .remind-bottons {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(96, 98, 102, 1);
      .refesh {
        width: 86px;
        height: 14px;
        border-right: 1px solid rgba(228, 231, 237, 1);
        line-height: 14px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
      .showmore {
        .refesh();
        border: none;
      }
    }
  }

  .remind-details {
    padding: 0 16px;
    .remind-item {
      height: 48px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -1px 0px 0px rgba(235, 238, 245, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    :first-child {
      margin-top: 12px;
      box-shadow: none;
    }
  }
}
</style>

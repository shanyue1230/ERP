<template>
  <div class="workplace">
    <el-row :gutter="16" class="main-panel">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 19}"
        :xl="{span: 19}"
        class="left-panel"
      >
        <!-- 提醒事项列表 -->
        <remind-card style="margin-bottom:16px;" />
        <!-- 图片 -->
        <div class="logo-pic"></div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 5}"
        :xl="{span: 5}"
        class="right-panel"
      >
        <!-- 事项统计 -->
        <remind-statistic-card style="margin-bottom:16px;" />
        <remind-statistic-card style="margin-bottom:16px;" />
        <remind-statistic-card style="margin-bottom:16px;" />
        <!-- 通知公告 -->
        <notice-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RemindCard from './components/RemindCard';
import RemindStatisticCard from './components/RemindStatisticsCard';
import NoticeCard from './components/NoticeCard';
export default {
  components: { RemindCard, RemindStatisticCard, NoticeCard }
};
</script>

<style lang="less" scoped>
.workplace {
  box-sizing: border-box;
  padding: 16px 16px 0 16px;
  .main-panel {
    .left-panel {
      .logo-pic {
        height: 364px;
        background: #ffffff;
      }
    }
  }
}
</style>

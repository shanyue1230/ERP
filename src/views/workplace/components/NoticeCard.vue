<template>
  <div class="notice-panel">
    <div class="top">
      <div class="title">通知公告</div>
      <div class="more">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <img class="pic" src="../../../assets/img/notice.png" />
    <div class="content">通知公告通知公告通知公告通知公告通知公告通知公告通知公告通知公告通知公告通知公告</div>
    <div class="bottom">2020-1-20 20:00</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.notice-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 364px;
  background: #ffffff;
  border-radius: 2px;
  padding: 22px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 14px;
    line-height: 14px;
    .title {
      color: rgba(48, 49, 51, 1);
    }
    .more {
      color: rgba(144, 147, 153, 1);
      &:hover {
        cursor: pointer;
      }
    }
  }
  .pic {
    width: 100%;
    height: 169px;
    margin-top: 42px;
  }
  .content {
    width: 100%;
    height: 42px;
    margin-top: 16px;
    color: rgba(96, 98, 102, 1);
    line-height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .bottom {
    width: 100%;
    margin-top: 16px;
    text-align: right;
    color: rgba(144, 147, 153, 1);
  }
}
</style>

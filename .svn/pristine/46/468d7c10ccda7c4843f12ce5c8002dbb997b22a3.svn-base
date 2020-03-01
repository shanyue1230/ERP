<template>
  <div class="main">
      <!-- 左侧 -->
        <div class="left">
          <!-- 轮播图 -->
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">
                <img src="" alt="">
              </h3>
            </el-carousel-item>
          </el-carousel>

            <!-- 事项框 -->
          <div class="matter">
            <div class="tips"></div>
            <div class="tips"></div>
            <div class="tips"></div>
          </div>

          <!-- 事项通知 -->
          <div class="notice">
            <span>事项通知</span>
            <div class="line"></div>
          </div>

          <!-- 事项内容框 -->
          <div class="content">
            <div class="con danger">
              <p>
                报警事项
                <span>3</span>
              </p>
              <ul>
                <li><span>1.</span>报警事项报警事项报警事项报警事项报警事项</li>
                <li><span>1.</span>报警事项报警事项报警事项报警事项报警事项</li>
              </ul>
            </div>
            <div class="con warn">
              <p>提醒事项</p>
            </div>
            <div class="con upcoming">
              <p>待办事项</p>
            </div>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <!-- 公告 -->
           <div class="placard">
              <p>
                通知公告
              </p>
           </div>
          <!-- 天气 -->
          <div class="weather">

          </div>
          <!-- 日历 -->
          <div class="calendar">

          </div>

        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  width: 100%;
  padding: 20px;
}
.left {
    flex: 7;
  }
.right {
    flex: 3;
    padding-left: 20px;
  }

  // 轮播图样式
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    // line-height: 120px;
    height: 120px;
    margin: 0;
    img {
      width: 100%;
      height: 120px;
    }
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  /deep/.el-carousel__button {
      width: 10px !important;
  }
  // 事项框
  .matter {
    height: 60px;
    display: flex;
    margin-top: 20px;
    display: flex;
    .tips {
      flex: 1;
      height: 100%;
      background-color: #fff;
      margin-left: 2
    }
    .tips:nth-child(-n+2) {
      margin-right: 20px;
    }
  }
  // 事项通知
  .notice {
    margin-top: 20px;
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    display: flex;
    span {
      width: 80px;
      display: block;
    }
    .line {
      flex: 1;
      height: 1px;
      background-color: #aaa;
      margin-top: 12px;
    }
  }
  // 事项内容框
  .content {
    display: flex;
    margin-top: 20px;
    .con:nth-child(-n+2) {
      margin-right: 20px;
    }
    .con {
      width: 33.33%;
      height: 100%;
      background-color: #fff;
      margin-left: 2;
      padding-bottom: 20px;
      p {
        height: 30px;
        background-color: rgba(51, 51, 51, 1);
        color: #fff;
        line-height: 30px;
        text-align: center;
        font-family: 'Arial Normal', 'Arial';
        font-size: 13px;
        position: relative;
        span {
          position: absolute;
          right: 50px;
          top: 6px;
          float: right;
          width: 20px;
          display: block;
          height: 20px;
          background-color: rgba(245, 108, 108, 1);
          border-radius: 50%;
          text-align: center;
          line-height: 18px;
        }
      }
      ul {
        li {
          padding: 5px 10px;
          font-size: 13px;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            margin-right: 3px;
          }
        }
      }
    }
    .con:nth-child(-n+2) {
      margin-right: 20px;
    }
  }
  // 公告
  .placard {
      height: 150px;
      background-color: #fff;
      // margin-left: 20px;
      // padding-bottom: 20px;
      p {
        height: 30px;
        background-color: rgba(51, 51, 51, 1);
        color: #fff;
        line-height: 30px;
        text-align: center;
        font-family: 'Arial Normal', 'Arial';
        font-size: 13px;
        position: relative;
      }
  }
  // weather
  .weather {
    margin-top: 20px;
    height: 100px;
    background: #fff;

  }
  .calendar {
    height: 200px;
    margin-top: 20px;
    background-color: #fff;
  }

</style>

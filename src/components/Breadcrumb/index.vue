// 面包屑导航
<template>
  <div class="nav">
    <el-breadcrumb separator="/" >
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['levelList']
}

</script>

<style lang='less' scoped>
  .nav {
    height: 40px;
  background-color: #e9eef3;

    // box-sizing: border-box;
    // background-color: #fff;
    // padding: 0 20px;
    // margin-top: 2px;
    // padding-top:18px;

  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner{
      font-weight: 700;
  }
  /deep/ .el-breadcrumb {
        height: 40px;
        line-height: 40px
  }
  /deep/.el-breadcrumb__inner {
    font-size: 12px;
  }
</style>

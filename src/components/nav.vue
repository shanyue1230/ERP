<template>
   <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
        <el-breadcrumb-item class="weight">{{management}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  props: ['management']
}
</script>

<style lang="less" scoped>
   .nav {
    height: 50px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 20px;
    margin-top: 2px;
    line-height: 50px;
    box-sizing: border-box;
    padding-top:18px;
  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner{
      font-weight: 700;
  }
  /deep/.el-breadcrumb__inner {
    font-size: 12px;
  }
</style>

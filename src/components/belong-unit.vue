<template>
<!-- 所属单位组件 -->
  <div class="belong-unit">
    <div class="xr-aside">
        <div class="title">所属单位</div>
          <el-checkbox-group v-model="checkList" :min="1">
            <el-checkbox v-for="(item,index) in unitList" :key="index" class="item" :class="{'light': isLight === index}" :label="item" @change="handleChange(index)">{{item.companyName}}</el-checkbox>
          </el-checkbox-group>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkList: [],
      isLight: -1
    }
  },
  props: ['unitList'],
  watch: {
    unitList (newlist, old) {
      console.log(newlist, old);
      const comId = JSON.parse(localStorage.getItem('login')).companyId
      newlist.forEach(ele => {
        if (ele.companyId === comId) {
          this.checkList.push(ele)
        }
      });
    }
  },
  created () {

  },
  methods: {
    handleChange (index) {
      this.isLight = index
      this.$emit('handleChange', this.checkList)
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.light {
    background:rgba(236,245,255,1);
    color:#237BFF;
}
.belong-unit {
  height: 100%;
}
  .xr-aside {
      width: 270px;
      background-color: #fff;
      font-size: 14px;
      box-sizing: border-box;
      // height: 100%;
      .title {
        height: 46px;
        line-height: 46px;
        padding-left: 25px;
        border-bottom: 1px solid #eee;
      }
      .el-checkbox-group {
        height: 75vh;
        overflow-y: scroll;
        overflow-x: hidden;
      }
      .item {
        padding: 0 15px;
        height: 46px;
        line-height: 46px;
        width: 100%;
        margin-right: 0;
        box-sizing:border-box;
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
</style>

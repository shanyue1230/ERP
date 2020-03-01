<template>
  <div class="sysModules">
    <div class="title">
      <span class="title-name">垃圾分类综合管理平台</span>
      <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">返回导航</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item command="d">退出登录</el-dropdown-item>
            </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main">
      <ul>
        <!-- @mouseover="changeImg" @mouseleave="backImg" -->
        <li  v-for="(item,index) in imgUrl" :key="index" >
          <img :src="item.url" alt="" @mouseleave="backImg(index)" @mouseover="changeImg(index)" @click="enterSystem(item.id)">
          <p>{{item.title}}</p>
        </li>
        <!-- <li>
          <img src="../assets/img/Sanitation01.png" alt="">
        </li>
        <li>
          <img src="../assets/img/toll01.png" alt="">
        </li>
        <li>
          <img src="../assets/img/Credit01.png" alt="">
        </li>
        <li>
          <img src="../assets/img/deploy01.png" alt="">
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { getMenus, Logout } from '../api/getData.js'
export default {
  data () {
    return {
      imgUrl: [{ url: require('../assets/img/classification01.png'), title: '垃圾分类综合管理', id: 1 },
        { url: require('../assets/img/Sanitation01.png'), title: '环卫云服务监控指挥中心', id: 2 },
        { url: require('../assets/img/toll01.png'), title: '合同收费管理', id: 3 },
        { url: require('../assets/img/Credit01.png'), title: '环卫资信等级', id: 4 },
        { url: require('../assets/img/deploy01.png'), title: '配置发布管理', id: 5 }
      ],
      imgUrl2: [
        { url: require('../assets/img/classification02.png'), title: '垃圾分类综合管理', id: 1 },
        { url: require('../assets/img/Sanitation02.png'), title: '环卫云服务监控指挥中心', id: 2 },
        { url: require('../assets/img/toll02.png'), title: '合同收费管理', id: 3 },
        { url: require('../assets/img/Credit02.png'), title: '环卫资信等级', id: 4 },
        { url: require('../assets/img/deploy02.png'), title: '配置发布管理', id: 5 }
      ],
      imgUrl3: [{ url: require('../assets/img/classification01.png'), title: '垃圾分类综合管理', id: 1 },
        { url: require('../assets/img/Sanitation01.png'), title: '环卫云服务监控指挥中心', id: 2 },
        { url: require('../assets/img/toll01.png'), title: '合同收费管理', id: 3 },
        { url: require('../assets/img/Credit01.png'), title: '环卫资信等级', id: 4 },
        { url: require('../assets/img/deploy01.png'), title: '配置发布管理', id: 5 }
      ],
      // 子系统数据
      subsystem: [''],
      username: ''
    }
  },
  created () {
    this.getName()
  },
  methods: {
    getName () {
      let nameDate = JSON.parse(localStorage.getItem('login'))
      this.username = nameDate.name
    },
    // 鼠标移入
    changeImg (index) {
      this.imgUrl[index].url = this.imgUrl2[index].url
    },
    // 鼠标移出
    backImg (index) {
      this.imgUrl[index].url = this.imgUrl3[index].url
    },
    handleCommand (command) {
      // 返回导航
      if (command === 'a') {
        this.backModules()
      } else if (command === 'd') {
      // 退出登录
        console.log('退出登录');

        Logout().then(res => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            // 删除token
            localStorage.removeItem('token')
            // 跳转到登录页面
            this.$router.push('/login')
          }
        })
      }
    },
    // 跳转到相应子系统
    async enterSystem (id) {
      const res = await getMenus({ parentId: id, isTree: true, isPermission: true })
      console.log(res.data.data);
      if (res.data.code === 200) {
        let menuList = res.data.data
        localStorage.setItem('menuList', JSON.stringify(menuList))
        // this.$store.commit('menusList', menuList)
        this.$router.push('/workplace')
      }
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.sysModules {
  height: 100%;
  display: flex;
    flex-direction: column;

  .title {
    line-height: 64px;
    padding: 0 39px;
    span.title-name {
      line-height: 64px;
      font-size:20px;
      font-family:SourceHanSansCN;
      font-weight:bold;
      color:rgba(48,49,51,1);
    }
  }
  .main {
    background: url('../assets/img/module-bgc.png') no-repeat;
    background-size: cover;
    height: 100%;
    flex: 1;
    padding: 0 100px;
    ul {
      display: flex;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      align-items: center;
      box-sizing: border-box;
      li {
        flex: 1;
        img {
          display: block;
          margin: 0 auto;
          cursor: pointer;
        }
        p {
          font-size:22px;
          text-align: center;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(255,255,255,1);
          margin-top: 44px;
        }
      }
    }
  }

}
  .el-dropdown {
    float: right;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

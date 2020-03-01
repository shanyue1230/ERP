<template>
  <div class="basic">
    <div class="one-menu">
      <div class="home-icon">
        <i class="el-icon-s-home" @click="backHome"></i>
      </div>
      <!-- 一级菜单列表 -->
      <ul class="menu-list">
        <li v-for="(item,index) in menuList" :key="index" :class="{'isSelect':index === current}" @click="getSecondMenu(index,item.id)">{{item.caption}}</li>
      </ul>
    </div>
    <el-container>
      <el-header>
        <div :class="{'aside': true, 'ishowMenu': ishowMenu}">上海西弗瑞环境科技有限公司</div>
        <div class="right">
          <i class="el-icon-s-fold" @click="isShowMenu"></i>
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
      </el-header>
      <el-container>
        <el-aside :class="{'ishowMenu': ishowMenu}">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              @select="handleOpen"
              router
               >
               <!-- <el-menu-item index="home" style="text-align: left;" @click="toHome">
                 <i class="el-icon-location"></i>
                 首页
               </el-menu-item> -->
               <div v-for="(item,index) in twiceMenu" :key="index">
                <div v-if="item.code">
                  <div class="line"></div>
                  <el-menu-item :index="item.code + ''" :key="item.id"  class="oneMenu">
                    <!-- <i class="el-icon-location"></i> -->
                    <span slot="title" >{{item.caption}}</span>
                  </el-menu-item>
                </div>
                <el-submenu v-else :index="item.createTime + ''" >
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <span>{{item.caption}}</span>
                  </template>
                    <el-menu-item class="thirdMenu" v-for="(opt,index) in item.menus" :key="index" :index="opt.code">{{opt.caption}}</el-menu-item>
                </el-submenu>

              </div>
            </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMenus, Logout } from '../api/getData.js'
export default {
  data () {
    return {
      activeIndex: '',
      current: 0,
      ishowMenu: false,
      username: '',
      menuList: [
        { title: '基础', id: '1' },
        { title: '业务', id: '2' },
        { title: '系统', id: '3' }
      ],
      twiceMenu: [
        { title: '组织架构管理', id: '10', children: [ { title: '选项1', id: '30', authName: 'option1' }, { title: '选项2', id: '31', authName: 'option2' } ] },
        { title: '设备管理', id: '11', authName: 'device' }
      ]
    }
  },
  created () {
    this.getMenus()
    // this.getSecondMenu(0, 9)
    this.getName()
  },
  methods: {
    getName () {
      let nameDate = JSON.parse(localStorage.getItem('login'))
      this.username = nameDate.name
    },
    // toHome () {
    //   this.$router.push('/workplace')
    // },

    // 获取二级菜单
    getSecondMenu (index, id) {
      console.log(index, id)
      this.current = index
      const data = { parentId: id, isPermission: true, isChild: true, isTree: true }
      getMenus(data).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.twiceMenu = res.data.data
        }
      })
    },
    isShowMenu () {
      this.ishowMenu = !this.ishowMenu
      console.log(this.ishowMenu);
    },
    // 菜单导航事件
    handleOpen (key, keyPath) {
      this.activeIndex = key
      let code = key
      localStorage.setItem('code', code)
    },
    backHome () {
      this.$router.push('/workplace')
    },
    getMenus () {
      this.menuList = JSON.parse(localStorage.getItem('menuList'))
      console.log(this.menuList[0].id);
      let id = this.menuList[0].id
      this.getSecondMenu(0, id)
    },
    handleCommand (command) {
      // 返回导航
      if (command === 'a') {
        this.$router.push('/sysModules')
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
    }
  },
  components: {

  },
  computed: mapState(['navList'])
}
</script>

<style lang="less" scoped>
.basic {
  height: 100%;
  overflow: hidden;
  padding-left: 64px;
}
.thirdMenu {
  font-size: 12px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(96,98,102,1);
}
.ishowMenu {
  display: none;
}
/deep/ul.el-menu.el-menu--inline {
  background-color: rgba(242,246,252,1);
}
/deep/.el-menu-item.is-active {
  color:#237BFF;
}
.one-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 64px;
  height: 100%;
  background-color: #237BFF;
  box-sizing: border-box;
  .home-icon {
    width: 100%;
    .el-icon-s-home {
      width: 100%;
      color: #fff;
      font-size: 24px;
      text-align:center;
      line-height: 64px;
      border-bottom: 1px solid #fff;
      cursor: pointer;
    }
  }
}
.isSelect {
  background:rgba(255,255,255,1);
  color: #237BFF !important;
}
.menu-list {
  li {
    margin: 8px;
    width: 48px;
    height: 48px;
    border-radius:4px;
    text-align: center;
    line-height: 48px;
    color: #fff;
    font-size: 14px;
     cursor:pointer;
  }
}

// 布局样式
.el-header{
    background:rgba(255,255,255,1);
    color: #333;
    // text-align: center;
    padding: 0;
    height: 64px !important;
    line-height: 64px;
    display: flex;
    .aside {
      float: left;
      width: 240px;
      font-size: 14px;
      text-align: center;
    }
    .right {
      float: left;
      flex: 1;
      height: 64px;
      padding: 0 16px;
      border-left: 1px solid #eee;
      .el-icon-s-fold {
        color: #237BFF;
        font-size: 22px;
        line-height: 64px;
        cursor: pointer;

      }
    }
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    // line-height: 200px;
    height: 100%;
    width: 240px !important;
    border-top: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
    height: 100%;
    padding: 0 !important;
  }
  .el-container {
    height: 100% ;
  }
  body > .el-container {
    margin-bottom: 40px;

  }

.el-main {
  // background-color: #e9eef3;
  background-color: #fff;
  color: #333;
  // overflow: auto;
  // overflow: hidden;

  // text-align: center;
  // line-height: 160px;

  padding: 0 !important;
}
.el-container {
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
}

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  /deep/.el-submenu__title {
    text-align: left;
  }
  /deep/.el-submenu .el-menu-item {
    text-align: left;
  }
  /deep/ li.el-menu-item.oneMenu {
    text-align: left;
  }
  .el-menu {
    border: none;
  }
  .el-dropdown {
    float: right;
  }
  .el-dropdown-link {
    cursor: pointer;
    // color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

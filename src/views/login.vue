<template>
  <!-- 登录组件 -->
  <div
    class="login"
    v-loading="loading"
    element-loading-text="正在登录中，请稍后.."
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- logo -->
    <div style="display:flex;width:100%;height:100%">
      <div class="left">
        <div class="logo">
          <!-- ../assets/img/logo.png -->
          <img
            src="../assets/img/logo.png"
            alt
          />
        </div>
      </div>
      <!-- 右侧登录+二维码 -->
      <div class="right">
        <div class="box">
          <div class="loginBox">
            <h3>垃圾分类综合管理系统</h3>
            <!-- 登录表单 -->
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
            >
              <el-form-item prop="userName">
                <el-input
                  v-model="form.userName"
                  placeholder="请输入用户名"
                  class="first"
                   @keyup.enter.native="login('form')"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  placeholder="请输入6-10位密码"
                  type="password"
                  show-password
                  @keyup.enter.native="login('form')"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                <span @click="resetForm">清空</span>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="login('form')"
                >登录</el-button>
              </el-form-item>
            </el-form>
            <!-- 提示文字 -->
            <div class="info">
              技术支持电话：
              <span class="orange">021-62288861</span>
            </div>
          </div>
          <div class="code">
            <div class="app">
              <img
                src="../assets/img/erwei.png"
                alt
              />
              <span>APP Store</span>
              <!-- 显示隐藏的app二维码框 -->
              <div class="show">
                  <img src="../assets/img/erweiCode.png" alt="" class="img">
              </div>
            </div>
            <div class="android">
              <img
                src="../assets/img/erwei.png"
                alt
              />
              <span>Android</span>
              <!-- 显示隐藏的android二维码框 -->
              <!-- <div class="show2" >
                <div class="img"></div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">Copyright© 2017 - 2018 上海西弗瑞环境科技有限公司 版权所有</div>
  </div>
</template>

<script>
import { Login } from '../api/getData'
// 引入base64
const Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      // index: '',
      loading: false,
      // 登陆表单
      form: {
        userName: '',
        password: '',
        checked: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // {
          //   pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{5,15}$/,
          //   message: '用户名最少5字符，最长15字符'
          // }
          { min: 5, max: 15, message: '用户名长度在 5 到 15 个字符', trigger: 'blur' }

        ],
        password: [
          { required: true, message: '请输入6-10位密码', trigger: 'blur' },
          { min: 6, max: 10, message: '密码长度在 6 到 10 个字符', trigger: 'blur' }
          // {
          //   pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-z]{6,10}$/,
          //   message: '密码最少6字符，最大10字符'
          // }
        ]
      }
    }
  },
  created () {
    // 在页面加载时从cookie获取登录信息
    let userName = this.getCookie('userName')
    let password = Base64.decode(this.getCookie('password'))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (userName) {
      this.form.userName = userName
      this.form.password = password
      this.form.checked = true
    }
  },
  methods: {
    // 登录
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loading = true;
          return Login({
            'userNo': this.form.userName.toString(),
            'password': this.form.password.toString()
          }).then(res => {
            this.loading = false;
            // console.log(res)
            if (res.status === 200) {
              if (res.data.code === 200) {
                console.log(res);
                this.$message.success('登录成功！');
                localStorage.setItem('token', res.data.data.webToken);
                localStorage.setItem('login', JSON.stringify(res.data.data));
                // 跳转到模块页面
                this.$router.push({ path: '/sysModules' })
                // 储存登录信息
                this.setUserInfo()
              } else {
                this.$message.error(res.data.msg);
              }
            }
          })
        } else {
          this.$message.error('请输入正确的用户名和密码')
          return false;
        }
      });
    },
    // 储存表单信息
    setUserInfo () {
    // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
    // 如果没有勾选，储存的信息为空
      if (this.form.checked) {
        this.setCookie('userName', this.form.userName)
        // base64加密密码
        let passWord = Base64.encode(this.form.password)
        this.setCookie('password', passWord)
      } else {
        this.setCookie('userName', '')
        this.setCookie('password', '')
      }
    },
    // 获取cookie
    getCookie: function (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie: function (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
            ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },
    resetForm () {
      this.form.userName = ''
      this.form.password = ''
      this.form.checked = false
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  margin: 0px auto;
  background: no-repeat url(../assets/img/photo.png);
  background-size: 100% 100%;
  position: relative;
  .left {
    flex: 1;
    position: relative;
    .logo {
      position: absolute;
      top: 250px;
      right: 50px;
      // animation: float 2s infinite linear;
      img {
        width: 364px;
        height: 448px;
      }
    }
  }
  .right {
    flex: 1;
    position: relative;

    .box {
      width: 496px;
      height: 601px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 50px;
      .loginBox {
        width: 496px;
        height: 535px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 4px 7px 30px 0px rgba(53, 70, 91, 0.09);
        border-radius: 4px;
        margin-bottom: 2px;
        padding: 77px 77px 0 77px;
        box-sizing: border-box;
        background-color: #fff;
        h3 {
          width: 339px;
          height: 33px;
          font-size: 32px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(48, 49, 51, 1);
          margin-bottom: 75px;
        }
        .el-form {
          .el-form-item {
            /deep/ .el-form-item__content {
              margin-left: 0;
              /deep/ .el-input {
                width: 100%;
                .el-input__inner {
                  border-top: none;
                  border-left: none;
                  border-right: none;
                  border-radius: 0px;
                }
              }
            }
            span {
              margin-left: 220px;
              cursor: pointer;
            }
            .el-button {
              width: 100%;
              height: 50px;
              margin-top: 20px;
            }
          }
        }
        .info {
          margin-top: 50px;
          height: 16px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(168, 181, 194, 1);
        }
      }
      .code {
        width: 496px;
        height: 64px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 4px 7px 30px 0px rgba(53, 70, 91, 0.09);
        border-radius: 4px;
        display: flex;
        .app {
          flex: 1;
          padding: 20px 0 20px 0;
          box-sizing: border-box;
          cursor: pointer;
          border-right: 1px solid rgba(224, 228, 232, 1);
          img {
            width: 24px;
            margin-left: 64px;
            margin-right: 24px;
            vertical-align: middle;
          }
          span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(48, 49, 51, 1);
          }
          .show {
            width: 248px;
            height: 248px;
            padding: 16px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px -4px 6px 0px rgba(0, 54, 106, 0.17);
            border-radius: 4px;
            display: none;
            position: absolute;
            top: 287px;
            // left: 0;
            z-index: 999;
            .img {
              width: 216px;
              height: 216px;
              margin: 0;
              // background-color: rgb(95, 16, 16);
            }
          }
        }
        .app:hover .show {
          display: block;
        }
        .android {
          flex: 1;
          padding: 20px 0 20px 0;
          box-sizing: border-box;
          cursor: pointer;
          border-right: 1px solid rgba(224, 228, 232, 1);
          img {
            width: 24px;
            margin-left: 64px;
            margin-right: 24px;
            vertical-align: middle;
          }
          span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(48, 49, 51, 1);
          }
          .show2 {
            width: 248px;
            height: 248px;
            padding: 16px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px -4px 6px 0px rgba(0, 54, 106, 0.17);
            border-radius: 4px;
            position: absolute;
            display: none;
            top: 287px;
            right: 0;
            z-index: 999;
            .img {
              width: 216px;
              height: 216px;
              // background-color: rgb(95, 16, 16);
            }
          }
        }
        .android:hover .show2 {
          display: block;
        }
      }
    }
  }
  .copyright {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);

    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(159, 171, 183, 1);
  }
  .orange {
    color: orange;
  }
  // 自定义一个动画
  // @keyframes float {
  //   0% {
  //     top: 170px;
  //   }
  //   50% {
  //     top: 200px;
  //   }
  //   100% {
  //     top: 170px;
  //   }
  // }
}
</style>

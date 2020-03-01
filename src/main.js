import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/css/index.css'
import AMap from 'vue-amap';
// import axios from 'axios'

Vue.use(ElementUI)
Vue.use(AMap)

// Vue.prototype.$axios = axios
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'f510d999ca866fcec046e0bf05431804',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});

// axios.interceptors.request.use(function (config) {
//   console.log(111)
//   // 在发送请求之前做些什么
//   // config.headers['token'] = localStorage.getItem('token')
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
// Vue.use(Blob)
// Vue.use(Export2Excel)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

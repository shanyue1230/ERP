
import axios from 'axios'
import { Message } from 'element-ui'
// import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: 'http://112.65.228.185:8004',
  // baseURL: 'http://192.168.1.32:8004',
  // baseURL: 'http://192.168.1.32:8004',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
console.log(localStorage.getItem('token'))

service.interceptors.request.use(
  config => {
    // console.log(111);
    config.headers['access-token'] = localStorage.getItem('token') || ''

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */

  response => {
    const res = response

    // if the custom code is not 20000, it is judged as an error.
    if (res.data.code === 400) {
      // Message.error(res.data.msg)
      return res
    } else if (res.data.code === 403) {
      Message.error('内容加载失败，请重试！')
      setTimeout(function () {
        window.location.href = '/login'
      }, 3000)
    } else {
      return res
    }
  }
)

export default service

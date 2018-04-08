/**
 * axios配置
 * @Creator ued-zdd
 * @Time 2017/12/13
 */
import axios from 'axios'
// import store from '@/store'  // 后期验证用
const Promise = require('es6-promise').polyfill()
const baseURL = 'http://172.16.0.218:8001/OMS/SystemManagement'
// 配置axios
axios.defaults.timeout = 6000
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/json'

// request interceptor
axios.interceptors.request.use(config => {
  // before request is sent
  // build token
  // console.log('request', config)
  return config
}, function (error) {
  // request error
  return Promise.reject(error)
})

// response interceptor
axios.interceptors.response.use(response => {
  // success
  // console.log('response', response)
  return response
}, error => {
  // response error, status: 401
  // redirect /login
  return Promise.reject(error.response.data)
})
export default axios

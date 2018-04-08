import Axios from 'axios'
import { Message } from 'element-ui'
import AppConfig from './config'

import Vue from 'vue'
import Router from '@/router'
let baseURL = AppConfig.baseUrl

// const baseURL = 'api/mock/'
// 请求时的拦截器
Axios.interceptors.request.use(
  config => {
    console.log(AppConfig)
    // 检测登陆状态
    if (!Vue.prototype.$utils.checkLogin() && Router.currentRoute.name !== 'Login') {
      // 登陆失效时，跳转/login
      Vue.prototype.$utils.loginValidate()
    } else {
      // 请求时 尚未失效则重置cookie失效时间
      // Vue.prototype.$resetCookieExpires()
    }
    return config
  },
  error => {
    // 请求异常时
    return Promise.reject(error)
  })

// 请求完成时后的拦截器
Axios.interceptors.response.use(
  response => {
    /**
     * 返回响应时
     * @return {object} response
     * @param {object} data  服务器提供的相应
     * @param {number} status  服务器响应的HTTP状态代码
     * @param {string} statusText  服务器响应的HTTP状态消息
     * @param {object} headers  服务器响应头
     * @param {object} config  axios 的配置
     * */
    return response
  },
  error => {
    // 当响应异常时
    console.log(error)
    return Promise.resolve(error.response)
  }
)

function errorState (params) {
  /**
   * 请求服务器错误处理
   * @param {object} params 参数对象
   * @param {object} params.error 请求服务器错误时的返回内容
   * @param {string} params.url 请求api地址
   * @author wyl update (2018/1/2)
   * */
  if (params.error && (params.error.status >= 200 && params.error.status <= 400)) {
    return params.error
  } else {
    // 状态码异常
    Message({
      showClose: true,
      message: `请求服务器错误，Code：${params.error.status}(${params.url})`,
      type: 'error'
    })
  }
}
function transformResponseCode (code) {
  /**
   * 转换后端数据
   * @param {string} code -1：异常错误，-2：业务逻辑错误，-3：代码错误
   * @return errType  错误类型
   * @author zdd  update (2017/12/29)
   */
  let errType = ''
  switch (code) {
    case -1:
      errType = '数据异常'
      break
    case -2:
      errType = '业务逻辑错误'
      break
    case -3:
      errType = '代码错误'
      break
    default:
      errType = '其他未知错误'
      break
  }
  return errType
}
function innerError (res, showError, url) {
  /**
   * 处理服务器内部错误
   * @param {object} res 服务器返回内容
   * @param {boolean} showError 是否显示错误
   * @param {string} url  请求aip地址
   * @author zdd update (2018/1/5)
   * */
  if (res && res.data && (res.data.code !== 1)) {
    // 异常代码处理
    let errType = transformResponseCode(res.data.code)
    // 状态码异常
    if (showError) {
      // 显示错误提示
      Message({
        showClose: true,
        message: res.data.message !== '' ? res.data.message : `错误：${errType}(${res.url})`,
        type: 'error'
      })
    } else {
      // 隐示错误提示
      console.error(`错误：${errType}(${url})`)
    }
  }
}
function successState (params) {
  /**
   * 服务器请求错误
   * @param {object} params 参数
   * @param {object} res 服务器请求错误时返回的对象
   * @param {string} url 请求api地址
   * @param {boolean} showError 是否显示服务器请求错误message
   * @author zdd update (2018/1/2)
   * */
  if (params.res && params.res.status === 200) {
    innerError(params.res, params.showError, params.url)  // 服务器请求错误
    return params.res
  } else if (params.res && params.res.status > 200) {
    // 状态码异常
    Message({
      showClose: true,
      message: `服务器请求错误，Code：${params.res.status}(${params.url})`,
      type: 'error'
    })
  }
}

export default (options, data, headers) => {
  /**
   * 从服务端获取数据
   * @param  {object} *options  【必传值】
   * @param  {string}  options.url 模块名称
   * @param  {string}  options.method 请求方法 (post or get)
   * @param  {string}  options.showError 请求错误提示，默认开启
   * @param  {object}  data 请求方法参数 选填有默认值,也可自定义
   * @param  {object}  headers 请求头 选填有默认值,也可自定义
   * @return response
   * @author wyl  update(2017-11-29)
   * */
    // 是否开启错误提示,默认开启(不传showError)
  let showError = options.showError === undefined ? true : options.showError
    // 公共参数
  let Public = {
    // 'testParam': " "
  }
    // http默认配置
  let httpDefaultOptions = {
    // 请求协议 (post or get)
    method: options.method,
    // 基础URL前缀
    baseURL,
    // 请求的api地址
    url: options.url,
    // 超时时间(ms)
    timeout: 60000,    // 设置稍长一点的时间，解决接口超时严重时，【请求被拦截】的情况
    // get 请求时带的参数
    params: Object.assign(Public, data),
    // post 请求的数据
    data: Object.assign(Public, data),
    // 请求头信息headers
    headers: headers || options.method === 'get' ? {} : {'Content-Type': 'application/json;charset=UTF-8'}
  }
    // 请求协议对应的方法
  if (options.method === 'get') {
    delete httpDefaultOptions.data
  } else {
    delete httpDefaultOptions.params
  }
    // 返回promise对象
  return new Promise((resolve, reject) => {
    Axios(httpDefaultOptions)
      .then((res) => {
        // 服务器请求处理异常
        successState({
          res,
          showError,
          url: options.url
        })
        resolve(res)
      })
      .catch((error) => {
        // http请求异常处理
        reject(error)
        errorState({
          error,
          url: options.url
        })
      })
  })
}

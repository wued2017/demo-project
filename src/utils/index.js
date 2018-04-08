/**
 * 公共函数
 * @author zdd update(2018/1/31)
 * */
import Vue from 'vue'
import Store from '@/store'
import MD5 from 'md5'
import Router from '@/router'
// 使用指令控制按钮权限
Vue.directive('has', {
  bind (el, binding) {
    if (!Vue.prototype.$has(binding.value)) {
      alert(el)
      el.parentNode.removeChild(el)
    }
  }
})
// cookie相关
const cookieArr = ['isLogin', 'userNameCopy', 'passwordCopy', 'isBrowser']  // 登录相关cookie

Vue.prototype.$resetCookieExpires = () => {
  /**
   * 重置失效时间
   * @author zdd update(2018/2/2)
   * */
  cookieArr.forEach((item) => {
    let cookieValue = Vue.prototype.$getCookie(item)
    Vue.prototype.$setCookie(item, cookieValue, Store.state.expires)
  })
}

Vue.prototype.$setCookie = (cookieName, value, expireMinute) => {
  /**
   * 设置cookie
   * @param {string} cookieName cookie名称
   * @param  value   cookieName 对应的值
   * @param {number} expires 失效时间
   * @author zdd update(2018/2/2)
   * */
  let exDate = new Date()
  exDate.setTime(exDate.getTime() + expireMinute * 60 * 1000)
  document.cookie = cookieName + '=' + value + ((expireMinute === null) ? '' : ';expires=' + exDate.toGMTString())
}

Vue.prototype.$getCookie = (name) => {
  /**
   * 获取cookie
   * @param {String} name cookieName
   * @author zdd update(2018/2/2)
   * */
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  return (arr = document.cookie.match(reg)) ? arr[2] : null
}

Vue.prototype.$delCookie = (name) => {
  /**
   * 删除cookie
   * @param {string} name cookie名称
   * @author zdd update(2018/2/2)
   * */
  let expires = new Date()
  expires.setTime(expires.getTime() - 1)
  let cookieValue = Vue.prototype.$getCookie(name)
  if (cookieValue !== null) document.cookie = name + '=' + cookieValue + ';expires=' + expires.toGMTString()
}

const reNameDocTitle = (to) => {
  /**
   * 重命名document.title(根据route.name)
   * @param {Object} to 路由跳转到的路由对象
   * @author zdd update(2018/1/31)
   * */
  let routeName = to.meta.title || to.name
  window.document.title = (routeName ? `${routeName} - ` : '') + '院内物流管理系统(药品)'
}

const md5Password = (password) => {
  /**
   * md5加密密码
   * @param {String} password 密码 (PS：加密规则有后端提供)
   * @author zdd update(2018/2/1)
   * */
  return MD5(`__${MD5(`_${password}__`).substring(2)}_`)
}
const checkLogin = () => {
  /**
   * 检测是否登陆失效
   * @author zdd update(2018/2/2)
   * */
  return !!Vue.prototype.$getCookie('isLogin')
}
const loginValidate = () => {
  /**
   * 登陆失效
   * @author zdd update(2018/2/2)
   * */
  // 修改重定向到登陆界面的提醒文本和提醒类型
  Store.commit('changeReDirectInfo', {
    text: '警告：登陆已失效，请重新登陆！',
    type: 'warning'
  })
  // 进入登陆界面
  Router.push('/login')
}
const deepCopy = (source) => {
  /**
   * 深拷贝对象或数组
   * @author zdd update(2018/2/7)
   * @return {Array/Object} sourceCopy 返回深拷贝后的数组或对象
   * */
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    if (source.hasOwnProperty(item)) {
      sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
    }
  }
  return sourceCopy
}
const enterSubmit = (method) => {
  /**
   * enter事件
   * @param {Function} method 监测到enter事件时触发的事件
   * @author zdd update(2018/2/7)
   * */
  document.onkeydown = (ev) => {
    let theEvent = ev || window.event
    if (theEvent.keyCode === 13) {
      method()
    }
  }
}
const deBounce = (method, context) => {
  /**
   * 去抖函数
   * @param {Function} method 方法
   * @param {Any} context 作用域
   * @author zdd update(2018/3/22)
   * */
  clearTimeout(method.tid)
  method.tid = setTimeout(function () {
    method.call(context)
  }, 300)
}
export default {
  checkLogin,
  loginValidate,
  reNameDocTitle,
  md5Password,
  deepCopy,
  enterSubmit,
  deBounce
}

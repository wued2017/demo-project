import Vue from 'vue'
/**
 * 根级别 mutations
 * @Creator ued-zdd
 * @Time 2017/12/12
 */
export default {
  updateUserInfo (state, data) {
    /**
     * 更新用户信息
     * @param {object} data 用户信息对象
     * @author zdd  update (2017/12/27)
     */
    Vue.set(state, 'userInfo', data)
  },
  changeReDirectInfo (state, info) {
    /**
     * 改变跳转登陆界面时
     * @param {String} text 提示信息内容
     * @author zdd update(2018/1/31)
     * */
    Vue.set(state.reDirectInfo, 'text', info.text)
    Vue.set(state.reDirectInfo, 'type', info.type)
  }
}

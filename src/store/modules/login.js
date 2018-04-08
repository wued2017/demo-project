/**
 * @module login 登录模块
 * @Creator ued-zdd
 * @Time 2017/12/27
 */
const Login = {
  namespaced: true,
  state: {
    name: 'Login',
    isShowPopover: false
  },
  getters: {
  },
  mutations: {
    togglePopover (state) {
      /**
       * 切换科室选择弹窗的开关
       * @author zdd update(2017/1/3)
       * */
      state.isShowPopover = !state.isShowPopover
    }
  },
  actions: {
  }
}
export default Login

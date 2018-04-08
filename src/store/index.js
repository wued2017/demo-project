/**
 * @Creator ued-zdd
 * @Time 2017/12/12
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import modules from './modules/index'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({ storage: window.localStorage })]
})

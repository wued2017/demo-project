/**
 * 根级别 actions
 * @Creator ued-zdd
 * @Time 2017/12/12
 */
import http from '@/services/http/httpAxios'
import apiSetting from '@/services/api'
export default {
  fetchDictionaries ({commit}, strIds = []) {
    /**
     * 请求字典列表数据
     * @param {Array} data
     * @param {Array} strId 字典ID
     * @author wyl update(1/5)
     */
    let data = {
      data: strIds.map(id => {
        return {strID: id}
      })
    }
    http(apiSetting.Dictionaries.getDictionaries, data).then(({data}) => {
      commit('settingOriginalDictionaries', data.data)
      if (data.hasOwnProperty('data')) {
        for (let item of data.data) {
          commit('settingCategoryDictionaries', {code: item.strCode, data: item.DicDetailModels})
        }
      }
    })
  }
}

import commonModule from './common'
import loginModule from './login'
//分别引入不同模块的api
export default {
  ...commonModule,
  ...loginModule
}

export default {
  // baseUrl: '/api/OMS/',
  // baseUrl: 'http://172.16.0.218:8001/OMS/',
  baseUrl: 'http://192.168.10.57:8086/OMS/', //服务器地址
  expires: 60,  // 用户登录缓存时间 单位：min
  rabbitMQ: {
    url: '192.168.10.57',
    port: 15674,
    subscribeName: '/exchange/amq.fanout',
    client: {
      name: 'admin',
      password: 'admin',
      path: 'OMS'
    }
  }
}

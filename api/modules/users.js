import request from '@/utils/request.js';

const users = {
  getUserInfo(data) {
    return request({
      url: '/user/getUserInfo',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      data
    })
  },
  // 微信用户登录 
  getToken(data) {
    return request({
      url: '/user/wxLogin',
      method: 'POST',
      data
    })
  },
  // 3.授权后更新用数据库信息
  getAuth(data) {
    // console.log('22222222', data, uni.getStorageSync('token'));
    return request({
      url: '/user/auth',
      method: 'POST',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      data
    })
  },
  // 0.套餐列表
  getTopupList() {
    return request({
      url: '/user/topupList',
      header: {
        Authorization: uni.getStorageSync('token')
      }
    })
  },
  // 3.收藏餐品
  getCollect(data) {
    return request({
      url: '/user/collect',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      method: "POST",
      data
    })
  },
  // 2.我的收藏
  getCollectId(data) {
    return request({
      url: '/user/getcollect',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      data
    })
  },
  // 4.我的点赞 user_id menu_id
  getMylike(data) {
    return request({
      url: '/user/mylike',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      method: "POST",
      data
    })
  },
  // 5.浏览餐品user_id menu_id
  getRecord(data) {
    return request({
      url: '/user/record',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      method: "POST",
      data
    })
  },
}
export default users;

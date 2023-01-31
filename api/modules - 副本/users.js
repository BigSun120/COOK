import axios from 'axios';
const users = {
  getUserInfo() {
    console.log('getUserInfotoken', uni.getStorageSync('token'));
    return axios({
      url: '/users/getUserInfo',
      method: 'GET',
      headers: {
        Authorization: uni.getStorageSync('token')
      }
    })
  },
  // 微信用户登录 
  getToken(data) {
    return axios({
      url: '/users/wxLogin',
      method: 'POST',
      data
    })
  },
}

export default users;

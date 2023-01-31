import request from '@/utils/request.js';

const vip = {
  // 1.开通会员
  BeVip(data) {
    return request({
      url: '/user/openVip',
      header: {
        Authorization: uni.getStorageSync('token')
      },
      method: 'GET',
      data
    })
  },
  // 1.最新推荐
  getNewTuiJian() {
    return request({
      url: '/vip/getRecommendMenuList',
      header: {
        Authorization: uni.getStorageSync('token')
      }
    })
  },
  // 2.限时免费
  getisFreeMenuList() {
    return request({
      url: '/vip/getisFreeMenuList',
      header: {
        Authorization: uni.getStorageSync('token')
      }
    })
  },
  //3.猜你喜欢
  getlikeMenu() {
    return request({
      url: '/vip/likeMenu',
      header: {
        Authorization: uni.getStorageSync('token')
      }
    })
  },
}

export default vip;

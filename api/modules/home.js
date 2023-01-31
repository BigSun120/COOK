import request from '@/utils/request.js';

const home = {
  getSwiperData() {
    return request({
      url: '/home/swiperdata'
    })
  },
  getCatitems() {
    return request({
      url: '/home/catitems'
    })
  },
  // 3.首页楼层接口
  getFloors() {
    return request({
      url: '/home/floorsdata'
    })
  },
  // 4.首页推荐商品
  getRecommend() {
    return request({
      url: '/home/recommend'
    })
  },
}
export default home;

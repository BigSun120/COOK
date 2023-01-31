import request from '@/utils/request.js';
const search = {
  /*  1. 菜品搜索 string
   * pageSize 每页的条数，默认为12条
   * currentPage 当前页，默认第1页
   * val 搜索值
   */
  getSearchMenu(data) {
    return request({
      url: '/search/searchMenu',
      method: 'POST',
      data
    })
  },
  // 2.菜单详情 _id 餐品 _id
  getMenuDetail(data) {
    return request({
      url: '/search/menuDetail',
      method: 'POST',
      data
    })
  },
  // 3.精品名厨视频
  getMemberRecommend() {
    return request({
      url: '/search/memberRecommend'
    })
  },
  // 4.搜索页面随机推荐
  getRender() {
    return request({
      url: '/search/memberRecommend'
    })
  },
  // 5.分类模块
  getCategories() {
    return request({
      url: '/categories'
    })
  }
}
export default search;

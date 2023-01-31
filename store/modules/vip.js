import api from '@/api'

export default {
  namespaced: true,
  state: {
    vipRecommend: null
  },

  mutations: {
    // 3.精品名厨视频
    SET_VIPRECOMMEND(state, payload) {
      state.vipRecommend = payload.message;
      // console.log('res.data', state.vipRecommend)
    },
  },
  actions: {
    // 3.精品名厨视频
    async getMemberRecommendAsync({
      commit
    }) {
      const res = await api.search.getMemberRecommend();
      if (res.meta.status == 200) {
        commit('SET_VIPRECOMMEND', res);
        // console.log('res.data', res)
      }
    }
  }

}

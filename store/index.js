import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api/index.js';

import vip from './modules/vip';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    token: null,
  },
  getters: {

  },
  mutations: {
    SET_USER_INFO(state, payload) {
      // console.log(9999, payload);
      state.userInfo = payload;
      console.log(123321, state.userInfo);
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
      console.log('state.token', state.token);
    }
  },
  actions: {
    async changeUserInfoAsync({
      commit
    }) {
      const token = uni.getStorageSync('token')
      if (!token) return;
      const res = await api.users.getUserInfo({
        token
      });
      if (res) {
        commit('SET_USER_INFO', res[0]);
      }
      console.log('changeUserInfoAsync', res);
    },
    async changeTokenAsync({
      commit
    }) {
      const token = uni.getStorageSync('token')
      if (!token) return;
      commit('SET_TOKEN', token);
      // console.log('changeUserInfoAsync', res);
    }
  },

  modules: {
    vip
  }
})

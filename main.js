import App from './App'
import store from '@/store/index.js'



import './utils/request.js'

import axios from 'axios';
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    var settle = require('axios/lib/core/settle');
    var buildURL = require('axios/lib/helpers/buildURL');
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        // console.log("执行完成：", response)
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };
        settle(resolve, reject, response);
      }
    })
  })
}

// import api from '@/api';
import api from '@/api/index.js'
Vue.prototype.$api = api;

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false

// #ifndef VUE3
import Vue from 'vue'
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

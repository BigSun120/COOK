import axios from 'axios';
const home = {
  getSwiperdata() {
    return axios({
      url: '/home/swiperdata',
    })
  },
  getCatitems() {
    return axios({
      url: '/home/catitems',
    })
  },
}

export default home;

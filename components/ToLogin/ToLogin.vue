<template>
  <view class="ALL" @click="getUserInfo" :style="toSt"></view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {

    data() {
      return {
        // userInfo: null,
        toSt: null
      }
    },
    props: ['sty'],
    mounted() {
      // console.log(111, this.sty);
      this.changeSty()
      const token = uni.getStorageSync('token');
      if (token) {
        // console.log('ttttt', token);
        // this.getUserInfo();
        this.getUserInfoTwo();

      }
    },
    computed: {
      userInfoAll() {
        // console.log('this.$store.state.userInfo2222', this.$store.state.userInfo);
        return this.$store.state.userInfo
      },

    },
    methods: {
      ...mapMutations(["SET_TOKEN", "SET_USER_INFO"]),
      // ...mapMutations(['SET_USER_INFO']),
      changeSty() {
        // this.sty = this.sty.join('').substr(1, this.sty.length - 1)
        this.toSt = JSON.stringify(this.sty).replaceAll(/[{}"]/g, '').replaceAll(/[,]/g, ';')
        // console.log(2222, this.toSt);
      },
      // 登录
      getUserInfo() {
        const token = uni.getStorageSync('token');
        if (token) return;
        uni.getUserProfile({
          desc: '用户完善个人信息',
          success: async (res) => {
            // console.log('getUserInfo666', res);
            this.$store.commit('SET_USER_INFO', res.userInfo);
            this.getCode();
          }
        })
      },
      getCode() {
        uni.login({
          success: res => {
            // console.log('res.code', res.code);
            this.getToken(res.code);
          }
        })
      },
      async getToken(code) {
        // console.log('codeee', code);
        const res = await this.$api.users.getToken({
          code,
          // userInfo: this.userInfo,
          appId: "wx2acf4ac1014e0467",
          appSecret: "8df8822e38314e9a5df9e750b289ff53"
        })
        // console.log('getToken', res);
        if (res.token) {
          // console.log(6.6, res.token);
          this.SET_TOKEN(res.token);
          // console.log('res.tokenQQQQ', res.token);
          uni.setStorage({
            key: 'token',
            data: res.token
          });

          // 用户授权
          let info = this.$store.state.userInfo;
          // console.log('info', info, res.token);
          const abc = await this.$api.users.getAuth({
            token: res.token,
            ...this.userInfoAll
            // avatarUrl: info.avatarUrl,
            // nickName: info.nickName,
            // gender: info.gender,
            // province: info.province
          })
          this.getUserInfoTwo();
          // console.log('abc', abc);
        }
      },
      async getUserInfoTwo() {
        const token = uni.getStorageSync('token');
        // console.log('Qaaa', token);
        const res = await this.$api.users.getUserInfo({
          token
        });
        // console.log('用户消息res[0]', res[0]);
        if (res) {
          this.$store.commit('SET_USER_INFO', res)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .ALL {
    z-index: 99;
    background-color: rgba(231, 94, 26, 0);
    position: absolute;

  }
</style>

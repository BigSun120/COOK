<template>
  <view class="ALL">
    <!-- 头部-->
    <view style="background-color: white;">

      <!-- 登录 -->
      <!-- <view v-if="userInfoAll" class="userHeader" @click="getUserInfo"> -->
      <view v-if="userShow" class="userHeader">
        <ToLogin :sty="sty"> </ToLogin>
        <image :src="userShow.avatarUrl" mode="" style="border-radius: 50%;"></image>
        <view class="userText">
          <span>{{userShow.nickName}}</span>
          <p>可收藏喜欢的菜谱</p>
        </view>

      </view>
      <!-- <view v-else class="userHeader" @click="getUserInfo"> -->
      <view v-else class="userHeader">
        <ToLogin :sty="sty"> </ToLogin>
        <image src="/static/image/zu428.png" mode=""></image>
        <view class="userText">
          <span>立即登录</span>
          <p>登录后可收藏喜欢的菜谱</p>
        </view>
      </view>

      <!-- 升级为VIP -->
      <view v-if="userShow.vip" class="toVip" @click="goVIP">
        <span>究极尊贵的VIP，请再续费10年把！</span>
        <h2>></h2>
      </view>
      <view v-else class="toVip" @click="goVIP">
        <span>升级为VIP</span>
        <h2>></h2>
      </view>
    </view>

    <!-- 3列表 -->
    <view class="threeTips">
      <ul>
        <li>
          <image src="../../static/@1/wode 3_slices/soucang.png" mode=""></image>
          <span>我的收藏</span>
        </li>
        <li>
          <image src="../../static/@1/wode 3_slices/mengbanzu 281.png" mode=""></image>
          <span>浏览记录</span>
        </li>
        <li>
          <image src="../../static/@1/wode 3_slices/mengbanzu282.png" mode=""></image>
          <span>点赞</span>
        </li>
      </ul>
    </view>

    <!-- 所有食材 -->
    <view class="allFood">
      <scroll-view scroll-x>
        <ul class="AFul">
          <!-- <li>所有食材</li> -->
          <li v-for="(a,index) in allFoods" :key="a._id" @tap="tggClass(index,a)"
            :class="{topic_cont_text:1,Active:index==tc}">
            {{a.name}}
          </li>
        </ul>
      </scroll-view>
    </view>
    <!-- 材料展示 -->
    <ul class="foodShowUl">
      <li v-for="(a,index) in manyFoodFive" :key="a">
        <span>{{a.name}}</span>
        <span>{{a.number}}</span>
      </li>
      <li @click="zd" class="zd">折叠否</li>
    </ul>
    <!-- 我的菜谱 -->
    <view class="myMenus">
      <h1>我的菜谱</h1>
      <scroll-view scroll-x>
        <ul>
          <!-- <li v-for="a in manyFoods.slice(1,manyFoods.length)" :key="a._id"> -->
          <li v-for="a in allFoods.slice(1,allFoods.length) " :key="a._id" @tap='goDetail(a._id)'>
            <image :src="a.coverpic" mode=""></image>
            <span class="topic_cont_text">{{a.name}}</span>
          </li>
        </ul>
      </scroll-view>
    </view>
    <!-- 评分 -->
    <view class="twoTt">
      <view class="l1">
        <image src="@/static/image/mengbanzu272.png" mode=""></image>
        <span>去App Store给本菜谱，评大分</span>
      </view>
      <view class="l2">
        <image src="@/static/image/mengbanzu273.png" mode=""></image>
        <span>禁止反馈问题</span>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        userShow: null,
        sty: {
          height: "120rpx",
          width: "100vw",
          top: "30rpx",
          "margin-right": "30rpx",
        },
        allFoodId: null,
        allFoods: [{
          name: '所有食材',
          _id: 123,
          ingredient: [{
              name: "山药",
              number: "100g"
            },
            {
              name: "西瓜",
              number: "1000g"
            },
            {
              name: "龙眼",
              number: "10个"
            },
            {
              name: "鱼头",
              number: "6个"
            },
            {
              name: "开水",
              number: "1000L"
            }
          ]
        }],
        tc: 0,
        manyFoods: null,
        manyFoodFive: [],
      }
    },
    async mounted() {
      // console.log(2222222, this.userInfo);
      if (!this.token) return;
      if (Array.isArray(this.userInfo)) {
        this.allFoodId = this.userInfo[0].mycollect;
        this.userShow = this.userInfo[0]
        await this.toAllFoods();
        // console.log(777777777, this.allFoods);
      } else {
        this.allFoodId = this.userInfo.mycollect;
        this.userShow = this.userInfo
        await this.toAllFoods();
        // console.log(888888888, this.allFoods);
      }
      console.log(777777777, this.allFoods);
      this.manyFoodFive = this.allFoods[0].ingredient;
      // console.log('this.allFoodId', this.allFoodId);
      // console.log('toAllFoods', this.allFoods);
    },
    computed: {
      ...mapState(["userInfo", "token"]),
      // userInfoAll() {
      // console.log('this.$store.state.userInfo2222', this.$store.state.userInfo);
      // return this.$store.state.userInfo
      // },
    },
    watch: {
      token: {
        async handler(nV, oV) {
          if (nV != oV) {
            const res = await this.$api.users.getUserInfo({
              token: this.token
            })
            this.allFoodId = res[0].mycollect;
            console.log(111111111111111, this.allFoodId);

            // this.allFoodId = this.userInfo.mycollect;
            // console.log(111111111111111, this.userInfo);
            await this.toAllFoods();
            // this.allFoodId = this.userInfo.mycollect;
            // console.log('this.allFoodId', this.allFoodId);
            // await this.toAllFoods();
            // console.log('toAllFoods', this.allFoods);
          }
        }
      },

      async userInfo() {
        console.log('userInfo被翻新了');
        if (!this.token) return;
        if (Array.isArray(this.userInfo)) {
          // this.allFoodId = this.userInfo[0].mycollect;
          this.userShow = this.userInfo[0]
          // await this.toAllFoods();
          // console.log(777777777, this.allFoods);
        } else {
          // this.allFoodId = this.userInfo.mycollect;
          this.userShow = this.userInfo
          // await this.toAllFoods();
          // console.log(888888888, this.allFoods);
        }
        // console.log(777777777, this.allFoods);
        // this.manyFoodFive = this.allFoods[0].ingredient;
      }
    },
    methods: {
      goVIP() {
        uni.navigateTo({
          url: "/pages/myVip/myVip"
        })
      },
	  goDetail(id){
		  uni.navigateTo({
		    url: `/pages/menuDetail/menuDetail?id=${id}`
		  })
	  },
      async toAllFoods() {
        this.allFoodId.map(async a => {
          let res = await this.$api.search.getMenuDetail({
            _id: a
          })
          // this.allFoods = [...this.allFoods, res.message[0]]
          this.allFoods.push(res.message[0])
        })
      },
      tggClass(index, a) {
        this.tc = index;
        this.manyFoods = {
          ...a
        };
        this.manyFoods = this.manyFoods.ingredient;
        this.manyFoodFive = this.manyFoods.slice(0, 5);
        console.log('this.manyFoods', this.manyFoods);
      },
      zd() {
        if (this.manyFoodFive.length == 0) return
        if (this.manyFoodFive.length > 5) {
          this.manyFoodFive = this.manyFoods.slice(0, 5);
        } else {
          this.manyFoodFive = this.manyFoods;
        }
      },
      unuse() {
        console.log(12);
        //region // 登录
        // getUserInfo() {
        //   const token = uni.getStorageSync('token');
        //   if (token) return;

        //   uni.getUserProfile({
        //     desc: '用户完善个人信息',
        //     success: async (res) => {
        //       // console.log('getUserInfo666', res);
        //       this.$store.commit('SET_USER_INFO', res.userInfo);
        //       this.getCode();
        //     }
        //   })
        // },
        // getCode() {
        //   uni.login({
        //     success: res => {
        //       console.log('res.code', res.code);
        //       this.getToken(res.code);
        //     }
        //   })
        // },
        // async getToken(code) {
        //   // console.log('codeee', code);
        //   const res = await this.$api.users.getToken({
        //     code,
        //     // userInfo: this.userInfo,
        //     appId: "wx2acf4ac1014e0467",
        //     appSecret: "8df8822e38314e9a5df9e750b289ff53"
        //   })
        //   // console.log('getToken', res);
        //   if (res.token) {
        //     // console.log('res.tokenQQQQ', res.token);
        //     uni.setStorage({
        //       key: 'token',
        //       data: res.token
        //     });

        //     // 用户授权
        //     let info = this.$store.state.userInfo;
        //     // console.log('info', info, res.token);
        //     const abc = await this.$api.users.getAuth({
        //       token: res.token,
        //       ...this.userInfoAll
        //       // avatarUrl: info.avatarUrl,
        //       // nickName: info.nickName,
        //       // gender: info.gender,
        //       // province: info.province
        //     })
        //     this.getUserInfoTwo();
        //     // console.log('abc', abc);
        //   }
        // },
        // async getUserInfoTwo() {
        //   const token = uni.getStorageSync('token');
        //   // console.log('Qaaa', token);
        //   const res = await this.$api.users.getUserInfo({
        //     token
        //   });
        //   console.log('用户消息res[0]', res[0]);
        //   if (res) {
        //     this.$store.commit('SET_USER_INFO', res)
        //   }
        //},
        //endregion
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Active {
    color: red;
  }

  .foodShowUl {
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 0 30rpx 30rpx;

    .zd {
      padding-left: 60rpx;
    }

    li {
      display: flex;
      background-color: white;
      // border-radius: 20rpx;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: 1px solid #F5F5F5;
      justify-content: space-between;

      span {
        padding: 0 30rpx;
        width: 100rpx;
        display: block;
      }
    }
  }

  .twoTt {
    width: 100%;
    height: 140rpx;
    background-color: white;
    margin: 30rpx 0;
    padding: 30rpx;

    .l1,
    .l2 {
      display: flex;
      margin-top: 20rpx;
    }

    image {
      width: 50rpx;
      height: 50rpx;

    }

    span {
      margin-left: 20rpx;
      display: block;
      height: 50rpx;
      line-height: 50rpx;
    }
  }

  .topic_cont_text {
    max-height: 100rpx;
    overflow: hidden;
    word-break: break-all;
    /* break-all(允许在单词内换行。) */
    text-overflow: ellipsis;
    /* 超出部分省略号 */
    display: -webkit-box;
    /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1;
    /** 显示的行数 **/
  }

  .ALL {
    width: 100%;
    // height: 100%;
    background-color: #F5F5F5;
  }

  .myMenus {
    // width: 100%;
    height: 400rpx;
    background-color: white;
    padding: 30rpx 0;
    margin: 30rpx 0;

    h1 {
      display: block;
      padding: 20rpx;
      font-weight: bold;
      font-size: 30rpx;
    }

    ul {
      display: flex;

      li {
        min-width: 250rpx;
        height: 400rpx;
        margin: 0 20rpx;

        image {
          width: 100%;
          height: 300rpx;
          border-radius: 20rpx;
        }

        span {
          display: block;
          height: 50rpx;
          line-height: 50rpx;
          text-align: center;
        }
      }
    }
  }

  .userHeader {
    display: flex;
    background-color: white;
    align-items: center;
    padding: 30rpx 30rpx 0;

    image {
      width: 120rpx;
      height: 120rpx;
      margin-right: 20rpx;
    }

    span {
      font-weight: bolder;
    }

    p {
      font-size: 24rpx;
      color: #666;
    }
  }

  .toVip {
    background-color: white;
    display: flex;
    justify-content: space-between;
    margin: 30rpx;
    height: 120rpx;
    background: url("../../static/@1/wode 3_slices/mengbanzu87.png");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 25rpx 100rpx 0;
    color: #B4853F;
  }

  .threeTips {
    margin: 20rpx 0;
    background-color: white;
    padding: 20rpx 30rpx;
    height: 140rpx;

    ul {
      display: flex;
      justify-content: space-between;
      margin: 30rpx;
      width: auto;

      li {
        span {
          text-align: center;
          display: block;
        }

        image {
          display: block;
          margin: 0 auto;
          width: 50rpx;
          height: 50rpx;
        }
      }
    }


  }

  .content {
    margin-top: 200rpx;
    position: absolute;
    padding: 15px;
    font-size: 14px;
    line-height: 20px;
    background-color: #f9f9f9;
    color: #666;
  }

  .AFul {
    display: flex;
    height: 100rpx;
    align-items: center;

    li {
      background-color: white;
      line-height: 100rpx;
      min-width: 200rpx;
      text-align: center;
    }
  }
</style>

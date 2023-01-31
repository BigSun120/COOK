<template>
  <view class="ALL">
    <view style="background-color: none;height: 100%;">
      <!-- 头部登录 -->
      <view class="topLogin">
        <view class="line1">
          <view class="left">
            <image v-for="(a,b) in pics" :key="b" :src="a" mode=""></image>
            <span>6666人已经开通</span>
          </view>
          <view class="right">
            <span>购买查询</span>
          </view>
        </view>
        <view v-if="!userInfoAll" class="lineMain">
          <ToLogin :sty="sty"> </ToLogin>
          <view class="toLog">
            <image src="../../static/image/images/touxiang.png" mode=""></image>
            <view class="Text">
              <view class="T1">
                <span>立即登录</span>
                <h1>非会员</h1>
              </view>
              <span>开通会员尊享VIP权益</span>
            </view>
          </view>
        </view>
        <!-- 登录后 -->
        <view v-else class="lineMain">
          <ToLogin :sty="sty"> </ToLogin>
          <view class="toLog">
            <image :src="userInfoAll[0].avatarUrl" mode="" style="border-radius: 50%;"></image>
            <view class="Text">
              <view class="T1">
                <span>{{userInfoAll[0].nickName}}</span>
                <h1>会员</h1>
              </view>
              <span>开通会员尊享VIP权益</span>
            </view>
          </view>
        </view>

      </view>
      <!-- 列表套餐 -->
      <view class="listBuy" v-if="tokenShow">
        <ul class="threeList">
          <li v-for="(a,index) in toBuy" :key="a._id" :class="['OneItem',{toActive:active==index}]"
            @click="changeActive(index)">
            <span>{{a.mouth}}个月</span>
            <h1>￥{{a.salePrice}}</h1>
            <h3>￥{{a.normalPrice}}</h3>
          </li>
        </ul>
        <view class="textGongXi">
          <h2>恭喜</h2>
          <span>您获得2折开通会员的特权！</span>
        </view>

        <view>
          <u-popup :show="show" @close="close" @open="open">
            <view>
              <view class="listBuy">
                <h1 class="getVip">开通会员</h1>
                <ul class="threeList">
                  <li v-for="(a,index) in toBuy" :key="a._id" :class="['OneItem',{toActive:active2==index}]"
                    @click="changeActive2(index,a.mouth,a.salePrice)">
                    <span>{{a.mouth}}个月</span>
                    <h1>￥{{a.salePrice}}</h1>
                    <h3>￥{{a.normalPrice}}</h3>
                  </li>
                </ul>
                <view class="textGongXi">
                  <h2>恭喜</h2>
                  <span>您获得2折开通会员的特权！</span>
                </view>
                <button @click="changeShow();toBeVip()" class="rightMowBuy">立即购买</button>
              </view>
            </view>
          </u-popup>
          <button @click="show = true" class="rightMowBuy">立即开通</button>
        </view>
      </view>
      <!-- VIP特权说明 -->
      <view class="VIPJieShi">
        <h1>VIP特权</h1>
        <ul>
          <li>
            <image src="@/static/image/images/caipu.png" mode=""></image>
            <view>
              <h2>1000+精品名厨菜谱</h2>
              <span>大咖教学，轻松学会</span>
            </view>
          </li>
          <li>
            <image src="@/static/image/images/new.png" mode=""></image>
            <view>
              <h2>每周上新</h2>
              <span>菜品持续更新</span>
            </view>
          </li>
          <li>
            <image src="@/static/image/images/ad.png" mode=""></image>
            <view>
              <h2>会员免广告打扰</h2>
              <span>体验更轻松</span>
            </view>
          </li>
          <li>
            <image src="@/static/image/images/biaoshi.png" mode=""></image>
            <view>
              <h2>VIP尊贵身份标识</h2>
              <span>随时随地、与众不同</span>
            </view>
          </li>
        </ul>
      </view>
      <!-- 会员使用说明 -->
      <view class="toShuoMing">
        <h1>会员使用说明</h1>
        <p> 1.会员服务一经开通，不支持退款;</p>
        <p> 2.如遇到苹果手机支付问题,建议参考Apptore支付流程;</p>
        <p> 3.若会员开通出现异常,请立即联系客服，我们会在2个工作日内出处理结果。</p>
        <p> 4.会员常见问题、会员服务协议、会员隐私协议。</p>
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
        pics: ["../../static/image/images/tupian1.png", "../../static/image/images/tupian2.png",
          "../../static/image/images/tupian3.png", "../../static/image/images/tupian4.png",
          "../../static/image/images/tupian5.png", "../../static/image/images/tupian6.png",
        ],
        sty: {
          height: "300rpx",
          width: "100vw",
          top: "120rpx",
          "margin-right": "30rpx",
        },
        tokenShow: null,
        toBuy: null,
        active: 0,
        active2: 0,
        show: false,
        openVip: {
          date: '12',
          _id: null
        },
        pay: '45'
      }
    },
    computed: {
      ...mapState(['token', 'userInfo']),
      userInfoAll() {
        // console.log('this.$store.state.userInfo2222', this.$store.state.userInfo);
        return this.$store.state.userInfo
      },
    },
    async onLoad() {
      await this.getTopupList();
    },

    watch: {
      token() {
        this.getTopupList();
        this.tokenShow = this.token;
        // console.log(6666, '-', 66);
      }
    },
    methods: {
      // ...mapMutations(['SET_USER_INFO']),
      async getTopupList() {
        // console.log('bbb', this.tokenShow);
        // if (this.tokenShow == null) return;
        const res = await this.$api.users.getTopupList();
        this.toBuy = res.data;
        // this.tokenShow = this.token;
        this.tokenShow = uni.getStorageSync('token');
        console.log(' this.token', this.token);
      },
      changeActive(id) {
        // console.log(id);
        this.active = id;
      },
      changeActive2(id, date, pay) {
        // console.log(id);
        this.active2 = id;
        this.openVip.date = `${date}`;
        this.pay = pay;
        // console.log('this.openVip.date', this.openVip.date);
      },
      open() {
        // console.log('open');
      },
      close() {
        this.show = false
        // console.log('close');
      },
      changeShow() {
        this.show = true
      },
      async toBeVip() {
        console.log('aaaa');
        console.log('11userInfo', this.userInfo);
        this.openVip._id = this.userInfo[0]._id;
        console.log('this.openVip', this.openVip);
        const res = await this.$api.vip.BeVip(this.openVip);
        console.log('resssss', res);
        if (res.code) {
          await uni.showToast({
            title: '支付成功',
            duration: 2000
          });
          uni.navigateTo({
            url: `/pages/payed/payed?pay=${this.pay}`
          })
        } else {
          uni.showToast({
            icon: "error",
            title: '支付失败',
            duration: 2000
          });
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .ALL {
    width: 100%;
    // height: 100%;
    background-color: #F5F7FA;
  }

  .topLogin {
    height: 350rpx;
    background-color: white;
    // overflow: hidden;
    background-image: url("../../static/image/images/huiyuanbeijing.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .line1 {
      height: 70rpx;
      padding-top: 20rpx;
      margin: 0 0 20rpx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        width: 400rpx;
        height: 60rpx;
        background-color: rgba(255, 255, 255, 0.5);
        display: flex;
        align-items: center;
        padding-left: 30rpx;
        border-top-right-radius: 50rpx;
        border-bottom-right-radius: 50rpx;

        image {
          margin-left: -10rpx;
          width: 40rpx;
          height: 40rpx;
          // background-color: red;
          border-radius: 50%;
        }

        span {
          font-size: 25rpx;
          color: white;
          display: block;
          margin-left: 10rpx;
        }
      }

      .right {
        color: white;
        margin-right: 30rpx;
      }
    }

    .lineMain {
      // position: absolute;
      // background-color: darkred;
      background-image: url("../../static/image/images/huiyuan108.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 300rpx;
      margin: 30rpx 0;
      overflow: hidden;

      .toLog {
        // background-color: red;
        display: flex;
        margin-top: 60rpx;
        width: 550rpx;
        justify-content: center;
        align-items: center;

        .Text {
          margin: 20rpx;
          display: flex;
          flex-direction: column;

          span {
            color: #886930;
            font-size: 26rpx;
            line-height: 50rpx;
          }

          .T1 {
            display: flex;

            span {
              font-weight: bolder;
              color: #886930;
              font-size: 38rpx;
              line-height: 38rpx;
              display: block;
            }

            h1 {
              display: block;
              width: 100rpx;
              font-size: 26rpx;
              text-align: center;
              border-radius: 20rpx;
              margin-left: 10rpx;
              background-color: #A5A5A5;
              color: white;
            }
          }
        }
      }

      image {
        width: 120rpx;
        height: 120rpx;
      }
    }

  }

  .getVip {
    position: absolute;
    top: 30rpx;
    left: 40%;
    font-size: 36rpx;
    font-weight: bold;
  }

  .listBuy {
    width: 100%;
    // height: 220rpx;
    background-color: white;
    padding-bottom: 20rpx;
  }

  .threeList {
    margin-top: 100rpx;
    display: flex;
    justify-content: space-evenly;
    background-color: white;

    .OneItem {
      display: flex;
      flex-direction: column;
      // background-color: white;
      margin: 30rpx 0;
      width: 190rpx;
      height: 220rpx;
      justify-content: center;
      align-items: center;
      border-radius: 20rpx;
      border: 1px solid #B5B1B2;

      span {
        font-size: 30rpx;
        font-weight: bolder;
        line-height: 60rpx;
      }

      h1 {
        font-size: 45rpx;
        font-weight: bolder;
        color: #DEB264;
      }

      h3 {
        font-size: 30rpx;
        color: #B5B1B2;
        text-decoration: line-through;
      }
    }
  }

  // 动态标签
  .toActive {
    z-index: 8;
    background-color: rgba(222, 178, 100, 0.5);
    position: relative;

    &:before {
      content: '推荐';
      width: 80rpx;
      line-height: 50rpx;
      height: 50rpx;
      // background-color: red;
      text-align: center;
      font-size: 24rpx;
      color: white;
      font-weight: bolder;
      background-image: url('@/static/image/images/tuijian.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      top: -30rpx;
    }
  }

  .textGongXi {
    display: flex;
    margin: 0 50rpx;

    h2 {
      display: block;
      background-image: url('@/static/image/images/gongxi.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 80rpx;
      font-size: 26rpx;
      color: #B1955C;
      text-align: center;
    }

    span {
      font-size: 26rpx;
      color: #B1955C;
    }
  }

  .rightMowBuy {
    margin: 20rpx 50rpx;
    background-color: #FCF1D3;
    border: none;
    outline: none;
    color: #B2985E;
    font-weight: bolder;

  }

  .VIPJieShi {
    padding: 0 30rpx;
    background-color: white;
    // margins-bottom: 30rpx;

    h1 {
      font-size: 40rpx;
      font-weight: bolder;
      margin: 20rpx 0;
    }

    image {
      width: 80rpx;
      height: 80rpx;
    }

    >ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      li {
        width: 100%;
        background-color: white;
        display: flex;
        margin-left: 30rpx;
        height: 100rpx;
        align-items: center;

        >view {
          margin-left: 30rpx;

          h2 {
            color: #494949;
            font-weight: bolder;
          }

          span {
            font-size: 24rpx;
            color: #C6C6C6;
          }
        }
      }
    }
  }

  .toShuoMing {
    background-color: white;
    margin: 32rpx 0;
    padding: 0 30rpx;
    padding-bottom: 30rpx;

    h1 {
      margin-bottom: 20rpx;
      font-size: 36rpx;
      font-weight: bolder;
    }

    p {
      color: #B7B7B7;
      line-height: 40rpx;
      font-size: 26rpx;
    }
  }
</style>

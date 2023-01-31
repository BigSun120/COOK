<template>
  <view class="ALL">
    <view class="header">
      <image class="img1" src="@/static/image/images/wancheng.png" mode=""></image>
      <span>支付成功</span>
      <span>已支付￥{{pay}}</span>
      <view class="img2">
        <image class="img3" src="@/static/image/images/wanchengtupian.png" mode=""></image>
      </view>
    </view>
    <view class="main">
      <span>立即分享 领取豪礼</span>
      <button open-type="share">立即分享</button>
      <button @click="backHome">返回首页</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        pay: null,
      }
    },
    onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
      // console.log(123, option.pay); //打印出上个页面传递的参数。
      this.pay = option.pay;
    },
    methods: {
      backHome() {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ALL {
    height: 100%;
    width: 100%;
    background-color: white;
  }

  .header {
    background: url('@/static/image/images/di.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 400rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img1 {
      width: 100rpx;
      height: 100rpx;
    }

    .img2 {
      position: absolute;
      bottom: -100rpx;
      width: 230rpx;
      height: 230rpx;
      background-color: aqua;
      background: url('@/static/image/images/zhingjia.png');
      background-size: 100% 100%;

    }

    .img3 {
      display: block;
      margin: 20rpx auto;
      width: 200rpx;
      height: 200rpx;
    }

    span {
      color: white;
      display: block;
      font-size: 40rpx;
      line-height: 80rpx;
    }
  }

  .main {
    margin-top: 150rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 35rpx;
      color: #5F5F5F;
      font-weight: bold;
    }

    button {
      margin: 30rpx;
      width: 500rpx;
      border-radius: 50rpx;
      border: 1px solid #FFA522;

      &:nth-child(2) {
        background-color: #FFA522;
        color: white;
      }

      &:last-child {
        background-color: white;
        color: #FFA522;
      }
    }


  }
</style>

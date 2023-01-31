<template>
  <view class="ALL">
    <!-- 判断是否登录 -->
    <view v-if="token==null" class="isVip">
      <view class="login">
        <ToLogin :sty="sty"></ToLogin>
        <button>立即登录</button>
      </view>
    </view>

    <!-- 头部导航栏 -->
    <view class="headerShow">
      <u-tabs :list="listShow" lineWidth="30" lineColor="#f56c6c" :activeStyle="{
                    color: '#303133',
                    fontWeight: 'bold',
                    transform: 'scale(1.05)'
                }" :inactiveStyle="{
                    color: '#606266',
                    transform: 'scale(1)',
                }" itemStyle="padding-left: 15px; padding-right: 15px; height: 50px;">
      </u-tabs>
    </view>
    <!-- 卡片 -->
    <view class="vipCard">
      <view class="top">
        <image class="img1" src="@/static/image/images/juxing98ccc.png" mode=""></image>
        <view class="vcHeader">
          <!-- <image class="img2" src="@/static/image/images/zu431.png" mode=""></image> -->
          <image class="img2" :src="userInfoShow.avatarUrl" style="border-radius: 50%;" mode=""></image>
          <view>
            <view class="line1">
              <span>欢迎你，{{userInfoShow.nickName}}</span>
              <button v-if="userInfoShow.vip==false">开通</button>
              <button v-else>续费</button>
            </view>
            <p>8元开通VIP，畅学独家菜谱</p>
          </view>
        </view>
      </view>
      <view class="bottom">
        <ul>
          <li>
            <image src="@/static/image/mengbanzu254.png" mode=""></image>
            <span>名厨课程</span>
          </li>
          <li>
            <image src="@/static/image/mengbanzu255.png" mode=""></image>
            <span>无广告打扰</span>
          </li>
          <li>
            <image src="@/static/image/mengbanzu256.png" mode=""></image>
            <span>身份标识</span>
          </li>
        </ul>
      </view>
    </view>
    <!-- vip最新推荐 -->
    <h4>VIP最新推荐</h4>
    <VipMenusList v-if="NewTuiJian!=null" :toShow="NewTuiJian"></VipMenusList>
    <h4>限时免费体验</h4>
    <VipMenusList v-if="LinShiGong!=null" :toShow="LinShiGong"></VipMenusList>
    <h4>猜你喜欢</h4>
    <VipMenusList v-if="doULike!=null" :toShow="doULike"></VipMenusList>

  </view>


</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        sty: {
          width: '250rpx',
          height: '90rpx',
          'border-radius': '50rpx',
        },
        listShow: [{
          name: '推荐'
        }, {
          name: '免费体验'
        }],
        NewTuiJian: null,
        LinShiGong: null,
        doULike: null,
		userInfoShow:null,
      }
    },
    async onLoad() {
      await this.changeUserInfoAsync();
      await this.changeTokenAsync();
      // console.log(6666, this.userInfo, this.token);
      await this.getShowList();
      await this.getNewTuiJian();
      await this.getisFreeMenuList();
      await this.getlikeMenu();
      // await this.changeUserInfoAsync()
      // console.log('userInfoq2qw', this.userInfo);
    },
    computed: {
      ...mapState(['userInfo', 'token'])
    },
	watch:{
		userInfo(){
			console.log('vip页面监测到userInfo变动了！',this.userInfo);
			if(Array.isArray(this.userInfo)){
				this.userInfoShow=this.userInfo[0]
			}else{
				this.userInfoShow=this.userInfo
			}
		}
	},
    methods: {
      ...mapMutations(['SET_USER_INFO']),
      ...mapActions(['changeUserInfoAsync', 'changeTokenAsync']),
      async getShowList() {
        const res = await this.$api.home.getCatitems();
        this.listShow = [...this.listShow, ...res.message];
        // console.log('this.listShow', this.listShow);
      },
      async getNewTuiJian() {
        const res = await this.$api.vip.getNewTuiJian();
        if (res.meta.status != 200) return;
        this.NewTuiJian = [...res.menus];
        // console.log('this.NewTuiJian', this.NewTuiJian);
      },
      async getisFreeMenuList() {
        const res = await this.$api.vip.getisFreeMenuList();
        if (res.meta.status != 200) return;
        this.LinShiGong = [...res.menus];
        // console.log('this.NewTuiJian', this.NewTuiJian);
      },
      async getlikeMenu() {
        const res = await this.$api.vip.getlikeMenu();
        if (res.meta.status != 200) return;
        this.doULike = [...res.menus];
        // console.log('this.NewTuiJian', this.NewTuiJian);getlikeMenu
      },
    }
  }
</script>

<style lang="scss" scoped>
  .ALL {
    width: 100%;
    height: 100%;
  }

  .isVip {
    z-index: 2;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background-color: #EE7B2D;
      color: white;
      width: 250rpx;
      border-radius: 50rpx;
    }

  }

  .headerShow {
    width: 100%;


    ul {
      display: flex;

      li {
        text-align: center;

        min-width: 150rpx;
        line-height: 100rpx;
        width: 150rpx;
        height: 100rpx;
        background-color: pink;
      }
    }
  }

  .vipCard {
    height: 320rpx;
    margin: 30rpx 30rpx;
    position: relative;

    .img1 {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
    }

    .img2 {
      width: 120rpx;
      height: 120rpx;
    }

    .vcHeader {
      display: flex;
      flex-wrap: nowrap;
      margin: 0 30rpx;
      padding-top: 30rpx;
      align-items: center;

      p {
        display: block;
        align-items: center;
        margin-left: 20rpx;
        color: white;
        margin-top: 20rpx;
        // height: 40px;
        // line-height: 40rpx;
      }

      .line1 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-left: 20rpx;

        span {
          color: #939393;
          font-size: 22rpx;
        }
      }

      button {
        width: 100rpx;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 20rpx;
        background-color: #ECC6AA;
        border-radius: 25rpx;
        color: #76401F;
      }
    }

    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100rpx;
      background-color: red;
      background: url('@/static/image/images/juxing238.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;

      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;

        li {
          // background-color: red;
          color: #8A827B;
          display: flex;
          flex-direction: column;
          align-items: center;

          image {
            width: 40rpx;
            height: 40rpx;
          }
        }
      }
    }
  }

  h4 {
    display: block;
    padding-left: 30rpx;
    font-weight: bold;
  }
</style>

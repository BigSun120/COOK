<template>
  <view>
    <!-- 头部 -->
    <view class="header">
      <!-- 状态栏 -->
      <view class="status-bar" :style="{height: statusBarHeight+'px'}"></view>
      <!-- 导航栏内容 -->
      <view class="content">
        <image @click="goBack" src="@/static/@1/caipusousuo_slices/zuocequyu .png" mode=""></image>
        <span>{{toShow.name}}</span>
      </view>
      <div class='imgTwo'>
        <image src="@/static/@1/midouyichu _slices/zhuanfa.png" mode=""></image>
        <image v-if="xh" @tap="tagMylike" src="@/static/@1/caunbeilaingfanyichu_slices/zzdxh.png" mode=""></image>
        <image v-else @tap="tagMylike" src="@/static/@1/caunbeilaingfanyichu_slices/xuhuan.png" mode=""></image>
      </div>
    </view>

    <!-- 中间会员部分 -->
    <view class="centerImg">

      <!-- 未登录 -->
      <view v-if="token==null" class="logined">
        <view class="outWin">
          <span>开通会员观看视频做法</span>
		  <navigator url="/pages/mine/mine" open-type="switchTab" hover-class="other-navigator-hover">
		  	 <!-- <button type="default">跳转tab页面</button> -->
			<button>立即开通</button>
		  </navigator>
          <!-- <ToLogin :sty="sty"></ToLogin> -->
		  	<navigator url="/pages/mine/mine" open-type="switchTab" hover-class="other-navigator-hover">
		  		 <!-- <button type="default">跳转tab页面</button> -->
					<span>已是会员，立即登录 > </span>
			</navigator>
        </view>
        <image :src="toShow.coverpic" mode=""></image>
      </view>

      <!-- 已登录，非会员 -->
      <view v-else-if="token && (userMsg.vip!=true)" class="logined">
        <view class="outWin">
          <span>开通会员观看视频做法</span>
          <button @click="goVip">立即开通</button>
          <span>已登录，立即续费 > </span>
        </view>
        <image :src="toShow.coverpic" mode=""></image>
      </view>
      <!-- 已登录，是会员 -->
      <view v-else-if="token && (userMsg.vip==true)" class="logined">
        <!-- <image :src="toShow.coverpic" mode=""></image> -->
        <video :src="videVip"></video>
      </view>

      <div class="toBuy">
        <span>会员低至2元/月，免广告、看10000+名厨视频</span>
      </div>
      <span class="cenTerTitle">{{toShow.name}}</span>
      <div class="threeTips">
        <!-- 会员部分 -->
        <div class="alVip">
          <span>会员专享</span>
          <image src="../../static/image/vip-o.png" mode=""></image>
        </div>
        <div class="Two">
          <span>{{toShow.pageview}}浏览</span>
          <image src="../../static/@1/caipusousuo_slices/mengbanzu278.png" mode=""></image>
        </div>
        <div class="Three" @tap='collect'>
          <span>{{toShow.collections}}收藏</span>
          <image v-if="sel" src="../../static/@1/caipusousuo_slices/sccg.png" mode=""></image>
          <image v-else src="../../static/@1/caipusousuo_slices/mengbanzu279.png" mode=""></image>
        </div>
      </div>
    </view>

    <!-- 清单部分 -->
    <view class="main">
      <view class="mainTitle">
        <view>
          <image src="../../static/image/shijian.png" mode=""></image>
          <span>{{toShow.needtime}}分钟以上</span>
        </view>
        <view>
          <image src="../../static/image/xing.png" mode=""></image>
          <span>{{changeLevel()}}</span>
        </view>
      </view>
      <view class="mainList">
        <div class="ulTitle">
          <span style="font-weight: bolder;">用料</span>
          <span class="out">移出采购清单</span>
        </div>
        <ul>
          <li v-for="(a ,b) in ingredient" :key="b">
            <span>{{a.name}}</span>
            <span>{{a.number}}</span>
          </li>
        </ul>
      </view>
    </view>

    <!-- VIP展示 图片部分 -->
    <view v-if="token&&userInfo.vip==true" class="VIP">
      <div class="steps" v-for="(a,index) in toShow.method" :key="index">
        <span>步骤{{index+1}}</span>
        <image :src="a.img" mode="" @click="changeBig=!changeBig"></image>
        <!-- <img class="toBIG" v-show="changeBig" @click="changeBig=!changeBig" :src="a.img" alt=""> -->
        <p>{{a.describe}}</p>
      </div>
    </view>
    <!-- 小贴士 -->
    <view class="smTips">
      <div>
        <span>小贴士</span>
        <p v-for="(a,index) in toShow.tips" :key="index">{{a.tipdescribe}}</p>
      </div>
    </view>
    <!-- 相关菜谱 -->
    <view class="recommend">
      <view v-if="recommendList!=null" v-for="(a,index) in recommendList" :key="a._id">
        <Recommend :LIST="recommendList[index]"></Recommend>
      </view>
    </view>
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
        menuDetailId: '',
        toShow: null,
        statusBarHeight: 0,
        ingredient: [],
        recommendList: null,
        changeBig: 0,
        sty: {
          width: '300rpx',
          height: '50rpx',
          bottom: '90rpx',
          left: '230rpx'
        },
        videVip: null,
        userMsg: null,
        sel: false,
        xh: false,
        // level: this.toShow.grade
      }
    },
    onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
      console.log('option.id:::',option.id); //打印出上个页面传递的参数。
      this.menuDetailId = option.id;
      await this.getMenuDetail();
      await this.getStateBarHeight();

      await this.getRecommend();
      await this.changeUserInfoAsync()
      await this.changeTokenAsync()
      console.log('stttt', this.userInfo, this.token);
      await this.getSel();

      await this.getMylike();
      await this.recordItem();

      // let pages = getCurrentPages(); // 当前页面
      // let beforePage = pages[pages.length - 2]; // 前一个页面
      // beforePage.$vm.init(this.unid);
      // uni.navigateBack({
      //   delta: 1
      // });
      // if (this.userMsg) return;
      // this.userMsg = this.userInfo;
      // console.log(' this.userMsg', this.userMsg);
    },
    computed: {
      ...mapState(['userInfo', 'token'])
    },
    watch: {
      async userInfo() {
        // if (this.userMsg) return
        this.userMsg = this.userInfo[0];
        // console.log('userInfo改变了', this.userInfo);
      },
      async userMsg() {
        // if (this.userMsg) return
        // console.log('userMsg改变了', this.userMsg);
        await this.getMenuDetail();
      }
    },
    methods: {
      ...mapMutations(['SET_USER_INFO']),
      ...mapActions(['changeUserInfoAsync', 'changeTokenAsync']),
      async getMenuDetail() {
        const res = await this.$api.search.getMenuDetail({
          _id: this.menuDetailId
        })
        this.toShow = res.message[0];
        console.log('toShow', this.toShow);
        this.changeLevel(this.toShow.grade);
        this.ingredient = this.toShow.ingredient;
        this.videVip = this.toShow.vid;
        if (this.userMsg) return;
        this.userMsg = this.userInfo;

        // console.log('getMenuDetail', res);
      },
      goVip() {
        uni.navigateTo({
          url: '/pages/myVip/myVip'
        })
      },
      // 获取状态栏高度
      getStateBarHeight() {
        this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
        console.log(this.statusBarHeight);
      },
      goBack() {
        uni.navigateBack({
          delta: 1
        });
      },
      changeLevel(num) {
        switch (num) {
          case '2':
            return "中级";
          case '3':
            return "高级";
          case '4':
            return "高高级";
          case '5':
            return "特级";
          case '6':
            return "特高级";
          default:
            return "顶级";
        }
      },
      // 4.首页推荐商品
      async getRecommend() {
        const res = await this.$api.home.getRecommend();
        if (res.meta.status == 200) {
          this.recommendList = res.message;
          // console.log('this.recommendList', this.recommendList);
        }
      },

      // 获取收藏
      async getSel() {
        const aaa = await this.$api.users.getCollectId({
          _id: this.userInfo._id
        })
        // console.log('aaa', aaa);
        if (aaa && aaa.meta.status == 200) {
          let tt = aaa.mycollect.some(a => {
            // console.log(a._id, this.menuDetailId);
            return a._id == this.menuDetailId
          })
          // console.log('tttttttttttttttt', tt);
          if (tt) this.sel = true;
          // if(aaa.mycollect)
        }
      },
      // 点击收藏
      async collect() {
        // console.log('点击了收藏', this.menuDetailId, this.userInfo._id);
        this.getSel();
        // this.menuDetailId
        const res = await this.$api.users.getCollect({
          user_id: this.userInfo._id,
          menu_id: this.menuDetailId
        })
        // console.log('collect',res);
        if (res.code) {
          uni.showToast({
            title: '收藏成功',
            duration: 2000
          });
          this.sel = true;
          this.getMenuDetail();
          this.changeUserInfoAsync()
        } else {
          uni.showToast({
            title: '取消收藏成功',
            duration: 2000
          });
          this.sel = false;
          this.getMenuDetail();
          this.changeUserInfoAsync()
        }
      },
      // 获取点赞
      async getMylike() {
        // console.log('默认执行的点赞', this.menuDetailId, this.userInfo._id);
        const res = await this.$api.users.getMylike({
          user_id: this.userInfo._id,
          menu_id: this.menuDetailId
        })
        // console.log('getMylike', res);
        // 默认不喜欢，如果返回修改到喜欢会得到code=1，说明数据库中是不喜欢的；
        // 默认不喜欢，如果返回修改到不喜欢得到code=0，说明数据库中是喜欢的
        if (res.code) {
          await this.$api.users.getMylike({
            user_id: this.userInfo._id,
            menu_id: this.menuDetailId
          })
        } else if (!res.code) {
          this.xh = true;
          await this.$api.users.getMylike({
            user_id: this.userInfo._id,
            menu_id: this.menuDetailId
          })
        }
      },
      // 点击点赞
      async tagMylike() {
        // console.log('点击了喜欢', this.menuDetailId, this.userInfo._id);
        const res = await this.$api.users.getMylike({
          user_id: this.userInfo._id,
          menu_id: this.menuDetailId
        })
        this.xh = !this.xh;
        // console.log('tagMylike', res);
      },
      // 5.浏览餐品
      async recordItem() {
        const res = await this.$api.users.getRecord({
          user_id: this.userInfo._id,
          menu_id: this.menuDetailId
        })
        console.log('浏览了商品', res);
      }
    },

  }
</script>

<style lang="scss" scoped>
  .toBIG {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .header {
    .status-bar {
      background-color: #EE7B2D;
    }

    .imgTwo {
      background-color: #EE7B2D;
      width: 100%;
      height: 40rpx;

      image {
        display: block;
        float: right;
        width: 40rpx;
        height: 40rpx;

        &:nth-child(1) {
          padding-right: 20rpx;
        }
      }

    }

    .content {
      height: 80rpx;
      background-color: #EE7B2D;
      display: flex;

      span {
        line-height: 100rpx;
        text-align: center;
        color: white;
        font-weight: bolder;
      }

      image {
        height: 100rpx;
        width: 300rpx;
      }
    }
  }

  .centerImg {
    width: 100%;
    height: 700rpx;
    // background-color: pink;

    image {
      width: 100%;
      height: 400rpx;
    }

    .toBuy {
      margin: 20rpx 40rpx;
      height: 80rpx;
      background-color: #EDBF73;
      border-radius: 20rpx;

      >span {
        color: white;
        line-height: 80rpx;
        display: block;
        width: 100%;
        text-align: center;
      }
    }

    .alVip {
      display: flex;

      image {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .cenTerTitle {
      display: block;
      width: 100%;
      // background-color: red;
      text-align: center;
      font-size: 35rpx;
      font-weight: bolder;
      margin: 50rpx auto;
    }

    .threeTips {
      display: flex;
      width: 100%;
      // background-color: aquamarine;
      justify-content: center;

      .alVip,
      .Two,
      .Three {
        margin: 0 20rpx;

        image {
          margin-left: 10rpx;
        }
      }

      .Two,
      .Three {
        display: flex;
        align-items: center;

        image {
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
  }

  .main {
    width: 100%;
    // background-color: forestgreen;
  }

  .uni-group {
    display: flex;
    align-items: center;
  }

  .mainTitle {
    margin: 40rpx 0;
    display: flex;
    justify-content: center;

    >view {
      width: 180rpx;
      text-align: center;
    }

    image {
      width: 30rpx;
      height: 30rpx;
    }
  }

  .mainList {
    margin: 40rpx;

    .ulTitle {
      height: 80rpx;
      line-height: 80rpx;
    }

    .out {
      display: block;
      float: right;
      color: #ccc;
      font-size: 25rpx
    }

    >ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 100%;
        // background-color: pink;
        height: 80rpx;
        border-bottom: 1px solid #ccc;

        span {
          line-height: 80rpx;
          display: inline-block;
          width: 50%;
        }
      }
    }
  }

  .VIP {
    margin: 30rpx;
  }

  .steps {
    // background-color: pink;
    margin: 20rpx;

    span {
      font-weight: bolder;
      font-size: 30rpx;
    }

    image {
      width: 100%;
      height: 450rpx;
      // background-color: #EE7B2D;
    }

    p {
      color: #686868;
      font-size: 25rpx;
    }
  }

  .smTips {
    margin: 30rpx;
    background-color: #EAEAEA;
    border-radius: 20rpx;

    >div {
      padding: 35rpx;

      span {
        margin: 20rpx 0;
        font-weight: bolder;
      }

      p {
        margin: 20rpx 0;
        font-size: 25rpx;
        display: block;
        color: #686868;
      }
    }
  }

  .recommend {
    margin: 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // background-color: pink;
  }

  // 会员登录
  .logined {
    width: 100%;
    height: 400rpx;
    position: relative;

    .outWin {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        display: block;
        margin: 20rpx 0;
        color: white;
        font-size: 30rpx;

      }

      button {
        border-radius: 50rpx;
        width: 250rpx;
        background-color: #EFD9B7;
        color: #76401F;
        font-weight: bold;
      }
    }

    image,
    video {
      width: 100%;
      height: 100%;
    }
  }
</style>

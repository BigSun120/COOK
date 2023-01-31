<template>
  <view>
    <!-- 头部 -->
    <header>
      <view>
        <h1>究极菜谱大全</h1>
        <h2>程序员做菜必备菜谱</h2>
      </view>
      <view class="search">
        <img v-show="!toSearch" src="@/static/@1/caipusousuo_slices/mengbanzu 2.png" alt="">
        <input type="text" v-model="toSearch" name="" placeholder="搜索" placeholder-style="padding-left:45%;color:#ccc"
          id="">
      </view>
    </header>
    <!-- 轮播图 -->
    <view class="swipeCenter">
      <Swiper v-if="swiperListToCh!=null" height="height:300rpx" :SWIPER="swiperListToCh"> </Swiper>
    </view>
    <!-- 分类接口 -->
    <view class="typeShow">
      <ul>
        <li v-for="(a,index) in catitemsShow" :key="a._id">
          <view v-if="index<9" @click="goMeanSearch(a.name)">
            <image :src="a.image_src" alt="" />
            <span>{{a.name}} </span>
          </view>
          <view v-else>
            <image :src="a.image_src" @click="goCategoriest" alt="" />
            <span>{{a.name}} </span>
          </view>
        </li>

      </ul>
    </view>
    <!-- 小轮播图 组合-->
    <view class=" leftBto">
      <view class="smSwiper" v-for="(a,index) in floorsdata" :key="a._id">
        <view v-if="index==0">
          <div class="text">{{a.floor_title}}</div>
          <Swiper class="SW" v-if="smSwiper!=null" height="height:360rpx" :SWIPER="smSwiper">
          </Swiper>

        </view>
        <view v-else class="leftBtoTwo">
          <div class="text">{{a.floor_title}}</div>
          <image class="smImg" :src="a.floor_imgs" mode="" />
        </view>
      </view>
    </view>
    <!-- 首页推荐商品 -->
    <div class="recommend">
      <view v-if="recommendList!=null" v-for="(a,index) in recommendList" :key="a._id">
        <Recommend :LIST="recommendList[index]"></Recommend>
      </view>
    </div>
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
        title: 'Hello',
        toSearch: '',
        catitemsShow: null,
        swiperListToCh: null,
        floorsdata: null,
        smSwiper: null,
        recommendList: null,
      }
    },
    onLoad() {},
    onShow() {
      // console.log(998); 
    },
    computed: {
      ...mapState(['token', 'userInfo'])
    },
    async mounted() {
      this.getSwiper();
      this.getCatitems();
      this.getFloors();
      this.getRecommend();
    },
    watch: {
      // userInfo: {
      //   handle(a, b) {
      //     if (a != b) {
      //       console.log('userInfo改变了');
      //     }
      //   },
      //   deep: true
      // }
      async userInfo() {
        // console.log('userInfo改变了');
        await this.getRecommend()
      }
    },
    methods: {
      async getSwiper() {
        // 轮播图
        const res = await this.$api.home.getSwiperData();
        if (res.meta.status == 200) {
          this.swiperListToCh = res.message;
          // console.log('res.FAT.swiperListToCh', this.swiperListToCh);
        }
      },
      // 首页分类接口
      async getCatitems() {
        const res = await this.$api.home.getCatitems();
        if (res.meta.status == 200) {
          this.catitemsShow = res.message;
        }
      },
      // 首页楼层接口
      async getFloors() {
        const res = await this.$api.home.getFloors();
        if (res.meta.status == 200) {
          this.floorsdata = res.message;
          // 传轮播图
          this.smSwiper = res.message[0].floor_imgs;
          // console.log('this.floorsdata', this.floorsdata);
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
      // 去商品搜索
      goMeanSearch(name) {
        console.log('name', name);
        uni.navigateTo({
          url: `/pages/searchMenu/searchMenu?name=${name}`
        });
      },
      // 去 分类信息
      goCategoriest() {
        // console.log('name', name);
        uni.navigateTo({
          url: `/pages/categories/categories`
        });
      },
      reload() {
        // 页面重载
        const pages = getCurrentPages()
        // 声明一个pages使用getCurrentPages方法
        const curPage = pages[pages.length - 1]
        // 声明一个当前页面
        curPage.onLoad(curPage.options) // 传入参数
        curPage.onShow()
        curPage.onReady()
        // 执行刷新
      },
    }
  }
</script>

<style lang="scss" scoped>
  header {
    height: 220rpx;
    background-color: pink;
    background-image: url('@/static/@1/caipusousuo_slices/top-bar.png');
    padding-left: 20rpx;
    position: relative;

    >view {
      width: 100%;
      height: 100%;
      color: white;
      // padding-left: 20rpx;

      h1 {
        padding-top: 60rpx;
        font-size: 40rpx;
        font-weight: bolder;
      }

      h2 {
        font-size: 24rpx;
        margin-top: 15rpx;
      }

    }

    .search {
      position: relative;
      height: 0;

      input {
        padding-left: 20rpx;
        position: absolute;
        width: 700rpx;
        height: 77rpx;
        background-color: white;
        display: block;
        margin: 0 auto;
        bottom: -38rpx;
        border-radius: 50rpx;
        color: black;
        border: 2rpx solid #ccc;
      }

      img {
        z-index: 1;
        position: absolute;
        width: 40rpx;
        height: 40rpx;
        left: 40%;
        top: -25rpx;
      }
    }



  }

  .swipeCenter {
    height: 300rpx;
    margin: 0 30rpx;
    margin-top: 60rpx;
    // background-color: #F0E3D0;
  }

  .typeShow {
    margin: 0 30rpx;
    margin-top: 20rpx;
    // background-color: red;
    height: 250rpx;

    ul {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      li {
        width: 120rpx;
        // height: 100rpx;
        // background-color: pink;
        text-align: center;

        image {
          display: block;
          margin: 0 auto;
          width: 70rpx;
          height: 70rpx;
        }

        span {
          font-size: 12px;
        }
      }
    }
  }

  .leftBto {
    // display: flex;
    // float: left;
    height: 360rpx;
    margin: 30rpx;
    // background-color: #ccc;
    position: relative;

    .leftBtoTwo {
      position: relative;
    }

    .text {
      display: block;
      color: white;
      font-weight: bolder;
      background-color: rgba(229, 158, 107, 0.7);
      border-radius: 15rpx;
      z-index: 1;
      position: absolute;
      line-height: 60rpx;
      text-align: center;
      top: 10rpx;
      left: 10rpx;
      width: 182rpx;
      height: 60rpx;
    }

    .smImg {
      width: 350rpx;
      height: 165rpx;
    }


    .smSwiper {
      float: left;
    }

    .smSwiper:nth-child(1) {
      width: 300rpx;
      height: 100%;
      // background-color: slateblue;
    }

    .smSwiper:nth-child(2),
    .smSwiper:nth-child(3) {
      margin-left: 15px;
      width: 50%;
      height: 195rpx;
      // background-color: slateblue;
    }

  }

  .recommend {
    margin: 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // background-color: pink;
  }
</style>

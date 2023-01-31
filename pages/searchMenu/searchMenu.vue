<template>
  <view>
    <!-- <view style="background-color: #ececec;"> -->
    <!-- 头部搜索 -->
    <view class="topToSearch">
      <div class="searchTwo">
        <image src="@/static/@1/caipusousuo_slices/mengbanzu 2.png" mode=""></image>
        <input type="text" class="sInput" border="none" color="#282C35" :placeholder="plHolder" v-model="searchAll.val">
        </input>
        <span class="btn" @click="goSearch">搜索</span>
      </div>
    </view>
    <!-- vip展示 -->
    <div class="title">精品名厨视频 - 会员专享
      <image src="../../static/@1/caipusousuo_slices/mengbanzu282.png" mode=""></image>
    </div>
    <VipMenusList v-if="toVipShow!=null" :toShow="toVipShow"></VipMenusList>
    <!-- 搜索页面随机推荐 -->
    <view v-if="toRenderShow!=null" class="showLists" v-for="a in toRenderShow" :key="a._id">
      <RenderMeans :toShow="a"></RenderMeans>
    </view>
  </view>
</template>

<script>
  import {
    createNamespacedHelpers
  } from "vuex";
  const {
    mapState: mapStateVip,
    mapActions: mapActionsVip
  } = createNamespacedHelpers("vip");

  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'


  export default {
    data() {
      return {
        toVipShow: null,
        plHolder: null,
        toRenderShow: null,
        searchAll: {
          pageSize: '12',
          currentPage: '1',
          val: ''
        }
      }
    },
    onLoad: async function(option) { //option为object类型，会序列化上个页面传递的参数
      this.plHolder = option.name;
      await this.getMemberRecommendAsync();
      this.toVipShow = this.vipRecommend;

      this.toRenderShow = this.vipRecommend;
      // console.log(11111, this.vipRecommend);

      // console.log(2222222, option.val); ///打印出上个页面传递的参数。
      this.searchAll.val = option.val;
      this.goSearch()
    },
    computed: {
      ...mapStateVip(['vipRecommend']),
      ...mapState(['userInfo']),
    },
    watch: {
      async userInfo() {
        console.log('userInfo修改了= = qqq');
        await this.getMemberRecommendAsync();
		const res = await this.$api.search.getMemberRecommend();
		console.log('重新获取getMemberRecommend',res.message);
        this.toVipShow = [
          // ...this.vipRecommend
          ...res.message
        ];
        this.toRenderShow =[ 
          // ...this.vipRecommend
          ...res.message
        ];
      }
    },
    async onReachBottom() {
      console.log('触底了~');
      this.searchAll.currentPage++;
      if (this.searchAll.val != '') {
        const res = await this.$api.search.getSearchMenu(this.searchAll);
        // if (!Array.isArray(res.menus)) {
        console.log('searchAll', this.searchAll);
        // this.toRenderShow.push(res.menus)
        this.toRenderShow = [...this.toRenderShow, ...res.menus]
        // console.log('toRenderShow', this.toRenderShow);
        // }
      }
    },
    methods: {
      ...mapActionsVip(['getMemberRecommendAsync']),
      // ...mapActions(['changeUserInfoAsync']),
      async goSearch() {
        console.log(this.searchAll.val);
        if (!this.searchAll.val) {
          uni.showToast({
            title: '请输入内容',
            duration: 800,
            icon: "error"
          });
          return;
        };

        const res = await this.$api.search.getSearchMenu(this.searchAll);
        this.toRenderShow = res.menus;
        this.searchAll = {
          pageSize: '12',
          currentPage: '1',
          val: this.searchAll.val
        }
        // console.log('searchAll', res, this.toRenderShow);
      },

    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin: 30rpx 0 0 30rpx;
    display: flex;

    image {
      margin-left: 18rpx;
      width: 50rpx;
      height: 50rpx;
    }
  }

  .topToSearch {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EE7B2D;
    height: 150rpx;

    .searchTwo {
      height: 80rpx;
      display: flex;
      width: 500rpx;
      background-color: white;
      outline-style: none;
      border-radius: 20rpx;
      position: relative;

      image {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        top: 20%;
        left: 10rpx;
      }

      .sInput {
        font-size: 40rpx;
        border-radius: 20rpx;
        display: block;
        height: 100%;
        width: 100%;
        padding-left: 60rpx;
        // z-index: 1;
      }

      .btn {
        position: absolute;
        right: -90rpx;
        line-height: 80rpx;
        font-weight: bolder;
        color: white;
      }
    }
  }

  .showLists {
    margin: 0 30rpx;
    background-color: white;
  }
</style>

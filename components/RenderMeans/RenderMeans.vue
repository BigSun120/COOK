<template>
  <view class="ALL" @click="goMenuDetail">
    <image :src="toShow.coverpic" mode=""></image>
    <view class="text">
      <h1>{{toShow.name}}</h1>
      <div class="uTd">
        <span v-for="a in menuDetail.message[0].ingredient" :key="a.name">
          {{a.name}}·
        </span>
      </div>
      <div class="text2">
        <div class="twoT">
          <span class="t1">{{toShow.pageview}}
            <image src="../../static/@1/caipusousuo_slices/mengbanzu278(1).png" mode=""></image>
          </span>
          <span class="t2">{{toShow.collections}}
            <image v-if="show" src="@/static/@1/caipusousuo_slices/sccg.png" mode=""></image>
            <image v-else src="@/static/@1/caipusousuo_slices/mengbanzu279(1).png" mode=""></image>
          </span>
        </div>
      </div>
    </view>

  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'

  export default {
    name: "RenderMeans",
    data() {
      return {
        menuDetail: null,
        listIdnull: null,
        show: false,
      };
    },
    props: ['toShow'],
    mounted() {
      // console.log('toShow11 ', this.toShow);
      this.getMenuDetail();
      this.getSel();
    },
    computed: {
      ...mapState(['userInfo'])
    },
    watch: {
      async userInfo() {
        // await this.getMenuDetail()
        this.getSel()
      }
    },
    methods: {
      async getMenuDetail() {
        if (this.toShow) {
          this.menuDetail = await this.$api.search.getMenuDetail({
            _id: this.toShow._id
          });
          // console.log('menuDetail111111', this.menuDetail);
        }
      },
      goMenuDetail() {
        // console.log('gogogo', this.toShow._id);
        uni.navigateTo({
          url: `/pages/menuDetail/menuDetail?id=${this.toShow._id}`
        })
      },
      // 获取收藏
      async getSel() {
        let aaa
        if (Array.isArray(this.userInfo)) {
          aaa = await this.$api.users.getCollectId({
            _id: this.userInfo[0]._id
          })
        } else {
          aaa = await this.$api.users.getCollectId({
            _id: this.userInfo._id
          })
        }
        // this.listId = aaa.mycollect;
        this.show = aaa.mycollect.some(a => a._id == this.toShow._id)
        // console.log('userInfogetSelgetSel', aaa.mycollect, this.toShow, this.show);
      },
    }
  }
</script>

<style lang="scss">
  .uTd {
    width: 350rpx;
    margin-top: 20rpx;

    span {
      font-size: 25rpx;
      color: #AAAAAA;
    }

    overflow: hidden;
    /* break-all(允许在单词内换行。) */
    word-break: break-all;
    /* 超出部分省略号 */
    text-overflow: ellipsis;
    /** 对象作为伸缩盒子模型显示 **/
    display: -webkit-box;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-box-orient: vertical;
    /** 显示的行数 **/
    -webkit-line-clamp: 1;
  }

  .text2 {
    width: 100%;
    max-width: 300rpx;
    margin-top: 30rpx;

    .twoT {
      display: flex;

      .t2,
      .t1 {
        display: flex;
        width: 50%;
        font-size: 30rpx;
        color: #AAAAAA;

        image {
          margin-left: 15rpx;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }

  }

  .ALL {
    width: 100%;
    height: 210rpx;
    background-color: white;
    margin: 15rpx 0;
    border-radius: 20rpx;
    display: flex;

    .text {
      margin: 15rpx;

      h1 {
        font-weight: bolder;

      }
    }

    image {
      display: block;
      width: 310rpx;
      height: 210rpx;
      border-radius: 20rpx;
    }
  }
</style>

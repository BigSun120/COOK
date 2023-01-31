<template>
  <view class="ALL">

    <main>
      <view v-for="a in toShow" :key="a._id" class="ONE" @tap="goDetail(a._id)">
        <div class="video">
          <image :src="a.coverpic" mode=""></image>
          <!-- <span class="vdLong">{{Math.floor(a.vid.length/60)}}:{{Math.floor(a.vid.length%60)}}</span> -->
        </div>
        <div class="text">
          <span class="title">{{a.name}}</span>
          <div class="twoT">
            <span class="t1">{{a.pageview}}
              <image src="@/static/@1/caipusousuo_slices/mengbanzu278(1).png" mode=""></image>
            </span>
            <span class="t2">{{a.collections}}
              <image v-if="collectFlg(a._id)" src="@/static/@1/caipusousuo_slices/sccg.png" mode=""></image>
              <image v-else src="@/static/@1/caipusousuo_slices/mengbanzu279(1).png" mode=""></image>
            </span>
          </div>
        </div>
      </view>
    </main>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'

  export default {
    name: "VipMenusList",
    data() {
      return {
        // sel: false,
        menuDetailId: null,
        listId: null
      };
    },
    props: ['toShow'],
    async mounted() {
      await this.getSel()
      // console.log('toShow11', this.toShow);
      // console.log('toShow22', this.toShow[0].vid.length);
    },
    computed: {
      ...mapState(['userInfo','token'])
    },
    watch: {
      userInfo() {
        // console.log(123);
       if(this.token){
		   this.collectFlg()
		   this.getSel()
	   }
      }
    },
    methods: {
      goDetail(id) {
        console.log('goDetail(id) ',id);
        uni.navigateTo({
          url: `/pages/menuDetail/menuDetail?id=${id}`
        })
      },
      collectFlg(id) {
        // console.log(id, this.listId);
        if (this.listId == null) return false;
        return this.listId.some(a => a._id == id)
      },
      // 获取收藏
      async getSel() {
        // this.userInfo = [...this.userInfo]
        // let bbb = JSON.parse(JSON.stringify(this.userInfo))
        console.log('qqqqqqqqqqqqqqqqqq', this.userInfo);
        let aaa
        if (this.userInfo) {
          if (Array.isArray(this.userInfo)) {
            aaa = await this.$api.users.getCollectId({
              _id: this.userInfo[0]._id
              // _id: bbb._id
            })
          } else {
            console.log(2323);
            aaa = await this.$api.users.getCollectId({
              _id: this.userInfo._id
              // _id: bbb._id
            })
          }
        }

        this.listId = aaa.mycollect;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .ALL {
    margin: 30rpx;
    background-color: white;
  }


  main {
    padding: 0;
    margin: 0;
    display: flex;
    overflow-x: scroll;

    .ONE {
      margin: 10rpx;

      .video {
        width: 320rpx;
        height: 220rpx;
        // background-color: darkred;
        border-radius: 20rpx;
        position: relative;

        .vdLong {
          position: absolute;
          z-index: 1;
          color: white;
          display: block;
          background-color: rgba(0, 0, 0, 0.7);
          width: 150rpx;
          text-align: center;
          right: 10rpx;
          bottom: 10rpx;
          border-radius: 15rpx;
        }

        image {
          height: 100%;
          width: 100%;
          border-radius: 20rpx;
        }
      }

      .text {
        .title {
          font-weight: bolder;
          margin: 10rpx 0;
        }

        .twoT {
          display: flex;

          .t2,
          .t1 {
            display: block;
            width: 50%;
            font-size: 20rpx;
            color: #ccc;

            image {
              z-index: 999;
              margin-left: 20rpx;
              width: 20rpx;
              height: 20rpx;
            }
          }
        }

      }
    }

  }
</style>

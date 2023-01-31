<template>
  <view>
    <ul @click="goDetail">
      <li>
        <image :src="LIST.coverpic" mode=""></image>
      </li>
      <li>
        <span class="titleSm">{{LIST.name}}</span>
      </li>
      <li class="textTwo">
        <span class="t1">{{LIST.pageview}}</span>
        <span class="t2">{{LIST.collections}}
          <image v-if="changVip()" src="@/static/@1/caipusousuo_slices/sccg.png" mode=""></image>
          <image v-else src="@/static/@1/caipusousuo_slices/mengbanzu279.png" mode=""></image>
        </span>
      </li>
    </ul>
  </view>
</template>

<script>
  import {
    mapState,
  } from 'vuex'

  export default {
    name: "Recommend",
    props: ['LIST'],
    data() {
      return {
        // sel: false, 
        userShow: null
      };
    },
    computed: {
      ...mapState(['userInfo'])
    },
    watch: {
      // userShow: {
      //   handler(n, o) {
      //     // console.log(123);
      //   },
      //   deep: true
      // },
      userInfo() {
        this.getUI()
        this.changVip()
      }
    },
    mounted() {
      // console.log(66666, this.userInfo);
      this.getUI();
      // console.log('userShow.vip', this.userShow.vip);
    },
    methods: {
      goDetail() {
        uni.navigateTo({
          url: `/pages/menuDetail/menuDetail?id=${this.LIST._id}`
        })
      },
      getUI() {
        if (this.userInfo) {
          if (Array.isArray(this.userInfo)) {
            this.userShow = this.userInfo[0]
          } else {
            this.userShow = this.userInfo
          }
        }
        // console.log(789, this.userShow);
      },
      changVip() {
        if (!this.userShow) return
		if(this.userShow.mycollect){
		console.log('changVipchangVip',this.userShow);
		}
        return this.userShow.mycollect.some(a => a == this.LIST._id)
      }
    },
  }
</script>

<style lang="scss" scoped>
  ul {
    li {
      image {
        width: 330rpx;
        height: 250rpx;
      }

      .titleSm {
        font-size: 30rpx;
        font-weight: bolder;
        line-height: 45rpx;
        color: #575757;
      }
    }

    .textTwo {
      display: flex;
      justify-content: space-around;

      // flex-grow: 1;
      span {
        display: block;
        width: 50%;
        color: "#AAAAAA";
        font-size: 25rpx; // background-color: red;
        //Base style for 矩形 380
      }

      .t1::after {
        content: "";
        display: inline-block;
        margin-left: 20rpx;
        width: 30rpx;
        height: 10px;
        background: url("@/static/@1/caipusousuo_slices/mengbanzu278.png");
      }

      .t2 {
        image {
          margin-left: 20rpx;
          vertical-align: bottom;
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
  }
</style>

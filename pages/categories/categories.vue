<template>
  <view>
    <view class="top">
      <div class="tt">
        <span>分类</span>
        <span>食材</span>
      </div>
      <div v-if="!val" class='toSearch'>
        <image v-if="!val" src="../../static/@1/caipusousuo_slices/mengbanzu 2.png" mode=""></image>
        <input v-model="val" placeholder="吃啥啥都有" placeholder-style="padding-left:35%;color:black;"></input>
      </div>
      <div v-else class='toSearch toSearch2' style="width: 60%;">
        <image v-if="!val" src="../../static/@1/caipusousuo_slices/mengbanzu 2.png" mode=""></image>
        <input focus v-model="val" placeholder="吃啥啥都有" placeholder-style="padding-left:35%;color:black;"></input>
        <button class="mini-btn" type="primary" size="mini" @click="toSearch(val)">搜索</button>
      </div>
    </view>
    <main>
      <scroll-view class="leftAside" scroll-y style="height: 85vh;">
        <ul>
          <li v-for="a in asideList" :key="a._id">
            <a :href="'#A'+a.id" @click="goId(a._id)">
              <span class="aside" :class='{active:a._id==beAct}'>
                {{a.cat_name}}
              </span>
            </a>
          </li>
        </ul>
      </scroll-view>
      <scroll-view scroll-y style="height: 85vh;" :scroll-into-view="toId">
        <ul>
          <li class="right" v-for="a in mainShow" :id='"A"+a._id' :key="a._id">
            <span class="rightTitle">{{a.cat_name}}</span>
            <ul class="rightMain">
              <li v-for="b in a.children" :key="b._id">
                <image :src="b.cat_icon" style="height: 100rpx;width: 100rpx;" mode=""></image>
                <span>{{b.cat_name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll-view>
    </main>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // val: null,
        val: '肉',
        asideList: [],
        mainShow: [],
        toId: '',
        beAct: 0
      }
    },
    mounted() {
      this.getCategories();
    },
    methods: {
      async getCategories() {
        const res = await this.$api.search.getCategories();
        this.mainShow = res.message;
        this.asideList = res.message;
        console.log('this.asideList', this.asideList, this.mainShow);
      },
      goId(id) {
        console.log('id', id);
        this.toId = 'A' + id;
        this.beAct = id
      },
      toSearch(val) {
        console.log('val', val);
        uni.navigateTo({
          url: `/pages/searchMenu/searchMenu?val=${val}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    background-color: #EE7B2D;
    height: 180rpx;
  }

  .tt {
    background-color: #EE7B2D;
    align-items: center;
    height: 60rpx;
    margin: 0 auto;
    width: 350rpx;
    display: flex;
    justify-content: center;
    border: 2px solid white;
    border-radius: 50rpx;

    span {
      display: block;
      text-align: center;
      width: 150rpx;
      color: white;
      height: 60rpx;
      line-height: 60rpx;
      width: 50%;
      border-radius: 50rpx;

      &:first-child {
        background-color: white;
        border: 2px solid white;
        color: #EE7B2D;
      }
    }
  }

  .toSearch {
    background-color: white;
    margin: 20rpx auto;
    width: 80%;
    border-radius: 50rpx;
    position: relative;

    image {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      top: 15rpx;
      left: 33%;
    }

    input {
      padding-left: 60rpx;
      height: 70rpx;
    }
  }

  .toSearch2 {
    display: flex;

    button {
      width: 150rpx;
      height: 70rpx;
      line-height: 70rpx;
      background-color: #EE7B2D;
      color: white;
      border: none;
      outline: none;
      border-radius: 50rpx;
    }
  }

  .aside,
  a {
    height: 120rpx;
    line-height: 120rpx;
    width: 200rpx;
    text-align: center;
  }

  main {
    display: flex;
  }

  .active {
    color: #EE7B2D;
  }

  .leftAside {
    // background-color: red;
    width: 200rpx;
  }

  .right {
    // background-color: pink;

    .rightTitle {
      line-height: 100rpx;
      height: 100rpx;
      margin-left: 20rpx;
    }

    .rightMain {
      display: flex;
      flex-wrap: wrap;

      >li {
        image {
          display: block;
          margin: 0 auto;
          border-radius: 50%;
        }

        // display: flex;
        // flex-direction: column;
        text-align: center;
        width: 180rpx;
        margin: 20rpx auto;
      }
    }
  }
</style>

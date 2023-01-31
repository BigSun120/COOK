<template>
  <view class="uni-margin-wrap">
    <swiper class="swiper" :style="height" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
      :interval="interval" :duration="duration">
      <swiper-item v-for="a in SWIPER" :key="a._id">
        <view class="swiper-item uni-bg-red">
          <image v-if="a.image_src" :src="a.image_src" mode="" />
          <image v-else :src="a" mode="" />

        </view>
      </swiper-item>

    </swiper>
  </view>
</template>

<script>
  export default {
    props: ['SWIPER', 'height'],
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
      }
    },
    async mounted() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .uni-margin-wrap {
    width: 690rpx;
    width: 100%;
  }

  .swiper-item {
    display: block;
    height: 100%;
    line-height: 300rpx;
    text-align: center;

    image {
      width: 100%;
      height: 100%;
    }
  }
</style>
